//js file 
$("#process").on("click", function() {
        var btn = $(this);
        btn.button("loading"),
        $.ajax({
            type: "POST",
            url: processURL,
            dataType: "json",
            data: $(".formatter form").serialize(),
            error: function(jqXHR, textStatus, errorThrown) {
                btn.button("reset"),
                $.sticky("An unknown error has occured.", {
                    position: "bottom-right",
                    classList: "error"
                })
            },
            success: function(data) {
                if (btn.button("reset"),
                "failure" != data.result) {
                    var result = $("#templates .result").clone()
                      , time = moment().format("MMMM Do YYYY, h:mm:ss a");
                    result.addClass("container-result-" + ++resultCount),
                    result.find("h3").text("#" + resultCount),
                    result.find(".name span").text(time).attr("title", time),
                    data.result.url && result.find(".url span").text(data.result.url).attr("title", data.result.url),
                    "undefined" != typeof data.result.valid ? 1 == data.result.valid ? (result.find(".validity-invalid").remove(),
                    result.find(".errors, .labels:first").remove()) : (result.find(".validity-valid").remove(),
                    $.each(data.result.errors, function(i, item) {
                        error = $("<li></li>"),
                        error.append("1" == data.result.errors[i].type ? '<i class="fa fa-exclamation-circle"></i><strong>Error:</strong>' : '<i class="fa fa-exclamation-triangle"></i><strong>Warning:</strong>'),
                        error.append('<a href="javascript:;" data-structure="s-' + data.result.errors[i].element + '">' + data.result.errors[i].message + "</a>"),
                        error.append("<em>[Code " + data.result.errors[i].code + ", Structure " + data.result.errors[i].element + "]</em>"),
                        result.find(".errors").append(error)
                    }
                    )) : result.find(".validity, .errors, .labels:first").remove();
                    var structureId = 0;
                    result.find(".json").html(data.result.json),
                    3 != data.result.template && result.find(".json").find(".sBrace, .sBracket").each(function(i) {
                        "{" == $(this).text() || "[" == $(this).text() ? ($(this).addClass("structure-" + ++structureId),
                        $(this).append(' <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> ')) : ("}" == $(this).text() || "]" == $(this).text()) && $(this).addClass("structure-" + structureId--)
                    }
                    ),
                    result.attr("data-json", data.result.jsoncopy.replace(/([^\r])\n/g, "$1\r\n")),
                    $(".results .results").prepend(result),
                    $(".results .results .result:first .jsonholder").resizable({
                        handles: "s"
                    }),
                    refreshScrollSpy(),
                    $(".results:first()").scrollTo({
                        onComplete: function() {},
                        offset: 70,
                        speed: 300
                    }),
                    clipboard.clip($(".results .btn-copy"))
                } else
                    data.errors ? $.each(data.errors, function(i, item) {
                        $.sticky(item[0], {
                            position: "bottom-right",
                            classList: "error"
                        })
                    }
                    ) : $.sticky("An unknown error has occured.", {
                        position: "bottom-right",
                        classList: "error"
                    })
            }
        }),
        recordEvent("JSON Formatter", "Process")
    }
    )
