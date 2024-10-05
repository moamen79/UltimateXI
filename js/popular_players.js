/*
Author: Moamen Ahmed
Last Modification: 2023-11-24
*/
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3001/api/popularPlayers',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, d) {
                addPopularPlayer($('#popular-players-list'), d);
            });
        },
        error: function(error) {
            console.error('Error fetching the JSON file:', error);
        }
    });

    function addPopularPlayer(popularPlayersList, data) {
        // data.img.src = '../imgs/Kylian_Mbappe.png';

        var playerDiv = $('<div>').addClass('player-display').click(function() {
            var searchQuery = encodeURIComponent(data.league + ' ' + data.name);
            window.location.href = 'results.html?search=' + searchQuery;
        });

        var headerDiv = $('<div>').addClass('player-display-name-wrapper');

        var nameP = $('<p>').addClass('player-display-name').html(data.name + ' ' + data.league);

        var underlineDiv = $('<div>').addClass('player-display-underline');

        headerDiv.append(nameP);
        headerDiv.append(underlineDiv);

        playerDiv.append(headerDiv);

        var img = $('<img>').addClass('player-display-img').attr('src', data.img.src).attr('alt', data.img.alt);

        playerDiv.append(img);

        popularPlayersList.append(playerDiv);
    }
});
