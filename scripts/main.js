var targetOrigin = '*';

window.onload = function() {
    initFolders();

    //createAnchors();
    //fixZIndex()
    //createCloud();
    //addDelayToTags();

    if (document.location.hash == "#xxxie") {
        document.body.classList.add("activexxxie");
    }

    var demos = document.querySelectorAll("#wall > section > article > article .demo");
    for (var i = 0; i < demos.length; i++) {
        var d = demos[i];
        d.style.marginLeft = (-d.clientWidth / 2) + "px";
    }

    window.addEventListener("message", function(e) { 
        if ("stop_demo" == e.data) {
            window.parent.postMessage('finished_exit', targetOrigin);
        }
    }, true);

    document.body.classList.remove("loading");
    window.parent.postMessage('loaded', targetOrigin);
}

function addDelayToTags() {
    var s = document.querySelectorAll("#overview span");
    for (var i = 0; i < s.length; i++) {
        s[i].style.MozTransitionDelay = (~~(Math.random() * 50))/10 + "s";
    }
}

function fixZIndex() {
    var a = document.querySelectorAll("#wall > section > article > article");
    for (var i = 0; i < a.length; i++) {
        var article = a[i];
        (function(article) {
            article.addEventListener("mouseover", function() {
                article.style.zIndex = 4000;
            }, true);
            article.addEventListener("mouseout", function(e) {
                article.style.zIndex = 3999;
            }, true);
        })(article);
    }
}

function createAnchors() {
    var h1 = document.querySelectorAll('#wall > section > article > h1');
    for (var i = 0; i < h1.length; i++) { h1[i].id = h1[i].innerHTML; }
    h1 = document.querySelectorAll('#wall > section > article > article > h1');
    for (var i = 0; i < h1.length; i++) { h1[i].id = h1[i].innerHTML; }
}

function initFolders() {
    var h1 = document.querySelectorAll("#wall > section > article > h1");

    for (var i = 0; i < h1.length; i++) {
        var elt = h1[i];

        (function(elt) {
            elt.addEventListener("click", function() {
                var p = elt.parentNode;

                if (p.classList.contains("closed")) {
                    p.classList.remove("closed");
                } else {
                    p.classList.add("closed");
                }
            }, true);
        })(elt);
    }
}

function findPos(e) {
    var curleft = curtop = 0;
    if (e.offsetParent) {
        do {
            curleft += e.offsetLeft;
            curtop += e.offsetTop;
        } while (e = e.offsetParent);
    }
    return {left: curleft, top: curtop};
}


// some specific demos scripts

// text-shadow demo
window.addEventListener("load", function() {
    var div = document.querySelector("#textshadowdemo > div");
    var p = document.querySelector("#textshadowdemo > div > p");
    var pos = findPos(div);
    pos.left += Math.round(div.clientWidth / 2) - 72;
    pos.top += Math.round(div.clientHeight / 2) + 500;
    div.parentNode.addEventListener("mousemove", function(e) {
        var x = (e.clientX - (pos.left - window.scrollX));
        var y = (e.clientY - (pos.top - window.scrollY));
        x *= -0.1;
        y *= -0.1;
        p.style.textShadow = x + "px " + y + "px 4px black";

    }, true);
}, true);


// Form demo
function submitForm() {
    try {
    var inputs = document.querySelectorAll("#formdemo input");
    var who = inputs[0].value;
    var demois = inputs[1].value;
    var msg = inputs[2].value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://184.106.112.6:9384/yo?WHO=" + who + "&DEMOIS=" + demois + "&MSG=" + msg);
    xhr.send();
    } catch(e) {}
    document.querySelector("#formdemo").className = "submited";
    return false;
}

// Open / Close all sections
function toggleFold() {
    var a = document.querySelectorAll(".closed");
    if (a.length == 0) {
        var a = document.querySelectorAll("#wall > section > article");
        for (var i = 0; i < a.length; i++) {
            a[i].classList.add("closed");
        }
    } else {
        for (var i = 0; i < a.length; i++) {
            a[i].classList.remove("closed");
        }
    }
}

function createCloud() {
    var Bh1 = document.querySelectorAll('#wall >  section > article > h1');
    var Mh1 = document.querySelectorAll('#wall > section > article > article > h1');

    var txt = "";

    for (var i = 0; i < Bh1.length; i++) {
        txt += 'u\'' + Bh1[i].innerHTML + '\' : 100,\n';
    }

    for (var i = 0; i < Mh1.length; i++) {
        txt += 'u\'' + Mh1[i].innerHTML + '\' : ' + (20 + Mh1.length - i)+ ',\n';
    }

    alert(txt);

}
