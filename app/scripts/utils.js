// Utility functions

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

module.exports = {
    removeClass: removeClass,
    addClass: addClass,
    hasClass: hasClass
};
