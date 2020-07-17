// represents a pair of a connector/rod and another connector/rod part represented by the subMeshId
var $ConnectMeshPair = function(connectMesh1, connectMesh2, subMeshId)
{
    var first = connectMesh1;
    var second = connectMesh2;
    var id = subMeshId;

    function getAngleBetweenVectors(v1, v2)
    {
        return Math.acos(BABYLON.Vector3.Dot(v1, v2));
    }

    function getAxisBetweenVectors(v1, v2)
    {
        return BABYLON.Vector3.Cross(v1,v2);
    }

    function getQuaternionFromAxisAngle(axis, angle)
    {
        if (angle < 0.00000001)
        {
            return BABYLON.Quaternion.Identity();
        }
        return BABYLON.Quaternion.RotationAxis(axis, angle);
    }

    function getQuaternionBetween(v1, v2)
    {
        var angle = getAngleBetweenVectors(v1, v2);
        var axis = getAxisBetweenVectors(v1, v2);
        var quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
        return quaternion;
    }

    function getVectorMagnitude(v)
    {
        return Math.sqrt(Math.pow(v.x, 2.0) + Math.pow(v.y, 2.0) + Math.pow(v.z, 2.0));
    }

    function getUnitVector(v1)
    {
        var mag = getVectorMagnitude(v1);
        return new BABYLON.Vector3(v1.x / mag, v1.y / mag, v1.z / mag)
    }

    function getUnitVectors(v1, v2)
    {
        var v = [];
        var mag1 = getVectorMagnitude(v1);
        var mag2 = getVectorMagnitude(v2);
        v.push(new BABYLON.Vector3(v1.x / mag1, v1.y / mag1, v1.z / mag1));
        v.push(new BABYLON.Vector3(v2.x / mag2, v2.y / mag2, v2.z / mag2));
        return v;
    }

    function getOppositeVector(v)
    {
        return new BABYLON.Vector3(v.x * -1.0, v.y * -1.0, v.z * -1.0);
    }

    function getPossibleConnections()
    {
        var firstVectors = first.getVectors();
        var sv = second.getVectorById(id);
        var secondVector = getOppositeVector(sv.vector);
        var secondUnit = getUnitVector(secondVector);
        var l = firstVectors.length;
        var connections = [];
        while (l--)
        {
            var v = firstVectors[l].vector;
            var unit = getUnitVector(v);
            var angle = getAngleBetweenVectors(unit, secondUnit);
            var axis = getAxisBetweenVectors(unit, secondUnit);
            connections.push( { 'vector': v, 'angle':angle, 'axis':axis, 'unit':unit, 'index':l, 'secondUnit':secondUnit });
            
        }
            return connections;
        
    }

    function addTwoVectors(v1, v2)
    {
        return new BABYLON.Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    function getActualPosition(mesh, pt)
    {
        mesh.computeWorldMatrix();
        var matrix = mesh.getWorldMatrix(true);
        var actualposition = BABYLON.Vector3.TransformCoordinates(pt, matrix);
        return actualposition;
    }

    function getClosestConnectionData()
    {
        var firstVectors = first.getVectors();
        var sv = second.getVectorById(id);
        var secondVector = sv.vector;
        var secondUnit = getUnitVector(secondVector);
        var l = firstVectors.length;
        var minangle = 1000;
        var axis = null;
        var vector = null;
        var actual = null;
        var ind = -1;
        while (l--)
        {
            var v = firstVectors[l].vector;
            var unit = getUnitVector(v);
            var angle = getAngleBetweenVectors(unit, secondUnit);
            if (angle < minangle)
            {
                axis = getAxisBetweenVectors(unit, secondUnit);
                minangle = angle;
                actual = firstVectors[l].actual;
                vector = v;
                ind = l;
            }
        }
        if (ind !== -1)
        {
            var firstactual = firstVectors[ind].actual;
            var secondactual = sv.actual;
            var diff = getVectorDifference(firstactual, secondactual);
            var q = getQuaternionFromAxisAngle(axis, minangle);
            if (BABYLON.Quaternion.IsIdentity(q))
            {
                return { 'position':getNewPosition(first.getPosition(), diff), 'rotation':getNewQuaternion(q) };
            }
            else
            {
                var matrix = new BABYLON.Matrix();
                q.toRotationMatrix(matrix);
                var resVect = new BABYLON.Vector3();

                BABYLON.Vector3.TransformCoordinatesToRef(vector, matrix, resVect);
                //BABYLON.Vector3.TransformCoordinatesToRef(vector, matrix, resVect);

                var diff2 = getVectorDifference(resVect, vector);
                diff = addTwoVectors(diff, diff2);
                var rr = { 'position':getNewPosition(first.getPosition(), diff), 'rotation':getNewQuaternion(q) };
                //var mesh = first.getMesh();
                //mesh.rotationQuaternion = rr.rotation;
                //var cm = CT.models.$ConnectMesh(mesh);
                //var points = cm.getConnectionPoints();
                //var pt = points[ind];
                //var newactual = getActualPosition(mesh, pt);
                //var diff3 = getVectorDifference(firstactual, newactual);
                return rr;
            }
        }
        return null;
    }

    function getNewQuaternion(q)
    {
        var qq = first.getQuaternion();
        if (BABYLON.Quaternion.IsIdentity(q))
        {
            return qq;
        }
        if (qq === undefined)
        {
            return q;
        }
        return q.multiply(qq);
    }

    function getNewPosition(actual, diff)
    {
        return new BABYLON.Vector3(actual.x + diff.x, actual.y + diff.y, actual.z + diff.z);
    }

    function getVectorDifference(a, b)
    {
        return new BABYLON.Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
    }

    return {
        'getAngleBetweenVectors': getAngleBetweenVectors,
        'getAxisBetweenVectors': getAxisBetweenVectors,
        'getQuaternionBetween' : getQuaternionBetween,
        'getUnitVectors': getUnitVectors,
        'getVectorMagnitude': getVectorMagnitude,
        'getPossibleConnections': getPossibleConnections,
        'getOppositeVector': getOppositeVector,
        'getQuaternionFromAxisAngle': getQuaternionFromAxisAngle,
        'getClosestConnectionData': getClosestConnectionData,
        'getVectorDifference': getVectorDifference,
        'getNewPosition': getNewPosition,
        'getNewQuaternion': getNewQuaternion,
        'addTwoVectors': addTwoVectors
    };
}

module.exports = $ConnectMeshPair;