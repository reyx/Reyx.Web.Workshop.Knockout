ko.bindingHandlers.fade = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).hide();
    },
    update: function (element, valueAccessor) {
        var value = valueAccessor()
        if (ko.utils.unwrapObservable(value)) {
            $(element).fadeIn('slow');
        } else {
            $(element).hide();
        }
    }
};