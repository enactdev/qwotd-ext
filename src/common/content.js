// ==UserScript==
// @name Content
// @include http://*
// @include https://*
// @require jquery-1.11.1.min.js
// @require jquery-ui-1.10.4.custom.js
// @require jquery.highlight.js
// @include jquery-ui-1.10.4.custom.css
// ==/UserScript==

//alert('content.js loaded');

var $ = window.$.noConflict(true); // Required for Opera and IE




kango.addMessageListener('Quotes', function(event) {
    // event.data - the data sent with message

  //alert('Background script says: '+event.data);

  $.each( event.data, function( key,val ) {
    //alert(key + ": " + val.quoted_text);
    $(".highlight").css({ backgroundColor: "#B9AAED"});

    //alert('body highlight added 2');

    $("body").highlight(val.quoted_text, key);
    //$("p").highlight('the');

    $('#highlight_id_'+key).attr( "title", 'Tweeted by ' + val.quoted_count + ' people.' );

    $('#highlight_id_'+key).hover(function(){
      $('#highlight_id_'+key).tooltip();
      //$('#highlight_id_'+key).tooltip({ content: "Awesome title!" });
      //$('#highlight_id_'+key).tooltip( "enable" );
      //$('#highlight_id_'+key).tooltip({ position: { my: "left top+15", at: "left bottom", collision: "flipfit" } });
      $('#highlight_id_'+key).css("background-color","#FFFF88");
      },function(){
      $('#highlight_id_'+key).tooltip( "destroy" );
      $('#highlight_id_'+key).css("background-color","#B9AAED");
    });

    //alert( "highlighted : " + key + ": " + val.quoted_text);

  });

});

//alert('end content.js')
