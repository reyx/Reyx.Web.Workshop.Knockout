ko.bindingHandlers.placeholder = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var options = allBindingsAccessor().placeholderOptions || {};

        var $this = $(element);

        if (window.navigator.appName === "Microsoft Internet Explorer") {
            var id;
            if (!$this.attr('id')) {
                id = 'holder' + Math.floor(Math.random() * 99999);
                $this.attr('id', id);
            } else {
                id = $this.attr('id');
            }
            var $wrapper = $('<div>').addClass($this.attr('class')).addClass('placeholding-input');

            if (options.hide) {
                $wrapper.addClass('placeholder-hide');
            }

            var $label = $('<label>').addClass('placeholder').text(value).attr('for', id);
            $this.addClass('placeholder-input').wrap($wrapper);
            $this.after($label);

            $this.on('keyup blur', function (e) {
                if ($this.val() && !$label.hasClass('hasome')) {
                    $label.addClass('hasome');
                } else if (!$this.val() && $label.hasClass('hasome')) {
                    $label.removeClass('hasome');
                }
            });
        } else {
            $this.attr('placeholder', value);
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        var $this = $(element);
        var $label = $this.next('.placeholder');

        if ($this.val() && !$label.hasClass('hasome')) {
            $label.addClass('hasome');
        } else if (!$this.val() && $label.hasClass('hasome')) {
            $label.removeClass('hasome');
        }
    }
};