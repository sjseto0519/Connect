var Slider = function (config, path) {

    var self = this;
    self.min = config.min;
    self.max = config.max;
    self.suffix = config.suffix || '';
    self.id = config.id;

    var slidecontainer = $('<div>', { 'class': 'slidecontainer' });

    var input = $('<input>', {
        'type': 'range', 'min': self.min, 'max': self.max, 'class': 'slider', 'style':'opacity:0.0'
    });

    input.on({
        'input change': function (e) {
            var target = e.target;
            var self = this;
            var val = $(target).prop("value");
            $('#span-' + self.id).html('' + val + self.suffix);
            var width = $(target).width() - 57;
            $('#' + self.id).css('left', '' + (parseInt(100.0 * (val / (self.max * 1.0)))) + '%');
        }.bind({ 'id':self.id, 'max':self.max, 'suffix':self.suffix })
    });

    var odiv = $('<div>', { 'style':'position:absolute; top:0px; width:100%; height:20px; padding-left:15px; padding-right:78px; pointer-events:none; z-index:100; margin-top:5px' });

    var div = $('<div>', {
        'style': 'position: relative; top: -2px; left: 56%; width: 50px; height: 24px; color:black; text-align: center; background-color: rgba(255, 255, 255, 0.8); border: 1px dotted black; border-radius: 10px; pointer-events: none; padding-top: 0px;',
        'id': self.id
    });

    var ispan = $('<span>', { 'id':'span-'+self.id, 'style':'position:relative; top:-2px;' });

    div.append(ispan);

    odiv.append(div);

    var bdiv = $('<div>', { 'style': 'position:absolute; top:10px; left:15px; opacity:1; pointer-events:none; width:90%; height:10px; background: #fff; border:1px black dotted; border-radius:10px' });

    CT.utils.dataBind(input, "value:$data", path);

    slidecontainer.append(input);

    slidecontainer.append(odiv);

    slidecontainer.append(bdiv);

    return slidecontainer;

}

module.exports = Slider;