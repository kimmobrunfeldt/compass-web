var ProgressBar = require('progressbar.js');
var GeoWatch = require('./geowatch');
var utils = require('./utils');
var config = require('./config');

function main() {
    var progressBar = new ProgressBar.Circle('#speedometer', {
        color: config.colors.blue,
        strokeWidth: 6,
        trailColor: '#888',
        trailWidth: 0.5,
        duration: 400,
        step: function(state, bar) {
            var speed = bar.value() * config.maxSpeed.value;
            bar.setText(speed.toFixed(0) + ' ' + config.displayUnit);
        }
    });
    progressBar.setText('-');

    showLoader();
    var geoWatch = new GeoWatch({
        onGeoData: function(geoData) {
            if (geoData.coords.speed !== null) {
                hideLoader();
            }

            var speed = {value: geoData.coords.speed, unit: 'm/s'};
            updateSpeed(progressBar, speed);
        }
    });
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
