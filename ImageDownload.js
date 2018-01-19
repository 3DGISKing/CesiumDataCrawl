var DownLoader = require('./DownLoader');

var BingMapsImageDownloaderUtil = require('./BingMapsImageDownloaderUtil');

var bingMapsImageUtil = new BingMapsImageDownloaderUtil({});
var rootPath = "H:/CesiumData/Image/BingMaps";

/**
 *  note Web Mercartor Latitude Range
 */
var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, 6, 7, -180, -80, 360, 160);

DownLoader.recursivelyDownload(downloadInfoList);
