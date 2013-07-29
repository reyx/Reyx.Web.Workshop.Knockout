ko.bindingHandlers.hasfocus = {
    init: function(element, valueAccessor, _, viewModel) {
        ko.utils.registerEventHandler(element, 'keydown', function(evt) {
            if (evt.keyCode === 13)
                valueAccessor().call(viewModel);
        });
    }
}