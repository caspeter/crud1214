'use strict';

$(function() {

    $('#submitButton').click(function() {
        let command = $('#command').val();
        let id = $('#id').val();
        let body = {
          "user": $('#body').val()
        };

        switch (command) {
            case 'create':
                {
                    $.post('users', body).done((result) => {
                        $('#output').text(result.user + ' ' + result.id);
                    });
                    break;
                }
            case 'read':
                {
                    $.getJSON('users').done((result) => {
                      console.log(result);
                      var textString = [];
                      for (var i=0; i<result.length; i++){
                        textString.push(result[i].user + ' id: ' + result[i].id + '.');
                      }
                      console.log(textString);
                      $('#output').text(textString.toString());
                    });
                    break;
                }

            case 'update':
                {
                    $.ajax({
                        type: 'PATCH',
                        url: `/users/${id}`,
                        data: body
                    }).done((result) => {
                        $('#output').text(result.user + ' ' + result.id);
                    });
                    break;
                }

            case 'destroy':
                {
                    $.ajax({
                        type: 'DELETE',
                        url: `/users/${id}`
                    }).done((result) => {
                        $('#output').text(result.user + ' ' + result.id);
                    });
                    break;
                }

        }

    });





});
