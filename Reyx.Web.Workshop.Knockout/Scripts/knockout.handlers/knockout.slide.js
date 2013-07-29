ko.bindingHandlers.slide = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).toggle(ko.utils.unwrapObservable(valueAccessor()));
    },
    update: function (element, valueAccessor) {
        element = $(element);
        if (ko.utils.unwrapObservable(valueAccessor()))
            element.slideDown();
        else
            element.slideUp();
    }
};