function QwotdExtension() {

  //urlArrays is an array of all the URLs we have visited
  var urlArrays = [];

  var self = this;

  var current_tab_url = '';

  self.refresh();

  kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
    self._onCommand();
  });


  kango.browser.addEventListener(kango.browser.event.DOCUMENT_COMPLETE, function(){

    self._setUnreadCount('#');

    var length = urlArrays.length;

    // output current tab url to console
    kango.browser.tabs.getCurrent(function(tab) {    
      // tab is KangoBrowserTab object
      kango.console.log(tab.getUrl());
      if(!(tab.getUrl().indexOf("chrome")>=0)){
        urlArrays.push(tab.getUrl());
        kango.console.log(urlArrays);
      }
    });

    self.current_tab_url = tab.getUrl();

    self.refresh();

  });

  
  kango.browser.addEventListener(kango.browser.event.TAB_CHANGED,function() {

    self._setUnreadCount('@');

    kango.console.log("The tab has changed.");

    kango.browser.tabs.getCurrent(function(tab) {

      kango.console.log("Current tab: ");

      self.current_tab_url = tab.getUrl();

      kango.console.log(self.current_tab_url);

      self.refresh();

    });
  
  
  });

}

QwotdExtension.prototype = {

  _refreshTimeout: 60*1000*8,    // 8 minutes
  _feedUrl: 'http://alpha.qwotd.com/api/details/?url=google.com',

  _setUnreadCount: function(count) {
    kango.ui.browserButton.setTooltipText(kango.i18n.getMessage('Unread count') + ': ' + count);
    kango.ui.browserButton.setIcon('icons/button.png');
    kango.ui.browserButton.setBadgeValue(count);
    kango.console.log("Set count to " + count);
  },

  refresh: function() {
    var details = {
      url: this._feedUrl,
      params: {'url':this.current_tab_url,'timeout':this._refreshTimeout},
      method: 'POST',
      async: false,
      contentType: 'json'
    };

    var self = this;

    kango.xhr.send(details, function(data) {
      var info = data.response;

      kango.console.log("Updating tab: ");

      //kango.console.log(self.current_tab_url);
      kango.console.log(info.url);

      self._setUnreadCount(info.count);

    });
  }, // End refresh function

  _onCommand: function() {
    kango.ui.browserButton.setPopup({url:'popup.html', width: 600, height:520});
  }

}

var extension = new QwotdExtension();
