var self = module.exports,
    fs = require('fs'),
    cipher = require('./caesar-cypher'),
	shell = require('shelljs');

/**
 * Deleting the file
 */
function deleteFile(fileName) {
    if(fileExists(fileName)) fs.unlinkSync(fileName);
}

/**
 * Returns true if the path exists, false otherwise.
 */
function fileExists(fileName) {
    return fs.existsSync(fileName);
}

/**
 * Reads and returns the content of the text file
 */
function readFile(fileName) {
    if(fileExists(fileName)) return fs.readFileSync(fileName).toString();
    else throw new Error('File doesnot exists');
    
}

/**
 * Get the enum keys by value
 */
function getObjectKey(array, value) {
    var k;
    Object.keys(array).some(function(key) {
        if(array[key] === value) {
            k = key;
        }
    });
    return k;
}

/**
 * Decrypt a message thats been encrypted using the Caesar cipher
 */
function decrypt(key, message) {
    return cipher.decrypt(key, message);
}

/**
 * Get the object values
 */
function getObjectValues(array, key) {
    if(key in array)
        return array[key];
    else return null;
}

/*
 * Writes the given string into a text file. The path is created if it does not exist
 */
function writeFile (fileName, str) {
	// Create the path if required
	var temp = fileName.split('/');
	temp.splice(temp.length-1, 1);
	//mkdirp(temp.join('/'));
	fs.writeFileSync(fileName, str);
}

/*
 * Create the given path, if it does not exist
 */
function mkdirp (fullPath) {
	shell.mkdir('-p', fullPath);
}

/**
 * Remove duplicate values from array
 */
function removeDuplicate(value, index, self) {
    return self.indexOf(value) === index;
}

self.deleteFile = deleteFile;
self.fileExists = fileExists;
self.readFile = readFile;
self.getObjectKey = getObjectKey;
self.decrypt = decrypt;
self.getObjectValues = getObjectValues;
self.writeFile = writeFile;
self.removeDuplicate = removeDuplicate;