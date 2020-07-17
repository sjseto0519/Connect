var $ConnectComponent = function(o)
{

    var component = o;
    component.id = component.type+"-"+component.color;

    var scene = CT.controllers.AddToScene.getScene();

        // add connection points to the connector
        function addConnectionPoints(mesh, color, material) {

            var connectionPoints = CT.dataStore.connectionPointData.connector[color];
            // set the tesselation low so that there aren't too many vertices
            var tesselation = 2;
            // set the alpha to zero so that the connection points don't show up
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            // make the invisible material always first
            multimat.subMaterials.push(myMaterial1);
            multimat.subMaterials.push(material);

            var center = {"x":0.05,"y":-0.05,"z":0};
            function move(c) {
                c.x -= center.x;
                c.y -= center.y;
                c.z -= center.z;
            }
            var aa = [];

            if (connectionPoints.indexOf(1) !== -1) {
                var connector1 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector1.position.x = -0.05;
                connector1.position.y = 0.05;
                connector1.position.z = 1.55;
                connector1.material = material;
                connector1.Data = { 'index':0 };
                aa.push(connector1);
            }

            if (connectionPoints.indexOf(2) !== -1) {
                var connector2 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector2.position.x = -0.05;
                connector2.position.y = 0.05;
                connector2.position.z = -1.55;
                connector2.material = material;
                connector2.Data = { 'index': 1 };
                aa.push(connector2);
            }

            if (connectionPoints.indexOf(3) !== -1) {
                var connector3 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector3.position.x = -1.55;
                connector3.position.y = 0.05;
                connector3.position.z = 0;
                connector3.material = material;
                connector3.Data = { 'index':2 };
                aa.push(connector3);
            }

            if (connectionPoints.indexOf(4) !== -1) {
                var connector4 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector4.position.x = -1.55;
                connector4.position.y = 0.05;
                connector4.position.z = 0;
                connector4.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
                connector4.material = material;
                connector4.Data = { 'index':3 };
                aa.push(connector4);
            }

            if (connectionPoints.indexOf(5) !== -1) {
                var connector5 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector5.position.x = -1.55;
                connector5.position.y = 0.05;
                connector5.position.z = 0;
                connector5.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
                connector5.material = material;
                connector5.Data = { 'index':4 };
                aa.push(connector5);
            }

            if (connectionPoints.indexOf(6) !== -1) {
                var connector6 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector6.position.x = 0;
                connector6.position.y = 0.05;
                connector6.position.z = 1.55;
                connector6.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
                connector6.material = material;
                connector6.Data = { 'index':5 };
                aa.push(connector6);
            }

            if (connectionPoints.indexOf(7) !== -1) {
                var connector7 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector7.position.x = 0;
                connector7.position.y = 0.05;
                connector7.position.z = -1.55;
                connector7.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
                connector7.material = material;
                connector7.Data = { 'index':6 };
                aa.push(connector7);
            }

            if (connectionPoints.indexOf(8) !== -1) {
                var connector8 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
                connector8.position.x = 1.55;
                connector8.position.y = 0.05;
                connector8.position.z = 0;
                connector8.material = material;
                connector8.Data = { 'index':7 };
                aa.push(connector8);
            }

            var connector9 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            connector9.position.x = 0;
            connector9.position.y = 0;
            connector9.position.z = 0;
            connector9.material = material;
            connector9.Data = { 'index': 7 };
            move(connector9.position);
            aa.push(connector9);

            aa.push(mesh);
            aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            aaa.material = multimat;
            length1 = aa.length - 1;
            aa[length1].dispose();
            aaa.subMeshes[length1].materialIndex = 1;
            aaa.subMeshes[length1].Data = { 'materialIndex':1, 'selectionPointCount':connectionPoints.length };
            var vertexData = aaa.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            // set the material of the submesh connection points so they don't show
            while (length1--) {
                var submesh = aaa.subMeshes[length1];
                submesh.materialIndex = 0;
                var start = submesh.verticesStart*3;
                var count = start + submesh.verticesCount * 3;
                var vertices = vertexData.slice(start, count);
                submesh.Data = {
                    'guid': CT.controllers.AddToScene.createGuid(),
                    'vertices': vertices,
                    'index': aa[length1].Data.index,
                    'materialIndex':0
                };
                aa[length1].dispose();
            }

            return aaa;
           

        }

// add the connection points that helps to align the rod with connectors
        function addRodConnectionPoints(mesh, color, material) {

            // set the alpha to zero so that the connection points don't show up
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);

            // the first submaterial is always the invisible one
            multimat.subMaterials.push(myMaterial1);
            multimat.subMaterials.push(material);

            var center = {
                "x": 0.44999991059303285,
                "y": -0.05,
                "z": 1.8369702127033028e-16
            };

            function move(c) {
                c.x -= center.x;
                c.y -= center.y;
                c.z -= center.z;
            }

            var height = CT.dataStore.rodData[color].length;
            var realhalf = height / 2.0;
            var aa = [];
            var connector6 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: 2 }, scene);
            connector6.position.x = -1.55;
            connector6.position.y = 0.05;
            connector6.position.z = 0;
            connector6.material = material;
            connector6.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), Math.PI);
            var diff = -1 * (height * -1 - 0.9 - 0.9);
            var pos =  - 1.55 - diff;
            connector6.position.x += (pos + realhalf + 1.4);
            //move(connector6.position);

            var connector7 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: 2 }, scene);
            connector7.position.x = -1.55 + realhalf + 1.4;
            connector7.position.y = 0.05;
            connector7.position.z = 0;
            connector7.material = material;
            //move(connector7.position);

            var connector8 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: 2 }, scene);
            connector8.position.x = -1.55;
            connector8.position.y = 0;
            connector8.position.z = 0;
            connector8.material = material;
            connector8.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), Math.PI);
            var pos = - 1.55 - (diff / 2.0);
            connector8.position.x += (pos + realhalf + 1.4);
            move(connector8.position);

            var connector9 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
                { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: 2 }, scene);
            connector9.position.x = -1.55;
            connector9.position.y = 0;
            connector9.position.z = 0.4;
            connector9.material = material;
            connector9.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), Math.PI);
            var pos = -1.55 - (diff / 2.0);
            connector9.position.x += (pos + realhalf + 1.4);
            move(connector9.position);

            aa.push(connector6);
            aa.push(connector7);
            aa.push(connector9);
            aa.push(connector8);
            aa.push(mesh);
            // merge the connection points such that they are submeshes to the original mesh
            aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            aaa.material = multimat;
            connector6.dispose();
            connector7.dispose();
            connector8.dispose();
            mesh.dispose();

            var vertexData = aaa.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            var length1 = 4;
            aaa.subMeshes[length1].materialIndex = 1;
            aaa.subMeshes[length1].Data = { 'materialIndex':1, 'selectionPointCount':2 };
            while (length1--) {
                var submesh = aaa.subMeshes[length1];
                submesh.materialIndex = 0;
                var start = submesh.verticesStart * 3;
                var count = start + submesh.verticesCount * 3;
                var vertices = vertexData.slice(start, count);
                submesh.Data = {
                    'guid': CT.controllers.AddToScene.createGuid(),
                    'vertices': vertices,
                    'materialIndex': 0
                };
            }

            return aaa;
        }

// called when a mesh has been dropped onto the scene and needs to be added
        function loadMesh(info, o) {

            // create a box so that the custom mesh has an actual working mesh to set vertices to
            var customMesh = BABYLON.MeshBuilder.CreateBox("box", { height: 0, width: 0, depth: 0 }, scene);

            o.guid = CT.controllers.AddToScene.createGuid();

            //moveToLeftTopCorner(customMesh);

            // set the color of the mesh based on the config
            var rgb = CT.dataStore.colorData[o.color];
            var color = new BABYLON.Color3(rgb.r, rgb.g, rgb.b);
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

            myMaterial.diffuseColor = color;
            customMesh.material = myMaterial;

            // initialize the vertex data to set the mesh to
            var vertexData = new BABYLON.VertexData();

            vertexData.positions = info.positions;
            vertexData.indices = info.indices;
            var length = info.indices.length;
            // each of the indices need two uvs, so loop through the number of indices
            vertexData.uvs = [];
            while (length--) {
                vertexData.uvs.push(0);
                vertexData.uvs.push(0);
            }
            var normals = [];
            BABYLON.VertexData.ComputeNormals(vertexData.positions, vertexData.indices, normals);
            vertexData.normals = normals; //Assignment of normal to vertexData added

            // applies the vertex data to the mesh, so that it is no longer in the shape of a box
            vertexData.applyToMesh(customMesh);
            // add the small cylinders that are used to line up the rods with the connectors
            //  no matter where they are positioned in the scene
            if (o.type === 'connector') {
                customMesh = addConnectionPoints(customMesh, o.color, myMaterial);
            }
            else if (o.type === 'rod') {
                customMesh = addRodConnectionPoints(customMesh, o.color, myMaterial);
            }
            // save the data to the custom mesh
            customMesh.Data = o;
            //customMesh.Data.material = myMaterial.clone();
            // save the last mesh that was added to the scene
            //lastMeshAdded = customMesh;
            return customMesh;

        }

    function loadComponent(afterLoad)
    {

            var id = component.id.split("-");
            if (id[0] === 'rod') {
                var color = id[1];
                if (!CT.dataStore.addToSceneData().loadedRods[color]()) {
                    CT.builders.Rod.build(color, CT.controllers.AddToScene.getScene());
                    CT.dataStore.addToSceneData().loadedRods[color](true);
                }
            }
            else {
                var color = id[1];
                if (!CT.dataStore.addToSceneData().loadedConnectors[color]()) {
                    CT.builders.Connector.build(color, CT.controllers.AddToScene.getScene());
                    CT.dataStore.addToSceneData().loadedConnectors[color](true);
                }
            }
            var loaderFunc = id[0] === 'connector'? CT.dataStore.componentConnectorData[id[1]] : CT.dataStore.componentRodData[id[1]];
            if (loaderFunc) {
                var meshInfo = loaderFunc;
                // load the mesh based on the configuration in 'o'
                var mesh = loadMesh(meshInfo, component);
                if (o.type === 'connector') {
                    CT.dataStore.babylonData().connectors.push({ 'data': component, 'mesh': mesh });
                }
                else if (o.type === 'rod') {
                    CT.dataStore.babylonData().rods.push({ 'data': component, 'mesh': mesh });
                }

                if (afterLoad)
                {
                    afterLoad();
                }

                if (component.centerPoint)
                {
                    var cm = CT.models.$ConnectMesh(mesh);
                    cm.rotateMeshToConnectionPoints(component.centerPoint, component.connectionPoints);
                    cm.moveMeshToCenterPoint(component.centerPoint);
                }

                return mesh;

            }

        return null;
    }

    
    return {
        'loadComponent': loadComponent
    };

}

module.exports = $ConnectComponent;