
var AddToSceneController = (
    function (CT) {

        var self = {};
        var scene = null;
        var camera = null;
        var lastMeshAdded = null;
        var renderingCanvas = null;
        var babylonEngine = null;
        var lights = {};

        function getMaterial(color) {
            var rgb = CT.dataStore.colorData[color];
            var color = new BABYLON.Color3(rgb.r, rgb.g, rgb.b);
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

            myMaterial.diffuseColor = color;
            return myMaterial;
        }

        

        function createGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }  

        // function that is called when a component is dropped onto the scene
        function handleComponentDroppedEvent(o) {

            var cc = CT.models.$ConnectComponent(o);
            cc.loadComponent(function () { camera.attachControl(renderingCanvas, true); });

        }

        CT.eventing.subscribe(_events.componentDroppedOnToSceneEvent, handleComponentDroppedEvent);

        function findSelectedSubmeshByIndex(selected, index) {
            var submeshes = selected.subMeshes;
            if (selected.subMeshes[index].Data.submeshes) {
                return selected.subMeshes[index];
            }
            var i = index;
            while (i--) {
                if (selected.subMeshes[i].Data.submeshes) {
                    return selected.subMeshes[i];
                }
            }
            return selected.subMeshes[index];
        }

        function initializeScene() {

            var canvas = document.getElementById("renderCanvas");

            var createScene = function () {

                var self = this;

                var initialScene = new BABYLON.Scene(engine);
                initializeScene.clearColor = new BABYLON.Color3(0, 100, 200);
                // Add a camera to the scene and attach it to the canvas
                camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 4, BABYLON.Vector3.Zero(), initialScene);
                camera.lowerBetaLimit = 0.3;
                camera.upperBetaLimit = 1.5;
                camera.lowerRadiusLimit = 5;
                camera.setPosition(new BABYLON.Vector3(0, 0, -33));
                camera.beta = 1.333333;

                // Add lights to the scene
                
               // var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-3, -1, 0), initialScene);
               // light2.intensity = 1;
                
                lights["S"] = new BABYLON.HemisphericLight("light1s", new BABYLON.Vector3(0, -3, 0), initialScene);
                lights["S"].intensity = 0.3;

                lights["N"] = new BABYLON.HemisphericLight("light1n", new BABYLON.Vector3(0, 3, 0), initialScene);
                lights["N"].intensity = 0.3;

                lights["W"] = new BABYLON.HemisphericLight("light1w", new BABYLON.Vector3(-3, 0, 0), initialScene);
                lights["W"].intensity = 0.3;

                lights["E"] = new BABYLON.HemisphericLight("light1e", new BABYLON.Vector3(3, 0, 0), initialScene);
                lights["E"].intensity = 0.3;

                lights["Front"] = new BABYLON.HemisphericLight("light1f", new BABYLON.Vector3(0, 0, -3), initialScene);
                lights["Front"].intensity = 0.3;

                lights["Back"] = new BABYLON.HemisphericLight("light1b", new BABYLON.Vector3(0, 0, 3), initialScene);
                lights["Back"].intensity = 0.3;

                // Add ground to the scene
                var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
                var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                groundMaterial.specularColor = new BABYLON.Color3(0.01, 0.01, 0.015);
                groundMaterial.alpha = 0.1;
                ground.material = groundMaterial;

                // Events
                var rcanvas = engine.getRenderingCanvas();
                renderingCanvas = rcanvas;
             
                var startingPoint;
                var currentMesh;
                var currentSubMeshId;

                var getGroundPosition = function () {
                    // Use a predicate to get position on the ground
                    var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
                    if (pickinfo.hit) {
                        return pickinfo.pickedPoint;
                    }

                    return null;
                }

                var onPointerDown = function (evt) {
                    if (evt.button !== 0) {
                        return;
                    }

                    // check if we are under a mesh
                    var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== ground; });
                    if (pickInfo.hit) {
                        currentMesh = pickInfo.pickedMesh;
                        currentSubMeshId = pickInfo.subMeshId;
                        startingPoint = getGroundPosition(evt);

                        if (startingPoint) { // we need to disconnect camera from canvas
                            setTimeout(function () {
                                camera.detachControl(rcanvas);
                            }, 0);
                        }
                    }
                }

                var onPointerUp = function () {
                    if (startingPoint) {
                        camera.attachControl(rcanvas, true);

                        if (currentMesh) {
                            var selected = currentMesh;
                            if (selected) {
                                CT.dataStore.sceneLiveActionData().IsComponentSelected(true);
                                var data = selected.Data;
                                var actionData = CT.dataStore.sceneLiveActionData();
                                if (selected.Data.type === 'group') {
                                    var id = currentSubMeshId;
                                    var index = _.findIndex(selected.subMeshes, function (e) { return e._id === id });
                                    var guid = selected.subMeshes[index].Data.guid;
                                    var mm = findSelectedSubmeshByIndex(selected, index);
                                    data = mm.Data;


                                    var groupid = selected.Data.guid;
                                    actionData.SelectedComponentGroupId(groupid);
                                    actionData.SelectedComponentData(data);
                                    actionData.SelectedComponentColor(actionData.MouseOverComponentColor());
                                    actionData.SelectedComponentType(actionData.MouseOverComponentType());
                                    actionData.SelectedComponentId(guid);
                                }
                                else {
                                    actionData.SelectedComponentGroupId(undefined);
                                    actionData.SelectedComponentData(data);
                                    actionData.SelectedComponentColor(data.color);
                                    actionData.SelectedComponentType(data.type);
                                    actionData.SelectedComponentId(data.guid);
                                }
                                
                            }
                        }

                        startingPoint = null;
                        currentMesh = null;
                        return;
                    }
                    else {
                        CT.dataStore.sceneLiveActionData().IsComponentSelected(false);
                        CT.dataStore.sceneLiveActionData().SelectedComponentData(undefined);
                        CT.dataStore.sceneLiveActionData().SelectedComponentColor(undefined);
                        CT.dataStore.sceneLiveActionData().SelectedComponentType(undefined);
                        CT.dataStore.sceneLiveActionData().SelectedComponentId(undefined);
                    }
                }

                var onPointerMove = function (evt) {

                    var self = this;
                    var scene = self.getScene();

                    var actionData = CT.dataStore.sceneLiveActionData();
                    
                    if (!startingPoint) {

                        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return true; });
                        var point = pickInfo.pickedPoint;
                        var pickedMesh = pickInfo.pickedMesh;
                        if (point) {
                              
                            actionData.MousePositionX(point.x);
                            actionData.MousePositionY(point.y);
                            actionData.MousePositionZ(point.z);
                                
                        }
                        else {
                            actionData.MousePositionX(undefined);
                            actionData.MousePositionY(undefined);
                            actionData.MousePositionZ(undefined);
                        }

                        var isMouseOverComponent = false;

                        if (CT.dataStore.hasComponents()) {
                            
                            if (pickInfo.hit) {
                                if (pickedMesh !== ground) {
                                    var pickedPoint = pickInfo.pickedPoint;
                                    var data = pickedMesh.Data;
                                    if (pickedMesh.Data.type === 'group') {
                                        var id = pickInfo.subMeshId;
                                        var index = _.findIndex(pickedMesh.subMeshes, function (e) { return e._id === id });
                                        var i = index + 1;
                                        while (i--) {
                                            if (pickedMesh.subMeshes[i].Data.data) {
                                                break;
                                            }
                                        }
                                        var submeshIndex = index - i;
                                        var componentdata = pickedMesh.subMeshes[i].Data;
                                        //componentdata.index = i;
                                        data = componentdata.data;
                                        data.index = i;
                                        var groupid = pickedMesh.Data.guid;
                                        actionData.MouseOverComponentGroupId(groupid);
                                        actionData.MouseOverComponentData(componentdata);
                                    }
                                    else {
                                        actionData.MouseOverComponentGroupId(undefined);
                                        actionData.MouseOverComponentData(data);
                                    }
                                    var color = data.color;
                                    var type = data.type;
                                    var id = data.guid;
                                 
                                    actionData.MouseOverComponentColor(color);
                                    actionData.MouseOverComponentType(type);
                                    actionData.MouseOverComponentId(id);
                                    isMouseOverComponent = true;
                                }
                            }

                            
                        }

                        if (isMouseOverComponent) {
                            actionData.IsMouseOverComponent(isMouseOverComponent);
                            $('#renderCanvas').removeClass("customMousePointer");
                        }
                        else {
                            actionData.IsMouseOverComponent(false);
                            $('#renderCanvas').addClass("customMousePointer");
                        }

                        return;
                    }

                    var current = getGroundPosition(evt);

                    if (!current) {
                        return;
                    }

                    var diff = current.subtract(startingPoint);
                    currentMesh.position.addInPlace(diff);

                    startingPoint = current;

                }.bind(self);

                rcanvas.addEventListener("pointerdown", onPointerDown, false);
                rcanvas.addEventListener("pointerup", onPointerUp, false);
                rcanvas.addEventListener("pointermove", onPointerMove, false);

                initialScene.onDispose = function () {
                    rcanvas.removeEventListener("pointerdown", onPointerDown);
                    rcanvas.removeEventListener("pointerup", onPointerUp);
                    rcanvas.removeEventListener("pointermove", onPointerMove);
                }

                return initialScene;

            }.bind(self);

            var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
            scene = createScene();
            CT.dataStore.initializeData("sceneData");

            // add a loading screen so that nothing can be dropped onto the scene until the data has loaded
            engine.loadingScreen.loadingUIText = ".......................................";
            engine.loadingScreen.loadingUIBackgroundColor = "lavender";
            engine.displayLoadingUI();
            
            babylonEngine = engine;

            engine.runRenderLoop(function () {
                if (scene) {
                    scene.render();
                }
            });

            // Resize
            window.addEventListener("resize", function () {
                engine.resize();
            });

        }

        function getConnectors(color) {
            var c = CT.dataStore.babylonData().connectors();
            var l = c.length;
            var res = [];
            while (l--) {
                var cc = c[l];
                if (cc.data.color === color) {
                    res.push(cc.mesh);
                }
            }
            return res;
        }

        function getRods(color) {
            var c = CT.dataStore.babylonData().rods();
            var l = c.length;
            var res = [];
            while (l--) {
                var cc = c[l];
                if (cc.data.color === color) {
                    res.push(cc.mesh);
                }
            }
            return res;
        }

        function getGroup(groupid) {
            var c = CT.dataStore.babylonData().groups();
            var l = c.length;
            while (l--) {
                var cc = c[l];
                if (cc.data.guid === groupid) {
                    return cc;
                }
            }
            return null;
        }

        function findComponent(type, color, data, groupid) {
            if (groupid) {
                //var id = data.guid;
                // use the id of the component to find the vertices of the submesh
                var group = CT.controllers.AddToScene.getGroup(groupid);
                //var submeshes = group.subMeshes;
                //var submeshindex = _.findIndex(submeshes, function (e) { return e.Data.data.guid === id  });

                return { 'length': data.submeshes.length, 'index': data.data.index, 'group':group.mesh, 'type':'group' };
            }
            else {
                var id = data.guid;
                if (type === 'connector') {
                    var arr = CT.controllers.AddToScene.getConnectors(color);
                    var index = _.findIndex(arr,
                        function (o) { return o.Data.guid === id }
                    );
                    if (index !== -1) {
                        return arr[index];
                    }
                }
                else if (type === 'rod') {
                    var arr = CT.controllers.AddToScene.getRods(color);
                    var index = _.findIndex(arr,
                        function (o) { return o.Data.guid === id }
                    );
                    if (index !== -1) {
                        return arr[index];
                    }
                }
            }
            return null;
        }

        function findClosestSubmesh(matrix, subMeshArr, x, y, z) {
            var submeshes = subMeshArr;
            var l = submeshes[submeshes.length-1].Data.selectionPointCount;
            var meshindex = -1;
            var mindist = 1000;
            
            while (l--) {
                var submesh = submeshes[l];
                var vertices = submesh.Data.vertices;
                var local_position = new BABYLON.Vector3(vertices[0], vertices[1], vertices[2]);
                var global_position = BABYLON.Vector3.TransformCoordinates(local_position, matrix);
                var dist = Math.abs(global_position.x - x)
                    +
                    Math.abs(global_position.y - y)
                    +
                    Math.abs(global_position.z - z);
                if (dist < mindist) {
                    mindist = dist;
                    meshindex = l;
                }
            }

            if (meshindex === -1)
                return null;
            return submeshes[meshindex].Data.guid;
        }

        function getSubmeshIndexByGuid(connector, guid) {
            var l = connector.subMeshes.length;
            while (l--) {
                var data = connector.subMeshes[l].Data;
                if (data) {
                    if (data.guid === guid) {
                        return data.index;
                    }
                }
            }
            return null;
        }

        function getSubmeshRotation(connector, guid) {
            var submeshindex = getSubmeshIndexByGuid(connector, guid);
            var key = '' + (submeshindex + 1);
            return CT.dataStore.connectionPointRotationData[key];

        }

        function deepCloneObject(o, normalization) {
            var oo = {};
            //oo.Data = _.cloneDeep(o.Data);

            oo.verticesStart = o.verticesStart - normalization.vertices;
            oo.verticesCount = o.verticesCount;
            oo.indexStart = o.indexStart - normalization.index;
            oo.indexCount = o.indexCount;
            oo.Data = {};
            if (o.Data) {
                if (o.Data.hasOwnProperty("index")) {
                    oo.Data.index = o.Data.index;
                    oo.Data.guid = o.Data.guid;
                }
                oo.Data.materialIndex = o.Data.materialIndex;
                if (o.Data.hasOwnProperty("selectionPointCount")) {
                    oo.Data.selectionPointCount = o.Data.selectionPointCount;
                }
            }
            return oo;
        }

        function deepCloneArray(arr) {
            var a = [];
            var l = arr.length;
            if (l > 0) {
                var first = arr[0];
                // needed to subtract the vertices start and index start if the submeshes have been combined
                // they need to start at zero, so subtract the start number of the first submesh inside 'deepCloneObject'
                var normalization = { 'vertices': first.verticesStart, 'index': first.indexStart };
                while (l--) {
                    a.unshift(deepCloneObject(arr[l], normalization));
                }
            }
            return a;
        }

        function removeComponent(component1) {
            if (component1.Data.type === 'group') {
                var obs = CT.dataStore.babylonData().groups;
                var arr = obs();
                var groupind = _.findIndex(arr, function (e) { return e.data.guid === component1.Data.guid });
                arr.splice(groupind, 1);
                obs(arr);

                component1.dispose();
                return;
            }
            var obs = component1.Data.type === 'connector'
                ?
                CT.dataStore.babylonData().connectors
                :
                CT.dataStore.babylonData().rods;

            if (ko.isObservable(obs)) {
                var arr = obs();
                var ind = _.findIndex(arr, function (e) { return e.mesh.Data.guid === component1.Data.guid; });
                arr.splice(ind, 1);
                obs(arr);
            }
            component1.dispose();
        }


        function addSubmeshes(merged, arrOfArr) {
            var lll = arrOfArr.length;
            var iii = 0;
            var start2 = 0;
            var istart2 = 0;
            var vertexData = merged.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            var ind = 0;
            var maxmatindex = 0;
            var next = 0;
            var inext = 0;
            var matindex = 0;
            while (iii++ < lll) {

                var arr1 = arrOfArr[iii - 1];
                var arr2 = arrOfArr.length > iii ? arrOfArr[iii] : null;

                var l = arr1.length;
                
                while (l--) {
                    var a = arr1.shift();
                    var start = start2 + a.verticesStart;
                    var count = a.verticesCount;
                    var istart = istart2 + a.indexStart;
                    var icount = a.indexCount;
                    sub = new BABYLON.SubMesh(0, start, count, istart, icount, merged);
                    console.log(" " + start + " " + count + " " + istart + " " + icount + " ");
                    //sub.materialIndex = matindex + a.Data.materialIndex;
                    //if (sub.materialIndex > maxmatindex) {
                    //    maxmatindex = sub.materialIndex;
                    //}
                    var s1 = start * 3;
                    var c1 = count * 3;
                    sub.Data = {
                        'guid': createGuid(),
                        'groupindex': ind++//,
                      //  'materialIndex': sub.materialIndex
                    };
                    if (a.Data.hasOwnProperty("index")) {
                        sub.Data["index"] = a.Data.index;
                    }
                    if (a.Data.hasOwnProperty("selectionPointCount"))
                    {
                        sub.Data["selectionPointCount"] = a.Data.selectionPointCount;
                    }
                    if (count < 20) {
                        sub.Data['vertices'] = vertexData.slice(s1, s1 + c1);
                    }
                    next = start + count;
                    inext = istart + icount;
                    arr1.push(a);
                }
                ind = 0;
                if (arr2 != null) {
                    maxmatindex++;
                    start2 = next;
                    istart2 = inext;
                    matindex = maxmatindex;
                }

            }

        }

        function getMaterialIndexIndices(arr) {
            var l = arr.length;
            var i = -1;
            var indices = [];
            var start = { 'ii':0, 'max':0 };
            while (++i < l) {
                var meshes = arr[i].subMeshes;
                indices = indices.concat(meshes.map(function (e) {
                    if (e.materialIndex === 0) {
                        return 0;
                    }
                    var ind = this.ii + e.materialIndex;
                    if (ind > this.max) {
                        this.max = ind;
                    }
                    return ind;
                }.bind(start)));
                start.ii = start.max;
            }
            return indices;
        }

        function applyMaterial(group, indices) {
            var meshes = group.subMeshes;
            var l = meshes.length;
            while (l--) {
                var i = indices.pop();
                meshes[l].materialIndex = i;
            }
        }

        function createMergedMesh(aa, componentArr) {
            var data = {
                'color': 'multi',
                'type': 'group',
                'guid': createGuid()
            };
            var quaternionArr = [];
            var subMeshArr = [];
            var dataArr = [];


            var l = componentArr.length;
            var i = 0;
            var indicesArr = [0];
            var acc = 0;
            while (i++ < l) {
                var item = componentArr[i - 1];
                if (i > 1) {
                    acc += componentArr[i - 2].subMeshes.length;
                    indicesArr.push(acc);
                }
                quaternionArr.push(_.cloneDeep(item.rotationQuaternion));
                subMeshArr.push(deepCloneArray(item.subMeshes));
                dataArr.push(_.cloneDeep(item.Data));

                if (item.computeWorldMatrix) {
                    item.computeWorldMatrix(true);
                }
            }

            //var d1 = _.cloneDeep(component1.rotationQuaternion);
            //var d2 = deepCloneArray(component1.subMeshes);
            //var d3 = _.cloneDeep(component1.Data);

            //var e1 = _.cloneDeep(component2.rotationQuaternion);
            //var e2 = deepCloneArray(component2.subMeshes);
            //var e3 = _.cloneDeep(component2.Data);

            //component1.computeWorldMatrix(true);
            var group1 = BABYLON.Mesh.MergeMeshes(aa, false, true, undefined, false);
            group1.releaseSubMeshes();
            addSubmeshes(group1, subMeshArr);


            group1.Data = data;
            group1.Data.indicesArr = _.cloneDeep(indicesArr);
            var l = indicesArr.length;
            var i = 0;
            while (i++ < l) {
                var ind = indicesArr[i - 1];
                group1.subMeshes[ind].Data["quaternion"] = quaternionArr[i - 1];
                group1.subMeshes[ind].Data["submeshes"] = subMeshArr[i - 1];
                group1.subMeshes[ind].Data["data"] = dataArr[i - 1];
                group1.subMeshes[ind].Data.color = dataArr[i - 1].color;
                group1.subMeshes[ind].Data.type = dataArr[i - 1].type;
            }

            //group1.subMeshes[0].Data['quaternion'] = d1;
            //group1.subMeshes[0].Data['submeshes'] = d2;
            //group1.subMeshes[0].Data['data'] = d3;


            //group1.subMeshes[d2.length].Data['quaternion'] = e1;
            //group1.subMeshes[d2.length].Data['submeshes'] = e2;
            //group1.subMeshes[d2.length].Data['data'] = e3;

            return group1;
        }

        function createComponentArray() {

            var arr = arguments;
            function getSubarray(component) {
                var sub = [];
                var indices = component.Data.indicesArr;
                var l = indices.length;
                var i = 0;
                while (i++ < l) {
                    var ind1 = indices[i - 1];
                    var ind2 = indices.length > i ? indices[i] : component.subMeshes.length;
                    var ll = ind2 - ind1;
                    var o = { 'subMeshes': [], 'rotationQuaternion': component.rotationQuaternion, 'Data': component.subMeshes[ind1].Data.data };
                    while (ll--) {
                        o.subMeshes.push(component.subMeshes[ind1++]);
                    }
                    sub.push(o);
                }
                return sub;
            }

            var componentArr = [];

            var ll = arguments.length;
            var ii = 0;
            while (ii++ < ll) {
                var comp = arguments[ii-1];
                if (comp.Data.type === 'group') {
                    var subarr = getSubarray(comp);
                    var l = subarr.length;
                    var i = 0;
                    while (i++ < l) {
                        componentArr.push(subarr[i - 1]);
                    }
                }
                else {
                    componentArr.push(comp);
                }
            }

            return componentArr;

        }

        function getColors(aa, multimat) {
            var out = [];
            var ll = aa.length;
            var i = 0;
            while (i++ < ll) {
                var comp = aa[i - 1];
                if (comp.Data.type === 'group') {
                    var l = comp.Data.colors.length;
                    while (l--) {
                        var color = comp.Data.colors.shift();
                        multimat.subMaterials.push(getMaterial(color));
                        out.push(color);
                    }
                }
                else {
                    multimat.subMaterials.push(getMaterial(comp.Data.color));
                    out.push(comp.Data.color);
                }
            }
            return out;
        }

        function groupComponentsTogether() {
            var aa = arguments;
            // get the new material index indices for the new grouped mesh
            var materialIndexIndices = getMaterialIndexIndices(aa);
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            var blankMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            blankMaterial.alpha = 0;
            multimat.subMaterials.push(blankMaterial);
            var colors = getColors(aa, multimat);

            var componentArr = createComponentArray.apply(null, aa);
            var merged = createMergedMesh(aa, componentArr);
            merged.Data['colors'] = colors;
            
            applyMaterial(merged, materialIndexIndices);
            merged.material = multimat;

            CT.dataStore.babylonData().groups.push({ "data": merged.Data, "mesh":merged });

            var ll = aa.length;
            while (ll--) {
                removeComponent(aa[ll]);
            }
            var a = 1;
        }

        function findNewPosition(matrix, component, submeshes) {

            if (component.Data.type === 'group') {
                var data = component.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                var submesh = submeshes[submeshes.length - 2];
                var verts = submesh.Data.vertices;
                var pos = component.position;
                return new BABYLON.Vector3(verts[0] + pos.x, verts[1] + pos.y, verts[2] + pos.z);
            }
            else {

                var position = new BABYLON.Vector3(0, 0, 0);
                var newposition = BABYLON.Vector3.TransformCoordinates(position, matrix);
                return newposition;
            }

        }

        //function getVertices(component) {
        //    return component.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        //}

        //function getVectors(component) {
        //    var subMeshes = component.subMeshes;
        //    var vertices = getVertices(component);
        //}

        //function getVector(submeshes, closestId) {

        //}

        //function getNewPositionAndRotation(vectors, vector) {

        //}

        function connectSelectedComponent(x, y, z) {
            var actiondata = CT.dataStore.sceneLiveActionData();
            // find the two components that were selected
            var component1 = findComponent(actiondata.SelectedComponentType(), actiondata.SelectedComponentColor(), actiondata.SelectedComponentData(), actiondata.SelectedComponentGroupId());
            var component2 = findComponent(actiondata.MouseOverComponentType(), actiondata.MouseOverComponentColor(), actiondata.MouseOverComponentData(), actiondata.MouseOverComponentGroupId());

            // if the second component cannot be found
            if (component2 === null)
                return;

            var subMeshes2 = component2.subMeshes;
            var data2 = component2.Data;
            if (component2.type === 'group') {
                var index = component2.index;
                var length = component2.length;
                component2 = component2.group;
                // if it's a group, get the slice of components that was selected
                subMeshes2 = component2.subMeshes.slice(index, (index + length));
                data2 = subMeshes2;

                // update guids
                var inner = data2[0].Data.submeshes;
                var l = length;
                while (l--) {
                    data2[0].Data.submeshes[l].Data.guid = data2[l].Data.guid;
                }
                data2[0].Data.color = data2[0].Data.data.color;
                data2[0].Data.type = data2[0].Data.data.type;
            }

            component2.computeWorldMatrix();
            matrix = component2.getWorldMatrix(true);
            // find the closest submesh to the mouse pointer
            var closestSubmeshId2 = findClosestSubmesh(matrix, subMeshes2, x, y, z);

            var $ConnectMesh = CT.models.$ConnectMesh;
            var $ConnectMeshPair = CT.models.$ConnectMeshPair;
            var cmesh1 = $ConnectMesh(component1, component1.Data);
            var cmesh2 = $ConnectMesh(component2, data2);
            var pair = $ConnectMeshPair(cmesh1, cmesh2, closestSubmeshId2);
            var data = pair.getClosestConnectionData();

            component1.position = data.position;
            component1.rotationQuaternion = data.rotation;

            //var newposition = findNewPosition(matrix, component2, subMeshes2);
            //var rotation = getSubmeshRotation(component2, closestSubmeshId2);
            //var quat = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Number.MIN_VALUE);
            //if (rotation[2] !== 0) {
            //    var quatz = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), rotation[2] * Math.PI / 180);
            //    quat = quat.multiply(quatz);
            //}
            //if (rotation[1] !== 0) {
            //    var quaty = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), rotation[1] * Math.PI / 180);
            //    quat = quat.multiply(quaty);
            //}
            //if (rotation[0] !== 0) {
            //    var quatx = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), rotation[0] * Math.PI / 180);
            //    quat = quat.multiply(quatx);
            //}
            //component1.position = newposition;
            //component1.rotationQuaternion = quat;

            // connect the components together such that the submeshes are concatenated together
            groupComponentsTogether(component1, component2);


        }

        function getLights(dir) {
            return lights[dir];
        }


        self["getLights"] = getLights;
        self["initializeScene"] = initializeScene;
        self["getScene"] = function () { return scene; };
        self["getCamera"] = function () { return camera; };
        self["getCanvas"] = function () { return renderingCanvas; };
        self["getEngine"] = function () { return babylonEngine; };
        self["lastMeshAdded"] = function () { return lastMeshAdded; };
        self["getConnectors"] = getConnectors;
        self["getRods"] = getRods;
        self["getGroup"] = getGroup;
        self["connectSelectedComponent"] = connectSelectedComponent;
        self["findComponent"] = findComponent;
        self["groupComponentsTogether"] = groupComponentsTogether;
        self["createGuid"] = createGuid;



        return self;

    }
).call({}, CT);

module.exports = AddToSceneController;