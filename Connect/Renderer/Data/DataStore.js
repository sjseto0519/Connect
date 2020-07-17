var _ = window._;
var fs = require('fs');

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