var utils = require('./utils');

var config = {
    colors: {
        grey: '#4D5152',
        red: '#E45412',
        blue: '#0DDBCE',
        beige: '#E5E0BA',
        white: '#FFFFF6'
    },

    maxSpeed: {value: 160, unit: 'km/h'},
    displayUnit: 'km/h',

    // Addition in degrees to needle heading
    needleHeadingAddition: -45
};

module.exports = config;

