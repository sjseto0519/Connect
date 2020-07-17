var ColorPicker = function (config, path) {

    var self = this;

    self.red = config.red;
    self.green = config.green;
    self.blue = config.blue;

    var colorPicker = $('<div>', { 'class': 'input-group colorPicker', 'data-color': 'rgb(' + self.red + ', ' + self.green + ', ' + self.blue + ')' });

    var textInput = $('<input>', { 'type': 'text', 'class': 'form-control input-lg' });

    CT.utils.dataBind(textInput, "value:$data", path);

    colorPicker.append(textInput);

    var spanOuter = $('<span>', { 'class': 'input-group-append' });

    var spanInner = $('<span>', { 'class': 'input-group-text colorpicker-input-addon' });

    var icon = $('<i>');

    spanInner.append(icon);

    spanOuter.append(spanInner);

    colorPicker.append(spanOuter);

    return colorPicker;


}

module.exports = ColorPicker;