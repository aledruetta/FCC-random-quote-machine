$(function() {
  'use strict';

  function AppViewModel() {
    var self = this;

    this.quoteText = ko.observable('');
    this.quoteAuthor = ko.observable('');
    this.transition = ko.observable(false);
    this.url = {
      twitter: ko.observable(''),
    };

    this.twitterHref = function() {
      this.url.twitter('https://twitter.com/intent/tweet?text="' + self.quoteText() + '" - ' +
        self.quoteAuthor());
    };

    this.facebookHref = function() {
      FB.ui({
        method: 'feed',
        link: 'https://aledruetta.github.io/FCC-random-quote-machine/dist/index.html',
        caption: 'An example caption',
      }, function(response){});
    };

    this.newQuote = function() {
      var entry = 'https://api.forismatic.com/api/1.0/?';
      var query = 'method=getQuote&format=jsonp&lang=en&jsonp=?';
      var url = entry + query;

      $.getJSON(url)
      .done(function(data) {
        self.transition('out');
        setTimeout(function() {
          if (data.quoteAuthor) {
            self.quoteAuthor(data.quoteAuthor.trim());
          } else {
            self.quoteAuthor('Anonymous');
          }
          self.quoteText(data.quoteText.trim());

          self.twitterHref();

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
        $(element).fadeOut(400);
      } else if (value === 'in') {
        $(element).fadeIn(400);
      }
    }
  };

  ko.applyBindings(new AppViewModel());

});
