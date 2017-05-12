var assert = require ('assert')
var bullet = require ('./string.bullet')

describe ('string.bullet', () => {

    it ('works', () => {

        var b = '\t\u001b[101m• \u001b[49m'

        var src = 'foo\n' +
                  'bar\n' +
                  'baz'

        var result = '\t\u001b[101m• \u001b[49mfoo\n' +
                   '\t  bar\n' +
                   '\t  baz'

        var bulleted = bullet (b, src)

        console.log ('\n', bulleted, '\n')

        assert.equal (bulleted, result)
    })
})