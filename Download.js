var DownLoader = require('./DownLoader');

var BingMapsImageDownloaderUtil = require('./BingMapsImageDownloaderUtil');

var bingMapsImageUtil = new BingMapsImageDownloaderUtil({});

var rootPath = "H:/CesiumData/Image/BingMaps";

/**
 *  note Web Mercartor Latitude Range
 */
/*var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, 6, 7, -180, -80, 360, 160);
DownLoader.recursivelyDownload(downloadInfoList); */

var sTKTerrainDownloaderUtil = require('./STKTerrainDownloaderUtil');

rootPath = "H:/CesiumData/Terrain/no_watermask_no_vertexnormal";
var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, 0, 9, -180, -90, 360, 180);
DownLoader.recursivelyDownload(downloadInfoList);

