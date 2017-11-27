# who-by-whom
---
Find which module is being required/imported by which. Can also tell if a module is being used somewhere without requiring it first.
    
### installation
	npm install --save-dev who-by-whom

### usage
Input a module name. Get back an array of modules that the input module is required by. e.x:
	
    npm wbw lodash
    ## required by: [ 'eslint', 'fast-deep-equal', 'inquirer', 'table' ]
    ## used by: []
    
    var wbw = require("who-by-whom");
	## {requiredBy: [], usedBy: ['bootstrap']}
    
    
### license
MIT License