var $ConnectMeshGroup = function(o)
{

    var mesh = o;

    function getConnectMeshes()
    {
        var m = [];
        var indices = mesh.Data.indicesArr;
        var l = indices.length;
        while (l--)
        {
            var index = indices[l];
            var next = indices.length === (l+1) ? mesh.subMeshes.length : indices[l+1];
            m.unshift(CT.models.$ConnectMesh(mesh, mesh.subMeshes.slice(index, next)));
        }
        return m;
    }

    function exportMesh()
    {
            var meshes = getConnectMeshes();
          
            var arr = [];
            var l = meshes.length;
            while (l--) {
                var cm = meshes[l];
                arr.unshift(cm.exportMesh());
            }
        
            return arr;
    }
    
    return {
        'getConnectMeshes': getConnectMeshes,
        'exportMesh': exportMesh
    };
}

module.exports = $ConnectMeshGroup;