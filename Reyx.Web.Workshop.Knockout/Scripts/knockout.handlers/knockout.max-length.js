ko.bindingHandlers.maxlength = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        $(element).maxlength({
            max: value,
            showFeedback: false,
            onFull: function (v) {
                //value($(element).val());
                //console.log($(element).val());
                $(element).blur();
            }
        });

        //$(element).maxlength({
        //    limit: value
        //});
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
    }
};