/*
* Entry point of the program 
*/
const self = module.exports,
    utils = require('./utils'),
    seed = require('./seed-data');

    
/**
 * Reads the arguments
 */
const args = process.argv.slice(2);
if (args.length !== 1) throw new Error('Please provide the absolute file path!!!');

/**
 * Start with a clean slate, delete storage.json
 */
seed.cleanUp();

/**
 * Validating the secret message by reading the input file.
 */
seed.validateSecretMessage(args[0]);