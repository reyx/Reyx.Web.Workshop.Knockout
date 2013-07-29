function PostControlViewModel(data) {
    data = data || [];
    var self = this;

    // properties

    self.NewPost = new PostViewModel();

    self.Search = ko.observable('');

    self.Posts = ko.observableArray(ko.utils.arrayMap(data, function (item) {
        return new PostViewModel(item);
    }));

    // subscribers

    self.Search.subscribe(function (value) {
        if (value.length < 4) return;

        self.Search(value);
    }).extend({ throttle: 500 });

    // computeds

    // methods

    self.add = function () {
        var newPost = new PostViewModel(ko.toJS(self.NewPost));
        newPost.edit();
        self.Postes.unshift(newPost);
        ko.mapping.fromJS({ Id: 0, Content: '', Date: new Date() }, {}, self.NewPost);
    };
};