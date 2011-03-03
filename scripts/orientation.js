var orientationdemo;

window.addEventListener("load", function() {
    orientationdemo = document.querySelector("#orientationdemo > .demo");
}, true);

window.addEventListener("MozOrientation", function(e) {
    if (!orientationdemo) return;
    var angle = (e.x * 90) + "deg";
    orientationdemo.style.MozTransform = "rotate(" + angle + ")";
}, true);
