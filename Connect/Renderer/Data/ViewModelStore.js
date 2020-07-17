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