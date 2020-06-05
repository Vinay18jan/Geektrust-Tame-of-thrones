var self = module.exports,
    utils = require('./utils'),
    Kingdom = require('./kingdom');

/**
 * Start with a clean slate, delete storage.json
 */
self.cleanUp = function() {
    utils.deleteFile('./storage.json');
}

/**
 * Validating the secret message by reading the input file.
 */

self.validateSecretMessage = function (fileName) {
    var kingdomsWon=['SPACE'],
        kingdomName;
    //Reading the Input text file
    utils.readFile(fileName).split('\n').forEach(function (line) {
        kingdomName = validateLine(line);
        if(kingdomName != null) kingdomsWon.push(kingdomName);
    });
    var uniqueArray = kingdomsWon.filter(utils.removeDuplicate);
    if(uniqueArray.length>3) {
        console.log(uniqueArray.join(' '));
    }
    else console.log('NONE');
};

function extractDetails(message) {
    //Format: <Kingdon> <Message>
    let secretKey = message.split(' ');
    if(secretKey.length > 1) return secretKey; 
    else return [];
}
function validateMessage(emblemAnimal, secretMessage) {
    let isValid = false, count = 0;
    emblemAnimal.split('').find(function(elem) {
        if(secretMessage.toLowerCase().includes(elem.toLowerCase())) {
            secretMessage = secretMessage.toLowerCase().replace(elem.toLowerCase(),'');
            ++count;
        }
        if(count === emblemAnimal.length) isValid = true;
    });
    if(isValid) return utils.getObjectKey(Kingdom.EMBLEMS, emblemAnimal);
    else return null;
}

function validateLine(line) {
    var kingdomName;
    //Ignore the comment lines
    if (line.length > 1 && line.substr(0, 2) == '//') return;
    //Check if message sent is valid
    var secretKey = extractDetails(line);
    if (secretKey.length > 0) {
        let cipherKey = utils.getObjectValues(Kingdom.EMBLEMS, secretKey[0]);
        let decreyptedMessage = utils.decrypt(cipherKey.length, secretKey.slice(1, secretKey.length).join(''));
        kingdomName = validateMessage(cipherKey, decreyptedMessage);
    }
    return kingdomName;
}

self.validateLine = validateLine;