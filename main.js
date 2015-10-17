// The Campaign Url used to get the data
$(function(){
var campaignEventsUrl = "https://s3.amazonaws.com/interview-api-samples/events-results.json?";

$.getJSON(campaignEventsUrl, function (data) {
    var trMain;
    var trDetail;
   
    var sorted = data.events;
    
    sorted.sort(function(a, b){
        console.log("a,b: " + a.startDate);
        return new Date(a.startDate) - new Date(b.startDate);
    });
    var k = 0;
    sorted.forEach(function (obj) {
        
        
        trMain = $('<tr/>');
        trDetail = $('<tr/>');
        trMain.addClass('expand');
        trDetail.addClass('collapse');
        if (obj.locations[0].spacesRemaining){
        trMain.append('<td><input type="checkbox" /></td>');
        }
        else
        {
            trMain.append('<th>Event Closed');
        }
        trMain.attr('id', k);
        console.log(trMain);
        
        trMain.append('<td><a href="#"><p>' + obj.name + '</p></a></td>');
        trMain.append("<td>" + obj.startDate + "</td>");
        trMain.append("<td>" + obj.locations[0].city + "</td>");
        trMain.append("<td>" + obj.locations[0].tiers[0].price + "</td>");
        $('table').append(trMain);

        k++;
        trDetail.append('<th>Details:</th>');
        trDetail.append("<td>" + obj.description +"</td>");
        trDetail.append("<th>Seats Open:</th><td>" + obj.locations[0].spacesRemaining +"</td>");
        
        //tr.append("<td> <p>" + obj.description + "</p> </td>");
       $('table').append(trDetail);
    });
})
    .done(function(){
       $('.expand').on('click', function () {
           //$('.collapse').toggle();
           $('collapse').next().children('tr .expand').show()
          console.log("LAWDYYYY");
        });

})
    .fail(function () {
    console.log("Error Error Error");
});

/*$('table tr').on('click', 'tr', function()
{
  console.log("LAWWWWD");
});*/
    
    
   
});






/* $(function () {
    $("p").hide();
    $("table").click(function (event) {
        event.stopPropagation();
        var $target = $(event.target);
        if ($target.closest("td").attr("colspan") > 1) {
            $target.slideUp();
        } else {
            $target.closest("tr").next().find("p").slideToggle();
        }
    });
}); */

//Extra Credit


