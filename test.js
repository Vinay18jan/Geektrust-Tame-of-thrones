var assert = require('assert'),
	utils = require('./utils'),
    seed = require('./seed-data');
    
/*
 * Tests if val1 equals val2
 */
function eq (description, val1, val2) {
	it(description, function (done) {
		assert.equal(val1, val2);
		done();
	});
}

/*
 * Tests if val is false
 */
function isFalse (description, val) {
	eq(description, false, val);
}

/*
 * Tests if val is true
 */
function isTrue (description, val) {
	eq(description, true, val);
}


/*
 * Clean up
 */
function cleanUp() {
    describe('Cleanup Storage.json', function() {
        seed.cleanUp();
        isFalse('storage.json should not exist', utils.fileExists('./storage.json'));
    });
}

/*
*   Lets start the test
*/
function testSecretMessages() {
    var result=['SPACE'];
    utils.readFile('test.txt').split('\n').forEach(function (line) {
        var answer = seed.validateLine(line);
        if(answer!=null)result.push(answer);
    });
    var uniqueArray = result.filter(utils.removeDuplicate);
    //Ruler Kingdom (SPACE) and its allies: 
    if(uniqueArray.length>3) isTrue(result.join(' '), true);
    //SPACE Kingdom did not get enough allies
    else isFalse('NONE', false);
}



describe('Message send by Space Kingdom to other kingdoms', function() {
    testSecretMessages()
});