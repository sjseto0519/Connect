
var SceneController = (
    function (CT) {

        var self = {};

        function changeBackgroundColor(newvalue) {
            var ind = newvalue.indexOf("(");
            newvalue = newvalue.substr(ind + 1).replace(")", "").split(",");
            var scene = CT.controllers.AddToScene.getScene();
            if (scene) {
                var color = new BABYLON.Color3(parseInt(newvalue[0]) / 255.0, parseInt(newvalue[1]) / 255.0, parseInt(newvalue[2]) / 255.0);
                scene.clearColor = color;
            }
        }

        function changeLighting(dir, value) {
            var light = CT.controllers.AddToScene.getLights(dir);
            light.intensity = 0.0 + (value / 333.3333);
        }

        function handleSceneDataChange(o) {

            var path = o.path;
            var value = o.value;
            // change the zoom of the scene when the zoom control is changed
            if (path === 'Zoom') {
                var zval = parseInt(value);
                // make sure that the zoom can be parsed to an int
                if (!isNaN(zval)) {
                    // make sure that the lowest the zoom can go to is 5
                    changeZoom(105 - zval);
                }
            }
            else if (path === 'BackgroundColor') {
                changeBackgroundColor(value);
            }
            else if (path === 'LightingN') {
                changeLighting("N", value);
            }
            else if (path === 'LightingW') {
                changeLighting("W", value);
            }
            else if (path === 'LightingE') {
                changeLighting("E", value);
            }
            else if (path === 'LightingS') {
                changeLighting("S", value);
            }
            else if (path === 'LightingFront') {
                changeLighting("Front", value);
            }
            else if (path === 'LightingBack') {
                changeLighting("Back", value);
            }

        }

        CT.eventing.subscribe(_events.sceneDataChangedEvent, handleSceneDataChange);

        function handleNewSceneEvent() {
            clearScene();
        }

        CT.eventing.subscribe(_events.newSceneEvent, handleNewSceneEvent);

        function loadScene() {
            var data = CT.dataStore.importSceneData().ImportData();
            var parsed = JSON.parse(data);
            var components = parsed.components;
            var l = components.length;
            var groups = {};

            function loadComponent(component) {
                var cc = CT.models.$ConnectComponent(component);
                return cc.loadComponent();
            }

            function loadGroup(group) {
                var id = group[0].groupId;
                var meshes = [];
                var l = group.length;
                while (l--) {
                    var g = group[l];
                    meshes.push(loadComponent(g));
                }
                if (meshes.length > 0) {
                    CT.controllers.AddToScene.groupComponentsTogether.apply(null, meshes);
                }

            }

            while (l--) {
                var component = components[l];
                if (component.groupId) {
                    if (groups[component.groupId]) {
                        groups[component.groupId].push(component);
                    }
                    else {
                        groups[component.groupId] = [ component ];
                    }
                }
                else {
                    loadComponent(component);
                }
            }

            for (var prop in groups) {
                loadGroup(groups[prop]);
            }
        }

        function handleLoadSceneEvent() {
            CT.controllers.View.addSubview("Scene", "importOverlay");
        }

        CT.eventing.subscribe(_events.loadSceneEvent, handleLoadSceneEvent);

        function handleSaveSceneEvent() {
            var groups = CT.dataStore.babylonData().groups();
            var out = { 'components': [] };
            if (groups.length > 0) {
                var l = groups.length;
                while (l--) {
                    var group = groups[l];
                    var g = CT.models.$ConnectMeshGroup(group.mesh);
                    var ex = g.exportMesh();
                    $.merge(out.components, ex);
                }
            }
            var connectors = CT.dataStore.babylonData().connectors();
            if (connectors.length > 0) {
                var l = connectors.length;
                while (l--) {
                    var o = connectors[l];
                    var g = CT.models.$ConnectMesh(o.mesh, o.mesh.Data);
                    var ex = g.exportMesh();
                    out.components.push(ex);
                }
            }
            var rods = CT.dataStore.babylonData().rods();
            if (rods.length > 0) {
                var l = rods.length;
                while (l--) {
                    var o = rods[l];
                    var g = CT.models.$ConnectMesh(o.mesh, o.mesh.Data);
                    var ex = g.exportMesh();
                    out.components.push(ex);
                }
            }
            CT.dataStore.saveSceneData().SavedData(out);
            CT.controllers.View.addSubview("Scene", "saveOverlay");
        }

        CT.eventing.subscribe(_events.saveSceneEvent, handleSaveSceneEvent);

        function handleAddComponentEvent() {
            //$('#sceneOverlayId').css("display", "inline");
            CT.controllers.View.addSubview("Scene", "addComponentOverlay");
        }

        CT.eventing.subscribe(_events.addComponentEvent, handleAddComponentEvent);

        function handleViewAddedComponentsEvent() {

        }

        CT.eventing.subscribe(_events.viewAddedComponentsEvent, handleViewAddedComponentsEvent);

        function restoreArcRotateCameraPosition() {
            //CT.controllers.Scene.getCamera().setPosition(new BABYLON.Vector3(-0.0000000001, 0.0000000001, -33.0));
            //CT.controllers.Scene.getCamera().alpha = 4.41238898038469;
            //CT.controllers.Scene.getCamera().beta = 1.5707963267948966;
        }

        // hides the loading screen
        function hideLoadingScreen() {
            var engine = CT.controllers.AddToScene.getEngine();
            if (!engine.isLoadingScreenHidden)
                engine.hideLoadingUI();
            engine.isLoadingScreenHidden = true;
        }

        // rotates in the X direction by a certain number of degrees
        function rotateX(degrees) {
            this.rotation.x = CT.dataStore.mathData.toRadians(degrees);
        }

        function rotateXByOther(mesh, degrees) {
            var vector = { 'x': 0, 'y': CT.dataStore.mathData.toRadians(degrees), 'z': 0 };
            var meshrot = { 'x': mesh.rotation.x, 'y': mesh.rotation.y, 'z': mesh.rotation.z };
            var res = rotateVector(vector, meshrot);
            this.rotation.x = this.rotation.x + res.x;
            this.rotation.y = this.rotation.y + res.y;
            this.rotation.z = this.rotation.z + res.z;
        }

        function rotateY(degrees) {
            this.rotation.y = CT.dataStore.mathData.toRadians(degrees);
        }

        function rotateYByOther(mesh, degrees) {
            var vector = { 'x': 0, 'y': CT.dataStore.mathData.toRadians(degrees), 'z': 0 };
            var meshrot = { 'x': mesh.rotation.x, 'y': mesh.rotation.y, 'z': mesh.rotation.z };
            var res = rotateVector(vector, meshrot);
            this.rotation.x = this.rotation.x + res.x;
            this.rotation.y = this.rotation.y + res.y;
            this.rotation.z = this.rotation.z + res.z;
        }

        function rotateZ(degrees) {
            this.rotation.z = CT.dataStore.mathData.toRadians(degrees);
        }

        function rotateRadX(rad, plus) {
            if (plus) {
                this.rotation.x += rad;
                return;
            }
            this.rotation.x = rad;
        }

        function rotateRadY(rad, plus) {
            if (plus) {
                this.rotation.y += rad;
                return;
            }
            this.rotation.y = rad;
        }

        function rotateRadZ(rad, plus) {
            if (plus) {
                this.rotation.z += rad;
                return;
            }
            this.rotation.z = rad;
        }

        function getPosition() {
            return { 'x': this.position.x, 'y': this.position.y, 'z': this.position.z };
        }

        function getRotation() {
            return { 'x': this.rotation.x, 'y': this.rotation.y, 'z': this.rotation.z };
        }

        function moveX(distance) {
            this.position.x += distance;
        }

        function moveY(distance) {
            this.position.y += distance;
        }

        function moveZ(distance) {
            this.position.z += distance;
        }

        function changeZoom(amount) {
            var camera = CT.controllers.AddToScene.getCamera();
            camera.radius = amount;
        }

        function relativePosition(otherMesh) {
            var mesh = this;
            var diffx = otherMesh.position.x - mesh.position.x;
            var diffy = otherMesh.position.y - mesh.position.y;
            var diffz = otherMesh.position.z - mesh.position.z;
            var diffrx = otherMesh.rotation.x - mesh.rotation.x;
            var diffry = otherMesh.rotation.y - mesh.rotation.y;
            var diffrz = otherMesh.rotation.z - mesh.rotation.z;
            return {
                'position': [diffx, diffy, diffz],
                'rotation': [diffrx, diffry, diffrz]
            }
        }

        function rotateAndTranslate(mesh, point) {
            rotatePointXYZ.call(point, mesh.rotation.x, mesh.rotation.y, mesh.rotation.z);
            translatePointXYZ.call(point, mesh.position.x, mesh.position.y, mesh.position.z);
            return point;
        }

        function getDistanceBetween(p1, p2) {
            return Math.sqrt(
                Math.pow(p1.x - p2.x, 2) +
                Math.pow(p1.y - p2.y, 2) +
                Math.pow(p1.z - p2.z, 2)
            );
        }

        function rotateVector(displacementVector, vectorOfRotation) {
            return rotatePointXYZ.call(displacementVector, vectorOfRotation.x, vectorOfRotation.y, vectorOfRotation.z);
        }

        function getMeshPosition(mesh, vertices, index) {
            return new PointXYZ(
                vertices[index] + mesh.position.x,
                vertices[index + 1] + mesh.position.y,
                vertices[index + 2] + mesh.position.z
            );
        }

        function getPositionInSpace() {
            var mesh = this;
            var vv1 = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            if (mesh.rotation.x !== 0
                ||
                mesh.rotation.y !== 0
                ||
                mesh.rotation.z !== 0) {
                var pt = new PointXYZ(
                    vv1[0],
                    vv1[1],
                    vv1[2]
                );
                pt = rotateOverXAxis(pt, mesh.rotation.x);
                pt = rotateOverYAxis(pt, mesh.rotation.y);
                pt = rotateOverZAxis(pt, mesh.rotation.z);
                return new PointXYZ(
                    pt.x + mesh.position.x,
                    pt.y + mesh.position.y,
                    pt.z + mesh.position.z
                );
            }
            return new PointXYZ(
                vv1[0] + mesh.position.x,
                vv1[1] + mesh.position.y,
                vv1[2] + mesh.position.z
            );
        }

        function moveMeshToPosition(point) {
            var mesh = this;
            mesh.position.x += point.x;
            mesh.position.y += point.y;
            mesh.position.z += point.z;
        }

        function translatePointXYZ(x, y, z) {
            this.x += x;
            this.y += y;
            this.z += z;
        }

        function PointXYZ(x, y, z) {
            this.x = x;
            this.y = y;
            if (z === undefined) {
                this.z = Math.sqrt(1 - Math.pow(x, 2) - Math.pow(y, 2));
            }
            else {
                this.z = z;
            }
        }

        function rotateAxis(originalAxis, xrad, yrad, zrad) {

            if (xrad === undefined) {
                xrad = 0;
            }
            if (yrad === undefined) {
                yrad = 0;
            }
            if (zrad === undefined) {
                zrad = 0;
            }
            var newAxisAfterX = new PointXYZ(
                originalAxis.x,
                Math.cos(xrad) * originalAxis.y,
                Math.sin(xrad) * originalAxis.y + Math.cos(xrad) * originalAxis.z
            );

            var newAxisAfterY = new PointXYZ(
                Math.cos(yrad) * newAxisAfterX.x + Math.sin(yrad) * newAxisAfterX.z,
                newAxisAfterX.y,
                Math.cos(yrad) * newAxisAfterX.z - Math.sin(yrad) * newAxisAfterX.x
            );

            var newAxisAfterZ = new PointXYZ(
                Math.cos(zrad) * newAxisAfterY.x - Math.sin(zrad) * newAxisAfterY.y,
                Math.sin(zrad) * newAxisAfterY.x + Math.cos(zrad) * newAxisAfterY.y,
                newAxisAfterY.z
            );

            return newAxisAfterZ;

        }

        function rotatePointAboutAxis(axis, rad, point) {
            var costheta = Math.cos(rad);
            var sintheta = Math.sin(rad);
            var costhetaminus = 1 - costheta;
            var pointToBeRotated = point;
            var pointInitial = new PointXYZ(0, 0, 0);
            var pointStep1 = new PointXYZ(
                (costheta + costhetaminus * axis.x * axis.x) * pointToBeRotated.x,
                (costhetaminus * axis.x * axis.y + axis.z * sintheta) * pointToBeRotated.x
                //(costhetaminus * axis.x * axis.z - axis.y * sintheta) * pointToBeRotated.x
            );
            var pointStep2 = new PointXYZ(
                (costhetaminus * axis.x * axis.y - axis.z * sintheta) * pointToBeRotated.y,
                (costheta + costhetaminus * axis.y * axis.y) * pointToBeRotated.y
                //(costhetaminus * axis.y * axis.z + axis.x * sintheta) * pointToBeRotated.y
            );
            var pointStep3 = new PointXYZ(
                (costhetaminus * axis.x * axis.z + axis.y * sintheta) * pointToBeRotated.z,
                (costhetaminus * axis.y * axis.z - axis.x * sintheta) * pointToBeRotated.z
                //(costheta + costhetaminus * axis.z * axis.z) * pointToBeRotated.z
            );
            var pointFinal = new PointXYZ(
                pointInitial.x + pointStep1.x + pointStep2.x + pointStep3.x,
                pointInitial.y + pointStep1.y + pointStep2.y + pointStep3.y
            );

            return pointFinal;
        }

        // rotate a point about an arbitrary axis
        function rotateAnyPointAboutAxis(axis, rad, point) {
            var costheta = Math.cos(rad);
            var sintheta = Math.sin(rad);
            var costhetaminus = 1 - costheta;
            var pointToBeRotated = point;
            var pointInitial = new PointXYZ(0, 0, 0);
            var pointStep1 = new PointXYZ(
                (costheta + costhetaminus * axis.x * axis.x) * pointToBeRotated.x,
                (costhetaminus * axis.x * axis.y + axis.z * sintheta) * pointToBeRotated.x
                    (costhetaminus * axis.x * axis.z - axis.y * sintheta) * pointToBeRotated.x
            );
            var pointStep2 = new PointXYZ(
                (costhetaminus * axis.x * axis.y - axis.z * sintheta) * pointToBeRotated.y,
                (costheta + costhetaminus * axis.y * axis.y) * pointToBeRotated.y
                    (costhetaminus * axis.y * axis.z + axis.x * sintheta) * pointToBeRotated.y
            );
            var pointStep3 = new PointXYZ(
                (costhetaminus * axis.x * axis.z + axis.y * sintheta) * pointToBeRotated.z,
                (costhetaminus * axis.y * axis.z - axis.x * sintheta) * pointToBeRotated.z
                    (costheta + costhetaminus * axis.z * axis.z) * pointToBeRotated.z
            );
            var pointFinal = new PointXYZ(
                pointInitial.x + pointStep1.x + pointStep2.x + pointStep3.x,
                pointInitial.y + pointStep1.y + pointStep2.y + pointStep3.y,
                pointInitial.z + pointStep1.z + pointStep2.z + pointStep3.z
            );

            return pointFinal;
        }

        function findEquivalentRotationAboutArbitraryAxis(axis, axispoint, rad) {
            var costheta = Math.cos(rad);
            var sintheta = Math.sin(rad);
            var costhetaminus = 1 - costheta;
            var pointToBeRotated = axispoint;
            var pointFinal = rotatePointAboutAxis(axis, rad, pointToBeRotated);
            var z = Math.asin(pointFinal.y);
            var y = Math.asin(-1 * pointFinal.z / Math.cos(z));

            var equivalentRotation = new PointXYZ(
                0,
                y,
                z
            );
            return equivalentRotation;
        }

        function rotateOverXAxis(point, rad) {

            return new PointXYZ(
                point.x,
                Math.cos(rad) * point.y - Math.sin(rad) * point.z,
                Math.sin(rad) * point.y + Math.cos(rad) * point.z
            );

        }

        function rotateOverYAxis(point, rad) {

            return new PointXYZ(
                Math.cos(rad) * point.x + Math.sin(rad) * point.z,
                point.y,
                Math.cos(rad) * point.z - Math.sin(rad) * point.x
            );

        }

        function rotateOverZAxis(point, rad) {

            return new PointXYZ(
                Math.cos(rad) * point.x - Math.sin(rad) * point.y,
                Math.sin(rad) * point.x + Math.cos(rad) * point.y,
                point.z
            );

        }

        function clearScene() {

            var connectors = CT.dataStore.babylonData().connectors();
            var l = connectors.length;
            while (l--) {
                connectors[l].mesh.dispose();
                connectors.pop();
            }

            var rods = CT.dataStore.babylonData().rods();
            l = rods.length;
            while (l--) {
                rods[l].mesh.dispose();
                rods.pop();
            }

            var groups = CT.dataStore.babylonData().groups();
            l = groups.length;
            while (l--) {
                groups[l].mesh.dispose();
                groups.pop();
            }

            lastMeshAdded = null;

        }

        function getSelectedComponent() {
            var data = CT.dataStore.sceneLiveActionData().SelectedComponentData();
            var groupid = CT.dataStore.sceneLiveActionData().SelectedComponentGroupId();
            var type = CT.dataStore.sceneLiveActionData().SelectedComponentType();
            var color = CT.dataStore.sceneLiveActionData().SelectedComponentColor();
            return CT.controllers.AddToScene.findComponent(type, color, data, groupid);
        }

        function getMouseOverComponent() {
            var data = CT.dataStore.sceneLiveActionData().MouseOverComponentData();
            var groupid = CT.dataStore.sceneLiveActionData().MouseOverComponentGroupId();
            var type = CT.dataStore.sceneLiveActionData().MouseOverComponentType();
            var color = CT.dataStore.sceneLiveActionData().MouseOverComponentColor();
            return CT.controllers.AddToScene.findComponent(type, color, data, groupid);
        }

        function rotateLeft(axis) {
            var selectedComponent = getSelectedComponent();
            if (selectedComponent.type === "group") {
                selectedComponent = selectedComponent.group;
            }
            //var subMeshes = selectedComponent.subMeshes;
            //var length = subMeshes.length;
            //var center = subMeshes[length - 2];
            //var start = center.verticesStart;
            //var x = start * 3;
            //var y = x + 1;
            //var z = x + 2;
            //var vertdata = selectedComponent.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            //var position = new BABYLON.Vector3(vertdata[x], vertdata[y], vertdata[z]);
            //selectedComponent.computeWorldMatrix();
            //var matrix = selectedComponent.getWorldMatrix(true);
            //var newposition = BABYLON.Vector3.TransformCoordinates(position, matrix);
            var vectoraxis = {
                'x': new BABYLON.Vector3(1, 0, 0),
                'y': new BABYLON.Vector3(0, 1, 0),
                'z': new BABYLON.Vector3(0, 0, 1)
            }
            var degreeaxis = {
                'x': 45,
                'y': -45,
                'z': 45
            }
            var vector = vectoraxis[axis];
            var degree = degreeaxis[axis];
            if (selectedComponent.rotationQuaternion) {
                var quat = new BABYLON.Quaternion.RotationAxis(vector, degree * Math.PI / 180);
                selectedComponent.rotationQuaternion = quat.multiply(selectedComponent.rotationQuaternion);
            }
            else {
                var quat = new BABYLON.Quaternion.RotationAxis(vector, degree * Math.PI / 180);
                selectedComponent.rotationQuaternion = quat;
            }
            var a = 1;
        }

        function rotateRight(axis) {
            var selectedComponent = getSelectedComponent();
            if (selectedComponent.type === "group") {
                selectedComponent = selectedComponent.group;
            }
            //var subMeshes = selectedComponent.subMeshes;
            //var length = subMeshes.length;
            //var center = subMeshes[length - 2];
            //var start = center.verticesStart;
            //var x = start * 3;
            //var y = x + 1;
            //var z = x + 2;
            //var vertdata = selectedComponent.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            //var position = new BABYLON.Vector3(vertdata[x], vertdata[y], vertdata[z]);
            //selectedComponent.computeWorldMatrix();
            //var matrix = selectedComponent.getWorldMatrix(true);
            //var newposition = BABYLON.Vector3.TransformCoordinates(position, matrix);
            var vectoraxis = {
                'x': new BABYLON.Vector3(1, 0, 0),
                'y': new BABYLON.Vector3(0, 1, 0),
                'z': new BABYLON.Vector3(0, 0, 1)
            }
            var degreeaxis = {
                'x': -45,
                'y': 45,
                'z': -45
            }
            var vector = vectoraxis[axis];
            var degree = degreeaxis[axis];
            if (selectedComponent.rotationQuaternion) {
                var quat = new BABYLON.Quaternion.RotationAxis(vector, degree * Math.PI / 180);
                selectedComponent.rotationQuaternion = quat.multiply(selectedComponent.rotationQuaternion);
            }
            else {
                var quat = new BABYLON.Quaternion.RotationAxis(vector, degree * Math.PI / 180);
                selectedComponent.rotationQuaternion = quat;
            }
            var a = 1;
        }

        
        self["clearScene"] = clearScene;
        self["restoreCamera"] = restoreArcRotateCameraPosition;
        self["rotateX"] = rotateX;
        self["rotateXByOther"] = rotateXByOther;
        self["rotateY"] = rotateY;
        self["rotateZ"] = rotateZ;
        self["rotateYByOther"] = rotateYByOther;
        self["rotateRadX"] = rotateRadX;
        self["rotateRadY"] = rotateRadY;
        self["rotateRadZ"] = rotateRadZ,
        self["getPosition"] = getPosition;
        self["getRotation"] = getRotation;
        self["moveX"] = moveX;
        self["moveY"] = moveY;
        self["moveZ"] = moveZ;
        self["changeZoom"] = changeZoom;
        self["relativePosition"] = relativePosition;
        self["translatePointXYZ"] = translatePointXYZ;
        self["rotateAxis"] = rotateAxis;
        self["rotatePointAboutAxis"] = rotatePointAboutAxis;
        self["rotateAnyPointAboutAxis"] = rotateAnyPointAboutAxis;
        self["findEquivalentRotationAboutArbitraryAxis"] = findEquivalentRotationAboutArbitraryAxis;
        self["rotateOverXAxis"] = rotateOverXAxis;
        self["rotateOverYAxis"] = rotateOverYAxis;
        self["rotateOverZAxis"] = rotateOverZAxis;
        self["getMeshPosition"] = getMeshPosition;
        self["moveMeshToPosition"] = moveMeshToPosition;
        self["getPositionInSpace"] = getPositionInSpace;
        self["hideLoadingScreen"] = hideLoadingScreen;
        self["rotateLeft"] = rotateLeft;
        self["rotateRight"] = rotateRight;
        self["getSelectedComponent"] = getSelectedComponent;
        self["getMouseOverComponent"] = getMouseOverComponent;
        self["loadScene"] = loadScene;

        return self;

    }
).call({}, CT);

module.exports = SceneController;