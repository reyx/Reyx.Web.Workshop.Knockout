function TodoViewModel(data) {
    data = data || {};
    var self = this;

    self.Id = ko.observable(data.Id || 0);
    self.Content = ko.observable(data.Content || '');
    self.Date = ko.observable(toDateTime(data.Date) || new Date());
    self.User = new UserViewModel(data.User || {});
    self.Comments = ko.observableArray(data.Comments || []);
    self.TotalComments = ko.observable(data.TotalComments || 0);
    self.NewComment = new CommentViewModel({ Post: ko.toJS(self) });

    self.hasMoreComments = ko.computed(function () {
        return self.TotalComments() > self.Comments().length;
    });

    self.moreComments = function () {
        $.get($.resolveUrl('comments/bypost'), ko.toJSON({ id: self.Id(), index: self.Comments().length }))
         .done(function (response) {
             if (response.result) {
                 ko.utils.arrayForEach(response.data, function (item) {
                     self.Comments.push(new CommentViewModel(item));
                 });
             } else {
                 alert(response.errors.join('\n'));
             }
         });
    };

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