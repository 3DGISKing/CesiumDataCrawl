var worldLeft = -180;
var worldRight = 180;
var worldWidth = worldRight - worldLeft;

var worldBottom = -90;
var worldTop = 90;
var worldHeight = worldTop - worldBottom;

exports.RequestRect = function(){
    return {
        name: "world",
        left:   worldLeft,
        bottom: worldBottom,
        width:  worldWidth,
        height: worldHeight
    };
};



