$(function() {

  function AppViewModel() {
    this.quoteText = ko.observable('If we have a positive mental attitude, then even when surrounded by hostility, we shall not lack inner peace.');
    this.quoteAuthor = ko.observable('Dalai Lama');
  }

  ko.applyBindings(new AppViewModel());

});
