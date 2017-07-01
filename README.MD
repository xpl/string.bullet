# Usage

```javascript
bullet = require ('string.bullet')
```
```javascript
bullet ('• ', 'foo\nbar\nbaz')
```
```javascript
bullet ('• ', ['foo', 'bar', 'baz'])
```

Will output:

```
• foo
  bar
  baz
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
