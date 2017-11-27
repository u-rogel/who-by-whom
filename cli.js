#! /usr/bin/env node
`use strict`;

var which = require(`./index`);

var query;

process.argv.forEach(function (val, idx) {
	console.log(val);
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

which(query);