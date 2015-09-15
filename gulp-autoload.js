/* jshint asi: true, laxcomma: true */
var _ = require("lodash")
var p = require("./package.json")

var dDeps = p.devDependencies


var ddNames = _.keys(dDeps)
var gulps = ddNames.filter(function (name) {
        return name.search(/^gulp-/) !== -1
})

if (gulps.length === 0)
    throw new Error("I didn't find any gulp modules in devDependencies.  Did you --save-dev your gulp modules?")

var gMods = {}

gulps.forEach(function (gName) {
    gMods[gName] = require(gName)
})

module.exports = gMods
