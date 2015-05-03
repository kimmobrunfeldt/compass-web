var utils = require('./utils');

function main() {
}

function showLoader() {
    var loader = document.querySelector('.loader');
    utils.removeClass(loader, 'hidden');
}

function hideLoader() {
    var loader = document.querySelector('.loader');
    utils.addClass(loader, 'hidden');
}

main();
