ko.bindingHandlers.addDataBinding = {
    init: function (element, valueAccessor, allBindings, bindingContext, vm) {

        var el = $(element);

        var value = ko.unwrap(valueAccessor());

        var elementType = value.elementType;

        var dataBinding = value.dataBinding;

        var data = value.data;

        if (data && data.elementType) {
            elementType = data.elementType;
        }

        var textbinding = value.textBinding;

        var binding = dataBinding + ':' + R._obj(data).customStringify();

        if (textbinding && !R._str(textbinding).isNullOrEmpty()) {
            binding += ", value:" + textbinding;
        }

        var ee = $('<' + elementType + '>', { 'data-bind': binding });

        el.append(ee);

    }
};