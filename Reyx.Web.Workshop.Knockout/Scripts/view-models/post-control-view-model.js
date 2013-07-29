function PostControlViewModel(data) {
    data = data || [];
    var self = this;

    // properties

    self.NewPost = new PostViewModel();

    self.Search = ko.observable('').extend({ throttle: 500 });

    self.Posts = ko.observableArray(ko.utils.arrayMap(data, function (item) {
        return new PostViewModel(item);
    }));

    self.TotalPosts = ko.observable(data.TotalPosts || 0);

    // subscribers

    self.Search.subscribe(function (value) {
        if (value.length < 4) return;

        self.Search(value);
    });

    // computeds

    self.hasMorePosts = ko.computed(function () {
        return self.TotalPosts() > self.Posts().length;
    });

    // methods

    self.add = function () {
        var newPost = new PostViewModel(ko.toJS(self.NewPost));
        if (newPost.edit()) {
            self.Posts.unshift(newPost);
            ko.mapping.fromJS({ Id: 0, Title: '', Content: '', Date: new Date() }, {}, self.NewPost);
        }
    };

    self.morePosts = function () {
        $.get($.resolveUrl('posts/list'), ko.toJSON({ index: self.Posts().length }))
         .done(function (response) {
             if (response.result) {
                 ko.utils.arrayForEach(response.data, function (item) {
                     self.Posts.push(new PostViewModel(item));
                 });
             } else {
                 alert(response.errors.join('\n'));
             }
         });
    };
};