// ==UserScript==
// @name Content
// @include http://*
// @include https://*
// @require jquery-1.11.1.min.js
// @require jquery.highlight.js
// ==/UserScript==

alert('content.js loaded');

var $ = window.$.noConflict(true); // Required for Opera and IE




kango.addMessageListener('Quotes', function(event) {
    // event.data - the data sent with message

  alert('Background script says: '+event.data);

  $.each( event.data, function( key,val ) {
    alert(key + ": " + JSON.stringify(val.quoted_text));
    $("body").highlight(val.quoted_text);
    $(".highlight").css({ backgroundColor: "#FFFF88"});
    alert( "highlighted : " + key + ": " + JSON.stringify(val.quoted_text));

    
  });

});

alert('end content.js')
