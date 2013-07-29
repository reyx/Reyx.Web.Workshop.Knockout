ko.bindingHandlers.customClick = {
	init: function (element, valueAccessor) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		$(element).on('click', function (e) {
			value(this, e);
		});
	}
};