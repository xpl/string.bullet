# string.bullet

```bash
npm install string.bullet
```
```javascript
const bullet = require ('string.bullet')
```

Formatting a list item with `• ` as a bullet:

```javascript
bullet ('• ', 'foo\nbar\nbaz')        // accepts either newline-separated strings...
```
```javascript
bullet ('• ', ['foo', 'bar', 'baz'])  // ...or arrays
```
```
• foo
  bar
  baz
```

Humanized rendering of a JSON-like structure:

```javascript
const left  = '{' + '\t' + 'this_is_a_list: '
    , right = '[foo,\n bar,\n baz]' + '\t' + '}'

bullet (left, right)
```
```
{    this_is_a_list: [foo,
                      bar,
                      baz]    }
```

## The problem

Although it seems so simple that one may think it does not deserve a separate GitHub page — it is not so. Imagine we had tabulation symbols or ANSI escape codes (or other control characters) in the bullet string:

```javascript
const x = '\t\u001b[101m• \u001b[49m'

bullet (x, ['foo', 'bar', 'baz'])
```

To make proper indentation, one must be able to recognize these special sequences, replacing ordinary letters with whitespaces but keeping these special sequences intact, because we don't know how much screen space they will occupy upon rendering:

```
\t\u001b[101m• \u001b[49mfoo\n
\t  bar\n
\t  baz
```

## The solution

Under the hood it depends on the tiny [printable-characters](https://github.com/xpl/printable-characters) module that solves that specific problem:

```javascript
const { ansiEscapeCodes, printableCharacters } = require ('printable-characters')
```
```javascript
const indent = bullet.replace (ansiEscapeCodes, '')
                     .replace (printableCharacters, ' ')
```

## Applications

- [string.ify](https://github.com/xpl/string.ify) — a fancy pretty printer for JavaScript entities
- [ololog](https://github.com/xpl/ololog) — a better `console.log` for the log-driven debugging junkies!
