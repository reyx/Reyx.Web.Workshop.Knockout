ko.bindingHandlers.tokeninput = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().tokeninputOptions || {};
        var value = valueAccessor();

        $(element).tokenInput(options.url, {
            theme: options.theme || 'facebook',
            hintText: options.hintText || 'Digite algo',
            noResultsText: options.noResultsText || '--',
            preventDuplicates: options.preventDuplicates || true,
            tokenLimit: options.tokenLimit || null,
            method: options.method || 'POST',
            jsonContainer: 'd',
            jsonInnerContainer: 'data',
            prePopulate: ko.utils.arrayMap(options.prePopulate, function (item) {
                var id = options.id ? getDescendantProp(item, options.id) : item.Id;
                var name = options.name ? getDescendantProp(item, options.name) : item.Nome;

                //ko.utils.arrayFirst(value.Array(), function (i) {
                //    return i.Id() === id();
                //}) || value.add({ Id: id(), Nome: name() });

                return { id: id(), name: name() };
            }),
            onAdd: options.onAdd || function (item) {
                if (typeof value.add === 'function') {
                    value.add({ Id: item.id, Nome: item.name });
                }
            },
            onDelete: options.onDelete || function (item) {
                if (typeof value.remove === 'function')
                    value.remove(item.id);
            }
        });
    }
};

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}