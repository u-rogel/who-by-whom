const wbw = require(`../index.js`);
const path = require(`path`);
const test = require(`tape`);

const cwd = path.join(__dirname, `fixture`);

test(`requireBy`, (t) => {
	var results = wbw(`history`, { cwd: cwd });
	t.deepEqual(results.requiredBy, [`react-router`]);
	t.end();
});




