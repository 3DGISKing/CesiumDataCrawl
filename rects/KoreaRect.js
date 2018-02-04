var koreaLeft = 124;
var koreaRight = 131;
var koreaWidth = koreaRight- koreaLeft;

var koreaBottom = 34;
var koreaTop = 44;
var koreaHeight = koreaTop - koreaBottom;

exports.RequestRect = function(){
    return {
        name: "Korean",
        left:   koreaLeft,
        bottom: koreaBottom,
        width:  koreaWidth,
        height: koreaHeight
    };
};

