# node-adobe-media-encoder-webservice

Adobe Media Encoder "web service" (REST) client

Note: this uses a "private API" which was just discovered by luck inspecting another package, and most results are based on reverse-engineering and poking around.
### Install and run AAMEWebService
only tried on Windows so far. 

In the Adobe Media Encoder folder roughly `C:\Program Files\Adobe\Adobe Media Encoder CC 2017` run cmd.exe as an Administrator and install the service with `AMEWebService.exe -install`

The service config can be changed by editing the file `ame_webservice_config.ini`

Finally to run the service run the exe `ame_webservice_console.exe`

The console window should now be saying 'Creating AMEServer Succeeded' and AME will be open. Take note of the service ip address and port for the next step - Config the test

### Config the test




## Known issues / to-do

### To-do

* Automatically resolve and load PresetTree.xml and PresetCache.xml files
	* resolve: roughly `%HOMEDRIVE%%HOMEPATH%\Documents\Adobe\Adobe Media Encoder\9.0\Presets`, and version numbers (e.g. `9.0`) can be read from the registry under `HKCU\Software\Adobe\Adobe Media Encoder`
	* PresetCache.xml is in ..  
* Automatically resolve preset paths by their name / preset tree path
* Start / stop the service or the console process if not running
* Make the retry delays and retry counts configurable somehow (submit & abort)
* Make some CONSTANTS for the enums?

### Known issues

* Suspect there is a failed retry counter decrease if AME web service is not running when submitting jobs?

## License

Not licensed for now (internal work-in-progress) - use at your own risk..
