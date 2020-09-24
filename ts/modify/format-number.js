"use strict";
exports.__esModule = true;
exports.formatNumber = void 0;
function trimExtraChar(value, char, regExp) {
    var index = value.indexOf(char);
    if (index === -1) {
        return value;
    }
    if (char === '-' && index !== 0) {
        return value.slice(0, index);
    }
    return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}
function formatNumber(value, args) {
    if (args === void 0) { args = {}; }
    value = value.replace(/^\./g, ''); //必须保证第一个为数字而不是
    if (args['noDot']) {
        value = value.split('.')[0];
    }
    else {
        value = trimExtraChar(value, '.', /\./g);
    }
    if (args['noMinus']) {
        value = value.replace(/-/, '');
    }
    else {
        value = trimExtraChar(value, '-', /-/g);
    }
    var regExp = args['noDot'] ? /[^-0-9]/g : /[^-0-9.]/g;
    return value.replace(regExp, '');
}
exports.formatNumber = formatNumber;
