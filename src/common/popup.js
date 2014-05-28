var StorageTest = {

    init: function() {
        $('#storage-get').click(function(event) {
            StorageTest.testGet();
        });

        $('#storage-set').click(function(event) {
            StorageTest.testSet();
        });

        $('#storage-remove').click(function(event) {
            StorageTest.testRemove();
        });

        $('#storage-keys').click(function(event) {
            StorageTest.testKeys();
        });
    },

    testGet: function() {
        $('#storage-value').val(kango.storage.getItem($('#storage-key').val()) || 'null');
    },

    testSet: function() {
        kango.storage.setItem($('#storage-key').val(), $('#storage-value').val());
    },

    testRemove: function() {
        kango.storage.removeItem($('#storage-key').val());
        $('#storage-value').val('null');
    },

    testKeys: function() {
        $('#storage-value').val(kango.storage.getKeys().toString());
    }
};

var XhrTest = {

    init: function() {
        $('#xhr-get').click(function(event) {
            XhrTest.testGet();
        });
    },

    testGet: function() {
        var details = {
            url: $('#xhr-url').val(),
            method: 'GET',
            async: true,
            contentType: 'text'
        };
        kango.xhr.send(details, function(data) {
            $('#xhr-result').val((data.status == 200 && data.response != null) ? data.response : 'Error. Status=' + data.status);
        });
    }
};

var WindowTest = {
    
    close: function() {
        KangoAPI.closeWindow();
    },
    
    resize: function() {
        var defaultRows = 4;
        var maximizedRows = 8;
        if ($('#popup-properies').attr('rows') == defaultRows) {
            KangoAPI.resizeWindow(600, 600);
            $('#popup-properies').attr('rows', maximizedRows);
            
        }
        else { 
            $('#popup-properies').attr('rows', defaultRows);
            KangoAPI.resizeWindow(600, 520); 
        }
    }
};

/*
function showPopupProperies() {
    var props = 'window.outerWidth=' + window.outerWidth + '\n';
    props += 'window.outerHeight=' + window.outerHeight + '\n';
    props += 'document.documentElement.clientWidth=' + document.documentElement.clientWidth + '\n';
    props += 'document.documentElement.clientHeight=' + document.documentElement.clientHeight + '\n';
    props += 'document.body.clientWidth=' + document.body.clientWidth + '\n';
    props += 'document.body.clientHeight=' + document.body.clientHeight + '\n';
    props += 'document.body.offsetWidth=' + document.body.offsetWidth + '\n';
    props += 'document.body.offsetHeight=' + document.body.offsetHeight + '\n';
    $('#popup-properies').val(props);
}
*/

//KangoAPI.resizeWindow(600,600);


KangoAPI.onReady(function() {

  $('#num_tweets').html(kango.tab_details.count);
  $('#num_hashtags').html(kango.tab_details.top_hashtags.length);
  $('#num_mentions').html(kango.tab_details.top_mentions.length);
  $('#num_quotes').html(kango.tab_details.quotes.length);
  $('#num_top_tweets').html(kango.tab_details.top_popular.length);

  //alert('top retweet: ' + kango.tab_details.top_favorited[0].twitter_msg_id );

  //loop through popular tweets
  $.each( kango.tab_details.top_popular, function( index, val ) {

    // Append a div that will display the tweet
    $( "#top_tweets" ).append( '<div id="tweet_'+index+'"></div>' );

    $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+val.twitter_msg_id+"&omit_script=true", function(data){$('#tweet_'+index).html(data.html);});

  });

  // Display top hashtags
  var c = 0;
  var lim = Math.ceil(kango.tab_details.top_hashtags[0].num_messages / 50)
  var top_q = [];

  //alert( lim );

  //alert(kango.tab_details.top_hashtags);

  $.each( kango.tab_details.top_hashtags, function( key, val ) {

    if (val.num_messages < lim) {return false;}

    c++;

    //alert( 'adding hashtag: ' + val.hashtag );
    //top_q.push( "<li id='top_h_" + key + "'>" + val.num_messages + " => " + val.hashtag + "</li>" );
    top_q.push( "<tr><td>" + val.num_messages + "</td><td> uses of #" + val.hashtag + "</td></tr>" );
  });
  $('#top_hashtags').html("<table>"+top_q.join( "" )+"</table>");
  $('#num_displayed_hashtags').html(c);
  $('#num_ceil_hashtags').html(lim);


  // Display top mentions
  var c = 0;
  var lim = Math.ceil(kango.tab_details.top_mentions[0].num_messages / 50)
  var top_q = [];

  $.each( kango.tab_details.top_mentions, function( key, val ) {

    if (val.num_messages < lim) {return false;}

    c++;

    top_q.push( "<tr><td>" + val.num_messages + "</td><td> mentions of @" + val.username + "</td></tr>" );
  });
  $('#top_mentions').html("<table>"+top_q.join( "" )+"</table>");
  $('#num_displayed_mentions').html(c);
  $('#num_ceil_mentions').html(lim);

  // Display top qoutes
  var c = 0;
  var lim = Math.ceil(kango.tab_details.quotes[0].quoted_count / 10)
  var top_q = [];

  $.each( kango.tab_details.quotes, function( key, val ) {

    if (val.quoted_count < lim) {return false;}

    c++;

    top_q.push( "<li>" + val.quoted_count + ' instances of <b>"' + val.quoted_text + '"</b></li>' );
    //top_q.push( '<tr class="quotes_table"><td>' + val.quoted_count + '</td><td> instances of "' + val.quoted_text + '"</td></tr>' );
  });

    //alert(top_q.join( "" ))

  $('#top_quotes').html('<ul>'+top_q.join( "" )+"</ul>");
  $('#num_displayed_quotes').html(c);
  $('#num_ceil_quotes').html(lim);


  //showPopupProperies();

  $('#form').submit(function() {
    return false;
  });

  $('#popup-close').click(function(event) {
    WindowTest.close();
  });
    
  $('#popup-resize').click(function(event) {
    WindowTest.resize();
  });

  XhrTest.init();
  StorageTest.init();

  //alert('end Kango on ready');

});
