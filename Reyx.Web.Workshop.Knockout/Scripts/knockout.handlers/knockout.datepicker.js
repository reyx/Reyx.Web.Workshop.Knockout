ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {};

        options.changeMonth = true;
        options.changeYear = true;

        options.onSelect = function () {
            var observable = valueAccessor();
            var d = $(element).datepicker("getDate");

            observable(toDatetime(d));
        };

        $(element).setMask('39/19/2999').datepicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", options.onSelect);

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datepicker("destroy");
        });

    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        value = toDatetime(value);

        current = $(element).datepicker("getDate");

        if (value - current !== 0) {
            $(element).datepicker("setDate", value);
        }
    }
};