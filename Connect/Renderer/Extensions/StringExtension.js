CT._str = function (str) {
    var returnObj = {
        'capitalizeFirstLetter': function () {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };
    return returnObj;
}
