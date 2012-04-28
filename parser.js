var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('scheem.peg', 'utf-8');

// Show the PEG grammar file
console.log(data);

// Create my parser
var parse = PEG.buildParser(data).parse;

// Do a test
assert.deepEqual(parse('a'), 'a');
assert.deepEqual(parse('(a)'), ['a']);
assert.deepEqual(parse('(a b c)'), ['a', 'b', 'c']);
assert.deepEqual(parse(' (a  b  c) '), ['a', 'b', 'c']);
assert.deepEqual(parse('\'a'), ['quote', 'a']);
assert.deepEqual(parse('\'(a b c)'), ['quote', ['a', 'b', 'c']]);
assert.deepEqual(parse('(a b c) ;; comment with closing parenthesis )'), ['a', 'b', 'c']);
assert.deepEqual(parse('(a b c ;; comment with closing parenthesis )\n) '), ['a', 'b', 'c']);
assert.deepEqual(parse(';; comment only'), '');
assert.deepEqual(parse(''), '');