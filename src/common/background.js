var details = {
method: 'GET',
url: 'http://atu2.com/',
async: true,
contentType: 'text'
};

kango.xhr.send(details, function(data) {
    if(data.status == 200 && data.response != null) {
    var text = data.response;
	kango.console.log("This is a test")
    }
    else { // something went wrong
        kango.console.log('something went wrong');
    }
});
