const esbuild = require('esbuild')
const civetPlugin = require('@danielx/civet/esbuild-plugin')

const day = process.argv[2]

const importInputSnippet = `
const fs = require('fs');
const _input = fs.readFileSync('./src/${day}/input.txt').toString()
`

esbuild
  .build({
    entryPoints: [`./src/${day}/${day}.civet`],
    outfile: 'run.js',
    bundle: true,
    platform: 'node',
    plugins: [civetPlugin],
    inject: ['./src/utils.civet'],
    banner: { js: importInputSnippet },
  })
  .catch(() => process.exit(1))
