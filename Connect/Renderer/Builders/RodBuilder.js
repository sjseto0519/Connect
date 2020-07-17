
var RodBuilder = (
    function (CT) {

        function addComponentData(color, components) {
            var l = components.length;
            //if (l > 1) {
                components = [BABYLON.Mesh.MergeMeshes(components)];
                l = 1;
            //}
            while (l--) {
                var component = components[l];
                $.merge(CT.dataStore.componentRodData[color].positions, component.getVerticesData(BABYLON.VertexBuffer.PositionKind));
                $.merge(CT.dataStore.componentRodData[color].indices, component.getIndices());

                //CT.dataStore.componentConnectorData[color].indices.concat(component.getIndices());
                component.dispose();
            }
        }

        function buildAll(scene, rotation, translation) {


            build("yellow", scene);
            build("white", scene);
            build("gray", scene);
            build("red", scene);
            build("green", scene);
            build("blue", scene);
            build("black", scene);
        }

        function build(color, scene) {

            CT.dataStore.addToSceneData().loadedRods[color](true);

            var height = CT.dataStore.rodData[color].length;

            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.alpha = 0;

            var half = (height - 7) / 2;

            var realhalf = height / 2.0;

            function addCone(x, y, z, rx, ry, rz, color, top, bottom, height) {
                var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

                myMaterial.diffuseColor = color;

                var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: top, height: height, diameterBottom: bottom, tessellation: 24 }, scene);
                cone.position.x = x;
                cone.position.y = y;
                cone.position.z = z;
                cone.material = myMaterial;
                cone.addRotation(rx, ry, rz);
                return cone;
            }

            var rotx = 1.57;
            var roty = 1.57;
            var cone1 = addCone(0 + realhalf, 0, 0, 1.57, 1.57, 0, color, 0.7, 0.5, 0.45);
            var cone2 = addCone(-0.45 + realhalf, 0, 0, 1.57, 1.57, 0, color, 0.5, 0.7, 0.45);


            var cone3 = addCone(0 - height + realhalf, 0, 0, rotx, roty, 0, color, 0.7, 0.5, 0.45);
            var cone4 = addCone(-0.45 - height + realhalf, 0, 0, rotx, roty, 0, color, 0.5, 0.7, 0.45);
            var cone5 = addCone(3.3 - height + half + realhalf, 0, 0, rotx, roty, 0, color, 0.7, 0.7, height - 0.85);

            var aa = BABYLON.Mesh.MergeMeshes([cone1, cone2, cone3, cone4, cone5]);
            var outer = BABYLON.CSG.FromMesh(aa);
            cone1.dispose();
            cone2.dispose();
            cone3.dispose();
            cone4.dispose();
            cone5.dispose();
            aa.dispose();

            var cone6 = addCone(3.3 - height + half + realhalf, 0.6, 0, rotx, roty, 0, color, 0.75, 0.75, height - 0.9);
            var cone7 = addCone(3.3 - height + half + realhalf, -0.6, 0, rotx, roty, 0, color, 0.75, 0.75, height - 0.9);

            var bb = BABYLON.Mesh.MergeMeshes([cone6, cone7]);
            var inner = BABYLON.CSG.FromMesh(bb);
            cone6.dispose();
            cone7.dispose();
            bb.dispose();

            var res = outer.subtract(inner);
            var mesh1 = res.toMesh("csg", new BABYLON.StandardMaterial("mat", scene), scene);
            mesh1.material = myMaterial;
            
            //mesh1.position.z = -0.025;
            //mesh1.position.x = -0.075;
            var aa = [];

            aa.push(mesh1);

            addComponentData(color, aa);

            //aaa = BABYLON.Mesh.MergeMeshes(aa, true, true, undefined, true);
            //aaa.material = myMaterial1;

            //return aaa;
        }

        var self = {
            build: build,
            buildAll: buildAll
        };



        return self;

    }
).call({}, CT);

module.exports = RodBuilder;