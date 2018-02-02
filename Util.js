exports.secondsToString = function (seconds) {
    var numberOfDays;
    var numberOfHours;
    var numberOfMinutes;
    var numberOfSeconds;

    numberOfDays = seconds / 86400;
    numberOfHours = (seconds % 86400 ) / 3600 ;
    numberOfMinutes = ((seconds % 86400 ) % 3600 ) / 60;
    numberOfSeconds = ((seconds % 86400 ) % 3600 ) % 60;

    numberOfDays = Math.floor(numberOfDays);
    numberOfHours = Math.floor(numberOfHours);
    numberOfMinutes = Math.floor(numberOfMinutes);
    numberOfSeconds = Math.floor(numberOfSeconds);

    var string;

    string = numberOfDays + ":d " + numberOfHours + ":h " + numberOfMinutes + ":m " + numberOfSeconds + ":s";

    return string;
};

