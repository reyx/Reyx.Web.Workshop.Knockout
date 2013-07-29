function AuthViewModel() {
    var self = this;
    
    self.Email = ko.observable('');
    self.Password = ko.observable('');

    self.login = function () {
        var mapping = {
            ignore: [
                'login'
            ]
        };

        var model = ko.mapping.toJS(self, mapping);

        $.post($.resolveUrl('auth/login'), ko.toJSON(model))
         .done(function (response) {
             if (response.result) {
                 window.location = config.root;
             } else {
                 alert(response.errors.join('\n'));
             }
         });
    }
};