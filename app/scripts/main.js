var _ = require('lodash');
var utils = require('./utils');
var raf = require('raf');
var Compass = require('./compass');

// Number from 0 to 1
var NEEDLE_SLOWNESS = 0.09;

function main() {
    var directions = document.querySelector('#directions');
    var headingElem = document.querySelector('#heading');

    var targetRotation = 0;
    Compass.watch(function(heading) {
        if (heading != null) {
            // Invert the rotation since we are rotating the
            // direction panel
            targetRotation = 360 - heading;
        }
    });

    Compass.init(function(cb) {
        var compassSupported = cb !== false;

        if (!compassSupported) {
            headingElem.textContent = 'No compass'

            setInterval(function setTarget() {
                if (targetRotation > 0) {
                    targetRotation = -20;
                } else {
                    targetRotation = 20;
                }
            }, 1200)
        }

        // Separate animation to animation frame
        var rotation = 0;
        raf(function tick() {
            var rotationDiff = NEEDLE_SLOWNESS * shortestRotation(rotation, targetRotation);
            rotation += rotationDiff;

            utils.setStyle(directions, 'Transform', 'rotate(' + rotation + 'deg)');

            if (compassSupported) {
                var heading = 360 - targetRotation;
                if (heading > 359.5) heading = 0;
                headingElem.textContent = heading.toFixed(0) + '°';
            }
            raf(tick);
        });
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

function showLoader() {
    var loader = document.querySelector('#loader');
    utils.removeClass(loader, 'hidden');
}

function hideLoader() {
    var loader = document.querySelector('#loader');
    utils.addClass(loader, 'hidden');
}

main();
