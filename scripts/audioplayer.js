$(document).ready(function(){

    var myPlayer = $("#jquery_jplayer_1");

    myPlayer.jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                oga: "media/track.ogg"
            });
        },
        swfPath: "js",
        supplied: "oga"
    });

    function displayProgress(pc) {
        var degs = pc * 3.6+"deg";

        if (pc <= 50) {
            $('#circle-holder').removeClass('gt50');
            $('#progress1').css({rotate: degs});
            $('#progress2').hide();
        }
        else if (pc < 100) {
            $('#circle-holder').addClass('gt50');
            $('#progress1').css({rotate: '180deg'});
            $('#progress2').show();
            $('#progress2').css({rotate: degs});
        }
    }

    myPlayer.bind($.jPlayer.event.timeupdate, function(event) {
        var pc = event.jPlayer.status.currentPercentAbsolute;
        displayProgress(pc);
    });

    myPlayer.bind($.jPlayer.event.ended, function() {
        $('#circle-holder').removeClass('gt50');
        $('#progress1').css({rotate: '0deg'}).show();
        $('#progress2').css({rotate: '0deg'}).hide();
    });

    $('.click-control').click(function(event) {
        var self = $(this);
        var x = event.pageX - self.offset().left - self.width()/2;
        var y = event.pageY - self.offset().top - self.height()/2;

        var a = Math.atan2(y,x);
        if (a > -1*Math.PI && a < -0.5*Math.PI) {
            a = 2*Math.PI+a;
        }

        // a is now value between -0.5PI and 1.5PI
        // ready to be normalized and applied

        var pc = (a + Math.PI/2) / 2*Math.PI * 10;

        myPlayer.jPlayer("playHead", pc).jPlayer("play");

        return false;
    });

});
