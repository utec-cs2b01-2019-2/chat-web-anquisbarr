function getData(){
        //$('#action').append('<img src="images/load.gif" width="50" height="50"/>');
        var username = $('#username').val();
        var password = $('#password').val();
        var message = JSON.stringify({
                "username": username,
                "password": password
            });
        $.ajax({
            url:'/authenticate',
            type:'POST',
            contentType: 'application/json',
            data : message,
            dataType:'json',
            success: function(response){
                $('#action').html("");
                if(response['status']==401){
                //$('#action').append('<img width="50" height="50" src="images/fail.png"/>');
                }else{
                //$('#action').append('<img width="50" height="50" src="images/check.png"/>');
                var url = 'http://'+document.domain + ':' + location.port + '/static/chat.html';
                $(location).attr('href',url);
                }

                //$('#action').html(response['statusText']);
            },
            error: function(response){
                $('#action').html("");

                if(response['status']==401){
                //$('#action').append('<img width="50" height="50" src="images/fail.png"/"/>');
                }else{
                //$('#action').append('<img width="50" height="50" src="images/check.png"/"/>');
                var url = 'http://'+document.domain + ':' + location.port + '/static/chat.html';
                $(location).attr('href',url);
                }

        }});
}