window.addEventListener("load", function() {

    var s = document.querySelector("#dnddemo");
    var initialized = false;

    function dragenter(e) {
        document.body.classList.add("dnding");
        e.stopPropagation();
        e.preventDefault();
    }
    function dragleave(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    function dragover(e) { e.stopPropagation(); e.preventDefault(); }

    function filesdropped(e) {
        document.body.classList.remove("dnding");

        e.stopPropagation();
        e.preventDefault();

        if (e.dataTransfer.files.length == 0) return;

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (function(file) {
            return function(e) {
                var url = e.target.result;
                var img = document.querySelector("#dnddemo img");
                img.src = url;
            }})(file);
    }
    window.addEventListener("dragenter", dragenter, true);
    window.addEventListener("dragleave", dragleave, true);
    window.addEventListener("dragover", dragover, true);
    s.addEventListener("drop", filesdropped, true);
}, true);
