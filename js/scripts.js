!function($){
    $("html").removeClass("no-js");
    $("header a").click(function(event){
        if(!$(this).hasClass("no-scroll")){
            event.preventDefault();
            var target = $(this).attr("href"),
                scrollTo = $(target).offset().top;
            $("html, body").animate({
                scrollTop: scrollTo + "px"
            }, Math.abs(window.pageYOffset - $(target).offset().top));
            if($("header").hasClass("active")){
                $("header, body").removeClass("active");
            }
        }
    });

    $("#to-top").click(function(){
        $("html, body").animate({scrollTop: 0}, 500);
    });

    $("#lead-down span").click(function(){
        var nextSection = $("#lead").next().offset().top;
        $("html, body").animate({scrollTop: nextSection + "px"}, 500);
    });

    $("#experience-timeline").each(function(){
        var $this = $(this),
            $userContent = $this.children("div");
        $userContent.each(function(){
            $(this).addClass("vtimeline-content").wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });
        $this.find(".vtimeline-point").each(function(){
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });
        $this.find(".vtimeline-content").each(function(){
            var date = $(this).data("date");
            if(date){
                $(this).parent().prepend('<span class="vtimeline-date">' + date + "</span>");
            }
        });
    });

    $("#mobile-menu-open").click(function(){
        $("header, body").addClass("active");
    });

    $("#mobile-menu-close").click(function(){
        $("header, body").removeClass("active");
    });

    $("#view-more-projects").click(function(event){
        event.preventDefault();
        $(this).fadeOut(300, function(){
            $("#more-projects").fadeIn(300);
        });
    });
}(jQuery);