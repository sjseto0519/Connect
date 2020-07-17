var DataBind = function ($el, bindingString, arr) {

    if (!arr) {
        arr = [];
    }
    if (arr.length > 0) {
        var path = arr.map(function (v, i) { return '.' + v });
        bindingString = bindingString.replace("$data", "$data" + path.join(''));
    }
    $el.attr("data-bind", bindingString);    

}

module.exports = DataBind;