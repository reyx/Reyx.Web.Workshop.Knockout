function TodoViewModel(data) {
    data = data || {};
    var self = this;

    self.Id = ko.observable(data.Id || 0);
    self.Created = ko.observable(toDateTime(data.Created) || new Date());
    self.Content = ko.observable(data.Content || '');
    self.Done = ko.observable(data.Done || false);
    self.Visible = ko.observable(data.Visible || !false);

    self.Done.subscribe(function (value) {
        $.post($.resolveUrl('todoes/changestatus'), ko.toJSON({ id: self.Id() }))
         .done(function (response) {
             if (!response.result) {
                 self.Done(!value);
             }
         })
    });

    self.edit = function () {
        var mapping = {
            ignore: [
                'edit'
            ]
        };

        var model = ko.mapping.toJS(self, mapping);

        $.post($.resolveUrl('todoes/edit'), ko.toJSON({ model: model }))
         .done(function (response) {
             if (response.result) {
                 self.Id(response.id);
             } else {
                 alert(response.errors.join('\n'));
             }
         });
    }
};