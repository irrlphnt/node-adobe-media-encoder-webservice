var ip = require('ip');
var path = require("path");
var os = require("os");
var fs = require("fs");
/**
 * see the README.md for more info on installation and setup
 */

/**
 * This should match the HTTP service ip from ame_webservice_console
 * use ip.address() to automatically set as your ipaddress
 * @type {string}
 */
const AME_SERVER_IP_ADDRESS = ip.address(); 

/**
 * This should match the HTTP service port from ame_webservice_console
 * @type {int}
 */
const AME_SERVER_PORT = 8080;

/**
 * Version should match the version of the AME on the system to give you the correct location of your media encoder PresetCache.xml
 * {HOMEDIR}\Documents\Adobe\Adobe Media Encoder\{AME_VERSION}
 * @type {string}
 */
const AME_VERSION_NUMBER = "11.0"; 

/**
 * Version should match the version of the AME on the system to give you the correct location of your Program Files
 * C:\Program Files\Adobe\Adobe Media Encoder CC 2017
 * @type {string}
 */
const AME_VERSION_NAME = "Adobe Media Encoder CC 2017"; 

/**
 * The name of the preset you want to use for your test render
 * @type {String}
 */
const AME_PRESET = 'DNX HQX 1080p 25';

//=========================================================================
//

const TEST_FILE_DIR = path.resolve(__dirname, 'files');

/**
 * You can manually override this here if needs be
 */
const AME_LOCAL_DIR = path.resolve (os.homedir(), "Documents", "Adobe", "Adobe Media Encoder", AME_VERSION_NUMBER);

/**
 * You can manually override this here if needs be
 */
const AME_PROGRAM_DIR = 
(os.platform() === 'win32') 
? path.resolve ("/", "Program Files", "Adobe", AME_VERSION_NAME)
: path.resolve ("Applications", AME_VERSION_NAME) //need to check this on MAC
;


//=======================================================================
// CHECK PATHS EXIST - Sanity Check
//=======================================================================
console.log('AME_LOCAL_DIR', AME_LOCAL_DIR);
console.log('AME_PROGRAM_DIR', AME_PROGRAM_DIR);

fs.access(AME_LOCAL_DIR, fs.constants.R_OK, (err) => {
  if (err) throw "AME_LOCAL_DIR not found (" + AME_LOCAL_DIR + "). Please check your test-config.js";
  console.log("AME_LOCAL_DIR", err);
});
fs.access(AME_PROGRAM_DIR, fs.constants.R_OK, (err) => {
  if (err) throw "AME_PROGRAM_DIR not found (" + AME_PROGRAM_DIR + "). Please check your test-config.js";
});

//=======================================================================
// EXPORTS
//=======================================================================

module.exports = {
    AME_SERVER_IP_ADDRESS: AME_SERVER_IP_ADDRESS,
    AME_SERVER_PORT: AME_SERVER_PORT,
    TEST_FILE_DIR: TEST_FILE_DIR,
    AME_LOCAL_DIR: AME_LOCAL_DIR,
    AME_PROGRAM_DIR: AME_PROGRAM_DIR,
    AME_PRESET: AME_PRESET
};


