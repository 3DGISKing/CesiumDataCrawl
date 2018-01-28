var fs = require('fs');
var path = require('path');
//noinspection NpmUsedModulesInstalled
var request = require('request');

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

exports.recursivelyDownload = function(downloadInfoList, totalCount){
    if (downloadInfoList.length <= 0) {
        if(failedDownloadInfoList.length == 0) {
            console.log("all download completed!");
        }
        else {
            console.log("Failed count = " + failedDownloadInfoList.length);
            console.log("retrying...\n");

            downloadInfoList = failedDownloadInfoList;
            failedDownloadInfoList = [];

            exports.recursivelyDownload(downloadInfoList, totalCount);
        }

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
        .on('response', function () {
           // debugger
        })
        .on('error', function(err) {
            console.log("error occurs during downloading " + downloadInfo.url + " error code = " + err.code);

            if (fs.existsSync(filename)) {
                 fs.unlinkSync(filename);
            }

            // close file system.
            for (var i = 0; i < this.dests.length; i++ ) {
                this.dests[i].close();
            }

            failedDownloadInfoList.push(downloadInfo);

            exports.recursivelyDownload(downloadInfoList, totalCount);
        })
        .pipe(fs.createWriteStream(filename))
        .on('close', function () {
         //   debugger
            console.log((totalCount - downloadInfoList.length) + "/" + totalCount +  " download completed from " + options.url + " to " + filename);
            exports.recursivelyDownload(downloadInfoList, totalCount);
        })

};