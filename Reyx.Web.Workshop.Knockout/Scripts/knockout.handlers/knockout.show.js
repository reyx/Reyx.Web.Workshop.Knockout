ko.bindingHandlers.show = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).toggle(valueAccessor())
    },
    update: function (element, valueAccessor) {
        element = $(element);
        if (ko.utils.unwrapObservable(valueAccessor()))
            element.show();
        else
            element.hide();
    }
};