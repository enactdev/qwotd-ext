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

//KangoAPI.resizeWindow(600,600);

//alert("hi");

KangoAPI.onReady(function() {

    //alert("hello");

    //kango.storage.setItem('height', 176);

    //var storedHeight = kango.storage.getItem('height');

    //alert('count ' + kango.tab_details.count );

    //alert( 'length ' + kango.tab_details.top_retweets.length );

    $('#num_tweets').html(kango.tab_details.count);

    //alert('top retweet: ' + kango.tab_details.top_favorited[0].twitter_msg_id );

    if ( kango.tab_details.top_retweets.length >= 1 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_retweets[0].twitter_msg_id+"&omit_script=true", function(data){$('#retweet_0').html(data.html);});
    }

    if ( kango.tab_details.top_retweets.length >= 2 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_retweets[1].twitter_msg_id+"&omit_script=true", function(data){$('#retweet_1').html(data.html);});
    }

    if ( kango.tab_details.top_retweets.length >= 3 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_retweets[2].twitter_msg_id+"&omit_script=true", function(data){$('#retweet_2').html(data.html);});
    }



    if ( kango.tab_details.top_favorited.length >= 1 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_favorited[0].twitter_msg_id+"&omit_script=true", function(data){$('#favorited_0').html(data.html);});
    }

    if ( kango.tab_details.top_favorited.length >= 2 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_favorited[1].twitter_msg_id+"&omit_script=true", function(data){$('#favorited_1').html(data.html);});
    }

    if ( kango.tab_details.top_favorited.length >= 3 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_favorited[2].twitter_msg_id+"&omit_script=true", function(data){$('#favorited_2').html(data.html);});
    }



    if ( kango.tab_details.top_replied_to.length >= 1 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_replied_to[0].in_reply_to_status_id+"&omit_script=true", function(data){$('#replied_to_0').html(data.html);});
    }

    if ( kango.tab_details.top_replied_to.length >= 2 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_replied_to[1].in_reply_to_status_id+"&omit_script=true", function(data){$('#replied_to_1').html(data.html);});
    }

    if ( kango.tab_details.top_replied_to.length >= 3 ) {
      $.getJSON( "https://api.twitter.com/1/statuses/oembed.json?id="+kango.tab_details.top_replied_to[2].in_reply_to_status_id+"&omit_script=true", function(data){$('#replied_to_2').html(data.html);});
    }




    var top_q = [];

  $.each( kango.tab_details.quotes, function( key, val ) {
    top_q.push( "<li id='top_q_" + key + "'>" + val.quoted_count + " => " + val.quoted_text + "</li>" );
  });

    //alert(top_q.join( "" ))

/***/
    $('#top_quotes').html("<ul>"+top_q.join( "" )+"</ul>");
/***/
    //alert('top quote: ' + kango.tab_details.quotes[0].quoted_text );

    showPopupProperies();

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
});
