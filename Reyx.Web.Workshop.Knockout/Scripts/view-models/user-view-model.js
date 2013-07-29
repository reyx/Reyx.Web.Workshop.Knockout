function UserViewModel(data) {
    data = data || {};
    var self = this;

    self.Id = ko.observable(data.Id || 0);
    self.Name = ko.observable(data.Name ||'');
    self.Email = ko.observable(data.Email || '');    
    self.Avatar = ko.observable(data.Avatar || '');
};