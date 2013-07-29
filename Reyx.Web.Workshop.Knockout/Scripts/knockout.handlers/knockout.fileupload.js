ko.bindingHandlers.fileupload = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = valueAccessor() || {};
        var value = valueAccessor();
        
        $(element).fileupload({
            url: $.resolveUrl('upload/uploadhandler'),
            dataType: 'json',
            // maxFileSize: config.maxFileSize, // 5 MB
            // minFileSize: 102400, // 100 KB
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            formData: [{
                name: 'path',
                value: options.model.Pasta()
            }],
            submit: function (e, files) {
                submitFileImage(e, files);
            },
            done: function (e, data) {
                ko.utils.arrayForEach(data.result.files, function (file) {
                    if (file.error) {
                        alert(file.error);
                    } else {
                        options.model.name(file.name);
                    }
                });
            }
        }).on('fileuploadfail', function (e, data) {

        });
    }
};