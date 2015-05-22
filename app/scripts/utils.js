// Utility functions

var PREFIXES = 'Webkit Moz O ms'.split(' ');

// How much x is 1 m/s?
var SPEED_FACTORS = {
    'km/h': 3.6,
    'mph': 2.23693629
};

function setStyle(element, style, value) {
    for (var i = 0; i < PREFIXES.length; ++i) {
        var prefix = PREFIXES[i];
        element.style[prefix + style] = value;
    }

    element.style[style] = value;
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function removeClass(element, className) {
    var classes = element.className.split(' ');

    var newClasses = [];
    for (var i = 0; i < classes.length; ++i) {
        if (classes[i] !== className) {
            newClasses.push(classes[i]);
        }
    }

    element.className = newClasses.join(' ');
}

function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className += ' ' + className;
    }
}

function hasClass(element, className) {
    var classes = element.className.split(' ');
    for (var i = 0; i < classes.length; ++i) {
        if (classes[i].trim() === className) {
            return true;
        }
    }

    return false;
}

function convertSpeed(speed, newUnit) {
    if (speed.unit === 'm/s') {
        return {
            value: SPEED_FACTORS[newUnit] * speed.value,
            unit: newUnit
        };
    } else {
        return {
            value: SPEED_FACTORS[newUnit] / speed.value,
            unit: newUnit
        }
    }
}

module.exports = {
    setStyle: setStyle,
    removeClass: removeClass,
    addClass: addClass,
    hasClass: hasClass,
    convertSpeed: convertSpeed
};
