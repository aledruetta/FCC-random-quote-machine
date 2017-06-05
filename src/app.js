$(function() {
  'use strict';

  function AppViewModel() {
    var self = this;

    this.quoteText = ko.observable('');
    this.quoteAuthor = ko.observable('');
    this.transition = ko.observable(false);

    this.twitterPost = function() {};

    this.facebookPost = function() {};

    this.newQuote = function() {
      var entry = 'https://api.forismatic.com/api/1.0/?';
      var query = 'method=getQuote&format=jsonp&lang=en&jsonp=?';
      var url = entry + query;

      $.getJSON(url)
      .done(function(data) {
        self.transition('out');
        setTimeout(function() {
          if (data.quoteAuthor) {
            self.quoteAuthor(data.quoteAuthor);
          } else {
            self.quoteAuthor('Anonymous');
          }
          self.quoteText(data.quoteText);
          self.transition('in');
        }, 400);
      })
      .fail();
    };

    this.newQuote();
  }

  ko.bindingHandlers.fadeVisible = {
    update: function(element, valueAccessor) {
      var value = ko.unwrap(valueAccessor());
      if (value === 'out') {
        $(element).fadeOut();
      } else if (value === 'in') {
        $(element).fadeIn();
      }
    }
  };

  ko.applyBindings(new AppViewModel());

});
