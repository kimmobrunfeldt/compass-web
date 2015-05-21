var _ = require('lodash');
var ProgressBar = require('progressbar.js');
var GeoWatch = require('./geowatch');
var utils = require('./utils');
var raf = require('raf');
var config = require('./config');
var gyro = require('./gyro');

function main() {
    var needle = document.querySelector('#needle');

    // Keep rotation state to avoid needle jumping
    var lastRotation = 0;
    gyro.startTracking(function(o) {
        // o.x, o.y, o.z for accelerometer
        // o.alpha, o.beta, o.gamma for gyro
        var heading = o.alpha;
        if (heading != null) {
            var compassRotation = heading + config.needleHeadingAddition;
            var rotationDiff = shortestRotation(lastRotation, compassRotation);
            var newRotation = lastRotation + rotationDiff;

            utils.setStyle(needle, 'transform', 'rotate(' + newRotation  + 'deg)');
            lastRotation = newRotation;
        }
    });
}

function shortestRotation(fromDegrees, toDegrees) {
    var degrees = toDegrees - fromDegrees;
    var normalizedDegrees = degrees % 360;

    if (normalizedDegrees > 180) {
        return normalizedDegrees - 360;
    } else {
        return normalizedDegrees;
    }
}

function updateSpeed(progressBar, speed) {
    if (speed.value === null) {
        progressBar.setText('-');
        return;
    }

    var displaySpeed = utils.convertSpeed(speed, config.displayUnit);

    var speedInMaxSpeedUnit = utils.convertSpeed(speed, config.maxSpeed.unit);
    var value = speedInMaxSpeedUnit.value / config.maxSpeed.value;
    console.log(speed);
    progressBar.animate(value);
}

function showLoader() {
    var loader = document.querySelector('#loader');
    utils.removeClass(loader, 'hidden');
}

function hideLoader() {
    var loader = document.querySelector('#loader');
    utils.addClass(loader, 'hidden');
}

main();
