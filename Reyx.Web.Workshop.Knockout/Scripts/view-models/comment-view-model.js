function CommentViewModel(data) {
    data = data || {};
    var self = this;

    self.Id = ko.observable(data.Id || 0);
    self.Content = ko.observable(data.Content || '');
    self.Date = ko.observable(toDateTime(data.Date) || new Date());
    self.PostId = new PostViewModel(data.PostId || 0);
    self.User = new UserViewModel(data.User || {});

    self.edit = function () {
        var mapping = {
            ignore: [
                'edit'
            ]
        };

        var model = ko.mapping.toJS(self, mapping);

        $.post($.resolveUrl('comments/edit'), ko.toJSON({ model: model }))
         .done(function (response) {
             if (response.result) {
                 self.Id(response.id);
             } else {
                 alert(response.errors.join('\n'));
             }
         });
    }
};