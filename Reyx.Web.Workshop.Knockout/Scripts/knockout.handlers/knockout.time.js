ko.bindingHandlers.time = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor() || {};
        var target = $(element);
        var value = valueAccessor();
        target.setMask("29:99").on('keyup', function (e) {
            value(element.value);
        });
    },
    update: function (element, valueAccessor) {
        var target = $(element);
        var value = valueAccessor();
        target.val(value());
    }
};