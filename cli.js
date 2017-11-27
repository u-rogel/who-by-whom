#! /usr/bin/env node
`use strict`;

var which = require(`./index`);

var query;

process.argv.forEach(function (val, idx) {
	if(idx === 2){
		query = val;
	}
	if(idx >= 3){
		throw `Can search for one module at a time`;
	}
});

if(!query){
	throw `Must supply a module to search, use this form 'npm wbw <module to search>'`;
}

var result = which(query);

console.log(`required by:`, result.requiredBy);
console.log(`used by:`, result.usedBy);