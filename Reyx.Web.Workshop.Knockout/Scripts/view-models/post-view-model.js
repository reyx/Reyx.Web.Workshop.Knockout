function PostViewModel(data) {
    data = data || {};
    var self = this;

    self.Id = ko.observable(data.Id || 0);
    self.Title = ko.observable(data.Title || '');
    self.Content = ko.observable(data.Content || '');
    self.Date = ko.observable(toDateTime(data.Date) || new Date());
    self.User = new UserViewModel(data.User || {});
    self.Comments = ko.observableArray(data.Comments || []);
    self.TotalComments = ko.observable(data.TotalComments || 0);

    this.errors = ko.validation.group(self);

    // computed

    self.hasMoreComments = ko.computed(function () {
        return self.TotalComments() > self.Comments().length;
    });

    self.author = ko.computed(function () {
        return $.concat('publicado por ', self.User.Name());
    });

    self.date = ko.computed(function () {
        return Globalize.format(self.Date(), "dd/MM/yyyy 'às' HH:mm");
    });

    // methods

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
        self.Title.extend({ required: true });
        self.Content.extend({ required: true });

        if (self.errors().length === 0) {
            var mapping = {
                ignore: [
                    'Comments',
                    'User',
                    'TotalComments',
                    'author',
                    'date',
                    'hasMoreComments',
                    'moreComments',
                    'edit'
                ]
            };

            var model = ko.mapping.toJS(self, mapping);

            $.post($.resolveUrl('posts/edit'), ko.toJSON({ model: model }))
             .done(function (response) {
                 if (response.result) {
                     self.Id(response.id);
                 } else {
                     alert(response.errors.join('\n'));
                 }
             });

            return true;
        } else {
            self.errors.showAllMessages(true);
            return false;
        }
    }
};