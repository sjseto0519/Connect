addEventListener("message", function (evt) {
    importScripts("../../Utils/compression.js");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../../Content/Assets/" + evt.data + "Data.txt");
    xhr.onreadystatechange = function (oEvent) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                postMessage({ "type": this.type, "data": LZString.decompressFromUTF16(xhr.responseText.replace(/^\uFEFF/, '')) });
            } else {
                postMessage({ "Error": xhr.statusText });
            }
        }
    }.bind({ 'type': evt.data });
    xhr.send();
}, false);