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