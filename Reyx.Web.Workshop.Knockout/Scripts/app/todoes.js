var todoes = $.parseJSON($('#Todoes').val() || '[]');
var todoControlViewModel = new TodoControlViewModel(todoes);