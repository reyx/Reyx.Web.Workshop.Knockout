$.ajaxSetup({
    beforeSend: function () {
        $('#overlay').show();
    },
    cache: false,
    complete: function (jqXHR, textStatus) {
        $('#overlay').hide();
    },
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    statusCode: {
        403: function () {
            alert('Seção perdida. Voce será redirecionado para a tela de login!', function () {
                window.location = $.resolveUrl('acesso');
            });
        },
        404: function () {
            window.location = $.resolveUrl('shared/404');
        },
        500: function (a, request, c) {
            window.location = $.resolveUrl('shared/500');
        }
    }
});

var isDateObject = function (date) {
    return Object.prototype.toString.call(date) === '[object Date]';
};

var toDateTime = function (date) {
    if (isDateObject(date))
        return date;
    else {
        try {
            var date = parseInt(date.replace("/Date(", "").replace(")/", ""), 10);
            if (isNaN(date)) {
                return new Date();
            } else {
                new Date(date);
            }
            
        } catch (ex) {
            return new Date();
        }
    }
};

var toDatetimeWithTime = function (date, timeString) {
    var res = new Date(date);
    var _h = timeString.split(':')[0];
    var _m = timeString.split(':')[1];
    res.setHours(_h, _m, 0, 0);
    return res;
};

var isEmptyObject = function (obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
};

var getProperties = function (obj) {
    var keys = [];
    for (var key in obj)
        if (isEmptyObject(obj[key]))
            keys.push(key);
    return keys;
};

var toDateDiffString = function (date) {
    var args = {},
        diff = TimeSpan.FromDates(date, new Date());

    if (diff.days() >= 365) {
        args.time = parseInt(diff.days() / 365);
        args.label = args.time > 1 ? 'anos' : 'ano';
    } else if (diff.days() >= 30) {
        args.time = parseInt(diff.days() / 30);
        args.label = args.time > 1 ? 'meses' : 'mês';
    } else if (diff.days() >= 7) {
        args.time = parseInt(diff.days() / 7);
        args.label = args.time > 1 ? 'semanas' : 'semana';
    } else if (diff.days() > 0) {
        args.time = diff.days();
        args.label = diff.days() > 1 ? 'dias' : 'dia';
    } else if (diff.hours() > 0) {
        args.time = diff.hours();
        args.label = diff.hours() > 1 ? 'horas' : 'hora';
    } else if (diff.minutes() > 0) {
        args.time = diff.minutes();
        args.label = diff.minutes() > 1 ? 'minutos' : 'minuto';
    } else {
        return 'há menos de 1 minuto';
    }

    return ['há', args.time, args.label].join(' ');
};

var toPhoneString = function (data) {
    if (!data) return '';

    if (data[0] === '0')
        data = data.substr(1);

    if (data.length === 10)
        return data.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

    if (data.length === 11)
        return data.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return data;
};

var toDayString = function (date) {
    return Globalize.format(date, 'dd');
};

var toYearString = function (date) {
    return Globalize.format(date, 'yyyy');
};

var toDateString = function (date) {
    return Globalize.format(date, "dd/MM/yyyy");
};

var toTimeString = function (date, seconds) {
    return Globalize.format(date, 't'); //'hh:mm' + (seconds ? ':ss' : ''));
};

var toAgeString = function (dateString) {
    var dob = new Date(dateString);
    return Math.floor((config.now - dob) / (365.25 * 24 * 60 * 60 * 1000));
};

var renderMap = function (element, address) {
    var geocoder, map;

    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myOptions = {
                zoom: 16,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map($(element).get(0), myOptions);

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
    });
};

Number.prototype.padLeft = function (width, char) {
    if (!char) {
        char = " ";
    }

    if (("" + this).length >= width) {
        return "" + this;
    }
    else {
        return arguments.callee.call(
          char + this,
          width,
          char
        );
    }
};

//first, checks if it isn't implemented yet
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

$.extend({

    between: function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    },

    centerModalParticipantes: function () {
        var $window = $(window);
        var $modal = $('#image-upload-modal').children();
        if ($modal && $window.width() < 480) {
            $modal.css({
                'margin-top': -($modal.height() / 2),
                'max-height': $window.height()
            });

            $('#image-upload-modal .modal-content .inner-content-participantes').css('max-height', $('#image-upload-modal').height() - 150);
        }
        else {
            $modal.css({
                'margin-top': '-' + ($modal.height() / 2) + 'px',
            });
            $('#image-upload-modal .modal-content .inner-content-participantes').css('max-height', '484px');
        }
    },

    centerModal: function () {
        var $window = $(window);
        var $modal = $('#image-upload-modal').children();
        $modal.css({
            'margin-top': '-' + ($modal.height() / 2) + 'px',
        });

        //$('#image-upload-modal .modal-content').css('max-height', $('#image-upload-modal').height() - 150);
    },

    concat: function () {
        var params = Array.prototype.slice.call(arguments);
        return params.join('');
    },

    distinct: function (anArray) {
        var result = [];
        $.each(anArray, function (i, v) {
            if ($.inArray(v, result) == -1) result.push(v);
        });
        return result;
    },

    emailLink: function (email) {
        if (email === '' || typeof email === 'undefined')
            return '';
        return ['mailto', email].join(':');
    },

    getDynamicImage: function () {
        var args = ['content', 'files'];
        var params = Array.prototype.slice.call(arguments);
        args = args.concat(params);

        return $.resolveUrl(args.join('/'));
    },

    getFileExtension: function (file) {
        if (!file)
            return '';
        return file.split('.')[1]
    },

    getUrlId: function (name) {
        var args = location.pathname.split('/');
        var res = isNaN(args[args.length - 1]) ? 0 : parseInt(args[args.length - 1]);
        return res;
    },

    getURLParameter: function (name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
        );
    },

    hasScrollableArea: function (selector) {
        var $element = $(typeof selector === 'string' ? selector : 'body');
        return ($element.prop('scrollHeight') - $('.footer').height()) > $element.prop('clientHeight');
    },

    newGuid: function () {
        return Date.today().toString('yyyyMMddSHHmmss') + (Math.floor(Math.random() * 999999) + 9999);
    },

    parseQuerystring: function (qs) {
        var nvpair = {};
        if (!qs)
            qs = window.location.search.replace('?', '');
        var pairs = qs.split('&');
        $.each(pairs, function (i, v) {
            var pair = v.split('=');
            nvpair[pair[0]] = pair[1];
        });
        return nvpair;
    },

    replaceAll: function (string, token, newtoken) {
        while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
        }
        return string;
    },

    resolveUrl: function (url) {
        var params = Array.prototype.slice.call(arguments);
        if (config.root !== '/')
            params.unshift(config.root);
        params.unshift('');
        return params.join('/');
    },

    resolveStaticUrl: function (url) {
        var params = Array.prototype.slice.call(arguments);
        params.unshift(config.static);
        return params.join('/');
    },

    setPath: function () {
        var params = Array.prototype.slice.call(arguments);
        return params.join('/');
    },

    urlContains: function (path) {
        return location.pathname.indexOf(path) > -1;
    }

});

function emptyKO(viewmodel, defaults) {
    if (typeof (defaults) == 'undefined') {
        defaults = {}
    }
    for (key in viewmodel) {
        if (defaults[key] != undefined) {
            if (defaults[key] != '_ignore') {
                viewmodel[key](defaults[key]);
            }
        } else {
            viewmodel[key]('');
        }
    }
}

// Dialogs

var addHiddenDivToBody = function () {
    var div = document.createElement("div");
    div.style.display = "none";
    document.body.appendChild(div);
    return div;
};

//var alert = function (data, callback, template) {
//    if (!template) {
//        template = 'alert';
//    }

//    var mensagem = data;
//    if ($.isArray(data)) {
//        mensagem = $.distinct(data).join('\n');
//    }

//    var modal = addHiddenDivToBody();

//    var templateModel = {
//        mensagem: ko.observable(mensagem),
//        ok: function () {
//            if (typeof callback === 'function') {
//                callback();
//            }
//            $('body').css('overflow', 'auto');
//            $('.image-upload-modal:last').remove();
//        }
//    };

//    ko.renderTemplate('shared-' + template + '.tmpl', templateModel, {
//        afterRender: function (nodes) {
//            $('body').css('overflow', 'hidden');
//            $.centerModal();
//        }
//    }, modal, 'replaceNode');
//};

//var confirm = function (label, callback, template) {
//    var modal = addHiddenDivToBody();

//    var templateModel = {
//        label: ko.observable(label || ''),
//        confirmar: function () {
//            if (typeof callback === 'function') {
//                callback();
//            }
//            $('body').css('overflow', 'auto');
//            $('.image-upload-modal:last').remove();
//        },
//        cancelar: function () {
//            $('body').css('overflow', 'auto');
//            $('.image-upload-modal:last').remove();
//        }
//    };

//    ko.renderTemplate('shared-confirm.tmpl', templateModel, {
//        afterRender: function (nodes) {
//            $('body').css('overflow', 'hidden');
//            $.centerModal();
//        }
//    }, modal, 'replaceNode');
//};

//var prompt = function (options) {
//    var settings = $.extend({
//        label: '',
//        callback: function () { },
//        template: 'prompt',
//        data: null,
//        maxLength: 255,
//        showImage: true,
//        required: true,
//        onLoad: function () { }
//    }, options);

//    var modal = addHiddenDivToBody();

//    var templateModel = {
//        label: ko.observable(settings.label || ''),
//        mensagem: ko.observable(''),
//        showImage: ko.observable(settings.showImage),
//        maxLength: ko.observable(settings.maxLength),
//        data: settings.data,
//        confirmar: function () {
//            if (settings.template !== 'prompt' || (this.mensagem.isValid() || !settings.required)) {
//                if (this.mensagem)
//                    settings.callback(this.mensagem());
//                else
//                    settings.callback();

//                $('body').css('overflow', 'auto');
//                $('.image-upload-modal:last').remove();
//            }
//        },
//        cancelar: function () {
//            $('body').css('overflow', 'auto');
//            $('.image-upload-modal:last').remove();
//        }
//    };

//    if (settings.template === 'prompt') {
//        templateModel.mensagem = ko.observable('');
//        templateModel.mensagem.extend({ required: settings.required, maxLength: settings.maxLength });
//    }

//    ko.renderTemplate($.concat('shared-', settings.template, '.tmpl'), templateModel, {
//        afterRender: function (nodes) {
//            $('body').css('overflow', 'hidden');
//            settings.onLoad();
//        }
//    }, modal, 'replaceNode');
//};

//var submitFileImage = function (e, files) {
//    var filesLength = files.originalFiles.length;

//    for (var i = 0; i < filesLength; i++) {
//        var extension = files.originalFiles[i].name.split('.')[1].toLowerCase();

//        switch (extension) {
//            case 'jpg':
//            case 'jpeg':
//            case 'png':
//            case 'gif':
//            case 'bmp':
//                break;
//            default:
//                alert('São permitidos apenas arquivos de imagem.');
//                $('.template-upload').remove();
//                if ($(e).preventDefault) {
//                    $(e).preventDefault()
//                        .stopPropagation()
//                        .stopImmediatePropagation();
//                } else {
//                    e.returnValue = false;
//                }
//        }
//    }
//};

//var initModal = function () {
//    $('body').css('overflow', 'hidden');
//};

//var closeModal = function () {
//    $('body').css('overflow', 'auto');
//};

var windowGoBack = function () {
    window.history.go(-1);
};

var excluirImagem = function (model) {
    confirm('Deseja realmente excluir esta imagem?', function () {
        model.Nome('');
    });
};