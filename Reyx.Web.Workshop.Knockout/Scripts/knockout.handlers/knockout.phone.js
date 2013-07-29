ko.bindingHandlers.phone = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor() || {};
        var target = $(element);
        var value = valueAccessor();
        target.setMask("(99) 9999-9999").on('keyup', function (e) {
            var phone = element.value.replace(/\D/g, '');
            target.unsetMask();
            if (phone.substr(0, 2) === '11' && phone.substr(2, 1) === '9') {
                target.setMask("(99) 99999-9999");
            } else {
                target.setMask("(99) 9999-9999");
            }
            value(phone);
        });
    },
    update: function (element, valueAccessor) {
        var target = $(element);
        var value = valueAccessor();
        if (!value()) return '';
        var phone = value().replace(/\D/g, '');
        target.unsetMask();
        target.val(value());
        if (phone.substr(0, 2) === '11' && phone.substr(2, 1) === '9') {
            target.setMask("(99) 99999-9999");
        } else {
            target.setMask("(99) 9999-9999");
        }
    }
};