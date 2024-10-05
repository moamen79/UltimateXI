/*
Author: Moamen Ahmed
Last Modification: 2023-11-29
*/

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'ro33qhoRAUqY9ooyteKaNuxEtAKqUIYV2kSz27Cf';

    var city = 'toronto'
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/worldtime?city=' + city,
        headers: { 'X-Api-Key': 'ro33qhoRAUqY9ooyteKaNuxEtAKqUIYV2kSz27Cf'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            const worldClockContainer = document.getElementById("world-time-container");
            worldClockContainer.innerHTML = `<p>Current Time: ${result.datetime}</p>`;
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
});