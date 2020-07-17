var $ConnectMesh = function(meshComponent, componentData)
{

    var mesh = meshComponent;
    var data = componentData;
    var isGroup = $.isArray(data);
    var groupSubmeshes = data;
    if (isGroup)
    {
        data = groupSubmeshes[0].Data;
    }
    var _vertices = null;
    var _indices = null;
    var _normals = null;
    var _subMeshes = null;
    var _subMeshesLength = null;
    var _centerPoint = null;
    var _rotationPoint = null;
    var _connectionPoints = null;
    var _type = null;
    var _color = null;
    var _vectors = null;

    function toCommonVector(v) {

        return { 'x':v.x, 'y':v.y, 'z':v.z };
    }

    function exportMesh()
    {
        // export the type, color, centerPoint, connectionPoints, and the group ID (if any)
        var type = getType();
        var color = getColor();
        var centerPoint = getActualCenterPoint();
        var connectionPoints = getActualConnectionPoints();
        var groupId = isGroup ? mesh.Data.guid : null;
        var exported = {
            'type': type,
            'color': color,
            'centerPoint': toCommonVector(centerPoint),
            'connectionPoints': [],
            'groupId': groupId
        };
        if (type === 'rod')
        {
            exported.rotationPoint = getActualRotationPoint();
        }
        var l = connectionPoints.length;
        while (l--) {
            exported.connectionPoints.unshift(toCommonVector(connectionPoints[l]));
        }
        return exported;
    }

    function getGroupId()
    {
        if (isGroup)
        {
            return data.guid;
        }
        return null;
    }

    function getMesh()
    {
        return mesh;
    }

    function getType()
    {
        if (_type !== null)
            return _type;
        _type = data.type;
        return _type;
    }

    function getQuaternion()
    {
        return mesh.rotationQuaternion;
    }

    function getPosition()
    {
        return mesh.position;
    }

    function getColor()
    {
        if (_color !== null)
            return _color;
        _color = data.color;
        return _color;
    }

    function getVertices()
    {
        if (_vertices !== null)
            return _vertices;
        _vertices = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        return _vertices;
    }

    function getIndices()
    {
        if (_indices !== null)
            return _indices;
        _indices = mesh.getIndices();
        return _indices;
    }

    function getNormals()
    {
        if (_normals !== null)
            return _normals;
        _normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
        return _normals;
    }

    function getSubmeshes()
    {
        if (_subMeshes !== null)
            return _subMeshes;
        if (isGroup)
        {
            return groupSubmeshes;
        }
        _subMeshes = mesh.subMeshes;
        return _subMeshes;
    }

    function getNumberOfSubmeshes()
    {
        if (_subMeshesLength !== null)
            return _subMeshesLength;
        _subMeshesLength = getSubmeshes().length;
        return _subMeshesLength;
    }

    function getCenterPoint()
    {
        if (_centerPoint !== null)
            return _centerPoint;
        var subMeshes = getSubmeshes();
        var center = subMeshes[getNumberOfSubmeshes()-2];
        var start = center.verticesStart * 3;
        var vertices = getVertices();
        _centerPoint = new BABYLON.Vector3(vertices[start], vertices[start+1], vertices[start+2]);
        return _centerPoint;
    }

    function getActualCenterPoint()
    {
        var center = getCenterPoint();
        var actual = getActualPosition(center);
        return actual;
    }

    function getRotationPoint() {
        if (_rotationPoint !== null)
            return _rotationPoint;
        var subMeshes = getSubmeshes();
        var center = subMeshes[getNumberOfSubmeshes() - 3];
        var start = center.verticesStart * 3;
        var vertices = getVertices();
        _rotationPoint = new BABYLON.Vector3(vertices[start], vertices[start + 1], vertices[start + 2]);
        return _rotationPoint;
    }

    function getActualRotationPoint() {
        var center = getRotationPoint();
        var actual = getActualPosition(center);
        return actual;
    }

    function getConnectionPoints()
    {
        if (_connectionPoints !== null)
            return _connectionPoints;
        var subMeshes = getSubmeshes();
        var l = subMeshes[getNumberOfSubmeshes()-1].Data.selectionPointCount;
        var vertices = getVertices();
        var a = [];
        while (l--)
        {
            var sub = subMeshes[l];
            var start = sub.verticesStart * 3;
            a.unshift(new BABYLON.Vector3(vertices[start], vertices[start+1], vertices[start+2]));
        }
        _connectionPoints = a;
        return _connectionPoints;
    }

    function getActualConnectionPoints() {
        var points = _.clone(getConnectionPoints());
        var l = points.length;
        while (l--) {
            var point = points[l];
            var actual = getActualPosition(point);
            points[l] = actual;
        }
        return points;
    }

    function getConnectionPointFromSubmesh(submesh)
    {
        var vertices = getVertices();
        var start = submesh.verticesStart * 3;
        return new BABYLON.Vector3(vertices[start], vertices[start+1], vertices[start+2]);
    }

    function getSubmeshById(id)
    {
        var subs = getSubmeshes();
        var ind = _.findIndex(subs, function(e) { return e.Data.guid === id; });
        return subs[ind];
    }

    function getActualPosition(v)
    {
        mesh.computeWorldMatrix();
        var matrix = mesh.getWorldMatrix(true);
        var actualposition = BABYLON.Vector3.TransformCoordinates(v, matrix);
        return actualposition;
    }

    function getVectors()
    {
        if (_vectors !== null)
            return _vectors;
        var type = getType();
        var centerPoint = getCenterPoint();
        var actualCenter = getActualPosition(centerPoint);
        var connectionPoints = getConnectionPoints();
        var vects = [];
        if (type === 'connector')
        {
            var l = connectionPoints.length;
            while (l--)
            {
                var point = connectionPoints[l];
                var actual = getActualPosition(point);
                var v = new BABYLON.Vector3(
                    (actualCenter.x - actual.x),
                    (actualCenter.y - actual.y),
                    (actualCenter.z - actual.z));
                vects.unshift(
                    { 'vector': v, 'actual':actual }
                );
            }
        }
        else if (type === 'rod')
        {
            var l = connectionPoints.length;
            while (l--)
            {
                var point = connectionPoints[l];
                var actual = getActualPosition(point);
                var v = new BABYLON.Vector3(
                    (actual.x - actualCenter.x),
                    (actual.y - actualCenter.y),
                    (actual.z - actualCenter.z));
                vects.unshift(
                    { 'vector': v, 'actual':actual }
                );
            }
        }
        _vectors = vects;
        return _vectors;
    }

    function getVectorsDisplay() {
        var vv = getVectors();
        var arr = [];
        var l = vv.length;
        while (l--) {
            arr.unshift({ 'x': vv[l].vector.x, 'y': vv[l].vector.y, 'z': vv[l].vector.z});
        }
        return JSON.stringify({ 'vectors': arr });
    }

    function getVectorById(subMeshId)
    {
        var type = getType();
        var centerPoint = getCenterPoint();
        var actualCenter = getActualPosition(centerPoint);
        var sub = getSubmeshById(subMeshId);
        var point = getConnectionPointFromSubmesh(sub);
        var actual = getActualPosition(point);
        if (type === 'connector')
        {
            return { 'vector': new BABYLON.Vector3(
                    (actualCenter.x - actual.x),
                    (actualCenter.y - actual.y),
                    (actualCenter.z - actual.z)),
                    'actual': actual
                }
                ;
        }
        else if (type === 'rod')
        {
            return { 'vector': new BABYLON.Vector3(
                    (actual.x - actualCenter.x),
                    (actual.y - actualCenter.y),
                    (actual.z - actualCenter.z)),
                    'actual': actual
                }
                ;
        }
    }

    function moveMeshToCenterPoint(centerPoint) {

        var center = getActualCenterPoint();
        var diff = getVectorDifference(center, centerPoint);
        var pos = getPosition();
        var newpos = getNewPosition(pos, diff);
        mesh.position = newpos;

    }

    function getNewPosition(actual, diff) {
        return new BABYLON.Vector3(actual.x + diff.x, actual.y + diff.y, actual.z + diff.z);
    }

    function getVectorDifference(a, b) {
        return new BABYLON.Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
    }

    function getVectorMagnitude(v) {
        return Math.sqrt(Math.pow(v.x, 2.0) + Math.pow(v.y, 2.0) + Math.pow(v.z, 2.0));
    }

    function getOppositeVector(v)
    {
        return new BABYLON.Vector3(v.x * -1.0, v.y * -1.0, v.z * -1.0);
    }

    function rotateMeshToConnectionPoints(centerPoint, connectionPoints) {
        var diff = getVectorDifference(centerPoint, connectionPoints[0]);
        var actualPts = getActualConnectionPoints();
        var actualCen = getActualCenterPoint();
        var actualdiff = getVectorDifference(actualCen, actualPts[0]);
        var unitVectors = getUnitVectors(actualdiff, diff);
        var quat = getQuaternionBetween(unitVectors[0], unitVectors[1]);
        mesh.rotationQuaternion = quat;
    }

    function getUnitVectors(v1, v2) {
        var v = [];
        var mag1 = getVectorMagnitude(v1);
        var mag2 = getVectorMagnitude(v2);
        v.push(new BABYLON.Vector3(v1.x / mag1, v1.y / mag1, v1.z / mag1));
        v.push(new BABYLON.Vector3(v2.x / mag2, v2.y / mag2, v2.z / mag2));
        return v;
    }

    function getAngleBetweenVectors(v1, v2) {
        return Math.acos(BABYLON.Vector3.Dot(v1, v2));
    }

    function getAxisBetweenVectors(v1, v2) {
        return BABYLON.Vector3.Cross(v1, v2);
    }

    function getQuaternionFromAxisAngle(axis, angle) {
        if (angle < 0.00000001) {
            return BABYLON.Quaternion.Identity();
        }
        return BABYLON.Quaternion.RotationAxis(axis, angle);
    }

    function getQuaternionBetween(v1, v2) {
        var angle = getAngleBetweenVectors(v1, v2);
        var axis = getAxisBetweenVectors(v1, v2);
        var quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
        return quaternion;
    }

    return {
        'getType': getType,
        'getColor': getColor,
        'getVertices': getVertices,
        'getIndices': getIndices,
        'getNormals': getNormals,
        'getSubmeshes': getSubmeshes,
        'getNumberOfSubmeshes': getNumberOfSubmeshes,
        'getCenterPoint': getCenterPoint,
        'getConnectionPoints': getConnectionPoints,
        'getActualConnectionPoints': getActualConnectionPoints,
        'getConnectionPointFromSubmesh': getConnectionPointFromSubmesh,
        'getSubmeshById': getSubmeshById,
        'getVectors': getVectors,
        'getVectorsDisplay': getVectorsDisplay,
        'getVectorById': getVectorById,
        'getActualPosition': getActualPosition,
        'getPosition': getPosition,
        'getQuaternion': getQuaternion,
        'getMesh': getMesh,
        'getActualCenterPoint': getActualCenterPoint,
        'exportMesh': exportMesh,
        'getGroupId': getGroupId,
        'rotateMeshToConnectionPoints': rotateMeshToConnectionPoints,
        'moveMeshToCenterPoint': moveMeshToCenterPoint,
        'getNewPosition': getNewPosition,
        'getVectorDifference': getVectorDifference
    };
}

module.exports = $ConnectMesh;