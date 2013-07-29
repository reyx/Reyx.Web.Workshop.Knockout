var posts = $.parseJSON($('#Posts').val() || '[]');
var postControlViewModel = new PostControlViewModel(posts);