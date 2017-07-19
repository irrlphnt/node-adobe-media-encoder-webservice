
//var process = require('process');
var path = require('path');
var config = require('./test-config');
var AdobeMediaEncoder = require('../dist').AdobeMediaEncoder;
var AMEPresetsReader = require('../dist').AMEPresetsReader;
var logging = require('logging-interfaces');
var logFactory = new logging.ContextPrefixedLoggerFactory(new logging.ConsoleLogger());
var q = require('q');


//==========================================
var ame;


//start the test 
setupAME()
.then(findPreset)
.then(submitTestJob)

//=================================

function setupAME() {
    ame = new AdobeMediaEncoder({
        enableNotificationsServer: false,
        notificationsPort: 8018,
        hostname: config.AME_SERVER_IP_ADDRESS,
        port: config.AME_SERVER_PORT,
        loggerFactory: logFactory
    });

    console.info("Starting AME gateway..")
    return ame.start();
}
function findPreset (a) {

    const d = q.defer();

    var presetName = config.AME_PRESET;
    var presetCache = path.resolve(config.AME_LOCAL_DIR, "PresetCache.xml");
    console.info ('searching for preset: ' + presetName + " in: " + presetCache);

    AMEPresetsReader.loadCache(presetCache)
    .then(
        (presets) => {
            result = presets.list.filter(p => { return p.displayName === presetName});
            if (result.length > 0) 
                d.resolve(result[0]);
            else 
                d.reject('preset not found: ' + presetName);
        },
        (err) => d.reject("ERROR!", err)
    );
    return d.promise;
}

function submitTestJob(preset) {

        if (!preset) return;

        console.info("start enqueueJob", preset);

        var job1 = ame.enqueueJob(
        {
            sourceFilePath: config.TEST_FILE_DIR + "\\test.mp4",
            destinationPath: config.TEST_FILE_DIR + "\\test.mxf",
            sourcePresetPath: preset.path,
            overwriteDestinationIfPresent: true
        }, 'job1');

        job1.on('progress', () =>
        {
            console.log(`Progress: ${job1.progress} (${job1.statusText})`);
        });

        job1.on('ended', () =>
        {
            console.log(`Ended: ${job1.status}`, job1.lastStatusResponse);
        })
}
