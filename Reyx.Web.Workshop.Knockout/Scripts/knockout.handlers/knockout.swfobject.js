ko.bindingHandlers.swfobject = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = valueAccessor() || {};

        $(element).flash({
            swf: options.src(),
            width: options.width(),
            height: options.height(),
            flashvars: options.flashVars(),
            version: '9.0.0'
        });
    }
};