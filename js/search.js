/*
Author: Moamen Ahmed
Last Modification: 2023-11-24
*/
$(document).ready(function () {
    var searchResults = $('#player-wrapper');
    var searchParamLabel = $('#search-results-search-param-label');
    var searchResultsCount = $('#search-results-count');
    var searchResultsDescription = $('#search-results-description');
    var searchBarWrapper = $('#search-bar-wrapper');
    var filtersWrapper = $('#filters-wrapper');

    function populateResults() {
        var params = new URLSearchParams(window.location.search);

        if (!params || !params.get('search')) {
            searchBarWrapper.css('display', 'block');
            searchResultsDescription.css('display', 'none');
            filtersWrapper.css('display', 'none');
            searchResults.css('display', 'none');
        } else {
            searchBarWrapper.css('display', 'none');
            searchResultsDescription.css('display', 'flex');
            filtersWrapper.css('display', 'block');
            searchResults.css('display', 'block');

            // Fetch results from API
            $.ajax({
                url: 'http://localhost:3001/data/api.json',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var search = decodeURIComponent(params.get('search'));
                    let regex = new RegExp(search);
                    var filteredData = data.data.filter(function(d) {
                        return regex.test(d.name + ' ' + d.league);
                    }); 

                    filteredData = applyFilters(filteredData);

                    populateResultsGivenData(searchResults, filteredData, params.get('search'));
                },
                error: function (error) {
                    console.error('Error fetching the JSON file:', error);
                }
            });
        }
    }

    function filterResults() {
        var params = new URLSearchParams(window.location.search);

        if (!params || !params.get('search')) {
            return;
        }
        else{
            $.ajax({
            url: 'http://localhost:3001/data/api.json',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var search = decodeURIComponent(params.get('search'));
                let regex = new RegExp(search);
                var filteredData = data.data.filter(function(d) {
                    return regex.test(d.name);
                }); 

                filteredData = applyFilters(filteredData);

                populateResultsGivenData(searchResults, filteredData);
            },
            error: function (error) {
                console.error('Error fetching the JSON file:', error);
            }
        });
    }
    }

    function updatePriceSlider(maxPrice) {
        var toSlider = $('#toSlider');
        var fromSlider = $('#fromSlider');
        if (toSlider.attr('max') < maxPrice) {
            toSlider.attr('max', maxPrice);
            fromSlider.attr('max', maxPrice);
        }
    }

    function applyFilters(data) {
        var fromSlider = $('#fromSlider');
        var toSlider = $('#toSlider');

        var fromPrice = parseInt(fromSlider.val());
        var toPrice = parseInt(toSlider.val());

        data = data.filter(function(d) {
            return d.price >= fromPrice;
        });
        data = data.filter(function(d) {
            return d.price <= toPrice;
        });

        return data;
    }

    function populateResultsGivenData(searchResults, filteredData, searchQuery) {
        searchResults.empty();

        searchResultsCount.text(filteredData.length);

        if (searchQuery) {
            searchParamLabel.text(searchQuery);
        }

        var maxPrice = Math.max(...filteredData.map(function(d) { return d.price; }));
        updatePriceSlider(maxPrice);

        for (var d of filteredData) {
            d.img.src = new URL(d.img.src, document.baseURI).href;

            var div = $('<div>').addClass('player-display-quick');
            var h1 = $('<h1>').addClass('player-display-quick-name').html(d.name + ' ' + d.league);
            div.append(h1);

            var img1 = $('<img>').attr('src', d.img.src).attr('alt', d.img.alt).addClass('model-display-quick-img');
            if (d.img.lowsrc) {
                img1.attr('lowsrc', d.img.lowsrc);
            }

            div.append(img1);

            searchResults.append(div);
        }
    }

    populateResults();

    $('#fromSlider').on('change', filterResults);
    $('#toSlider').on('change', filterResults);

});