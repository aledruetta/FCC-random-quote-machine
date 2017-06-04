$(function() {
  'use strict';

  function AppViewModel() {
    var self = this;

    this.quoteText = ko.observable('');
    this.quoteAuthor = ko.observable('');

    this.twitterPost = function() {};

    this.facebookPost = function() {};

    this.newQuote = function() {
      var entry = 'https://api.forismatic.com/api/1.0/?';
      var query = 'method=getQuote&format=jsonp&lang=en&jsonp=?';
      var url = entry + query;

      $.getJSON(url)
      .done(function(data) {
        self.quoteAuthor(data.quoteAuthor);
        self.quoteText(data.quoteText);
      })
      .fail();
    };

    this.newQuote();
  }

  ko.applyBindings(new AppViewModel());

});
