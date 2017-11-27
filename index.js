module.exports = function main(query, ...args){
	`use strict`;

	////////////////////////////////////////////////////////
	//// written by cowCrazy
	//// place in your project root folder 
	//// use like so 'node index <module to search>'
	////////////////////////////////////////////////////////

	var fs = require(`fs`);

	var requireRegEx, usedByRegEx, requiredBy = [], usedBy = [];

	if(args.length > 0){
		throw `Can search for one module at a time`;
	}

	if(!query){
		throw `Must supply a module to search, use this form 'node index <module to search>'`;
	}

	// search for module required as "require(module)" or "from 'module'"
	requireRegEx = new RegExp(`require *\\(["']${query}["']\\)|from *["']${query}['"]`, `i`);

	// search for module used as "typeof module === 'undefined'"
	usedByRegEx = new RegExp(`(typeof +${query} *={2,3} *["\`']undefined['"\`])|(["\`']undefined['"\`] *={2,3} *typeof +${query})|(if *\\( *!(window\\.)?${query} *\\))`, `i`);

	// main function
	function searchDir(dir){
		// get all files&dirs, ignore directories with the searched library name
		var dirLs, queryIdx;
		dirLs = fs.readdirSync(dir);
		queryIdx = dirLs.indexOf(query);
		if(queryIdx > -1){
			dirLs.splice(queryIdx, 1);
		}
		for (var d = 0; d < dirLs.length; d++){
			var fileName = dirLs[d];
			if(fileName.indexOf(`.js`) !== -1){
				if(fs.lstatSync(dir + `/` + fileName).isFile()){
					var file, moduleName;
					file = fs.readFileSync(dir + `/` + fileName, `utf8`);
					file = file.replace(/\n(?!\n)/g, ``);
					if(file.match(requireRegEx)){
						moduleName = filterModuleName(dir);
						if(requiredBy.indexOf(moduleName) === -1){
							requiredBy.push(moduleName);
							return;
						}
						return;
					}
					if(file.match(usedByRegEx)){
						moduleName = filterModuleName(dir);
						if(usedBy.indexOf(moduleName) === -1){
							usedBy.push(moduleName);
							return;
						}
						return;
					}
				}
			}
			else{
				if(fs.lstatSync(dir + `/` + fileName).isDirectory()){
					searchDir(dir + `/` + fileName);
				}
			}
		}
	}

	// filter module name from path
	function filterModuleName(path){
		path = path.slice(15);
		return path.replace(/\/.*$/, ``);
	}

	searchDir(`./node_modules`);

	return {
		requiredBy, 
		usedBy
	};
};