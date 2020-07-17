var _ = window._;

var cs = (function () {

    var ControlsStore = function () {

        var self = this;

         
        self.ActionButton = require('./../Controls/ActionButton.js');
        self.ColorPicker = require('./../Controls/ColorPicker.js');
        self.DragAndDropImage = require('./../Controls/DragAndDropImage');
        self.Image = require('./../Controls/Image');
        self.Dropdown = require('./../Controls/Dropdown');
        self.NumericInput = require('./../Controls/NumericInput.js');
        self.Slider = require('./../Controls/Slider.js');
        self.TextInput = require('./../Controls/TextInput');
        self.YesNo = require('./../Controls/YesNo.js');


    }


    return new ControlsStore();

}).call({});


module.exports = cs;