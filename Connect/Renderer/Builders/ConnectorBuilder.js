
var ConnectorBuilder = (
    function (CT) {

        function addComponentData(color, components) {
            var l = components.length;
            if (l > 1) {
                components = [BABYLON.Mesh.MergeMeshes(components)];
                l = 1;
            }
            while (l--) {
                var component = components[l];
                $.merge(CT.dataStore.componentConnectorData[color].positions, component.getVerticesData(BABYLON.VertexBuffer.PositionKind));
                $.merge(CT.dataStore.componentConnectorData[color].indices, component.getIndices());

                //CT.dataStore.componentConnectorData[color].indices.concat(component.getIndices());
                component.dispose();
            }
        }

        function buildRed(scene, rotationQuaternion, translation) {
            var tesselation = 2;
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
           
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);



            var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

            var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

            var outer = BABYLON.CSG.FromMesh(cylinder1);

            var inner = BABYLON.CSG.FromMesh(cylinder2);

            var sub1 = outer.subtract(inner);

            cylinder1.dispose();

            cylinder2.dispose();

            var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
            mesh.material = myMaterial;

            var all = [];
            all.push(mesh);

            var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1.2, depth: 0.15 }, scene);
            flank1.position.x = -1.775;
            flank1.position.y = 0;
            flank1.position.z = -0.43;
            flank1.material = myMaterial;
            all.push(flank1);

            var flank2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 2.35, depth: 0.15 }, scene);
            flank2.position.x = -1.175;
            flank2.position.y = 0;
            flank2.position.z = 0.43;
            flank2.material = myMaterial;
            all.push(flank2);

            var nub1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub1.position.x = -1.55;
            nub1.position.y = 0;
            nub1.position.z = 0.35;
            nub1.material = myMaterial;
            all.push(nub1);

            var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub2.position.x = -1.55;
            nub2.position.y = 0;
            nub2.position.z = -0.35;
            nub2.material = myMaterial;
            all.push(nub2);

            var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.08, depth: 1 }, scene);
            bar2.position.x = -1.2;
            bar2.position.y = 0;
            bar2.position.z = 0;
            bar2.material = myMaterial;
            all.push(bar2);

            var flank3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
            flank3.position.x = -0.43;
            flank3.position.y = 0;
            flank3.position.z = -1.752;
            flank3.material = myMaterial;
            all.push(flank3);

            var flank4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 2.35 }, scene);
            flank4.position.x = 0.425;
            flank4.position.y = 0;
            flank4.position.z = -1.165;
            flank4.material = myMaterial;
            all.push(flank4);

            var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 0.08 }, scene);
            bar3.position.x = 0;
            bar3.position.y = 0;
            bar3.position.z = -1.2;
            bar3.material = myMaterial;
            all.push(bar3);

            var bar4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
            bar4.position.x = -0.82;
            bar4.position.y = 0;
            bar4.position.z = -0.28;
            bar4.material = myMaterial;
            bar4.addRotation(0, -0.4, 0);
            all.push(bar4);

            var bar5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
            bar5.position.x = -0.3;
            bar5.position.y = 0;
            bar5.position.z = -0.8;
            bar5.material = myMaterial;
            bar5.addRotation(0, -1.2, 0);
            all.push(bar5);

            var bar6 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
            bar6.position.x = -0.85;
            bar6.position.y = 0;
            bar6.position.z = -0.85;
            bar6.material = myMaterial;
            bar6.addRotation(0, 0.8, 0);
            all.push(bar6);

            var flank5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
            flank5.position.x = -0.95;
            flank5.position.y = 0;
            flank5.position.z = -1.55;
            flank5.material = myMaterial;
            flank5.addRotation(0, 0.8, 0);
            all.push(flank5);

            var flank7 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
            flank7.position.x = -1.55;
            flank7.position.y = 0;
            flank7.position.z = -0.9;
            flank7.material = myMaterial;
            flank7.addRotation(0, 0.8, 0);
            all.push(flank7);

            var nub3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub3.position.x = -1.4;
            nub3.position.y = 0;
            nub3.position.z = -0.85;
            nub3.material = myMaterial;
            all.push(nub3);
            var nub4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub4.position.x = -0.85;
            nub4.position.y = 0;
            nub4.position.z = -1.35;
            nub4.material = myMaterial;
            all.push(nub4);
            var nub5 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub5.position.x = -0.35;
            nub5.position.y = 0;
            nub5.position.z = -1.55;
            nub5.material = myMaterial;
            all.push(nub5);
            var nub6 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub6.position.x = 0.35;
            nub6.position.y = 0;
            nub6.position.z = -1.55;
            nub6.material = myMaterial;
            all.push(nub6);

         
                addComponentData('red', all);
            

            //var merge = BABYLON.Mesh.MergeMeshes(all);

            //CT.dataStore.componentConnectorData.red.positions
            //    = merge.getVerticesData(BABYLON.VertexBuffer.PositionKind).
            //        concat(
            //            connector2.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector3.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector5.getVerticesData(BABYLON.VertexBuffer.PositionKind)
            //        );
            //CT.dataStore.componentConnectorData.red.indices
            //    = merge.getIndices().
            //        concat(
            //            connector2.getIndices(),
            //            connector3.getIndices(),
            //            connector5.getIndices()
            //    );

            //merge.dispose();
            //connector2.dispose();
            //connector3.dispose();
            //connector5.dispose();

            //aa.push(connector2);
            //aa.push(connector3);
            //aa.push(connector5);

            //var length1 = allaa.length;
            //while (length1--) {
            //    aa.push(allaa[length1]);
            //}
            ////aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            //length1 = allaa.length;
            //while (length1--) {
            //    allaa[length1].dispose();
            //}
            //aaa.material = multimat;
            //aaa.subMeshes[0].materialIndex = 1;
            //aaa.subMeshes[1].materialIndex = 1;
            //aaa.subMeshes[2].materialIndex = 1;
        }

        function buildGreen(scene, rotationQuaternion, translation) {
            var tesselation = 2;
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
       
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);

            function createMesh(myMaterial, a) {



                var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

                var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

                var outer = BABYLON.CSG.FromMesh(cylinder1);

                var inner = BABYLON.CSG.FromMesh(cylinder2);

                var sub1 = outer.subtract(inner);

                cylinder1.dispose();

                cylinder2.dispose();

                var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
                mesh.material = myMaterial;

                var all = [];
                all.push(mesh);

                var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1.2, depth: 0.15 }, scene);
                flank1.position.x = -1.775;
                flank1.position.y = 0;
                flank1.position.z = -0.43;
                flank1.material = myMaterial;
                all.push(flank1);


                var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub2.position.x = -1.55;
                nub2.position.y = 0;
                nub2.position.z = -0.35;
                nub2.material = myMaterial;
                all.push(nub2);


                var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.08, depth: 1 }, scene);
                bar2.position.x = -1.2;
                bar2.position.y = 0;
                bar2.position.z = 0;
                bar2.material = myMaterial;
                all.push(bar2);

                if (a) {
                    var flank3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                    flank3.position.x = -0.43;
                    flank3.position.y = 0;
                    flank3.position.z = -1.752;
                    flank3.material = myMaterial;
                    all.push(flank3);
                }
                if (a) {
                    var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 0.08 }, scene);
                    bar3.position.x = 0;
                    bar3.position.y = 0;
                    bar3.position.z = -1.2;
                    bar3.material = myMaterial;
                    all.push(bar3);
                }
                var bar4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                bar4.position.x = -0.82;
                bar4.position.y = 0;
                bar4.position.z = -0.28;
                bar4.material = myMaterial;
                bar4.addRotation(0, -0.4, 0);
                all.push(bar4);
                if (a) {
                    var bar5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                    bar5.position.x = -0.3;
                    bar5.position.y = 0;
                    bar5.position.z = -0.8;
                    bar5.material = myMaterial;
                    bar5.addRotation(0, -1.2, 0);
                    all.push(bar5);
                }
                var bar6 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                bar6.position.x = -0.85;
                bar6.position.y = 0;
                bar6.position.z = -0.85;
                bar6.material = myMaterial;
                bar6.addRotation(0, 0.8, 0);
                all.push(bar6);

                if (a) {
                    var flank5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                    flank5.position.x = -0.95;
                    flank5.position.y = 0;
                    flank5.position.z = -1.55;
                    flank5.material = myMaterial;
                    flank5.addRotation(0, 0.8, 0);
                    all.push(flank5);
                }
                else {
                    var flank5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 2.44 }, scene);
                    flank5.position.x = -0.51;
                    flank5.position.y = 0;
                    flank5.position.z = -1.08;
                    flank5.material = myMaterial;
                    flank5.addRotation(0, 0.8, 0);
                    all.push(flank5);
                }
                var flank7 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                flank7.position.x = -1.55;
                flank7.position.y = 0;
                flank7.position.z = -0.9;
                flank7.material = myMaterial;
                flank7.addRotation(0, 0.8, 0);
                all.push(flank7);

                var nub3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub3.position.x = -1.4;
                nub3.position.y = 0;
                nub3.position.z = -0.85;
                nub3.material = myMaterial;
                all.push(nub3);
                var nub4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub4.position.x = -0.94;
                nub4.position.y = 0;
                nub4.position.z = -1.38;
                nub4.material = myMaterial;
                all.push(nub4);
                if (a) {
                    var nub5 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                    nub5.position.x = -0.35;
                    nub5.position.y = 0;
                    nub5.position.z = -1.55;
                    nub5.material = myMaterial;
                    all.push(nub5);
                }
                return BABYLON.Mesh.MergeMeshes(all);
            }
            var m1 = createMesh(myMaterial);
            var m2 = createMesh(myMaterial, true);
            m2.addRotation(0, 1.55, 0);
            m2.bakeCurrentTransformIntoVertices();

            var flank4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 2.35 }, scene);
            flank4.position.x = 0.425;
            flank4.position.y = 0;
            flank4.position.z = 1.175;
            flank4.material = myMaterial;


            var nub7 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub7.position.x = 0.35;
            nub7.position.y = 0;
            nub7.position.z = 1.55;
            nub7.material = myMaterial;

            addComponentData('green', [m1, m2, flank4, nub7]);

            //var connector1 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector1.position.x = 0;
            //connector1.position.y = 0;
            //connector1.position.z = 1.55;
            //connector1.material = myMaterial;

            //var connector3 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector3.position.x = -1.55;
            //connector3.position.y = 0;
            //connector3.position.z = 0;
            //connector3.material = myMaterial;

            //var connector4 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector4.position.x = -1.55;
            //connector4.position.y = 0;
            //connector4.position.z = 0;
            //connector4.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
            //connector4.material = myMaterial;

            //var connector5 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector5.position.x = -1.55;
            //connector5.position.y = 0;
            //connector5.position.z = 0;
            //connector5.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
            //connector5.material = myMaterial;

            ////var allaa = [m1, m2, flank4, nub7];
            ////aa.push(connector1);
            ////aa.push(connector3);
            ////aa.push(connector4);
            ////aa.push(connector5);

            //CT.dataStore.componentConnectorData.green.positions
            //    = m1.getVerticesData(BABYLON.VertexBuffer.PositionKind).
            //        concat(
            //            m2.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            flank4.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            nub7.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector1.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector3.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector4.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector5.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //        );
            //CT.dataStore.componentConnectorData.green.indices
            //    = m1.getIndices().
            //        concat(
            //            m2.getIndices(),
            //            flank4.getIndices(),
            //            nub7.getIndices(),
            //            connector1.getIndices(),
            //            connector3.getIndices(),
            //            connector4.getIndices(),
            //            connector5.getIndices(),
            //        );

            //var length1 = allaa.length;
            //while (length1--) {
            //    aa.push(allaa[length1]);
            //}
            //aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            //length1 = allaa.length;
            //while (length1--) {
            //    allaa[length1].dispose();
            //}
            //aaa.material = multimat;
            //aaa.subMeshes[0].materialIndex = 1;
            //aaa.subMeshes[1].materialIndex = 1;
            //aaa.subMeshes[2].materialIndex = 1;
            //aaa.subMeshes[3].materialIndex = 1;


            //return aaa;
        }

        function buildBlue(scene, rotationQuaternion, translation) {
            var rgb = CT.dataStore.colorData['blue'];
            var tesselation = 2;
            var color = new BABYLON.Color3(rgb.r, rgb.g, rgb.b);
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.diffuseColor = color;
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
          
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);

            function makeBlueFlake(myMaterial) {
                function makeFlake(myMaterial) {
                    function makeSide(myMaterial) {
                        function createMesh(myMaterial) {



                            var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

                            var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

                            var outer = BABYLON.CSG.FromMesh(cylinder1);

                            var inner = BABYLON.CSG.FromMesh(cylinder2);

                            var sub1 = outer.subtract(inner);

                            cylinder1.dispose();

                            cylinder2.dispose();

                            var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
                            mesh.material = myMaterial;

                            var all = [];
                            all.push(mesh);

                            var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1.2, depth: 0.15 }, scene);
                            flank1.position.x = -1.775;
                            flank1.position.y = 0;
                            flank1.position.z = -0.43;
                            flank1.material = myMaterial;
                            all.push(flank1);


                            var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                            nub2.position.x = -1.55;
                            nub2.position.y = 0;
                            nub2.position.z = -0.35;
                            nub2.material = myMaterial;
                            all.push(nub2);

                            var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.08, depth: 1 }, scene);
                            bar2.position.x = -1.2;
                            bar2.position.y = 0;
                            bar2.position.z = 0;
                            bar2.material = myMaterial;
                            all.push(bar2);

                            var flank3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                            flank3.position.x = -0.43;
                            flank3.position.y = 0;
                            flank3.position.z = -1.752;
                            flank3.material = myMaterial;
                            all.push(flank3);

                            var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 0.08 }, scene);
                            bar3.position.x = 0;
                            bar3.position.y = 0;
                            bar3.position.z = -1.2;
                            bar3.material = myMaterial;
                            all.push(bar3);

                            var bar4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                            bar4.position.x = -0.82;
                            bar4.position.y = 0;
                            bar4.position.z = -0.28;
                            bar4.material = myMaterial;
                            bar4.addRotation(0, -0.4, 0);
                            all.push(bar4);

                            var bar5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                            bar5.position.x = -0.3;
                            bar5.position.y = 0;
                            bar5.position.z = -0.8;
                            bar5.material = myMaterial;
                            bar5.addRotation(0, -1.2, 0);
                            all.push(bar5);

                            var bar6 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                            bar6.position.x = -0.85;
                            bar6.position.y = 0;
                            bar6.position.z = -0.85;
                            bar6.material = myMaterial;
                            bar6.addRotation(0, 0.8, 0);
                            all.push(bar6);

                            var flank5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                            flank5.position.x = -0.95;
                            flank5.position.y = 0;
                            flank5.position.z = -1.55;
                            flank5.material = myMaterial;
                            flank5.addRotation(0, 0.8, 0);
                            all.push(flank5);

                            var flank7 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                            flank7.position.x = -1.55;
                            flank7.position.y = 0;
                            flank7.position.z = -0.9;
                            flank7.material = myMaterial;
                            flank7.addRotation(0, 0.8, 0);
                            all.push(flank7);

                            var nub3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                            nub3.position.x = -1.4;
                            nub3.position.y = 0;
                            nub3.position.z = -0.85;
                            nub3.material = myMaterial;
                            all.push(nub3);
                            var nub4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                            nub4.position.x = -0.85;
                            nub4.position.y = 0;
                            nub4.position.z = -1.35;
                            nub4.material = myMaterial;
                            all.push(nub4);
                            var nub5 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                            nub5.position.x = -0.35;
                            nub5.position.y = 0;
                            nub5.position.z = -1.55;
                            nub5.material = myMaterial;
                            all.push(nub5);

                            return BABYLON.Mesh.MergeMeshes(all);
                        }
                        var m1 = createMesh(myMaterial);
                        var m2 = createMesh(myMaterial);
                        m2.addRotation(0, 1.55, 0);
                        return BABYLON.Mesh.MergeMeshes([m1, m2]);
                    }

                    var side = makeSide(myMaterial);
                    var side2 = makeSide(myMaterial);
                    side2.addRotation(0, 3.15, 0);

                    var bar = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                    bar.position.x = 0;
                    bar.position.y = 0;
                    bar.position.z = 0;
                    bar.material = myMaterial;

                    return BABYLON.Mesh.MergeMeshes([side, side2, bar]);
                }

                var flake = makeFlake(myMaterial);
                var mesh1 = BABYLON.CSG.FromMesh(flake);

                var bar1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.75, depth: 3.2 }, scene);
                bar1.position.x = 0;
                bar1.position.y = 0;
                bar1.position.z = 1.7;
                var mesh2 = BABYLON.CSG.FromMesh(bar1);
                var mesh3 = mesh1.subtract(mesh2);
                flake.dispose();
                bar1.dispose();
                var m1 = mesh3.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
                var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.12, depth: 1.2 }, scene);
                bar2.position.x = -0.44;
                bar2.position.y = 0;
                bar2.position.z = 0.5;
                bar2.material = myMaterial;

                var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.12, depth: 1.2 }, scene);
                bar3.position.x = 0.41;
                bar3.position.y = 0;
                bar3.position.z = 0.5;
                bar3.material = myMaterial;
                return BABYLON.Mesh.MergeMeshes([m1, bar2, bar3]);
            }

            var bluemesh = makeBlueFlake(myMaterial);
            var mesh1 = BABYLON.CSG.FromMesh(bluemesh);
            var bar1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1.6, depth: 1.6 }, scene);
            bar1.position.x = 0.01;
            bar1.position.y = 0;
            bar1.position.z = 1.85;
            bar1.addRotation(0, 0.8, 0);
            var mesh2 = BABYLON.CSG.FromMesh(bar1);
            var mesh3 = mesh1.subtract(mesh2);
            bluemesh.dispose();
            bar1.dispose();
            var m1 = mesh3.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
            //m1.material = myMaterial;



            var allaa = [m1];

            addComponentData('blue', allaa);

            //var aa = [];

            //var connector2 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector2.position.x = 0;
            //connector2.position.y = 0;
            //connector2.position.z = -1.55;
            //connector2.material = myMaterial;

            //var connector3 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector3.position.x = -1.55;
            //connector3.position.y = 0;
            //connector3.position.z = 0;
            //connector3.material = myMaterial;

            //var connector4 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector4.position.x = -1.55;
            //connector4.position.y = 0;
            //connector4.position.z = 0;
            //connector4.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
            //connector4.material = myMaterial;

            //var connector5 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector5.position.x = -1.55;
            //connector5.position.y = 0;
            //connector5.position.z = 0;
            //connector5.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
            //connector5.material = myMaterial;

            //var connector6 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector6.position.x = 0;
            //connector6.position.y = 0;
            //connector6.position.z = 1.55;
            //connector6.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
            //connector6.material = myMaterial;

            //var connector7 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector7.position.x = 0;
            //connector7.position.y = 0;
            //connector7.position.z = -1.55;
            //connector7.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
            //connector7.material = myMaterial;

            //var connector8 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector8.position.x = 1.55;
            //connector8.position.y = 0;
            //connector8.position.z = 0;
            //connector8.material = myMaterial;


            ////aa.push(connector2);
            ////aa.push(connector3);
            ////aa.push(connector4);
            ////aa.push(connector5);
            ////aa.push(connector6);
            ////aa.push(connector7);
            ////aa.push(connector8);

            ////var length1 = allaa.length;
            ////while (length1--) {
            ////    aa.push(allaa[length1]);
            ////}

            //CT.dataStore.componentConnectorData.blue.positions
            //= m1.getVerticesData(BABYLON.VertexBuffer.PositionKind).
            //    concat(
            //        connector2.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //        connector3.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //        connector4.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //        connector5.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //        connector6.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //        connector7.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //        connector8.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //    );
            //CT.dataStore.componentConnectorData.blue.indices
            //    = m1.getIndices().
            //        concat(
            //            connector2.getIndices(),
            //            connector3.getIndices(),
            //            connector4.getIndices(),
            //            connector5.getIndices(),
            //            connector6.getIndices(),
            //            connector7.getIndices(),
            //            connector8.getIndices(),
            //        );

            //m1.dispose();
            //connector2.dispose();
            //connector3.dispose();
            //connector4.dispose();
            //connector5.dispose();
            //connector6.dispose();
            //connector7.dispose();
            //connector8.dispose();
            

            //aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            //length1 = allaa.length;
            //while (length1--) {
            //    allaa[length1].dispose();
            //}
            //aaa.material = multimat;
            //aaa.subMeshes[0].materialIndex = 1;
            //aaa.subMeshes[1].materialIndex = 1;
            //aaa.subMeshes[2].materialIndex = 1;
            //aaa.subMeshes[3].materialIndex = 1;
            //aaa.subMeshes[4].materialIndex = 1;
            //aaa.subMeshes[5].materialIndex = 1;
            //aaa.subMeshes[6].materialIndex = 1;


            //return aaa;
        }

        function buildPurple(scene, rotationQuaternion, translation) {

            var tesselation = 2;

            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
         
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);

            function createMesh(myMaterial, a) {



                var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

                var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

                var outer = BABYLON.CSG.FromMesh(cylinder1);

                var inner = BABYLON.CSG.FromMesh(cylinder2);

                var sub1 = outer.subtract(inner);

                cylinder1.dispose();

                cylinder2.dispose();

                var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
                mesh.material = myMaterial;

                var all = [];
                all.push(mesh);

                var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1.2, depth: 0.15 }, scene);
                flank1.position.x = -1.775;
                flank1.position.y = 0;
                flank1.position.z = -0.43;
                flank1.material = myMaterial;
                all.push(flank1);


                var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub2.position.x = -1.55;
                nub2.position.y = 0;
                nub2.position.z = -0.35;
                nub2.material = myMaterial;
                all.push(nub2);

                var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.08, depth: 1 }, scene);
                bar2.position.x = -1.2;
                bar2.position.y = 0;
                bar2.position.z = 0;
                bar2.material = myMaterial;
                all.push(bar2);
                if (a) {
                    var flank3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                    flank3.position.x = -0.43;
                    flank3.position.y = 0;
                    flank3.position.z = -1.752;
                    flank3.material = myMaterial;
                    all.push(flank3);
                }
                else {
                    var flank3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.1 }, scene);
                    flank3.position.x = -0.43;
                    flank3.position.y = 0;
                    flank3.position.z = -0.652;
                    flank3.material = myMaterial;
                    all.push(flank3);
                }
                if (a) {
                    var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 0.08 }, scene);
                    bar3.position.x = 0;
                    bar3.position.y = 0;
                    bar3.position.z = -1.2;
                    bar3.material = myMaterial;
                    all.push(bar3);
                }
                var bar4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                bar4.position.x = -0.82;
                bar4.position.y = 0;
                bar4.position.z = -0.28;
                bar4.material = myMaterial;
                bar4.addRotation(0, -0.4, 0);
                all.push(bar4);
                if (a) {
                    var bar5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                    bar5.position.x = -0.3;
                    bar5.position.y = 0;
                    bar5.position.z = -0.8;
                    bar5.material = myMaterial;
                    bar5.addRotation(0, -1.2, 0);
                    all.push(bar5);
                }
                var bar6 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                bar6.position.x = -0.85;
                bar6.position.y = 0;
                bar6.position.z = -0.85;
                bar6.material = myMaterial;
                bar6.addRotation(0, 0.8, 0);
                all.push(bar6);

                var flank5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                flank5.position.x = -0.95;
                flank5.position.y = 0;
                flank5.position.z = -1.55;
                flank5.material = myMaterial;
                flank5.addRotation(0, 0.8, 0);
                all.push(flank5);

                var flank7 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                flank7.position.x = -1.55;
                flank7.position.y = 0;
                flank7.position.z = -0.9;
                flank7.material = myMaterial;
                flank7.addRotation(0, 0.8, 0);
                all.push(flank7);

                var nub3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub3.position.x = -1.4;
                nub3.position.y = 0;
                nub3.position.z = -0.85;
                nub3.material = myMaterial;
                all.push(nub3);
                var nub4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub4.position.x = -0.9;
                nub4.position.y = 0;
                nub4.position.z = -1.4;
                nub4.material = myMaterial;
                all.push(nub4);
                if (a) {
                    var nub5 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                    nub5.position.x = -0.35;
                    nub5.position.y = 0;
                    nub5.position.z = -1.55;
                    nub5.material = myMaterial;
                    all.push(nub5);
                }

                return BABYLON.Mesh.MergeMeshes(all);
            }
            var m1 = createMesh(myMaterial);
            var m2 = createMesh(myMaterial, true);
            m2.addRotation(0, 1.55, 0);

            var flank4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 3.55 }, scene);
            flank4.position.x = 0.425;
            flank4.position.y = 0;
            flank4.position.z = 0.6;
            flank4.material = myMaterial;



            var nub7 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub7.position.x = 0.35;
            nub7.position.y = 0;
            nub7.position.z = 1.55;
            nub7.material = myMaterial;

            var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 0.08 }, scene);
            bar2.position.x = 0;
            bar2.position.y = 0;
            bar2.position.z = 0;
            bar2.material = myMaterial;

            var aa = BABYLON.Mesh.MergeMeshes([m1, m2, flank4, nub7, bar2]);
            var outer = BABYLON.CSG.FromMesh(aa);

            var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.7, depth: 1.75 }, scene);
            bar3.position.x = 0;
            bar3.position.y = 0;
            bar3.position.z = -0.95;
            var inner = BABYLON.CSG.FromMesh(bar3);
            var tot1 = outer.subtract(inner);
            aa.dispose();
            bar3.dispose();
            var mesh1 = tot1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
            mesh1.material = myMaterial;

            var allaa = [mesh1];

            addComponentData('purple', allaa);

            //var aa = [];

            //var connector1 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector1.position.x = 0;
            //connector1.position.y = 0;
            //connector1.position.z = 1.55;
            //connector1.material = myMaterial;

            //var connector3 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector3.position.x = -1.55;
            //connector3.position.y = 0;
            //connector3.position.z = 0;
            //connector3.material = myMaterial;

            //var connector4 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector4.position.x = -1.55;
            //connector4.position.y = 0;
            //connector4.position.z = 0;
            //connector4.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
            //connector4.material = myMaterial;

            //var connector5 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector5.position.x = -1.55;
            //connector5.position.y = 0;
            //connector5.position.z = 0;
            //connector5.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
            //connector5.material = myMaterial;

            //aa.push(connector1);
            //aa.push(connector3);
            //aa.push(connector4);
            //aa.push(connector5);

            //var length1 = allaa.length;
            //while (length1--) {
            //    aa.push(allaa[length1]);
            //}
            //aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            //length1 = allaa.length;
            //while (length1--) {
            //    allaa[length1].dispose();
            //}
            //aaa.material = multimat;
            //aaa.subMeshes[0].materialIndex = 1;
            //aaa.subMeshes[1].materialIndex = 1;
            //aaa.subMeshes[2].materialIndex = 1;
            //aaa.subMeshes[3].materialIndex = 1;

            //return aaa;
        }

        function buildGray(scene, rotationQuaternion, translation) {

            var tesselation = 2;

            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
         
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);

            var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

            var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

            var outer = BABYLON.CSG.FromMesh(cylinder1);

            var inner = BABYLON.CSG.FromMesh(cylinder2);

            var sub1 = outer.subtract(inner);

            cylinder1.dispose();

            cylinder2.dispose();

            var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
            mesh.material = myMaterial;
            var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 2.35, depth: 0.15 }, scene);
            flank1.position.x = -1.175;
            flank1.position.y = 0;
            flank1.position.z = -0.43;
            flank1.material = myMaterial;

            var flank2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 2.35, depth: 0.15 }, scene);
            flank2.position.x = -1.175;
            flank2.position.y = 0;
            flank2.position.z = 0.43;
            flank2.material = myMaterial;

            var nub1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub1.position.x = -1.65;
            nub1.position.y = 0;
            nub1.position.z = 0.35;
            nub1.material = myMaterial;

            var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub2.position.x = -1.65;
            nub2.position.y = 0;
            nub2.position.z = -0.35;
            nub2.material = myMaterial;

            var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.08, depth: 1 }, scene);
            bar2.position.x = -1.2;
            bar2.position.y = 0;
            bar2.position.z = 0;
            bar2.material = myMaterial;


            var allaa = [mesh, flank1, flank2, nub1, nub2, bar2];

            addComponentData('gray', allaa);

            //var aa = [];

            //var connector3 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector3.position.x = -1.55;
            //connector3.position.y = 0;
            //connector3.position.z = 0;
            //connector3.material = myMaterial;

          
            //aa.push(connector3);

            //var length1 = allaa.length;
            //while (length1--) {
            //    aa.push(allaa[length1]);
            //}
            //aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            //length1 = allaa.length;
            //while (length1--) {
            //    allaa[length1].dispose();
            //}
            //aaa.material = multimat;
            //aaa.subMeshes[0].materialIndex = 1;

            //return aaa;
        }

        function buildOrange(scene, rotationQuaternion, translation) {
            var tesselation = 2;
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
            
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);

            var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

            var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

            var outer = BABYLON.CSG.FromMesh(cylinder1);

            var inner = BABYLON.CSG.FromMesh(cylinder2);

            var sub1 = outer.subtract(inner);

            cylinder1.dispose();

            cylinder2.dispose();

            var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
            mesh.material = myMaterial;
            var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 4.7, depth: 0.2 }, scene);
            flank1.position.x = 0;
            flank1.position.y = 0;
            flank1.position.z = -0.48;
            flank1.material = myMaterial;

            var flank2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 4.7, depth: 0.2 }, scene);
            flank2.position.x = 0;
            flank2.position.y = 0;
            flank2.position.z = 0.48;
            flank2.material = myMaterial;

            var nub1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.35, diameterBottom: 0.35, height: 1, tessellation: 24 }, scene);
            nub1.position.x = -1.65;
            nub1.position.y = 0;
            nub1.position.z = 0.4;
            nub1.material = myMaterial;

            var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.35, diameterBottom: 0.35, height: 1, tessellation: 24 }, scene);
            nub2.position.x = -1.65;
            nub2.position.y = 0;
            nub2.position.z = -0.4;
            nub2.material = myMaterial;

            var nub3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.35, diameterBottom: 0.35, height: 1, tessellation: 24 }, scene);
            nub3.position.x = 1.65;
            nub3.position.y = 0;
            nub3.position.z = 0.4;
            nub3.material = myMaterial;

            var nub4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.35, diameterBottom: 0.35, height: 1, tessellation: 24 }, scene);
            nub4.position.x = 1.65;
            nub4.position.y = 0;
            nub4.position.z = -0.4;
            nub4.material = myMaterial;

            var bar1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.1, depth: 1 }, scene);
            bar1.position.x = 1.2;
            bar1.position.y = 0;
            bar1.position.z = 0;
            bar1.material = myMaterial;

            var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.1, depth: 1 }, scene);
            bar2.position.x = -1.2;
            bar2.position.y = 0;
            bar2.position.z = 0;
            bar2.material = myMaterial;

            //var connector3 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector3.position.x = -1.55;
            //connector3.position.y = 0;
            //connector3.position.z = 0;
            //connector3.material = myMaterial;
            //var connector4 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector4.position.x = 1.55;
            //connector4.position.y = 0;
            //connector4.position.z = 0;
            //connector4.material = myMaterial;

            var allaa = [mesh, flank1, flank2, nub1, nub2, nub3, nub4, bar1, bar2];
            //aa.push(connector3);
            //aa.push(connector4);

            addComponentData('orange', allaa);

            //var length1 = allaa.length;
            //while (length1--) {
            //    aa.push(allaa[length1]);
            //}
            //aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            //length1 = allaa.length;
            //while (length1--) {
            //    allaa[length1].dispose();
            //}
            //aaa.material = multimat;
            //aaa.subMeshes[0].materialIndex = 1;
            //aaa.subMeshes[1].materialIndex = 1;

            //return aaa;
        }

        function buildWhite(scene, rotationQuaternion, translation)
        {
            var tesselation = 2;
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
          
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);




            function makeSide(myMaterial) {
                function createMesh(myMaterial) {



                    var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

                    var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

                    var outer = BABYLON.CSG.FromMesh(cylinder1);

                    var inner = BABYLON.CSG.FromMesh(cylinder2);

                    var sub1 = outer.subtract(inner);

                    cylinder1.dispose();

                    cylinder2.dispose();

                    var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
                    mesh.material = myMaterial;

                    var all = [];
                    all.push(mesh);

                    var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1.2, depth: 0.15 }, scene);
                    flank1.position.x = -1.775;
                    flank1.position.y = 0;
                    flank1.position.z = -0.43;
                    flank1.material = myMaterial;
                    all.push(flank1);


                    var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                    nub2.position.x = -1.55;
                    nub2.position.y = 0;
                    nub2.position.z = -0.35;
                    nub2.material = myMaterial;
                    all.push(nub2);

                    var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.08, depth: 1 }, scene);
                    bar2.position.x = -1.2;
                    bar2.position.y = 0;
                    bar2.position.z = 0;
                    bar2.material = myMaterial;
                    all.push(bar2);

                    var flank3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                    flank3.position.x = -0.43;
                    flank3.position.y = 0;
                    flank3.position.z = -1.752;
                    flank3.material = myMaterial;
                    all.push(flank3);

                    var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 0.08 }, scene);
                    bar3.position.x = 0;
                    bar3.position.y = 0;
                    bar3.position.z = -1.2;
                    bar3.material = myMaterial;
                    all.push(bar3);

                    var bar4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                    bar4.position.x = -0.82;
                    bar4.position.y = 0;
                    bar4.position.z = -0.28;
                    bar4.material = myMaterial;
                    bar4.addRotation(0, -0.4, 0);
                    all.push(bar4);

                    var bar5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                    bar5.position.x = -0.3;
                    bar5.position.y = 0;
                    bar5.position.z = -0.8;
                    bar5.material = myMaterial;
                    bar5.addRotation(0, -1.2, 0);
                    all.push(bar5);

                    var bar6 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                    bar6.position.x = -0.85;
                    bar6.position.y = 0;
                    bar6.position.z = -0.85;
                    bar6.material = myMaterial;
                    bar6.addRotation(0, 0.8, 0);
                    all.push(bar6);

                    var flank5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                    flank5.position.x = -0.95;
                    flank5.position.y = 0;
                    flank5.position.z = -1.55;
                    flank5.material = myMaterial;
                    flank5.addRotation(0, 0.8, 0);
                    all.push(flank5);

                    var flank7 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                    flank7.position.x = -1.55;
                    flank7.position.y = 0;
                    flank7.position.z = -0.9;
                    flank7.material = myMaterial;
                    flank7.addRotation(0, 0.8, 0);
                    all.push(flank7);

                    var nub3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                    nub3.position.x = -1.4;
                    nub3.position.y = 0;
                    nub3.position.z = -0.85;
                    nub3.material = myMaterial;
                    all.push(nub3);
                    var nub4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                    nub4.position.x = -0.85;
                    nub4.position.y = 0;
                    nub4.position.z = -1.35;
                    nub4.material = myMaterial;
                    all.push(nub4);
                    var nub5 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                    nub5.position.x = -0.35;
                    nub5.position.y = 0;
                    nub5.position.z = -1.55;
                    nub5.material = myMaterial;
                    all.push(nub5);

                    return BABYLON.Mesh.MergeMeshes(all);
                }
                var m1 = createMesh(myMaterial);
                var m2 = createMesh(myMaterial);
                m2.addRotation(0, 1.55, 0);
                return BABYLON.Mesh.MergeMeshes([m1, m2]);
            }

            var side = makeSide(myMaterial);
            var side2 = makeSide(myMaterial);
            side2.addRotation(0, 3.15, 0);
            side2.bakeCurrentTransformIntoVertices();

            var allaa = [side, side2];

            addComponentData('white', allaa);

            //var aa = [];
            //var connector1 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector1.position.x = 0;
            //connector1.position.y = 0;
            //connector1.position.z = 1.55;
            //connector1.material = myMaterial;

            //var connector2 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector2.position.x = 0;
            //connector2.position.y = 0;
            //connector2.position.z = -1.55;
            //connector2.material = myMaterial;
            //var connector3 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector3.position.x = -1.55;
            //connector3.position.y = 0;
            //connector3.position.z = 0;
            //connector3.material = myMaterial;

            //var connector4 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector4.position.x = -1.55;
            //connector4.position.y = 0;
            //connector4.position.z = 0;
            //connector4.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
            //connector4.material = myMaterial;
            //var connector5 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector5.position.x = -1.55;
            //connector5.position.y = 0;
            //connector5.position.z = 0;
            //connector5.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
            //connector5.material = myMaterial;
            //var connector6 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector6.position.x = 0;
            //connector6.position.y = 0;
            //connector6.position.z = 1.55;
            //connector6.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), 45 * Math.PI / 180);
            //connector6.material = myMaterial;
            //var connector7 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector7.position.x = 0;
            //connector7.position.y = 0;
            //connector7.position.z = -1.55;
            //connector7.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 1, 0), -45 * Math.PI / 180);
            //connector7.material = myMaterial;
            //var connector8 = BABYLON.MeshBuilder.CreateCylinder("cylinder",
            //    { diameterTop: 0.1, diameterBottom: 0.1, height: 0.1, tessellation: tesselation }, scene);
            //connector8.position.x = 1.55;
            //connector8.position.y = 0;
            //connector8.position.z = 0;
            //connector8.material = myMaterial;

            //CT.dataStore.componentConnectorData.white.positions
            //    = side.getVerticesData(BABYLON.VertexBuffer.PositionKind).
            //        concat(
            //            side2.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector1.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector2.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector3.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector4.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector5.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector6.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector7.getVerticesData(BABYLON.VertexBuffer.PositionKind),
            //            connector8.getVerticesData(BABYLON.VertexBuffer.PositionKind)
            //        );
            //CT.dataStore.componentConnectorData.white.indices
            //    = side.getIndices().
            //        concat(
            //            side2.getIndices(),
            //            connector1.getIndices(),
            //            connector2.getIndices(),
            //            connector3.getIndices(),
            //            connector4.getIndices(),
            //            connector5.getIndices(),
            //            connector6.getIndices(),
            //            connector7.getIndices(),
            //            connector8.getIndices()
            //        );

            //side.dispose();
            //side2.dispose();
            //connector1.dispose();
            //connector2.dispose();
            //connector3.dispose();
            //connector4.dispose();
            //connector5.dispose();
            //connector6.dispose();
            //connector7.dispose();
            //connector8.dispose();

            ////aa.push(connector1);
            ////aa.push(connector2);
            ////aa.push(connector3);
            ////aa.push(connector4);
            ////aa.push(connector5);
            ////aa.push(connector6);
            ////aa.push(connector7);
            ////aa.push(connector8);
            ////aa.push();
            ////var length1 = allaa.length;
            ////while (length1--) {
            ////    aa.push(allaa[length1]);
            ////}
            ////aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            ////length1 = allaa.length;
            ////while (length1--) {
            ////    allaa[length1].dispose();
            ////}
            ////aaa.material = multimat;
            ////aaa.subMeshes[0].materialIndex = 1;
            ////aaa.subMeshes[1].materialIndex = 1;
            ////aaa.subMeshes[2].materialIndex = 1;
            ////aaa.subMeshes[3].materialIndex = 1;
            ////aaa.subMeshes[4].materialIndex = 1;
            ////aaa.subMeshes[5].materialIndex = 1;
            ////aaa.subMeshes[6].materialIndex = 1;
            ////aaa.subMeshes[7].materialIndex = 1;

            //return aaa;
        }

        function buildYellow(scene, rotationQuaternion, translation) {

            var tesselation = 2;
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;
            var myMaterial1 = new BABYLON.StandardMaterial("myMaterial", scene);
         
            myMaterial1.alpha = 0;
            var multimat = new BABYLON.MultiMaterial("multi", scene);
            multimat.subMaterials.push(myMaterial);
            multimat.subMaterials.push(myMaterial1);



            function createMesh(myMaterial) {



                var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 1, height: 1, tessellation: 44 }, scene);

                var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.7, diameterBottom: 0.7, height: 1, tessellation: 44 }, scene);

                var outer = BABYLON.CSG.FromMesh(cylinder1);

                var inner = BABYLON.CSG.FromMesh(cylinder2);

                var sub1 = outer.subtract(inner);

                cylinder1.dispose();

                cylinder2.dispose();

                var mesh = sub1.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
                mesh.material = myMaterial;

                var all = [];
                all.push(mesh);

                var flank1 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1.2, depth: 0.15 }, scene);
                flank1.position.x = -1.775;
                flank1.position.y = 0;
                flank1.position.z = -0.43;
                flank1.material = myMaterial;
                all.push(flank1);


                var nub2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub2.position.x = -1.55;
                nub2.position.y = 0;
                nub2.position.z = -0.35;
                nub2.material = myMaterial;
                all.push(nub2);

                var bar2 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.08, depth: 1 }, scene);
                bar2.position.x = -1.2;
                bar2.position.y = 0;
                bar2.position.z = 0;
                bar2.material = myMaterial;
                all.push(bar2);

                var flank3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                flank3.position.x = -0.43;
                flank3.position.y = 0;
                flank3.position.z = -1.752;
                flank3.material = myMaterial;
                all.push(flank3);

                var bar3 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 0.08 }, scene);
                bar3.position.x = 0;
                bar3.position.y = 0;
                bar3.position.z = -1.2;
                bar3.material = myMaterial;
                all.push(bar3);

                var bar4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                bar4.position.x = -0.82;
                bar4.position.y = 0;
                bar4.position.z = -0.28;
                bar4.material = myMaterial;
                bar4.addRotation(0, -0.4, 0);
                all.push(bar4);

                var bar5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                bar5.position.x = -0.3;
                bar5.position.y = 0;
                bar5.position.z = -0.8;
                bar5.material = myMaterial;
                bar5.addRotation(0, -1.2, 0);
                all.push(bar5);

                var bar6 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.8, depth: 0.12 }, scene);
                bar6.position.x = -0.85;
                bar6.position.y = 0;
                bar6.position.z = -0.85;
                bar6.material = myMaterial;
                bar6.addRotation(0, 0.8, 0);
                all.push(bar6);

                var flank5 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                flank5.position.x = -0.95;
                flank5.position.y = 0;
                flank5.position.z = -1.55;
                flank5.material = myMaterial;
                flank5.addRotation(0, 0.8, 0);
                all.push(flank5);

                var flank7 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 1.2 }, scene);
                flank7.position.x = -1.55;
                flank7.position.y = 0;
                flank7.position.z = -0.9;
                flank7.material = myMaterial;
                flank7.addRotation(0, 0.8, 0);
                all.push(flank7);

                var nub3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub3.position.x = -1.4;
                nub3.position.y = 0;
                nub3.position.z = -0.85;
                nub3.material = myMaterial;
                all.push(nub3);
                var nub4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub4.position.x = -0.9;
                nub4.position.y = 0;
                nub4.position.z = -1.4;
                nub4.material = myMaterial;
                all.push(nub4);
                var nub5 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
                nub5.position.x = -0.35;
                nub5.position.y = 0;
                nub5.position.z = -1.55;
                nub5.material = myMaterial;
                all.push(nub5);

                return BABYLON.Mesh.MergeMeshes(all);
            }
            var aa = [];
            var m1 = createMesh(myMaterial);
            var m2 = createMesh(myMaterial);
            m2.addRotation(0, 1.55, 0);
            m2.bakeCurrentTransformIntoVertices();

            var flank4 = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 0.15, depth: 4.7 }, scene);
            flank4.position.x = 0.425;
            flank4.position.y = 0;
            flank4.position.z = 0;
            flank4.material = myMaterial;

            var nub6 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub6.position.x = 0.35;
            nub6.position.y = 0;
            nub6.position.z = -1.55;
            nub6.material = myMaterial;

            var nub7 = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0.3, diameterBottom: 0.3, height: 1, tessellation: 24 }, scene);
            nub7.position.x = 0.35;
            nub7.position.y = 0;
            nub7.position.z = 1.55;
            nub7.material = myMaterial;

            addComponentData('yellow', [m1, m2, flank4, nub6, nub7]);

            //return aaa;

        }

        function buildAll(scene, rotation, translation) {
            buildYellow(scene, rotation, translation);
            buildWhite(scene, rotation, translation);
            buildOrange(scene, rotation, translation);
            buildGray(scene, rotation, translation);
            buildRed(scene, rotation, translation);
            buildGreen(scene, rotation, translation);
            buildBlue(scene, rotation, translation);
            buildPurple(scene, rotation, translation);
         }



        function build(color, scene, rotation, translation) {

            if (color === 'yellow') {
                return buildYellow(scene, rotation, translation);
            }
            else if (color === 'white') {
                return buildWhite(scene, rotation, translation);
            }
            else if (color === 'orange') {
                return buildOrange(scene, rotation, translation);
            }
            else if (color === 'gray') {
                return buildGray(scene, rotation, translation);
            }
            else if (color === 'red') {
                return buildRed(scene, rotation, translation);
            }
            else if (color === 'green') {
                return buildGreen(scene, rotation, translation);
            }
            else if (color === 'blue') {
                return buildBlue(scene, rotation, translation);
            }
            else if (color === 'purple') {
                return buildPurple(scene, rotation, translation);
            }

        }

        var self = {
            build: build,
            buildAll: buildAll
        };



        return self;

    }
).call({}, CT);

module.exports = ConnectorBuilder;