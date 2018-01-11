var fs = require('fs');
const url = require('url');
var request = require('request');
var defined = require("./defined");
var DownLoader = require('./DownLoader');

var basePath = "https://beta.cesium.com/api/assets/1461?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYWJmM2MzNS02OWM5LTQ3OWItYjEyYS0xZmNlODM5ZDNkMTYiLCJpZCI6NDQsImFzc2V0cyI6WzE0NjFdLCJpYXQiOjE0OTkyNjQ3NDN9.vuR75SqPDKcggvUrG_vpx0Av02jdiAxnnB1fNf-9f7s";
console.log("basePath = " + basePath);

var baseUrl = url.parse(basePath);
baseUrl.pathname = baseUrl.pathname + "/" + "tileset.json";

var tilesetUrl = baseUrl.protocol + "//" + baseUrl.host +  baseUrl.pathname + baseUrl.search;
console.log("tilesetUrl = " + tilesetUrl);

var options = {
    url: tilesetUrl,
    gzip: true // note important
};

request(options, function(err, res, body) {
    // from direct network
    var tilesetJson = JSON.parse(body);

    // from local downloaded json file
    // var tilesetJson = require('./NewYork3DTileSet.json');

    var asset = tilesetJson.asset;

    if(!defined(asset)) {
        console.error("asset is no defined!");
        return;
    }

    if (asset.version !== '0.0' && asset.version !== '1.0') {
        console.error('The tileset must be 3D Tiles version 0.0 or 1.0.  See https://github.com/AnalyticalGraphicsInc/3d-tiles#spec-status');
    }

    // Append the tileset version to the basePath
    var hasVersionQuery = /[?&]v=/.test(tilesetUrl);

    if (!hasVersionQuery) {
        var versionQuery = '?v=' + asset.tilesetVersion;

        basePath = basePath + "&" + versionQuery;
        tilesetUrl = tilesetUrl + "&" + tilesetUrl;
    }

    var stack = [];

    stack.push({
        header : tilesetJson.root
    });

    var contentUrl = "";

    var path = "H:/CesiumData/NewYork";

    var infoList = [];

    while (stack.length > 0) {
        var tile = stack.pop();

        var children = tile.header.children;

        if (defined(children)) {
            var length = children.length;

            for (var i = 0; i < length; ++i) {
                var childHeader = children[i];

                var urlObject = url.parse(basePath);

                urlObject.pathname = urlObject.pathname + "/" + childHeader.content.url;

                contentUrl = urlObject.protocol + "//" + urlObject.host +  urlObject.pathname + urlObject.search;

                var filename = path + "/" + childHeader.content.url;

                infoList.push({
                    url: contentUrl,
                    filename: filename
                });

                stack.push({
                    header : childHeader
                });
            }
        }
    }

    DownLoader.recursivelyDownload(infoList);
});

