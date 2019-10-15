var currentUserId =0;
var currentClickedId = 0;
function loggedUser(){
    $.ajax({
        url:'/current',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function (response) {
            $('#cu_username').html(response['username'])
            var name = response['name']+" "+response['fullname'];
            currentUserId = response['id']
            $('#cu_name').html(name);
            allUsers();
        },
        error: function(response){
            alert(JSON.stringify(response))
        }
        });
}
function allUsers(){
    $.ajax({
        url:'/users',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success:function (response) {
            var i=0;
            $.each(response,function(){
                f = '<div class="alert alert-secondary" role="alert" onclick=loadMessages('+currentUserId+','+response[i].id+') >';
                f = f + response[i].username;
                f = f + '</div>';
                i = i + 1;
                $('#allusers').append(f);
            });
        },
        error: function(response){
            aler(JSON.stringify(response));
        }
    });
}

function loadMessages(user_from_id, user_to_id){
        //alert(user_from_id);
        //alert(user_to_id);
        currentClickedId = user_to_id;
        $.ajax({
            url:'/messages/'+user_from_id+"/"+user_to_id,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',

            success: function(response){
                $('#messages').html("");
                var i = 0;
                $.each(response, function(){
                if(response[i]["user_from_id"]== user_to_id){
                    f = '<div class="d-flex justify-content-start mb-4"><div class="msg_cotainer">';
                }
                else {
                    f = '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send" align="right" >';
                }
                    f = f + response[i].content;
                    f = f + '</div>';
                    i = i+1;
                    $('#messages').append(f);
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
}

function sendMessage(){
        var message = $('#postmessage').val();
        $('#postmessage').val('');

        var data = JSON.stringify({
                "user_from_id": currentUserId,
                "user_to_id": currentClickedId,
                "content": message
            });

        $.ajax({
            url:'/messages',
            type:'POST',
            contentType: 'application/json',
            data : data,
            dataType:'json',
            success: function(response){
                loadMessages(currentUserId, currentClickedId)
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }


