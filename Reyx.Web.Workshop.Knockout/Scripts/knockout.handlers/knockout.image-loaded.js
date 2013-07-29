ko.bindingHandlers.imageLoaded = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        // var value = ko.wr

        var $element = $(element);

        $element.imagesLoaded(function (instance, image) {
            if (image) {
                $element.attr('src', image.img.src).fadeIn();
            }
        });

        $element.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAYAAAAbWs+BAAACeUlEQVR4nO3TMQEAIAzAMMC/5+GiHCQK+nTPAirndQD8xHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyEDAchw0HIcBAyHIQMByHDQchwEDIchAwHIcNByHAQMhyELhGRArfgAnqtAAAAAElFTkSuQmCC');
    }
};