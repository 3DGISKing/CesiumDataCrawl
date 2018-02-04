var worldLeft = -180;
var worldRight = 180;
var worldWidth = worldRight - worldLeft;

var worldBottom = -80; //  note Web Mercartor Latitude Range
var worldTop = 80; //  note Web Mercartor Latitude Range
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
