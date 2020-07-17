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