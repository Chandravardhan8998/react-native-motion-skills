#!/usr/bin/env node
/** Validate simple Agent Skills frontmatter + required references without deps. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const skills=path.join(root,'.agents','skills');
let failures=0, count=0;
const seen=new Set();
for(const d of fs.readdirSync(skills,{withFileTypes:true})) {
  if(!d.isDirectory()) continue;
  count++;
  const base=path.join(skills,d.name);
  const file=path.join(base,'SKILL.md');
  if(!fs.existsSync(file)){console.error(`Missing ${file}`);failures++;continue;}
  const s=fs.readFileSync(file,'utf8');
  const match=s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if(!match) {console.error(`${d.name}: invalid YAML frontmatter`);failures++;continue;}
  const name=match[1].match(/^name:\s*(.*)$/m)?.[1];
  const desc=match[1].match(/^description:\s*(.*)$/m)?.[1];
  if(name!==d.name||!desc||desc.length>300||seen.has(name)){
    console.error(`${d.name}: invalid name/description or duplicate`);failures++;
  }
  seen.add(name);
  const references=[...s.matchAll(/references\/([\w.-]+\.md)/g)].map(x=>x[0]);
  for(const ref of references) if(!fs.existsSync(path.join(base,ref))) {
    console.error(`${d.name}: missing ${ref}`);failures++;
  }
}
if(count<1) failures++;
console.log(`${count} skills checked; ${failures} errors.`);
if(failures) process.exitCode=1;
