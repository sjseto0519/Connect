var DragAndDropImage = function (config) {

    var self = this;

    self.style = config.style+' ;z-index:99999; position:relative; cursor:pointer';
    self.src = config.src;
    self.id = config.id;
    self.data = config.data;

    var img = $('<img>', { 'style':self.style, 'src':self.src, 'id':self.id });

    if (self.data) {
        for (var prop in self.data) {
            img.data(prop, self.data[prop]);
        }
    }

    img.draggable({ revert: true });

    return img;
}

module.exports = DragAndDropImage;