
'use strict';

(function () {
    var express = require('express');

    var app = express();

    var yargs = require('yargs').options({
        'port' : {
            'default' : 81,
            'description' : 'Port to listen on.'
        },
        'public' : {
            'type' : 'boolean',
            'description' : 'Run a public server that listens on all interfaces.'
        },
        'upstream-proxy' : {
            'description' : 'A standard proxy server that will be used to retrieve data.  Specify a URL including port, e.g. "http://proxy:8000".'
        },
        'bypass-upstream-proxy-hosts' : {
            'description' : 'A comma separated list of hosts that will bypass the specified upstream_proxy, e.g. "lanhost1,lanhost2"'
        },
        'help' : {
            'alias' : 'h',
            'type' : 'boolean',
            'description' : 'Show this help.'
        }
    });

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    var dataPath = "H:\CesiumData";

    app.use(express.static(dataPath));


    var argv = yargs.argv;

    var server = app.listen(argv.port, argv.public ? undefined : 'localhost', function() {
        if (argv.public) {
            console.log('Server running publicly.  Connect to http://localhost:%d/', server.address().port);
        } else {
            console.log('Server running locally.  Connect to http://localhost:%d/', server.address().port);
        }
    });

    server.on('error', function (e) {
        if (e.code === 'EADDRINUSE') {
            console.log('Error: Port %d is already in use, select a different port.', argv.port);
            console.log('Example: node server.js --port %d', argv.port + 1);
        } else if (e.code === 'EACCES') {
            console.log('Error: This process does not have permission to listen on port %d.', argv.port);
            if (argv.port < 1024) {
                console.log('Try a port number higher than 1024.');
            }
        }
        console.log(e);
        process.exit(1);
    });

    server.on('close', function() {
        console.log('Cesium development server stopped.');
    });

    var isFirstSig = true;

    process.on('SIGINT', function() {
        if (isFirstSig) {
            console.log('Cesium development server shutting down.');
            server.close(function() {
                process.exit(0);
            });
            isFirstSig = false;
        } else {
            console.log('Cesium development server force kill.');
            process.exit(1);
        }
    });
})();