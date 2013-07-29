ko.bindingHandlers.zipcode = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var value = valueAccessor();
        $(element).setMask("99999-999").on('keyup', function (e) {
            //var zipcode = element.value.replace(/\D/g, '');
            //value(zipcode);
            value(element.value);
        });
    },
    update: function (element, valueAccessor) {
        //var value = valueAccessor();
       // value(value().replace(/\D/g, ''));
        //if (!value()) return '';
        //$(element).val(value());

        var target = $(element);
        var value = valueAccessor();
        target.val(value());
    }
};