/*
Author: Moamen Ahmed
Last Modification: 2023-11-29
*/
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3001/api/leagues',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#leagues-list').empty();
            $.each(data, function(index, d) {
                addLeague($('#leagues-list'), d);
            });
        },
        error: function(error) {
            console.error('Error fetching the JSON file:', error);
        }
    });

    function addLeague(leaguesList, name) {
        var leagueDiv = $('<div>').addClass('leagues-wrapper').click(function() {
            var searchQuery = encodeURIComponent(name);
            window.location.href = 'search.html?search=' + searchQuery;
        });

        var imageSrc = 'imgs/leagues/' + name.replace(/\s+/g, '_') + '.png';

        var image = $('<img>').addClass('league-img').attr('src', imageSrc).attr('alt', name + ' logo');

        var nameP = $('<p>').addClass('league-name').html(name);

        leagueDiv.append(image);

        leagueDiv.append(nameP);

        leaguesList.append(leagueDiv);
    }
});