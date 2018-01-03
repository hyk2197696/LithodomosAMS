$(document).ready(function () {
    getdirectory();
    //getallreference();
});

function getdirectory() {
    var req = new XMLHttpRequest();
    req.open("get", "/dynamic/getfullfolderdirectory?id=#{asset.fakeDirectory.id}");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            $('#directory').html('Directory: Root' +  req.responseText);
        }
    }
    req.send();
}