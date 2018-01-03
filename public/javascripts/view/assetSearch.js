
$(document).ready(function () {
    getAllAssetName();
});


function getAllAssetName() {
    var req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallassetname");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            var names = JSON.parse(req.responseText);
            //alert(req.responseText);


            var name = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: names
            });

            $('#asset_name_div .typeahead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 'name',
                    source: name
                })
        }
    }
    req.send();
}