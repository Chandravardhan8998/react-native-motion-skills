#!/usr/bin/env node
/** Explicit, safe installer. No npm install, network, or project code changes. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, '.agents', 'skills');
function usage() {
  return 'Usage: node tooling/install.mjs (--project /absolute/or/relative/path | --global) [--dry-run]\nExisting skill folders are never overwritten. No dependencies are installed.\n';
}
function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || !args.length) { process.stdout.write(usage()); return; }
  const dry = args.includes('--dry-run');
  const global = args.includes('--global');
  const pos = args.indexOf('--project');
  if ((global && pos >= 0) || (!global && pos < 0) || (pos >= 0 && !args[pos+1])) throw new Error(usage());
  if (args.some((arg,i)=> !['--dry-run','--global','--project'].includes(arg) && i!==pos+1) || (pos>=0 && args[pos+1].startsWith('--'))) throw new Error(usage());
  const dest = global ? path.join(os.homedir(),'.agents','skills') : path.join(path.resolve(args[pos+1]),'.agents','skills');
  if (!global) {
    const project = path.resolve(args[pos+1]);
    if (!fs.existsSync(project) || !fs.statSync(project).isDirectory()) throw new Error(`Project directory not found: ${project}`);
    if (project === root) throw new Error('Cannot install pack into its own source directory. Use a different target project.');
  }
  let added=0, skipped=0;
  for (const d of fs.readdirSync(source,{withFileTypes:true})) {
    if (!d.isDirectory()) continue;
    const target=path.join(dest,d.name);
    if(fs.existsSync(target)) {
      skipped++;
      process.stdout.write(`SKIP existing: ${target}\n`);
      continue;
    }
    process.stdout.write(`${dry?'WOULD INSTALL':'INSTALL'}: ${target}\n`);
    if(!dry) {
      fs.mkdirSync(dest,{recursive:true});
      fs.cpSync(path.join(source,d.name),target,{recursive:true,errorOnExist:true,force:false});
    }
    added++;
  }
  process.stdout.write(`\n${dry?'Dry run':'Complete'}: ${added} new skills, ${skipped} skipped.\n`);
}
try {main();} catch(e){console.error(e.message);process.exitCode=1;}
