var fs = require('fs');
var path = require('path');
//noinspection NpmUsedModulesInstalled
var request = require('request');
var util = require('./Util');

var failedDownloadInfoList = [];

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

exports.recursivelyDownload = function(downloadInfoList, totalCount, timeout){
    if (downloadInfoList.length <= 0) {
        if(failedDownloadInfoList.length == 0) {
            console.log("all download completed!");
        }
        else {
            console.log("Failed count = " + failedDownloadInfoList.length);
            console.log("retrying...\n");

            downloadInfoList = failedDownloadInfoList;
            failedDownloadInfoList = [];

            exports.recursivelyDownload(downloadInfoList, totalCount, timeout);
        }

        return;
    }

    var downloadInfo = downloadInfoList.shift();

    var options = {
        url: downloadInfo.url,
        headers: downloadInfo.headers,
        timeout: timeout
    };

    var filename = downloadInfo.filename;
    var folderPath = path.dirname(filename);

    if(!fs.existsSync(folderPath)) {
        mkDirPath(folderPath);
    }

    var currentCount = downloadInfoList.length;
    var remainingTimeString = util.secondsToString(timeout * currentCount / 1000);
    remainingTimeString = " max remaining time: " + remainingTimeString;

    request
        .get(options)
        .on('response', function () {
           // debugger
            if (this.response.statusCode == 404) {
                console.log((totalCount - currentCount) + "/" + totalCount  + " 404 " + downloadInfo.url + " File or directory not found");

                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                }

                // close file system.
                for (var i = 0; i < this.dests.length; i++ ) {
                    this.dests[i].close();
                }
            }
        })
        .on('error', function(err) {
            console.log((totalCount - currentCount) + "/" + totalCount + " error occurs during downloading " + downloadInfo.url + " error code = " + err.code);

            if (fs.existsSync(filename)) {
                 fs.unlinkSync(filename);
            }

            // close file system.
            for (var i = 0; i < this.dests.length; i++ ) {
                this.dests[i].close();
            }

            failedDownloadInfoList.push(downloadInfo);
        })
        .pipe(fs.createWriteStream(filename))
        .on('close', function () {
           // debugger
            if(this.bytesWritten > 0) {
                console.log((totalCount - currentCount) + "/" + totalCount +  " download completed from " + options.url + " to " + filename + remainingTimeString);
            }

            exports.recursivelyDownload(downloadInfoList, totalCount, timeout);
        })
};