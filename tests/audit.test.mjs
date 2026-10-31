import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const audit=path.join(repo,'.agents/skills/rn-motion-audit/scripts/audit.mjs');
const installer=path.join(repo,'tooling/install.mjs');
const tmp=()=>fs.mkdtempSync(path.join(os.tmpdir(),'rn-motion-test-'));
const mkdir=(p)=>fs.mkdirSync(p,{recursive:true});
const put=(p,t)=>{mkdir(path.dirname(p));fs.writeFileSync(p,t);};
const run=(script,args)=>spawnSync(process.execPath,[script,...args],{encoding:'utf8'});

test('Expo app with valid Reanimated 4 path is detected and scan is read-only',t=>{
  const project=tmp();t.after(()=>fs.rmSync(project,{recursive:true,force:true}));
  const pkg={name:'expo-demo',dependencies:{expo:'^57.0.0','react-native':'0.86.0','react-native-reanimated':'^4.7.1','react-native-worklets':'^0.7.0','react-native-gesture-handler':'^2.0.0','expo-router':'^6.0.0'}};
  put(path.join(project,'package.json'),JSON.stringify(pkg));
  put(path.join(project,'app.json'),JSON.stringify({expo:{name:'demo',newArchEnabled:true}}));
  put(path.join(project,'src/theme/tokens.ts'),'export const theme = {};');
  const before=fs.readdirSync(project).sort();
  const result=run(audit,['--project',project,'--format','json']);
  assert.equal(result.status,0,result.stderr);
  const parsed=JSON.parse(result.stdout);
  assert.equal(parsed.apps.length,1);
  const app=parsed.apps[0];
  assert.equal(app.architecture,'explicitly enabled');
  assert.equal(app.navigation,'Expo Router');
  assert.equal(app.feasibility.find(x=>x.feature==='Gesture interactions').status,'ready');
  assert.ok(app.source.hints.theme.includes('src/theme/tokens.ts'));
  assert.deepEqual(fs.readdirSync(project).sort(),before);
});

test('Explicit Old Architecture + Reanimated 4 produces warning',t=>{
  const project=tmp();t.after(()=>fs.rmSync(project,{recursive:true,force:true}));
  put(path.join(project,'package.json'),JSON.stringify({dependencies:{'react-native':'0.80.0','react-native-reanimated':'4.0.0'}}));
  put(path.join(project,'android/gradle.properties'),'newArchEnabled=false\n');
  const result=run(audit,['--project',project,'--format','json']);
  assert.equal(result.status,0,result.stderr);
  const app=JSON.parse(result.stdout).apps[0];
  assert.equal(app.architecture,'explicitly disabled');
  assert.ok(app.notes.some(x=>x.includes('INCOMPATIBLE')));
  assert.equal(app.feasibility.find(x=>x.feature==='Gesture interactions').status,'conditional');
});

test('Monorepo app discovery and app selection',t=>{
  const project=tmp();t.after(()=>fs.rmSync(project,{recursive:true,force:true}));
  put(path.join(project,'package.json'),JSON.stringify({name:'workspace',workspaces:['apps/*']}));
  put(path.join(project,'apps/mobile/package.json'),JSON.stringify({name:'mobile',dependencies:{'react-native':'0.86.0'}}));
  put(path.join(project,'apps/dashboard/package.json'),JSON.stringify({name:'dashboard',dependencies:{react:'19.0.0'}}));
  let result=run(audit,['--project',project,'--format','json']);
  assert.equal(result.status,0,result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).apps.map(x=>x.name),['mobile']);
  result=run(audit,['--project',project,'--app','apps/mobile','--format','markdown']);
  assert.ok(result.stdout.includes('## mobile'));
});

test('Installer dry-run does not write and skips existing skills on install',t=>{
  const project=tmp();t.after(()=>fs.rmSync(project,{recursive:true,force:true}));
  let result=run(installer,['--project',project,'--dry-run']);
  assert.equal(result.status,0,result.stderr);
  assert.equal(fs.existsSync(path.join(project,'.agents')),false);
  result=run(installer,['--project',project]);
  assert.equal(result.status,0,result.stderr);
  const dest=path.join(project,'.agents/skills/rn-premium-motion/SKILL.md');
  assert.ok(fs.existsSync(dest));
  put(dest,'USER CUSTOM VERSION\n');
  result=run(installer,['--project',project]);
  assert.equal(result.status,0,result.stderr);
  assert.equal(fs.readFileSync(dest,'utf8'),'USER CUSTOM VERSION\n');
});

test('No secrets content is extracted by filename-only source scan',t=>{
  const project=tmp();t.after(()=>fs.rmSync(project,{recursive:true,force:true}));
  put(path.join(project,'package.json'),JSON.stringify({dependencies:{'react-native':'0.86.0'}}));
  put(path.join(project,'.env'),'API_KEY=private-must-not-appear');
  put(path.join(project,'src/screens/Home.tsx'),"const privateToken='private-must-not-appear';");
  const result=run(audit,['--project',project]);
  assert.equal(result.status,0,result.stderr);
  assert.equal(result.stdout.includes('private-must-not-appear'),false);
});
