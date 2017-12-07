var fs = require('fs');
var path = require('path');
//noinspection NpmUsedModulesInstalled
var request = require('request');

function mkDirPath(dirPath)
{
    if(!fs.existsSync(dirPath))
    {
        try
        {
            fs.mkdirSync(dirPath);
        }
        catch(e)
        {
            mkDirPath(path.dirname(dirPath));
            mkDirPath(dirPath);
        }
    }
}

module.exports.recursivelyDownload = function(downloadInfoList){
    if (downloadInfoList.length <= 0) {
        console.log("all download completed!");
        return;
    }

    var downloadInfo = downloadInfoList.shift();

    var options = {
        url: downloadInfo.url,
        headers: downloadInfo.headers
    };

    var filename = downloadInfo.filename;
    var folderPath = path.dirname(filename);

    if(!fs.existsSync(folderPath)) {
        mkDirPath(folderPath);
    }

    request
        .get(options)
        .on('error', function(err) {
            console.log(err);
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);
            }
        })
        .pipe(fs.createWriteStream(filename))
        .on('close', function () {
            console.log("download completed from " + options.url + " to " + filename);
            exports.recursivelyDownload(downloadInfoList);
        });
};