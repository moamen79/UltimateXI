/*
Author: Moamen Ahmed
Last Modification: 2023-11-24
*/

$(document).ready(function () {
    var params = new URLSearchParams(window.location.search);

    if (!params || !params.get('search')) {
        displayEmptyResults();
    } else {
        var search = decodeURIComponent(params.get('search'));
        displayResultData(search);
    }

    function displayResultData(search) {
        var playerDisplay = $('#player-display-full');
        // Empty modelDisplay
        playerDisplay.empty();
        
        $.ajax({
            url: 'http://localhost:3001/data/api.json',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var resultData = data.data.filter(function(d) {
                    return d.league + ' ' + d.name == search;
                });
                if (resultData.length === 0) {
                    console.log('No players found');
                    return;
                }
    
                var d = resultData[0];
    
                d.img.src = new URL(d.img.src, document.baseURI).href;
    
                $('#player-display-full-name').text(d.name + ' ' + d.league);
    
                var img = $('<img>').addClass('player-display-full-img').attr('src', d.img.src).attr('alt', d.img.alt);
    
                playerDisplay.append(img);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    

    function displayEmptyResults() {
        $('#player-display-full-name').text('404 Not Found');
        var playerDisplay = $('#player-display-full');
        playerDisplay.empty();
    }
});