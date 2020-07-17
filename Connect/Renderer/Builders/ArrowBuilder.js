
var ArrowBuilder = (
    function (CT) {


        function build(axis, direction, color, scene) {

            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

            myMaterial.diffuseColor = color;

            var centerPosition = null;

            var selectedObject = CT.dataStore.sceneLiveActionData().SelectedComponentObject();
            if (selectedObject !== null) {
                var vertices = selectedObject.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                var centerPointMesh = selectedObject.subMeshes[selectedObject.subMeshes.length - 2];
                var start = centerPointMesh.verticesStart * 3;
                var vect = new BABYLON.Vector3(vertices[start], vertices[start + 1], vertices[start + 2]);
                var matrix = selectedObject.getWorldMatrix(true);
                var newposition = BABYLON.Vector3.TransformCoordinates(vect, matrix);
                centerPosition = newposition;
            }

            function buildArrowLeft(distanceFromCenter) {
                var myPath = [
                    new BABYLON.Vector3(0.0 - distanceFromCenter, 0.0, 3.0),
                    new BABYLON.Vector3(-2.0 - distanceFromCenter, 0.0, 0.0),
                    new BABYLON.Vector3(0.0 - distanceFromCenter, 0, -3.0)
                ];

                //Create ribbon with updatable parameter set to true for later changes
                var tube = BABYLON.MeshBuilder.CreateTube("tube", { path: myPath, radius: 0.25, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, scene);

                var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameterBottom: 1.0, height: 1.5, tessellation: 96 }, scene);
                
                if (direction === 'left') {
                    cone.position = myPath[2].add(new BABYLON.Vector3(0.0, 0, 0.0));
                    cone.rotation = new BABYLON.Vector3(-90 * Math.PI / 180, -40 * Math.PI / 180, 0);
                }
                else {
                    cone.position = myPath[0].add(new BABYLON.Vector3(0.0, 0, 0.0));
                    cone.rotation = new BABYLON.Vector3(90 * Math.PI / 180, 40 * Math.PI / 180, 0);
                }
                return [cone, tube];
            }

            function buildArrowRight(distanceFromCenter) {
                var myPath = [
                    new BABYLON.Vector3(0.0 + distanceFromCenter, 0.0, 3.0),
                    new BABYLON.Vector3(2.0 + distanceFromCenter, 0.0, 0.0),
                    new BABYLON.Vector3(0.0 + distanceFromCenter, 0, -3.0)
                ];

                //Create ribbon with updatable parameter set to true for later changes
                var tube = BABYLON.MeshBuilder.CreateTube("tube", { path: myPath, radius: 0.25, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, scene);

                var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameterBottom: 1.0, height: 1.5, tessellation: 96 }, scene);

                if (direction === 'left') {
                    cone.position = myPath[0].add(new BABYLON.Vector3(0.0, 0, 0.0));
                    cone.rotation = new BABYLON.Vector3(90 * Math.PI / 180, -40 * Math.PI / 180, 0);
                }
                else {
                    cone.position = myPath[2].add(new BABYLON.Vector3(0.0, 0, 0.0));
                    cone.rotation = new BABYLON.Vector3(-90 * Math.PI / 180, 40 * Math.PI / 180, 0);
                }

                return [cone, tube];
            }

            var distanceFromCenter = 3;
            var arrow = BABYLON.Mesh.MergeMeshes(buildArrowLeft(distanceFromCenter).concat(buildArrowRight(distanceFromCenter)));
            arrow.material = myMaterial;
            if (axis === 'x') {
                arrow.rotation = new BABYLON.Vector3(0, 0, 90 * Math.PI / 180);
            }
            else if (axis === 'y') {
                arrow.rotation = new BABYLON.Vector3(0, 0, 0);
            }
            else if (axis === 'z') {
                arrow.rotation = new BABYLON.Vector3(-90 * Math.PI / 180, 0, 0);
            }
            if (centerPosition !== null) {
                arrow.position = centerPosition;
            }
            CT.dataStore.babylonData().arrows.push(arrow);
        }

        var self = {
            build: build
        };



        return self;

    }
).call({}, CT);

module.exports = ArrowBuilder;