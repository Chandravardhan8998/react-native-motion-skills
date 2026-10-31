#!/usr/bin/env node
/**
 * Read-only React Native premium-motion feasibility audit.
 * Node stdlib only. Does not execute app code, install dependencies, mutate the
 * target, or read secrets. Output is a heuristic, not runtime validation.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const IGNORE = new Set([
  '.git', '.expo', '.next', '.turbo', '.gradle', '.idea', '.vscode',
  'node_modules', 'vendor', 'Pods', 'build', 'dist', 'coverage',
  '.yarn', '.pnpm-store', 'DerivedData', '__generated__',
]);
const SEARCH_DEPTH = 4;
const SOURCE_DEPTH = 6;
const SOURCE_LIMIT = 2500;

function parseArgs(args) {
  const opts = { project: '.', format: 'markdown', out: null, app: null };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      process.stdout.write('Usage: node audit.mjs [--project /path] [--app relative/path] [--format markdown|json] [--out /path/to/report]\nNo project files are modified. --out writes only to the explicitly provided path.\n');
      process.exit(0);
    }
    if (!['--project','--format','--out','--app'].includes(arg) || !args[i+1]) throw new Error(`Invalid argument: ${arg}`);
    opts[arg.slice(2)] = args[++i];
  }
  if (!['markdown','json'].includes(opts.format)) throw new Error('--format must be markdown or json');
  return opts;
}
function readText(file, max = 150000) {
  try {
    const st = fs.statSync(file);
    if (!st.isFile() || st.size > max) return null;
    return fs.readFileSync(file, 'utf8');
  } catch { return null; }
}
function readJson(file) {
  const s = readText(file);
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}
function walk(dir, depth, limit, cb) {
  if (depth < 0 || limit.count <= 0) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return; }
  for (const e of entries) {
    if (limit.count <= 0) return;
    if (e.isSymbolicLink()) continue;
    if (e.name.startsWith('.') && e.name !== '.agents') continue;
    if (IGNORE.has(e.name)) continue;
    const absolute = path.join(dir, e.name);
    if (e.isFile()) { limit.count--; cb(absolute); }
    else if (e.isDirectory()) walk(absolute, depth-1, limit, cb);
  }
}
function discoverApps(project) {
  const roots = [];
  const root = readJson(path.join(project, 'package.json'));
  if (root && (root.dependencies?.['react-native'] || root.devDependencies?.['react-native'] || root.dependencies?.expo)) roots.push(project);
  walk(project, SEARCH_DEPTH, {count:3000}, (file) => {
    if (path.basename(file) !== 'package.json') return;
    const folder = path.dirname(file);
    if (folder === project) return;
    const data = readJson(file);
    if (data && (data.dependencies?.['react-native'] || data.devDependencies?.['react-native'] || data.dependencies?.expo)) roots.push(folder);
  });
  return [...new Set(roots)].sort();
}
function majorVersion(spec) {
  const match = String(spec ?? '').match(/(?:^|[^\d])(\d+)(?:\.\d+){0,2}/);
  return match ? Number(match[1]) : null;
}
const STATUS = {ready:'READY',conditional:'CONDITIONAL',blocked:'BLOCKED',unknown:'UNKNOWN'};
function evaluate(info) {
  const {dependencies: deps, architecture, navigation, platform} = info;
  const re = deps['react-native-reanimated'];
  const reMajor = majorVersion(re);
  const worklets = Boolean(deps['react-native-worklets']);
  const gh = Boolean(deps['react-native-gesture-handler']);
  const skia = Boolean(deps['@shopify/react-native-skia']);
  const isExpo = platform.startsWith('Expo');
  const reReason = !re ? 'Reanimated not installed' :
    reMajor === 4 && architecture === 'explicitly disabled' ? 'Reanimated 4 cannot run with Old Architecture' :
    reMajor === 4 && !worklets ? 'Reanimated 4 expects react-native-worklets' :
    reMajor === 4 && architecture === 'unknown' ? 'Effective New Architecture not verified' :
    reMajor && reMajor !== 3 && reMajor !== 4 ? 'Installed Reanimated version requires manual compatibility check' :
    'Check installed RN/Reanimated version compatibility and native builds';
  const reSupported = Boolean(reMajor === 4 && architecture === 'explicitly enabled' && worklets) || Boolean(reMajor === 3);
  const reStatus = reSupported ? 'ready' : 'conditional';
  const evaluateItems = [
    ['Micro-interactions','ready','Built-in RN Animated can handle opacity/scale; prefer existing Reanimated if compatible','RN Animated or native press-state styling'],
    ['Status feedback','ready','Start with state-driven icons/opacity/scale; server/domain state must confirm success','Static status icon + accessible text'],
    ['Cinematic navigation',navigation === 'not identified' ? 'conditional':'conditional','Built-in stack transitions may be available; card-to-detail overlays need navigator validation. Shared elements are experimental','Native-stack default transitions or direct navigation'],
    ['3D tilt and perspective',gh && reSupported ? reStatus:'conditional',gh ? `Gesture path: ${reReason}`:'No gesture handler detected; resolve gesture ownership first','Static card or small RN Animated press transform'],
    ['Gesture interactions',gh && reSupported ? reStatus:'conditional',gh ? `Gesture path: ${reReason}`:'Gesture Handler absent; use existing touch system or request compatible setup','Accessible buttons/controls'],
    ['Scroll storytelling',reSupported ? 'ready':'conditional',reSupported?'Reanimated scroll hooks likely available; verify target list':'Prefer existing RN Animated native-driver transforms for simple scroll effects','Static sticky header'],
    ['Kinetic numbers and progress','ready','RN Animated supports simple transitions; preserve numeric truth and accessibility','Direct value update'],
    ['Custom shader / particle FX',skia?'conditional':'conditional',skia?'Skia present but native/tooling/device budget requires verification':'Skia absent: recommend static gradients and bounded overlays unless new dependency approved','Static gradient/illustration'],
    ['Motion-rich data charts','conditional','Depends on current chart library, data volume and accessible equivalent','Static chart with semantic summary'],
    ['Immersive onboarding','ready','Can implement basic choreographed screens without extra graphics packages','Simple accessible screens'],
  ];
  return evaluateItems.map(([feature, status, reason, fallback])=>({feature,status,reason,fallback}));
}
function findVersions(folder, deps) {
  const cfg = readJson(path.join(folder, 'app.json')) || {};
  const expo = cfg.expo || {};
  const gradle = readText(path.join(folder, 'android/gradle.properties')) || '';
  const re = deps['react-native-reanimated'];
  const plugins = readText(path.join(folder, 'babel.config.js')) || readText(path.join(folder, 'babel.config.cjs')) || '';
  const appConf = ['app.config.ts','app.config.js','app.config.mjs'].find(x=>fs.existsSync(path.join(folder,x)));
  const archCandidates=[];
  if (typeof expo.newArchEnabled === 'boolean') archCandidates.push({source:'app.json expo.newArchEnabled', value:expo.newArchEnabled});
  const gradleMatches = [...gradle.matchAll(/^\s*newArchEnabled\s*=\s*(true|false)\s*$/gim)];
  for (const m of gradleMatches) archCandidates.push({source:'android/gradle.properties', value:m[1].toLowerCase()==='true'});
  const archValues = new Set(archCandidates.map(x=>x.value));
  const architecture = archValues.size>1?'conflicting settings':archValues.has(true)?'explicitly enabled':archValues.has(false)?'explicitly disabled':'unknown';
  const isExpo = Boolean(deps.expo);
  const platform = isExpo ? ((fs.existsSync(path.join(folder, 'android'))||fs.existsSync(path.join(folder,'ios'))) ? 'Expo with native folders / prebuild or bare' : 'Expo (native folders not detected)') : 'React Native CLI / bare';
  const nav = deps['expo-router'] ? 'Expo Router' : deps['@react-navigation/native-stack'] ? 'React Navigation native stack' : deps['@react-navigation/stack'] ? 'React Navigation JS stack' : deps['@react-navigation/native'] ? 'React Navigation (other/unknown stack)' : 'not identified';
  const notes=[];
  const rm=majorVersion(re);
  if (rm===4 && architecture==='explicitly disabled') notes.push('INCOMPATIBLE: Reanimated 4 requires Fabric/New Architecture; do not auto-migrate the app.');
  if (rm===4 && !deps['react-native-worklets']) notes.push('Reanimated 4 detected without react-native-worklets in this app package; check workspace hoisting and install state.');
  if (rm===4 && !isExpo && !plugins.includes('react-native-worklets/plugin')) notes.push('For bare RN/Reanimated 4, verify Babel configuration includes react-native-worklets/plugin (and plugin order).');
  if (rm===3) notes.push('Reanimated 3 is a legacy compatibility path; avoid forced upgrade during motion-only changes.');
  if (archCandidates.length===0) notes.push('New Architecture runtime status is not explicit here; verify build-time configuration and actual app version.');
  if (archValues.size>1) notes.push('Conflicting New Architecture flags across native and Expo configs; verify actual build settings.');
  if (appConf) notes.push(`${appConf} exists: dynamic config was NOT executed or inferred; inspect manually.`);
  if (isExpo && rm===4 && plugins.includes('react-native-reanimated/plugin')) notes.push('Check whether Babel plugin is redundant/legacy in this Expo SDK; Expo preset may configure it automatically.');
  if (nav==='not identified') notes.push('Navigator unknown: look for custom router/navigation and inspect before cinematic transitions.');
  if (deps['@shopify/react-native-skia']) notes.push('Skia detected; verify installed version, native compatibility and GPU performance on devices.');
  return {platform,navigation:nav,architecture,architectureEvidence:archCandidates,babelPluginWorklets:plugins.includes('react-native-worklets/plugin'),babelPluginReanimated:plugins.includes('react-native-reanimated/plugin'),notes};
}
function sourceHints(folder) {
  const matches = {theme:[],components:[],screens:[],animation:[],tests:[],navigation:[]};
  let inspected=0;
  walk(folder,SOURCE_DEPTH,{count:SOURCE_LIMIT},(file)=>{
    if (!/\.(ts|tsx|js|jsx|json)$/.test(file)) return;
    const rel=path.relative(folder,file);
    const s=rel.replaceAll('\\','/');
    if (s==='package.json' || s.endsWith('.lock')) return;
    inspected++;
    const n=path.basename(rel);
    const test=(key,re)=> { if(matches[key].length<10&&re.test(s)) matches[key].push(s); };
    test('theme',/(theme|token|palette|typography|colors|spacing|fonts)/i);
    test('components',/(components\/|AppButton|AppSurface|AppText|Pressable|Button\.)/i);
    test('screens',/(screens\/|app\/.*\.(tsx|jsx)$|Screen\.)/i);
    test('animation',/(animat|motion|gesture|transition|spring|reanimated)/i);
    test('tests',/(\.test\.|\.spec\.|__tests__)/i);
    test('navigation',/(navigat|router|layout\.)/i);
  });
  return {inspectedFileCount:inspected,maxScannedFiles:SOURCE_LIMIT,hints:matches};
}
function auditApp(folder) {
  const pkg=readJson(path.join(folder,'package.json'));
  if (!pkg) return null;
  const dependencies={...(pkg.devDependencies||{}),...(pkg.dependencies||{})};
  const info={appRoot:folder,name:pkg.name||path.basename(folder),versions:{reactNative:dependencies['react-native']||null,expo:dependencies.expo||null,react:dependencies.react||null},dependencies, ...findVersions(folder,dependencies),source:sourceHints(folder)};
  info.feasibility=evaluate(info);
  info.suggestedPlan=[
    'Inspect the requested screens, theme and component implementations manually before editing.',
    'Choose an existing compatible animation mechanism and a static/reduced-motion fallback.',
    'Prototype one reversible interaction; keep business logic and navigation state authoritative.',
    'Run the project’s checks and profile a release/profile build on representative devices.'
  ];
  return info;
}
function md(report) {
  const out=['# React Native Motion Feasibility Report','','_Read-only heuristic. Unknown is not a build failure; READY is not a measured performance guarantee._','',`Project: \`${report.project}\``,`Apps found: **${report.apps.length}**`,''];
  for (const a of report.apps) {
    out.push(`## ${a.name}`,`Path: \`${a.appRoot}\``, '',
      '| Signal | Result |','|---|---|',
      `| Platform | ${a.platform} |`,
      `| React Native | ${a.versions.reactNative||'not declared'} |`,
      `| Expo | ${a.versions.expo||'not declared'} |`,
      `| Reanimated | ${a.dependencies['react-native-reanimated']||'not declared'} |`,
      `| Worklets | ${a.dependencies['react-native-worklets']||'not declared'} |`,
      `| Gesture Handler | ${a.dependencies['react-native-gesture-handler']||'not declared'} |`,
      `| Skia | ${a.dependencies['@shopify/react-native-skia']||'not declared'} |`,
      `| Navigation | ${a.navigation} |`,
      `| New Architecture | ${a.architecture} |`,
      '', '### Compatibility flags');
    if (a.notes.length) for(const note of a.notes) out.push(`- ${note}`);
    else out.push('- No obvious static configuration conflict found. This does not verify runtime compatibility.');
    out.push('','### Effect feasibility','','| Feature | Status | Evidence / required verification | Safe fallback |','|---|---|---|---|');
    for (const f of a.feasibility) out.push(`| ${f.feature} | **${STATUS[f.status]}** | ${f.reason} | ${f.fallback} |`);
    out.push('','### Potential reusable source paths');
    for (const [key,files] of Object.entries(a.source.hints)) out.push(`- **${key}**: ${files.length?files.map(x=>'`'+x+'`').join(', '):'not inferred from filenames'}`);
    out.push('','### Smallest safe next steps');
    for (const step of a.suggestedPlan) out.push(`- ${step}`);
    out.push('');
  }
  if (!report.apps.length) out.push('No `react-native` or `expo` dependency found within discovery depth. Supply `--app` for an app path or inspect workspace structure.');
  return out.join('\n')+'\n';
}
function main() {
  const opts=parseArgs(process.argv.slice(2));
  const project=path.resolve(opts.project);
  if (!fs.existsSync(project)||!fs.statSync(project).isDirectory()) throw new Error(`Project folder not found: ${project}`);
  const apps=opts.app?[path.resolve(project,opts.app)]:discoverApps(project);
  const report={generatedAt:new Date().toISOString(),project,scanType:'read-only static heuristic',apps:apps.map(auditApp).filter(Boolean)};
  const contents=opts.format==='json'?JSON.stringify(report,null,2)+'\n':md(report);
  if(opts.out){
    const output=path.resolve(opts.out);
    if (output.startsWith(project+path.sep) || output===project) {
      // Writing into the app is permissible only with explicit --out, but never over config.
      if (path.basename(output).toLowerCase()==='package.json') throw new Error('Refusing to overwrite package.json');
    }
    if(fs.existsSync(output)) throw new Error(`Report output exists; refusing overwrite: ${output}`);
    fs.mkdirSync(path.dirname(output),{recursive:true});
    fs.writeFileSync(output,contents,{flag:'wx'});
    process.stdout.write(`Report created at ${output}\n`);
  } else process.stdout.write(contents);
}
try { main(); } catch (err) { console.error(`Motion audit error: ${err.message}`); process.exitCode=1; }
