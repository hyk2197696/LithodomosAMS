//load all data before the loading the page
$(document).ready(function () {
    getAllAssetName();
    //get all project to be used in typeahead
    getAllProject();

    //get all directories for directory selection
    getAllDirectory(function (allDirectory) {
        allDirectories = JSON.parse(allDirectory);
        setDirectoryTableHeader('Root');
        setDirectoryTableBody();
    });

    //get All Pose to be used in typeahead
    getAllPose();

    //get all site to be us
    getAllSite();

});


function getAllAssetName() {
    const req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallassetname");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            const names = JSON.parse(req.responseText);
            //alert(req.responseText);


            const name = new Bloodhound({
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
    };
    req.send();
}