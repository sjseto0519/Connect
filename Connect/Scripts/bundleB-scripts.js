(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
ko.observable.fn.silentUpdate = function (value) {
    this.notifySubscribers = function () { };
    this(value);
    this.notifySubscribers = function () {
        ko.subscribable.fn.notifySubscribers.apply(this, arguments);
    };
};
},{}],2:[function(require,module,exports){
var DataStore = require('./../../Renderer/Data/DataStore.js');

CT.dataStore = DataStore;

var ViewModelStore = require('./../../Renderer/Data/ViewModelStore.js');

CT.viewModelStore = ViewModelStore;

var ControlsStore = require('./../../Renderer/Data/ControlsStore.js');

CT.controlsStore = ControlsStore;

CT.utils = {};

var Cache = require('./../../Utils/cache.js');

CT.utils.cache = Cache.initialize();

var DataBind = require('./../../Utils/databind.js');

CT.utils.dataBind = DataBind;

//CT.controllers.View.initialize();

},{"./../../Renderer/Data/ControlsStore.js":12,"./../../Renderer/Data/DataStore.js":13,"./../../Renderer/Data/ViewModelStore.js":14,"./../../Utils/cache.js":21,"./../../Utils/databind.js":22}],3:[function(require,module,exports){
var ActionButton = function () {

    var self = this;





}

module.exports = ActionButton;
},{}],4:[function(require,module,exports){
var ColorPicker = function (config, path) {

    var self = this;

    self.red = config.red;
    self.green = config.green;
    self.blue = config.blue;

    /*
     <div id="cp3a" class="input-group" data-color="rgb(241, 138, 49)"
     title="Using data-color attribute in the colorpicker element">
  <input type="text" class="form-control input-lg"/>
  <span class="input-group-append">
    <span class="input-group-text colorpicker-input-addon"><i></i></span>
  </span>
</div>
     */

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
},{}],5:[function(require,module,exports){
var DragAndDropImage = function (config) {

    var self = this;

    self.style = config.style+' ;z-index:99999; position:relative; cursor:pointer';
    self.src = config.src;
    self.id = config.id;
    self.data = config.data;

    var img = $('<img>', { 'style':self.style, 'src':self.src, 'id':self.id });

    if (self.data) {
        for (var prop in self.data) {
            img.data(prop, self.data[prop]);
        }
    }

    img.draggable({ revert: true });

    return img;
}

module.exports = DragAndDropImage;
},{}],6:[function(require,module,exports){
var Dropdown = function () {

    var self = this;





}

module.exports = Dropdown;
},{}],7:[function(require,module,exports){
var Image = function (config) {

    var self = this;

    self.style = config.style+' ;z-index:99999; position:relative; cursor:pointer';
    self.src = config.src;
    self.id = config.id;
    self.data = config.data;

    var img = $('<img>', { 'style':self.style, 'src':self.src, 'id':self.id });

    if (self.data) {
        for (var prop in self.data) {
            img.data(prop, self.data[prop]);
        }
    }

    return img;
}

module.exports = Image;
},{}],8:[function(require,module,exports){
var NumericInput = function () {

    var self = this;





}

module.exports = NumericInput;
},{}],9:[function(require,module,exports){
var Slider = function (config, path) {

    var self = this;
    self.min = config.min;
    self.max = config.max;
    self.suffix = config.suffix || '';
    self.id = config.id;

    /*
     <div class="slidecontainer">
//   <input type="range" min="0" max="100" value="0" class="slider" id="myRange" 
oninput="$('#numberedSlider').html(''+this.value+'%'); 
var width = $(this).width()-57;$('#numberedSlider').css('left', ''+(parseInt(this.value * (width/100.0)+28))+'px')">
//   <div style="position: absolute; top: -2px; left: 28px; width: 30px; height: 24px; text-align: center; padding-top: 2px; 
pointer-events: none;" id="numberedSlider">0%</div>
//   </div>
     */

    var slidecontainer = $('<div>', { 'class': 'slidecontainer' });

    var input = $('<input>', {
        'type': 'range', 'min': self.min, 'max': self.max, 'class': 'slider', 'style':'opacity:0.0'
    });

    input.on({
        'input change': function (e) {
            var target = e.target;
            var self = this;
            var val = $(target).prop("value");
            $('#span-' + self.id).html('' + val + self.suffix);
            var width = $(target).width() - 57;
            $('#' + self.id).css('left', '' + (parseInt(100.0 * (val / (self.max * 1.0)))) + '%');
        }.bind({ 'id':self.id, 'max':self.max, 'suffix':self.suffix })
    });

    var odiv = $('<div>', { 'style':'position:absolute; top:0px; width:100%; height:20px; padding-left:15px; padding-right:78px; pointer-events:none; z-index:100; margin-top:5px' });

    var div = $('<div>', {
        'style': 'position: relative; top: -2px; left: 56%; width: 50px; height: 24px; color:black; text-align: center; background-color: rgba(255, 255, 255, 0.8); border: 1px dotted black; border-radius: 10px; pointer-events: none; padding-top: 0px;',
        'id': self.id
    });

    var ispan = $('<span>', { 'id':'span-'+self.id, 'style':'position:relative; top:-2px;' });

    div.append(ispan);

    odiv.append(div);

    var bdiv = $('<div>', { 'style': 'position:absolute; top:10px; left:15px; opacity:1; pointer-events:none; width:90%; height:10px; background: #fff; border:1px black dotted; border-radius:10px' });

    CT.utils.dataBind(input, "value:$data", path);

    slidecontainer.append(input);

    slidecontainer.append(odiv);

    slidecontainer.append(bdiv);

    return slidecontainer;

}

module.exports = Slider;
},{}],10:[function(require,module,exports){
var TextInput = function () {

    var self = this;





}

module.exports = TextInput;
},{}],11:[function(require,module,exports){
var YesNo = function () {

    var self = this;





}

module.exports = YesNo;
},{}],12:[function(require,module,exports){
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
},{"./../Controls/ActionButton.js":3,"./../Controls/ColorPicker.js":4,"./../Controls/DragAndDropImage":5,"./../Controls/Dropdown":6,"./../Controls/Image":7,"./../Controls/NumericInput.js":8,"./../Controls/Slider.js":9,"./../Controls/TextInput":10,"./../Controls/YesNo.js":11}],13:[function(require,module,exports){
var _ = window._;


var ds = (function () {

    var DataStore = function () {

        var self = this;

        //self.connectorColors = [
        //    'blue'
        //];

        //self.rodColors = [

        //    'blue'
        //];

        self.connectorColors = [
            'yellow',
            'blue',
            'green',
            'purple',
            'orange',
            'gray',
            'white',
            'red'
        ];

        self.rodColors = [

            'yellow',
            'blue',
            'green',
            'black',
            'gray',
            'white',
            'red'
        ];

        self.importSceneData = ko.observable(
            {
                'ImportData': ko.observable("")
            }
        );

        self.saveSceneData = ko.observable(
            {
                'SavedData': ko.observable({})
            }
        );

        self.saveSceneData()["ExportData"] = ko.computed(
            function () {
                var self = this.saveSceneData();
                var d = self.SavedData();
                var str = JSON.stringify(d, undefined, 4);
                return str;
            },
            self
        );

        self.addToSceneData = ko.observable({
            'loadedConnectors': {
                'yellow': ko.observable(false),
                'blue': ko.observable(false),
                'green': ko.observable(false),
                'purple': ko.observable(false),
                'orange': ko.observable(false),
                'gray': ko.observable(false),
                'white': ko.observable(false),
                'red': ko.observable(false)
            },
            'loadedRods': {
                'yellow': ko.observable(false),
                'blue': ko.observable(false),
                'green': ko.observable(false),
                'black': ko.observable(false),
                'gray': ko.observable(false),
                'white': ko.observable(false),
                'red': ko.observable(false)
            },
            'showConnectors': {
                'yellow': ko.observable(true),
                'blue': ko.observable(true),
                'green': ko.observable(true),
                'purple': ko.observable(true),
                'orange': ko.observable(true),
                'gray': ko.observable(true),
                'white': ko.observable(true),
                'red': ko.observable(true)
            },
            'showRods': {
                'yellow': ko.observable(true),
                'blue': ko.observable(true),
                'green': ko.observable(true),
                'black': ko.observable(true),
                'gray': ko.observable(true),
                'white': ko.observable(true),
                'red': ko.observable(true)
            }
        });

        self.sceneLiveActionData = ko.observable({
            'MousePositionX': ko.observable(),
            'MousePositionY': ko.observable(),
            'MousePositionZ': ko.observable(),
            'IsOverScene': ko.observable(false),
            'MouseOverComponentColor': ko.observable(),
            'MouseOverComponentType': ko.observable(),
            'MouseOverComponentId': ko.observable(),
            'MouseOverComponentData': ko.observable(),
            'MouseOverComponentGroupId': ko.observable(),
            'MouseOverComponentSubmeshId': ko.observable(),
            'MouseOverComponentConnector': ko.observable(),
            'IsMouseOverComponent': ko.observable(),
            'MouseOverActionCommand': ko.observable(),
            'MouseOverActionIcon': ko.observable("fa-bolt"),
            'SelectedComponentColor': ko.observable(),
            'SelectedComponentType': ko.observable(),
            'SelectedComponentId': ko.observable(),
            'SelectedComponentData': ko.observable(),
            'SelectedComponentGroupId': ko.observable(),
            'SelectedComponentConnector': ko.observable(),
            'IsComponentSelected': ko.observable(),
            'SelectedActionCommand': ko.observable(),
            'SelectedActionIcon': ko.observable()
        });
        self.sceneLiveActionData()['MousePositionDisplay'] = ko.computed(
            function () {
                var self = this.sceneLiveActionData();
                if (self.IsOverScene()) {
                    if (self.MousePositionX() !== undefined) {
                        return "('x': " + ('' + self.MousePositionX()).substr(0, 5) + ", 'y': " + ('' + self.MousePositionY()).substr(0, 5) + ", 'z': " + ('' + self.MousePositionZ()).substr(0, 5) + ")";
                    }
                }
                return null;
            },
            self
        );

        self.sceneLiveActionData()['MouseOverComponentDisplay'] = ko.computed(
            function () {
                var self = this.sceneLiveActionData();
                if (self.IsOverScene()) {
                    if (self.IsMouseOverComponent()) {
                        if (self.MouseOverComponentColor() !== undefined) {
                            var component = "Mouse Over Component: " + self.MouseOverComponentColor() + " " + self.MouseOverComponentType();
                            if (self.MouseOverComponentConnector() !== undefined) {
                                component += " (" + self.MouseOverComponentConnector() + ")";
                            }
                            return component;
                        }
                    }
                }
                
                return "";
            },
            self
        );
        self.sceneLiveActionData()['MouseOverComponentImage'] = ko.computed(
            function () {
                var self = this.sceneLiveActionData();
                if (self.IsOverScene()) {
                    if (self.IsMouseOverComponent()) {
                        if (self.MouseOverComponentColor() !== undefined) {
                            if (self.MouseOverComponentType() === 'connector') {
                                return "./Content/Connectors/" + self.MouseOverComponentType() + "-" + self.MouseOverComponentColor() + "_clipped_rev_1.png";
                            }
                            else {
                                return "./Content/Rods/" + self.MouseOverComponentType() + "-" + self.MouseOverComponentColor() + "_clipped_rev_1.png";
                            }
                        }
                    }
                }

                return null;
            },
            self
        );
        self.sceneLiveActionData()['SelectedComponentImage'] = ko.computed(
            function () {
                var self = this.sceneLiveActionData();
             
                if (self.IsComponentSelected()) {
                    if (self.SelectedComponentColor() !== undefined) {
                        if (self.SelectedComponentType() === 'connector') {
                            return "./Content/Connectors/" + self.SelectedComponentType() + "-" + self.SelectedComponentColor() + "_clipped_rev_1.png";
                        }
                        else {
                            return "./Content/Rods/" + self.SelectedComponentType() + "-" + self.SelectedComponentColor() + "_clipped_rev_1.png";
                        }
                    }
                }
                

                return null;
            },
            self
        );
        self.sceneLiveActionData()['SelectedComponentObject'] = ko.computed(
            function () {
                var self = this.sceneLiveActionData();

                if (self.IsComponentSelected()) {
                    if (self.SelectedComponentColor() !== undefined) {
                        if (self.SelectedComponentType() === 'connector') {
                            var index = _.findIndex(CT.dataStore.babylonData().connectors(), function (e) { return e.data.guid === self.SelectedComponentId() });
                            if (index !== -1) {
                                return CT.dataStore.babylonData().connectors()[index].mesh;
                            }
                        }
                        else {
                            var index = _.findIndex(CT.dataStore.babylonData().rods(), function (e) { return e.data.guid === self.SelectedComponentId() });
                            if (index !== -1) {
                                return CT.dataStore.babylonData().rods()[index].mesh;
                            }
                        }
                    }
                }


                return null;
            },
            self
        );
        self.sceneLiveActionData()['SelectedComponentDisplay'] = ko.computed(
            function () {
                var self = this.sceneLiveActionData();
               
                    if (self.IsComponentSelected()) {
                        if (self.SelectedComponentColor() !== undefined) {
                            var component = "Selected Component: " + self.SelectedComponentColor() + " " + self.SelectedComponentType();
                            if (self.SelectedComponentConnector() !== undefined) {
                                component += " (" + self.SelectedComponentConnector() + ")";
                            }
                            return component;
                        }
                    }
                

                return "";
            },
            self
        );
        self.sceneLiveActionData()['SelectedComponentColorObject'] = ko.computed(
            function () {
                var self = this.sceneLiveActionData();

                if (self.SelectedComponentColor()) {
                    var rgb = CT.dataStore.colorData[self.SelectedComponentColor()];
                    return new BABYLON.Color3(rgb.r, rgb.g, rgb.b);
                }
                return null;
            },
            self
        );
        self.sceneLiveActionData()['MouseOverActionDisplay'] = ko.computed(
            function () {
            
                var self = this.sceneLiveActionData();
                //if (self.MouseOverActionCommand() !== undefined) {
                //    return "Action: " + self.MouseOverActionCommand();
                //}
                if (self.IsOverScene()) {
                    if (self.IsMouseOverComponent()) {
                        if (self.MouseOverComponentColor() !== undefined) {
                            if (self.IsComponentSelected()) {
                                var color1 = self.MouseOverComponentColor();
                                var type1 = self.MouseOverComponentType();
                                var id1 = self.MouseOverComponentId();
                                var color2 = self.SelectedComponentColor();
                                var type2 = self.SelectedComponentType();
                                var id2 = self.SelectedComponentId();
                                if (id1 !== id2) {
                                    if (type1 !== type2) {
                                        return "Press enter to connect the " + color1 + " " + type1 + " to the " + color2 + " " + type2;
                                    }
                                }
                            }
                        }
                    }
                }
                
                return null;
            },
            self
        );
        self.sceneLiveActionData()['SelectedActionDisplay'] = ko.computed(
            function () {

                var self = this.sceneLiveActionData();
                if (self.SelectedActionCommand() !== undefined) {
                    return "Action: " + self.SelectedActionCommand();
                }

                return "";
            },
            self
        );

        self.propertiesData = ko.observable({
            'CurrentSelection': ko.observable("Scene")
        });

        self.sceneData = ko.observable({
            'BackgroundColor': ko.observable("rgb(38, 78, 105)"),
            'Zoom': ko.observable("72"),
            'CameraAngleX': ko.observable("0"),
            'CameraAngleY': ko.observable("0"),
            'CameraAngleZ': ko.observable("0"),
            'LightingN': ko.observable("170"),
            'LightingS': ko.observable("60"),
            'LightingW': ko.observable("150"),
            'LightingE': ko.observable("80"),
            'LightingBack': ko.observable("0"),
            'LightingFront': ko.observable("0")
        });

        self.initializeData = function(type)
        {
            var self = this;
            var obs = self[type]();
            for (var prop in obs) {
                obs[prop].valueHasMutated();
            }
        }

        function addSubscriptions(dataname, data) {
            function subhandler(newvalue) {
                CT.eventing.publish(_events[this.dataname + 'ChangedEvent'], { 'path': this.name, 'value': newvalue });
            }
            for (var prop in data) {
                data[prop].subscribe(subhandler.bind({ 'name': prop, 'dataname': dataname }));
            }
        }

        addSubscriptions("sceneData", self.sceneData());

        self.babylonData = ko.observable({
            'connectors': ko.observableArray([]),
            'rods': ko.observableArray([]),
            'groups': ko.observableArray([]),
            'arrows': ko.observableArray([])
        });

        self.hasComponents = ko.computed(
            function () {
                var self = this;
                if (self.babylonData().connectors().length === 0
                    &&
                    self.babylonData().rods().length === 0
                    &&
                    self.babylonData().groups().length === 0) {
                    return false;
                }
                return true;
            },
            self
        );

        self.mathData = {
            'toRadians': function (degrees) {
                return degrees * (Math.PI / 180.0);
            }
        }

        self.colorData = {
            'green': { 'r': 0.1, 'g': 0.8, 'b': 0.3 },
            'yellow': { 'r': 0.98, 'g': 0.98, 'b': 0.02 },
            'red': { 'r': 0.98, 'g': 0.02, 'b': 0.02 },
            'white': { 'r': 0.975, 'g': 0.975, 'b': 0.975 },
            'orange': { 'r': 0.98, 'g': 0.415, 'b': 0.02 },
            'blue': { 'r': 0.15, 'g': 0.15, 'b': 1.0 },
            'purple': { 'r': 0.5, 'g': 0.05, 'b': 0.5 },
            'gray': { 'r': 0.7, 'g': 0.7, 'b': 0.7 },
            'black': { 'r': 0.1, 'g': 0.1, 'b': 0.1 }
        };

        // needed to reduce the code for creating the connection points by reusing one block of code
        self.connectionPointData = {
            'connector': {
                'red': [2, 3, 5],
                'green': [1, 3, 4, 5],
                'blue': [2, 3, 4, 5, 6, 7, 8],
                'purple': [1, 3, 4, 5],
                'gray': [3],
                'orange': [3, 8],
                'white': [1, 2, 3, 4, 5, 6, 7, 8],
                'yellow': [1, 2, 3, 4, 5]
            }
        };

        // maps from the connection point data to the number of degrees to rotate around the 3 axes (x, y, and z)
        self.connectionPointRotationData = {
            '1': [0, 90, 0],
            '2': [0, -90, 0],
            '3': [0, 0, 0],
            '4': [0, 45, 0],
            '5': [0, -45, 0],
            '6': [0, 135, 0],
            '7': [0, -135, 0],
            '8': [0, -180, 0]
        };

        self.componentConnectorData = {
            'yellow': {
                'positions': [],
                'indices':[]
            },
            'white': {
                'positions': [],
                'indices': []
            },
            'orange': {
                'positions': [],
                'indices': []
            },
            'gray': {
                'positions': [],
                'indices': []
            },
            'red': {
                'positions': [],
                'indices': []
            },
            'green': {
                'positions': [],
                'indices': []
            },
            'blue': {
                'positions': [],
                'indices': []
            },
            'purple': {
                'positions': [],
                'indices': []
            }
        };

        self.componentRodData = {
            'yellow': {
                'positions': [],
                'indices': []
            },
            'white': {
                'positions': [],
                'indices': []
            },
            'gray': {
                'positions': [],
                'indices': []
            },
            'red': {
                'positions': [],
                'indices': []
            },
            'green': {
                'positions': [],
                'indices': []
            },
            'blue': {
                'positions': [],
                'indices': []
            },
            'black': {
                'positions': [],
                'indices': []
            }
        };


        // needed for the position of the connection points
        self.rodData = {
            "gray": {
                "length": 20
            },
            "black": {
                "length": 20
            },
            "red": {
                "length": 13.7
            },
            "yellow": {
                "length": 9.19
            },
            "blue": {
                "length": 6.0157
            },
            "white": {
                "length": 3.5092
            },
            "green": {
                "length": 2.005
            }
        };

        //var connectorworker = new Worker('Renderer/Data/DataWorker.js');
        //var rodworker = new Worker('Renderer/Data/DataWorker.js');
        //self.dataWorkerCount = 2;
        //connectorworker.onmessage = function (e) {
        //    this["component" + e.data.type + "Data"] = e.data.data;
        //    self.dataWorkerCount--;
        //    if (self.dataWorkerCount === 0) {
        //        CT.controllers.Scene.hideLoadingScreen();
        //    }
        //}.bind(self);
        //connectorworker.onerror = function (e) {
        //    alert(e);
        //}
        //rodworker.onmessage = function (e) {
        //    this["component" + e.data.type + "Data"] = e.data.data;
        //    self.dataWorkerCount--;
        //    if (self.dataWorkerCount === 0) {
        //        CT.controllers.Scene.hideLoadingScreen();
        //    }
        //}.bind(self);
        //rodworker.onerror = function (e) {
        //    alert(e);
        //}
        //connectorworker.postMessage('Connector');
        //rodworker.postMessage('Rod');
    }
    //body = body.replace(/^\uFEFF/, '');

    return new DataStore();

}).call({});


module.exports = ds;


},{}],14:[function(require,module,exports){
var _ = window._;

var vms = (function () {

    var ViewModelStore = function () {

        var self = this;

        self.Menu = {
            'View': require('./../Partials/MenuView.js'),
            'ViewModel': require('./../Partials/MenuViewModel.js'),
        };
        self.SceneControls = {
            'View': require('./../Partials/SceneControlsView.js'),
            'ViewModel': require('./../Partials/SceneControlsViewModel.js'),
        };
        self.Scene = {
            'View': require('./../Partials/SceneView.js'),
            'ViewModel': require('./../Partials/SceneViewModel.js'),
        };


    }


    return new ViewModelStore();

}).call({});


module.exports = vms;
},{"./../Partials/MenuView.js":15,"./../Partials/MenuViewModel.js":16,"./../Partials/SceneControlsView.js":17,"./../Partials/SceneControlsViewModel.js":18,"./../Partials/SceneView.js":19,"./../Partials/SceneViewModel.js":20}],15:[function(require,module,exports){
var MenuView = function () {

    var self = this;





}

module.exports = MenuView;
},{}],16:[function(require,module,exports){
var MenuViewModel = function () {

    var self = this;



    return self;

}

module.exports = MenuViewModel;
},{}],17:[function(require,module,exports){
var SceneControlsView = function () {

    var self = this;

    function buildControls() {

        var rowOuter = $('<div>', { 'class': 'row', 'style': 'flex-grow:1; color:white' });

        var colOuter = $('<div>', { 'class': 'col-12' });

        var field = $('<fieldset>');

        var legend = $('<legend>');

        legend.html("Settings");

        function createBackgroundColorRow() {
            var row = $('<div>', { 'class': 'row' });

            var colLabel = $('<div>', { 'class': 'col-4' });

            var label = $('<label>');

            label.html("Background Color");

            colLabel.append(label);

            var colControl = $('<div>', { 'class': 'col-8' });

            var input = CT.controlsStore["ColorPicker"]({ 'red': 38, 'green': 78, 'blue': 105 }, ["BackgroundColor"]);

            colControl.append(input);

            row.append(colLabel);

            row.append(colControl);

            return row;
        }

        function createZoomRow() {
            var row = $('<div>', { 'class': 'row' });

            var colLabel = $('<div>', { 'class': 'col-4' });

            var label = $('<label>');

            label.html("Zoom");

            colLabel.append(label);

            var colControl = $('<div>', { 'class': 'col-8' });

            var input = CT.controlsStore["Slider"]({ 'min': 0, 'max': 100, 'suffix': '', 'id': 'SceneZoomSlider' }, ["Zoom"]);

            colControl.append(input);

            row.append(colLabel);

            row.append(colControl);

            return row;
        }

        field.append(legend);
        field.append(createBackgroundColorRow());
        field.append(createZoomRow());

        var camerafield = $('<fieldset>');

        var cameralegend = $('<legend>');

        cameralegend.html("Camera Angle");

        camerafield.append(cameralegend);

        function createCamera(angle) {
            var row = $('<div>', { 'class': 'row' });

            var colLabel = $('<div>', { 'class': 'col-4' });

            var label = $('<label>');

            label.html(angle);

            colLabel.append(label);

            var colControl = $('<div>', { 'class': 'col-8' });

            var input = CT.controlsStore["Slider"]({ 'min': 0, 'max': 360, 'suffix': '&deg;', 'id': 'CameraAngle' + angle + 'Slider' }, ["CameraAngle" + angle]);

            colControl.append(input);

            row.append(colLabel);

            row.append(colControl);

            return row;
        }

        camerafield.append(createCamera("X"));

        camerafield.append(createCamera("Y"));

        camerafield.append(createCamera("Z"));

        //field.append(camerafield);

        var lightfield = $('<fieldset>');

        var lightlegend = $('<legend>');

        lightlegend.html("Lighting");

        lightfield.append(lightlegend);

        function createLight(angle) {
            var row = $('<div>', { 'class': 'row' });

            var colLabel = $('<div>', { 'class': 'col-4' });

            var label = $('<label>');

            label.html(angle);

            colLabel.append(label);

            var colControl = $('<div>', { 'class': 'col-8' });

            var input = CT.controlsStore["Slider"]({ 'min': 0, 'max': 200, 'suffix': '', 'id': 'CameraLighting' + angle + 'Slider' }, ["Lighting" + angle]);

            colControl.append(input);

            row.append(colLabel);

            row.append(colControl);

            return row;
        }

        lightfield.append(createLight("N"));

        lightfield.append(createLight("S"));

        lightfield.append(createLight("W"));

        lightfield.append(createLight("E"));

        //lightfield.append(createLight("Back"));

        //lightfield.append(createLight("Front"));

        field.append(lightfield);

        colOuter.append(field);

        rowOuter.append(colOuter);

        return rowOuter;
    }

    return {
        'mainView': buildControls,
        'subViews': {

        }
    };

}

module.exports = SceneControlsView;
},{}],18:[function(require,module,exports){
var SceneControlsViewModel = function () {

    var self = this;

    self.SceneControls = CT.dataStore.sceneData;

    return self;

}

module.exports = SceneControlsViewModel;
},{}],19:[function(require,module,exports){
var SceneView = function () {

    /*
     <div style="height:600px; padding:15px" class="jumbotron">
        <h2>Scene</h2>
        <canvas id="renderCanvas" style="width:100%; height:100%; touch-action:none"></canvas>
    </div>
     */


    var self = this;

    function buildMainView() {

        var outerDiv = $('<div>', { 'style': 'height:600px; padding-left:40px; padding-right:40px; padding-bottom:46px; min-width:700px; padding-top:50px', 'class': 'jumbotron' });

        var canvas = $('<canvas>', { 'id': 'renderCanvas', 'class': 'customMousePointer', 'style': 'width:100%; height:100%; min-width:100%; touch-action:none' });

        canvas.droppable({
            classes: {
                "ui-droppable-active": "ui-state-active",
                "ui-droppable-hover": "ui-state-hover"
            }//,
            //drop: function (event, ui) {
            //    var el = ui.draggable;
            //    var id = el.attr("id");
            //    if (id) {
            //        var color = el.data("color");
            //        var type = el.data("type");
            //        if (type === 'connector') {
            //            CT.dataStore.addToSceneData().showConnectors[color](false);
            //        }
            //        else {
            //            CT.dataStore.addToSceneData().showRods[color](false);
            //        }
            //        var input = { 'id': id, 'type': type, 'color': color, 'canvasoffset': $(this).offset(), 'canvaswidth': $(this).width(), 'canvasheight': $(this).height(), 'componentoffset': el.offset() };
            //        setTimeout(performEvent.bind(input), 10);
            //    }

            //}
        });

        outerDiv.append(canvas);

        /*
         <div class="container" style="position:absolute; top:50px; left:0px; width:50px; height:300px">
        <div style="padding:15px; width:45px">
          <i class="fa fa-times"></i>
        </div>
      </div>
         */

        function buildBottomActionBar() {
            var bar = $('<div>', { 'class': 'container', 'style': 'position:absolute; top:555px; left:40px; height:50px; min-width:700px; max-width:90%' });

            var div = $('<div>', { 'data-bind': 'with:CT.dataStore.sceneLiveActionData' });

            bar.append(div);

            function addAction(icon, binding, actionicon, actionbinding) {

                var innerdiv = $('<div>', { 'style': 'height:45px; width:260px; overflow-x:hidden; display:inline-block' });

                var button = $('<button>', { 'data-bind': 'visible:(' + binding + '() !== null)', 'class': 'btn btn-outline-primary', 'disabled': true, 'style': 'opacity: 1; margin-top: 1px; margin-right: 5px; text-align: left; width: 260px;' });

                var icon = $('<i>', { 'class': '' + icon, 'style': 'padding-right:5px' });

                button.prepend(icon);

                var span = $('<span>', { 'data-bind': 'html:' + binding });

                button.append(span);

                innerdiv.append(button);

                this.append(innerdiv);



                var innerdiv4 = $('<div>', { 'style': 'height:45px; width:300px; display:inline-block; vertical-align:top' });

                var button4 = $('<button>', { 'data-bind': 'visible:(' + actionbinding + '() !== null)', 'class': 'btn btn-outline-primary', 'disabled': true, 'style': 'opacity: 1; margin-top: 1px; margin-right: 5px; text-align: left; vertical-align: top; width: 300px;' });

                var icon4 = $('<i>', { 'class': '' + actionicon, 'style': 'padding-right:5px; display:inline-block; position:relative; top:-10px' });

                button4.prepend(icon4);

                var span4 = $('<p>', { 'style': 'word-wrap:break-word; white-space:normal; line-height:1.0; vertical-align:top; width:300px', 'data-bind': 'html:' + actionbinding });

                var div4 = $('<div>', { 'style': 'display:inline-block; position:relative; top:-5px' });

                div4.append(span4);

                button4.append(div4);

                innerdiv4.append(button4);

                this.append(innerdiv4);

            }

            addAction.bind(div)('fa fa-mouse-pointer', "$data.MousePositionDisplay",
                "fa fa-bolt", "$data.MouseOverActionDisplay");

            return bar;
        }

        function buildTopActionBar() {
            var bar = $('<div>', { 'class': 'container', 'style': 'position:absolute; top:0px; overflow-y:visible; overflow-x:visible; left:40px; height:50px; min-width:700px; max-width:90%; padding-top:3px' });

            var div = $('<div>', { 'data-bind': 'with:CT.dataStore.sceneLiveActionData' });

            bar.append(div);

            function addAction(imagelink, rotateLeft, rotateRight, imagelink2) {

                var innerdiv2 = $('<div>', { 'style': 'height:45px; display:inline-block; vertical-align:top' });

                var image = $('<button>', { 'data-bind': 'visible:(' + imagelink + '() !== null)', 'class': 'btn btn-primary', 'disabled': true, 'style': 'opacity:1.0; margin-top:0px;' });

                var icon = $('<img>', { 'data-bind': 'attr:{ src:' + imagelink + ' }', 'style': 'height:30px' });

                image.prepend(icon);

                innerdiv2.append(image);

                function addRotationButtons(imagelink, rotateLeft, rotateRight, axis) {

                    var rotateL = $('<button>', {
                        'data-bind': 'visible:(' + imagelink + '() !== null)',
                        'class': 'btn btn-primary rotateLeftButton',
                        'style': 'opacity:1.0; margin-top:0px; height:44px; margin-left:10px;'
                    });

                    var icon = $('<i>', {
                        'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'Rotate Left (' + axis + ')',
                        'class': rotateLeft + " rotateLeftButtonIcon" + axis, 'style': 'font-size:22px'
                    });

                    rotateL.on({
                        'click': function (e) {
                            var el = $(e.target);
                            CT.controllers.Scene.rotateLeft(this.axis);
                        }.bind({ 'axis': axis })
                    });

                    rotateL.hover(
                        function () {
                            var t = $(this);
                            if (t.is("button")) {
                                var icon = t.find("i");
                                icon.tooltip("show");
                                CT.builders.Arrow.build(axis, 'left',
                                    CT.dataStore.sceneLiveActionData().SelectedComponentColorObject(),
                                    CT.controllers.AddToScene.getScene());
                            }
                        },
                        function () {
                            var t = $(this);
                            if (t.is("button")) {
                                var icon = t.find("i");
                                icon.tooltip("hide");
                                CT.dataStore.babylonData().arrows()[0].dispose();
                                CT.dataStore.babylonData().arrows.pop();

                            }
                        }
                    );

                    rotateL.prepend(icon);

                    //<span style="position:relative; left:-8px; top:10px; font-size:12px">X</span>

                    icon.tooltip({
                        'animation': true,
                        'trigger': 'manual',
                        'container': '.rotateLeftButtonIcon' + axis,
                        'delay': { show: 250, hide: 100 }
                    });

                    innerdiv2.append(rotateL);

                    var rotateR = $('<button>', { 'data-bind': 'visible:(' + imagelink + '() !== null)', 'class': 'btn btn-primary', 'style': 'opacity:1.0; margin-top:0px; height:44px' });

                    var icon = $('<i>', {
                        'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'Rotate Right (' + axis + ')',
                        'class': rotateRight + " rotateRightButtonIcon" + axis, 'style': 'font-size:22px'
                    });

                    rotateR.on({
                        'click': function (e) {
                            var el = $(e.target);
                            CT.controllers.Scene.rotateRight(this.axis);
                        }.bind({ 'axis': axis })
                    });

                    rotateR.hover(
                        function () {
                            var t = $(this);
                            if (t.is("button")) {
                                var icon = t.find("i");
                                icon.tooltip("show");
                                CT.builders.Arrow.build(axis, 'right',
                                    CT.dataStore.sceneLiveActionData().SelectedComponentColorObject(),
                                    CT.controllers.AddToScene.getScene());

                            }
                        },
                        function () {
                            var t = $(this);
                            if (t.is("button")) {
                                var icon = t.find("i");
                                icon.tooltip("hide");
                                CT.dataStore.babylonData().arrows()[0].dispose();
                                CT.dataStore.babylonData().arrows.pop();
                            }
                        }
                    );

                    rotateR.prepend(icon);

                    icon.tooltip({
                        'animation': true,
                        'trigger': 'manual',
                        'container': '.rotateRightButtonIcon' + axis,
                        'delay': { show: 250, hide: 100 }
                    });

                    this.append(rotateR);

                }

                addRotationButtons.bind(innerdiv2)(imagelink, rotateLeft, rotateRight, 'x');

                addRotationButtons.bind(innerdiv2)(imagelink, rotateLeft, rotateRight, 'y');

                addRotationButtons.bind(innerdiv2)(imagelink, rotateLeft, rotateRight, 'z');

                this.append(innerdiv2);

                var innerdiv3 = $('<div>', { 'style': 'height:45px; display:inline-block; vertical-align:top' });

                var image3 = $('<button>', { 'data-bind': 'visible:(' + imagelink2 + '() !== null)', 'class': 'btn btn-info', 'disabled': true, 'style': 'opacity:1.0; margin-top:0px;' });

                var icon3 = $('<img>', { 'data-bind': 'attr:{ src:' + imagelink2 + ' }', 'style': 'height:30px' });

                image3.prepend(icon3);

                innerdiv3.append(image3);

                this.append(innerdiv3);

            }

            addAction.bind(div)("$data.SelectedComponentImage", "icon-sco-rotate-left", "icon-sco-rotate-right", "$data.MouseOverComponentImage");

            return bar;
        }

        // top action bar
        var topactionbar = buildTopActionBar();

        //function buildAxes() {

        //    var bar = $('<div>', { 'class': 'container', 'style': 'position:absolute; top:50px; overflow-y:visible; overflow-x:visible; left:40px; height:100px; min-width:700px; max-width:90%; padding-top:3px' });

        //    var div = $('<div>');

        //    var button4 = $('<button>', { 'class': 'btn btn-outline-primary rotationAxes', 'disabled': true, 'style': 'display:none; opacity: 1; margin-top: 1px; margin-right: 5px; text-align: left; border:0px; vertical-align: top; width: 100px;' });

        //    var icon4 = $('<i>', { 'class': 'icon-sco-axes', 'style': 'padding-right:5px; display:inline-block; position:relative; font-size:125px' });

        //    function addPaths(count) {
        //        var i = 0;
        //        var self = this;
        //        while (i++ < count) {
        //            var path = $('<span>', { 'class': 'path' + i });
        //            self.append(path);
        //            self = path;
        //        }
        //    }

        //    addPaths.bind(icon4)(5);

        //    button4.prepend(icon4);

        //    div.append(button4);

        //    bar.append(div);

        //    return bar;
        //}

        //var axes = buildAxes();

        function buildLeftActionBar() {
            var bar = $('<div>', { 'class': 'container', 'style': 'position:absolute; top:45px; overflow-y:visible; overflow-x:visible; left:0px; height:500px; width:55px' });

            function addIcon(icon1, tooltipclass, text, event) {

                var classname = icon1;
                if (icon1.indexOf(" ") !== -1) {
                    classname = icon1.substr(icon1.indexOf(" ") + 1);
                }

                var innerdiv = $('<div>', { 'style': 'height:45px;' });

                var button = $('<button>', { 'class': 'btn btn-outline-primary', 'style': 'margin-top:5px; margin-right:5px' });

                button.on({
                    'click': function (e) {
                        var i = $(e.target);
                        var event = this;
                        CT.eventing.publish(CT.events[event], {});
                    }.bind(event)
                });

                button.hover(
                    function () {
                        var t = $(this);
                        if (t.is("button")) {
                            var icon = t.find("i");
                            icon.tooltip("show");
                        }
                    },
                    function () {
                        var t = $(this);
                        if (t.is("button")) {
                            var icon = t.find("i");
                            icon.tooltip("hide");

                        }
                    }
                );

                var icon = $('<i>', {
                    'data-toggle': 'tooltip', 'data-placement': 'left', 'title': '' + text,
                    'class': '' + icon1 + ' ' + tooltipclass + ' ' + classname + 'Left'
                });

                icon.tooltip({
                    'animation': true,
                    'trigger': 'manual',
                    'container': '.' + classname + 'Left',
                    'delay': { show: 250, hide: 100 }
                });

                function addPaths(count) {
                    var i = 0;
                    var self = this;
                    while (i++ < count) {
                        var path = $('<span>', { 'class': 'path' + i });
                        self.append(path);
                        self = path;
                    }
                }

                addPaths.bind(icon)(4);

                button.prepend(icon);

                innerdiv.append(button);

                this.append(innerdiv);

            }

            addIcon.bind(bar)('icon-sco-file-plus', "leftNavIcon5", "New Scene", "newSceneEvent");
            //addIcon.bind(bar)('fa fa-plus', " New Scene", "newSceneEvent");

            addIcon.bind(bar)('fa fa-folder-open', "leftNavIcon3", "Load Scene", "loadSceneEvent");

            addIcon.bind(bar)('fa fa-upload', "leftNavIcon5", "Save Scene", "saveSceneEvent");

            addIcon.bind(bar)('fa fa-plus', "leftNavIcon7", "Add Component", "addComponentEvent");

            addIcon.bind(bar)('fa fa-bars', "leftNavIcon7", "View Added Components", "viewAddedComponentsEvent");

            return bar;
        }

        // left action bar
        var leftactionbar = buildLeftActionBar();

        // overlay
        //var overlay = buildOverlay();

        var viewdiv = $('<div>', { 'id':'SceneViewSubviewHook' });

        viewdiv.append(topactionbar);

        viewdiv.append(leftactionbar);

        viewdiv.append(buildBottomActionBar());

        //viewdiv.append(overlay);

        //viewdiv.append(axes);

        viewdiv.append(outerDiv);

        return viewdiv;

    }

    function buildImportOverlay() {
        var overlay = $('<div>', {
            'class': 'container', 'style': 'z-index:200; position:absolute; top:50px; left:55px; background-color:rgba(0, 0, 0, 0.2); padding-right: 0px; width: 60%'
        });
        overlay.data("parentId", 'SceneViewSubviewHook');


        var content = $('<div>', {
            'data-bind': 'with:CT.dataStore.importSceneData', 'style': 'max-height:510px; overflow-y:auto; overflow-x: hidden; width: 100%'
        });

        overlay.append(content);

        var field = $('<fieldset>');

        var rdiv = $('<div>', { 'style': 'position:absolute; top:0px; z-index:1000; right:15px; width:40px' });

        var rbutton = $('<button>', { 'class': 'btn btn-outline-primary' });


        rbutton.on(
            {
                'click': function (e) {

                    CT.controllers.View.removeSubview("Scene", "importOverlay");

                    e.stopPropagation();
                }
            }
        );

        var ri = $('<i>', { 'class': 'fa fa-remove' });

        rbutton.append(ri);

        rdiv.append(rbutton);

        content.append(rdiv);

        content.append(field);

        var legend = $('<legend>', { 'style': 'color:white; font-weight:bold' });

        legend.html("Scene Data");

        var row = $('<div>', { 'class': 'row' });

        var colLabel1 = $('<div>', { 'class': 'col-12' });

        row.append(colLabel1);

        var textarea = $('<textarea>', { 'id': 'importTextId', 'cols': 50, 'rows': 10 });

        textarea.attr("data-bind", "value:$data.ImportData");

        colLabel1.append(textarea);

        field.append(legend);

        field.append(row);

        function buildButtonRow() {

            var row = $('<div>', { 'class': 'row' });

            var colLabel1 = $('<div>', { 'class': 'col-12' });

            row.append(colLabel1);

            var ibutton = $('<button>', { 'class': 'btn btn-outline-primary' });


            ibutton.on(
                {
                    'click': function (e) {

                        CT.controllers.Scene.clearScene();
                        CT.controllers.Scene.loadScene();
                        e.stopPropagation();
                    }
                }
            );

            ibutton.html("Load Scene");

            colLabel1.append(ibutton);

            return row;
        }

        field.append(buildButtonRow());

        return overlay;
    }

    function buildSaveOverlay() {
        var overlay = $('<div>', {
            'class': 'container', 'style': 'z-index:200; position:absolute; top:50px; left:55px; background-color:rgba(0, 0, 0, 0.2); padding-right: 0px; width: 60%'
        });
        overlay.data("parentId", 'SceneViewSubviewHook');


        var content = $('<div>', {
            'data-bind': 'with:CT.dataStore.saveSceneData', 'style': 'max-height:510px; overflow-y:auto; overflow-x: hidden; width: 100%'
        });

        overlay.append(content);

        var field = $('<fieldset>');

        var rdiv = $('<div>', { 'style': 'position:absolute; top:0px; z-index:1000; right:15px; width:40px' });

        var rbutton = $('<button>', { 'class': 'btn btn-outline-primary' });


        rbutton.on(
            {
                'click': function (e) {

                    CT.controllers.View.removeSubview("Scene", "saveOverlay");

                    e.stopPropagation();
                }
            }
        );

        var ri = $('<i>', { 'class': 'fa fa-remove' });

        rbutton.append(ri);

        rdiv.append(rbutton);

        content.append(rdiv);

        content.append(field);

        var legend = $('<legend>', { 'style': 'color:white; font-weight:bold' });

        legend.html("Scene Data");

        var row = $('<div>', { 'class': 'row' });

        var colLabel1 = $('<div>', { 'class': 'col-12' });

        row.append(colLabel1);

        var textarea = $('<textarea>', { 'id': 'saveTextId', 'cols': 50, 'rows': 10 });

        textarea.attr("data-bind", "html:$data.ExportData");

        colLabel1.append(textarea);

        field.append(legend);

        field.append(row);

        return overlay;
    }

    function buildOverlay() {
        var overlay = $('<div>', {
            'class': 'container', 'style': 'z-index:200; position:absolute; top:50px; left:55px; background-color:rgba(0, 0, 0, 0.2); padding-right: 0px; width: 60%'
        });
        overlay.data("parentId", 'SceneViewSubviewHook');


        var content = $('<div>', {
            'data-bind': 'with:CT.dataStore.addToSceneData', 'style': 'max-height:510px; overflow-y:auto; overflow-x: hidden; width: 100%'
        });

        overlay.append(content);

        var field = $('<fieldset>');

        var rdiv = $('<div>', { 'style': 'position:absolute; top:0px; z-index:1000; right:15px; width:40px' });

        var rbutton = $('<button>', { 'class': 'btn btn-outline-primary' });


        rbutton.on(
            {
                'click': function (e) {

                    CT.controllers.View.removeSubview("Scene", "addComponentOverlay");

                    e.stopPropagation();
                }
            }
        );

        var ri = $('<i>', { 'class': 'fa fa-remove' });

        rbutton.append(ri);

        rdiv.append(rbutton);

        content.append(rdiv);

        content.append(field);

        var legend = $('<legend>', { 'style': 'color:white; font-weight:bold' });

        legend.html("Connector Components");

        //legend.attr("data-bind", "visible:$data.loadedConnectors.green");

        field.append(legend);

        function createImageRow() {
            var row = $('<div>', { 'class': 'row' });

            var colLabel1 = $('<div>', { 'class': 'col-12' });

            function addImage(color) {

                var imgGreen = CT.controlsStore["Image"]({ 'style': 'width:115px', 'data': { 'type': 'connector', 'color': color }, 'id': 'connector-' + color, 'src': './Content/Connectors/connector-' + color + '_clipped_rev_1.png' });

                imgGreen.attr("data-bind", "style: {'opacity' : $data.showConnectors." + color + "() ? '1.0' : '0.4'}");

                var button = $('<button>', { 'class': 'btn btn-outline-primary' });


                button.on(
                    {
                        'click': function (e) {
                            var t = $(e.target);

                            function performEvent() {
                                CT.eventing.publish(_events.componentDroppedOnToSceneEvent, this);
                                if (this.type === 'connector') {
                                    CT.dataStore.addToSceneData().showConnectors[this.color](true);
                                }
                                else {
                                    CT.dataStore.addToSceneData().showRods[this.color](true);
                                }
                            }

                            var el = null;
                            if (t.is("button")) {
                                el = t.find("img");
                            }
                            else if (t.is("img")) {
                                el = t;
                            }
                            if (el !== null) {
                                var id = el.attr("id");
                                if (id) {
                                    var color = el.data("color");
                                    var type = el.data("type");
                                    if (type === 'connector') {
                                        CT.dataStore.addToSceneData().showConnectors[color](false);
                                    }
                                    else {
                                        CT.dataStore.addToSceneData().showRods[color](false);
                                    }
                                    var input = { 'id': id, 'type': type, 'color': color, 'canvasoffset': $(this).offset(), 'canvaswidth': $(this).width(), 'canvasheight': $(this).height(), 'componentoffset': el.offset() };
                                    setTimeout(performEvent.bind(input), 1);
                                    e.stopPropagation();
                                }
                            }
                        }
                    }
                );

                button.append(imgGreen);

                this.append(button);
            }

            addImage.bind(colLabel1)("green");

            addImage.bind(colLabel1)("orange");

            addImage.bind(colLabel1)("purple");

            addImage.bind(colLabel1)("red");

            addImage.bind(colLabel1)("blue");

            addImage.bind(colLabel1)("gray");

            addImage.bind(colLabel1)("white");

            addImage.bind(colLabel1)("yellow");

            row.append(colLabel1);

            return row;
        }

        field.append(createImageRow());

        var legendRod = $('<legend>', { 'style': 'color:white; font-weight:bold' });

        legendRod.html("Rod Components");

        //legendRod.attr("data-bind", "visible:$data.loadedRods.black");

        field.append(legendRod);

        function createRodRow() {
            var row = $('<div>', { 'class': 'row' });

            var colLabel1 = $('<div>', { 'class': 'col-12' });

            function addImage(color, width) {
                var imgGreen = CT.controlsStore["Image"]({ 'style': 'width:' + width + 'px', 'data': { 'type': 'rod', 'color': color }, 'id': 'rod-' + color, 'src': './Content/Rods/rod-' + color + '_clipped_rev_1.png' });

                imgGreen.attr("data-bind", "style: {'opacity' : $data.showRods." + color + "() ? '1.0' : '0.4'}");

                var button = $('<button>', { 'class': 'btn btn-outline-primary' });

                button.on(
                    {
                        'click': function (e) {
                            var t = $(e.target);

                            function performEvent() {
                                CT.eventing.publish(_events.componentDroppedOnToSceneEvent, this);
                                if (this.type === 'connector') {
                                    CT.dataStore.addToSceneData().showConnectors[this.color](true);
                                }
                                else {
                                    CT.dataStore.addToSceneData().showRods[this.color](true);
                                }
                            }

                            var el = null;
                            if (t.is("button")) {
                                el = t.find("img");
                            }
                            else if (t.is("img")) {
                                el = t;
                            }
                            if (el !== null) {
                                var id = el.attr("id");
                                if (id) {
                                    var color = el.data("color");
                                    var type = el.data("type");
                                    if (type === 'connector') {
                                        CT.dataStore.addToSceneData().showConnectors[color](false);
                                    }
                                    else {
                                        CT.dataStore.addToSceneData().showRods[color](false);
                                    }
                                    var input = { 'id': id, 'type': type, 'color': color, 'canvasoffset': $(this).offset(), 'canvaswidth': $(this).width(), 'canvasheight': $(this).height(), 'componentoffset': el.offset() };
                                    setTimeout(performEvent.bind(input), 1);
                                    e.stopPropagation();
                                }
                            }
                        }
                    }
                );

                button.append(imgGreen);

                this.append(button);
            }

            addImage.bind(colLabel1)("black", "400");

            addImage.bind(colLabel1)("gray", "400");

            addImage.bind(colLabel1)("red", "250");

            addImage.bind(colLabel1)("yellow", "200");

            addImage.bind(colLabel1)("blue", "130");

            addImage.bind(colLabel1)("white", "130");

            addImage.bind(colLabel1)("green", "115");

            row.append(colLabel1);

            return row;
        }

        field.append(createRodRow());

        return overlay;
    }


    return {
        'mainView': buildMainView,
        'subViews': {
            'addComponentOverlay': buildOverlay,
            'saveOverlay': buildSaveOverlay,
            'importOverlay': buildImportOverlay
        }
    };



}

module.exports = SceneView;


},{}],20:[function(require,module,exports){
var SceneViewModel = function () {

    var self = this;

    self.Scene = CT.dataStore.babylonData;

    CT.controllers.AddToScene.initializeScene();

    self.SceneLiveAction = CT.dataStore.sceneLiveActionData;
    function isMouseOverComponentHandler(value) {
        if (value) {
            $('#SceneView').css("cursor", "pointer");
            $('#SceneView').on(
                {
                    'keydown': function (e) {
                        switch (e.which) {
                            case 13:
                                var actionData = CT.dataStore.sceneLiveActionData();
                                var x = actionData.MousePositionX();
                                var y = actionData.MousePositionY();
                                var z = actionData.MousePositionZ();
                                CT.controllers.AddToScene.connectSelectedComponent(x, y, z);
                                break;
                        }
                    }
                }
            );
        }
        else {
            $('#SceneView').css("cursor", "auto");
            $('#SceneView').off("keydown");
        }
    }
    self.SceneLiveAction().IsMouseOverComponent.subscribe(isMouseOverComponentHandler);

    return self;


}

module.exports = SceneViewModel;
},{}],21:[function(require,module,exports){


module.exports = (function (CT) {

    var self = {
        initialize: initialize
    };

    function initialize() {
        return self;
    }

    return self;

}).call({}, CT);
},{}],22:[function(require,module,exports){
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
},{}]},{},[1,2])

//# sourceMappingURL=bundleB-scripts.js.map
