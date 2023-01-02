const fs = require('fs')
const path = require('path')
const createTable = require('markdown-table')
const prettier = require('prettier')

const titles = [
  'Not Quite Lisp',
  'I Was Told There Would Be No Math',
  'Perfectly Spherical Houses in a Vacuum',
  'The Ideal Stocking Stuffer',
  "Doesn't He Have Intern-Elves For This?",
  'Probably a Fire Hazard',
  'Some Assembly Required',
  'Matchsticks',
  'All in a Single Night',
  'Elves Look, Elves Say',
  'Corporate Policy',
]

const days = fs
  .readdirSync(path.join(__dirname, 'src'))
  .filter((dir) => /\d+/.test(dir))
  .map((dir) => path.join(__dirname, 'src', dir))
  .map((dir, index) => {
    const file = `${(index + 1).toString().padStart(2, '0')}.civet`
    const code = fs.readFileSync(path.join(dir, file)).toString()
    return { code, nr: index + 1 }
  })

const fileContent = `# Advent of Code 2015
My solutions for [Advent of Code 2015](https://adventofcode.com/2015/) in [Civet](https://github.com/DanielXMoore/Civet)
## Stars
${createTable(
  [
    ['Day', 'Quest', 'Part 1', 'Part 2'],
    ...days.map((story, i) => [story.nr, `[${titles[i]}][${story.nr}]`, ':star:', ':star:']),
  ],
  { align: ['c', 'c', 'c', 'c'] }
)}
## The journey
${days
  .map(
    (day, i) => `
### Day ${day.nr}: ${titles[i]}

Quest: [adventofcode.com/2015/day/${day.nr}](https://adventofcode.com/2015/day/${day.nr})

\`\`\`ts
${day.code}
\`\`\`
---
`
  )
  .join('\n')}

${days.map((day, i) => `[${day.nr}]: #day-${day.nr}-${titles[i].toLowerCase().replace(/ /g, '-')}`).join('\n')}
`

prettier.resolveConfig(__dirname).then((prettierConfig) => {
  fs.writeFileSync(
    path.join(__dirname, './README.md'),
    prettier.format(fileContent, {
      parser: 'markdown',
      ...prettierConfig,
    })
  )

  console.log('Done')
})
