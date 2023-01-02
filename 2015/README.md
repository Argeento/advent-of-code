# Advent of Code 2015

My solutions for [Advent of Code 2015](https://adventofcode.com/2015/) in [Civet](https://github.com/DanielXMoore/Civet)

## Stars

| Day |                    Quest                    | Part 1 | Part 2 |
| :-: | :-----------------------------------------: | :----: | :----: |
|  1  |             [Not Quite Lisp][1]             | :star: | :star: |
|  2  |   [I Was Told There Would Be No Math][2]    | :star: | :star: |
|  3  | [Perfectly Spherical Houses in a Vacuum][3] | :star: | :star: |
|  4  |       [The Ideal Stocking Stuffer][4]       | :star: | :star: |
|  5  | [Doesn't He Have Intern-Elves For This?][5] | :star: | :star: |
|  6  |         [Probably a Fire Hazard][6]         | :star: | :star: |
|  7  |         [Some Assembly Required][7]         | :star: | :star: |
|  8  |              [Matchsticks][8]               | :star: | :star: |
|  9  |         [All in a Single Night][9]          | :star: | :star: |
| 10  |         [Elves Look, Elves Say][10]         | :star: | :star: |
| 11  |           [Corporate Policy][11]            | :star: | :star: |
| 12  |         [JSAbacusFramework.io][12]          | :star: | :star: |
| 13  |      [Knights of the Dinner Table][13]      | :star: | :star: |

## The journey

### Day 1: Not Quite Lisp

Quest: [adventofcode.com/2015/day/1](https://adventofcode.com/2015/day/1)

```ts
floor ::= 0
basement ::= 0

input.split('').forEach (char, i) => {
  basement = i if !basement and floor is -1
  floor += char is '(' ? 1 : -1
}

log floor, basement
```

---

### Day 2: I Was Told There Would Be No Math

Quest: [adventofcode.com/2015/day/2](https://adventofcode.com/2015/day/2)

```ts
papper ::= 0
ribbon ::= 0

for sizes of lines.map &.split('x').map +&
  [l, w, h] := sizes.sort asc
  [a, b, c] := [l * w, h * w, h * l]
  papper += 2 * (a + b + c) + Math.min a, b, c
  ribbon += 2 * (l + w) + l * w * h

log papper, ribbon

```

---

### Day 3: Perfectly Spherical Houses in a Vacuum

Quest: [adventofcode.com/2015/day/3](https://adventofcode.com/2015/day/3)

```ts
type Houses = Record<string, number>

move := (houses: Houses, santa: Point, dir: string) =>
  switch dir
    when '>' then santa.x++
    when '<' then santa.x--
    when 'v' then santa.y++
    when '^' then santa.y--
  key := `${santa.x},${santa.y}`
  houses[key] ??= 0
  houses[key] += 1

houses1: Houses := { '0,0': 1 }
santa1 := x: 0, y: 0
move houses1, santa1, dir for dir of inputArr

houses2: Houses := { '0,0': 1 }
santa2 := x: 0, y: 0
santa3 := x: 0, y: 0
move houses2, santa2, dir for dir of inputArr.filter (_,i) => i % 2
move houses2, santa3, dir for dir of inputArr.filter (_,i) => !(i % 2)

log Object.values(houses1).length
log Object.values(houses2).length
```

---

### Day 4: The Ideal Stocking Stuffer

Quest: [adventofcode.com/2015/day/4](https://adventofcode.com/2015/day/4)

```ts
md5 from 'js-md5'

for x ::= 0; true; x++
  hash := md5(input + x)
  if hash.startsWith '00000'
    log x
  if hash.startsWith '000000'
    log x
    break

```

---

### Day 5: Doesn't He Have Intern-Elves For This?

Quest: [adventofcode.com/2015/day/5](https://adventofcode.com/2015/day/5)

```ts
sum1 ::= 0
sum2 ::= 0

for str of lines
  if
    ((str.match(/[aeiou]/g) ?? []).length > 2) and
    /(.)\1/.test(str) and
    !['ab', 'cd', 'pq', 'xy'].some (x) => str.includes x

    sum1 += 1

  if /(..).*\1/.test(str) and /(.).\1/.test(str)
    sum2 += 1

log sum1, sum2
```

---

### Day 6: Probably a Fire Hazard

Quest: [adventofcode.com/2015/day/6](https://adventofcode.com/2015/day/6)

```ts
arr1: boolean[][] := new Array(1000).fill('').map () => new Array 1000
arr2 := new Array(1000).fill('').map () => new Array(1000).fill 0

for line of lines
  [x0, y0, x1, y1] := line.match(/\d+/g)!.map +&

  for y of [y0..y1] for x of [x0..x1]
    if line.startsWith 'turn on'
      arr1[y][x] = true
      arr2[y][x] += 1
    if line.startsWith 'turn off'
      arr1[y][x] = false
      arr2[y][x] -= 1 if arr2[y][x] > 0
    if line.startsWith 'toggle'
      arr1[y][x] = !arr1[y][x]
      arr2[y][x] += 2

sum1 ::= 0
sum2 ::= 0
for y of [0..999] for x of [0..999]
  sum1 += 1 if arr1[y][x] is true
  sum2 += arr2[y][x]

log sum1, sum2

```

---

### Day 7: Some Assembly Required

Quest: [adventofcode.com/2015/day/7](https://adventofcode.com/2015/day/7)

```ts
// @ts-nocheck
_NOT := (n: number) => {
  bin := [...n.toString(2).padStart 16, '0']
  reverse := bin.map(& is '0' ? '1' : '0').join ''
  parseInt reverse, 2
}

while global.a === undefined
  // Part 2
  // for line of ['16076 -> b', lines]
  for line of lines
    [left, right] ::= line.split(' -> ').map &.replace('do', 'aaa')
      .replace('eq', 'bbb')
      .replace('fs', 'ccc')
      .replace('if', 'ddd')
      .replace('in', 'eee')

    continue if global[right] !== undefined

    left = left.replace 'AND', '&'
    left = left.replace 'OR', '|'
    left = left.replace 'LSHIFT', '<<'
    left = left.replace 'RSHIFT', '>>'
    left = left.replace /NOT (\w*)/, '_NOT($1)'

    hasKnownVars := left.match(/[a-z]+/g)?.every (x) => global[x] !== undefined
    isDirectProvide := /^\d+$/.test(left)

    if hasKnownVars or isDirectProvide
      eval `${right} = ${left}`

log global.a
```

---

### Day 8: Matchsticks

Quest: [adventofcode.com/2015/day/8](https://adventofcode.com/2015/day/8)

```ts
p1 ::= ' '
p1 += eval x for x of lines
log input.length - lines.length - p1.length

p2 ::= ''
p2 += x.replace /["\\]/g, '--' for x of lines
log 3 * lines.length + p2.length - input.length - 1

```

---

### Day 9: All in a Single Night

Quest: [adventofcode.com/2015/day/9](https://adventofcode.com/2015/day/9)

```ts
permute from 'heaps-permute'

costs: Record<string, Record<string, number>> := {}
min ::= Infinity
max ::= -Infinity

for line of lines
  [a,,b,, cost] := line.split ' '
  costs[a] ?= {}
  costs[a][b] = +cost
  costs[b] ?= {}
  costs[b][a] = +cost

for p of permute Object.keys costs
  cost ::= 0
  cost += costs[p[i - 1]][p[i]] for i of [1..p.length - 1]
  min = cost if cost < min
  max = cost if cost > max

log min, max

```

---

### Day 10: Elves Look, Elves Say

Quest: [adventofcode.com/2015/day/10](https://adventofcode.com/2015/day/10)

```ts
say := (nr: string, depth = 1): number =>
  out ::= ''
  sum ::= 1

  for [a, b] of pairs [...nr]
    if a is b then sum++
    else
      out += sum + a
      sum = 1

  out += sum + nr[nr.length - 1]
  depth is 1 ? out.length : say(out, depth - 1)

log say input, 40
log say input, 50
```

---

### Day 11: Corporate Policy

Quest: [adventofcode.com/2015/day/11](https://adventofcode.com/2015/day/11)

```ts
charToInt := (char: string) => char.charCodeAt(0) - 97
intToChar := (int: number) => String.fromCharCode int + 97
nextPass := (pass: string) =>
  chars: string[] := []
  overlap ::= 0
  for [char, i] of ic reverse [...pass]
    val ::=  overlap + charToInt char
    val++ if i is 0
    overlap = 0
    if val > 25
      overlap++
      val = 0
    chars.unshift intToChar val
  chars.join ''

checkIol := (pass: string) => !/[iol]/.test pass
checkDouble := (pass: string) => /(.)\1.*(.)\2/.test pass
checkTriple := (pass: string) =>
  ints := [...pass].map charToInt
  for i of [0..4]
    if ints[i] + 1 is ints[i + 1] and ints[i] + 2 == ints[i + 2]
      return true
  false

pass ::= input
pass1 ::= ''
pass2 ::= ''

until pass2
  pass = nextPass pass
  if checkIol(pass) and checkDouble(pass) and checkTriple(pass)
    pass2 = pass if pass1
    pass1 = pass if pass1 is ''

log pass1, pass2
```

---

### Day 12: JSAbacusFramework.io

Quest: [adventofcode.com/2015/day/12](https://adventofcode.com/2015/day/12)

```ts
travel := (x: any) =>
  if typeof x is 'object' and !Array.isArray(x)
    return 0 if Object.values(x).some & is 'red'

  sum ::= 0
  for v of Object.values x
    sum += travel v if typeof v is 'object'
    sum += v if typeof v is 'number'
  sum

log toNumbers(input).reduce add
log travel JSON.parse input

```

---

### Day 13: Knights of the Dinner Table

Quest: [adventofcode.com/2015/day/13](https://adventofcode.com/2015/day/13)

```ts
permute from 'heaps-permute'

happines: Record<string, Record<string, number>> := {}

for line of lines
  [person,,sign,nr,,,,,,,to] := line.slice(0, -1).split ' '
  happines[person] ?= {}
  happines[person][to] = sign is 'gain' ? +nr : -nr

checkTable := (table: string[]) =>
  sum ::= 0
  for [person, i] of ic table
    next := table[i + 1] or table[0]
    prev := table[i - 1] or table[table.length - 1]
    prevHappines := happines[person]?[prev] ?? 0
    nextHappines := happines[person]?[next] ?? 0
    sum += prevHappines + nextHappines
  sum

findMax := (ppl: string[]) =>
  max ::= -Infinity
  for table of permute ppl
    sum := checkTable table
    max = sum if sum > max
  max

ppl := Object.keys happines
log findMax ppl
log findMax [...ppl, 'me']
```

---

[1]: #day-1-not-quite-lisp
[2]: #day-2-i-was-told-there-would-be-no-math
[3]: #day-3-perfectly-spherical-houses-in-a-vacuum
[4]: #day-4-the-ideal-stocking-stuffer
[5]: #day-5-doesn't-he-have-intern-elves-for-this?
[6]: #day-6-probably-a-fire-hazard
[7]: #day-7-some-assembly-required
[8]: #day-8-matchsticks
[9]: #day-9-all-in-a-single-night
[10]: #day-10-elves-look,-elves-say
[11]: #day-11-corporate-policy
[12]: #day-12-jsabacusframework.io
[13]: #day-13-knights-of-the-dinner-table
