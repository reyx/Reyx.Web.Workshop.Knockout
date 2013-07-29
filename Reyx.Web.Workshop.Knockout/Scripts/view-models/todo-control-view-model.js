function TodoControlViewModel(data) {
    data = data || [];
    var self = this;

    // properties

    self.NewTodo = new TodoViewModel();

    self.Todoes = ko.observableArray(ko.utils.arrayMap(data, function (item) {
        return new TodoViewModel(item);
    }));

    // computeds

    self.todoesConcluidos = ko.computed(function () {
        return ko.utils.arrayFilter(self.Todoes(), function (item) {
            return item.Done();
        })
    });

    self.totalConcluidos = ko.computed(function () {
        return self.todoesConcluidos().length;
    });

    self.status = ko.computed(function () {
        return $.concat(self.totalConcluidos(), ' de ', self.Todoes().length, ' concluidos');
    });

    // methods

    self.add = function () {
        var newTodo = new TodoViewModel(ko.toJS(self.NewTodo));
        newTodo.edit();
        self.Todoes.unshift(newTodo);
        ko.mapping.fromJS({ Id: 0, Content: '', Date: new Date() }, {}, self.NewTodo);
    };

    self.clearDone = function () {
        if (confirm('Deseja realmente remover todas as tarefas concluidas?')) {
            var array = ko.utils.arrayFilter(self.Todoes(), function (item) {
                return item.Done();
            });

            var ids = ko.utils.arrayMap(array, function (item) {
                item.Done(!item.Done());
                return item.Id();
            });

            $.post($.resolveUrl('todoes/cleardone'), ko.toJSON({ ids: ids }))
             .done(function (response) {
                 if (response.result) {
                     ko.utils.arrayForEach(array, function (item) {
                         self.Todoes.remove(item);
                     });
                 } else {
                     var ids = ko.utils.arrayForEach(array, function (item) {
                         item.Done(!item.Done());
                     });
                     alert(response.errors.join('\n'));
                 }
             });
        }
    };
};