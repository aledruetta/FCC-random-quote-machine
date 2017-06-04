$(function() {
  'use strict';

  function AppViewModel() {
    var self = this;

    this.quoteText = ko.observable('');
    this.quoteAuthor = ko.observable('');

    this.twitterPost = function() {};

    this.facebookPost = function() {};

    this.newQuote = function() {
      var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&callback=?';

      // $.getJSON(url)
      $.ajax({
        url: 'https://api.forismatic.com/api/1.0/?',
        dataType: 'jsonp',
        data: 'method=getQuote&format=jsonp&lang=en&jsonp=?',
      })
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
