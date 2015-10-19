// The Campaign Url used to get the data
(function() {
    var campaignEventsUrl = "https://s3.amazonaws.com/interview-api-samples/events-results.json?";

    $.getJSON(campaignEventsUrl, function(data) {
            var trMain;
            var trDetail;

            var sorted = data.events;

            sorted.sort(function(a, b) {
                console.log("a,b: " + a.startDate);
                return new Date(a.startDate) - new Date(b.startDate);
            });
            var k = 0;
            sorted.forEach(function(obj) {
                trMain = $('<tr/>');
                trDetail = $('<tr/>');
                trMain.addClass('expand');
                trDetail.addClass('collapse');
                if (obj.locations[0].spacesRemaining) {
                    trMain.append('<td><input id="' + k + '" type="checkbox"></td>');
                } else {
                    trMain.append('<th>Event Closed');
                }
                trMain.append('<td>' + obj.name + '</a></td>');
                trMain.append("<td>" + obj.startDate + "</td>");
                trMain.append("<td>" + obj.locations[0].city + "</td>");
                trMain.append("<td>" + obj.locations[0].state + "</td>");
                $('table').append(trMain);
                k++;
                trDetail.append('<th>Details:</th>');
                trDetail.append("<td>" + obj.description + "</td>");
                trDetail.append("<th>Seats Open:</th><td>" + obj.locations[0].spacesRemaining + "</td>");
                $('table').append(trDetail);
            });
        })
        .done(function() {
            $(":checkbox").on("change", function() {
                console.log("here");

                var checkboxValues = {};
                $(":checkbox").each(function() {
                    console.log("here each checkbox");
                    checkboxValues[this.id] = this.checked;
                    console.log("ID:" + this.id + "Check:" + this.checked);
                });
                $.cookie('checkboxValues', checkboxValues, {
                    expires: 7,
                    path: '/'
                })
                console.log("checkboxVal: " + checkboxValues);
            });

            function repopulateCheckboxes() {
                console.log("repopulate");
                var checkboxValues = $.cookie('checkboxValues');
                console.log(checkboxValues);
                if (checkboxValues) {
                    Object.keys(checkboxValues).forEach(function(element) {

                        var checked = checkboxValues[element];
                        console.log(checked);
                        debugger;
                        $("#" + element).attr('checked', checked);
                        //document.getElementById(element).checked = checked;
                        // $('#' + element)[0].checked=true;
                    });
                }
            }
            //debugger;
            $.cookie.json = true;
            repopulateCheckboxes();


            $('.expand').on('click', (function() {

                    $('.expand').not(this).nextAll('tr.collapse').hide()
                    $(this).closest('tr').next('tr').toggle()

                })

            )

        })

    .fail(function() {
        console.log("Error Error Error");
    });

})();