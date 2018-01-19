var DownLoader = require('./DownLoader');

var sTKTerrainDownloaderUtil = require('./STKTerrainDownloaderUtil');

var rootPath = "H:/CesiumData/Terrain/no_watermask_no_vertexnormal";

var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, 0, 9, -180, -90, 360, 180);

DownLoader.recursivelyDownload(downloadInfoList);

