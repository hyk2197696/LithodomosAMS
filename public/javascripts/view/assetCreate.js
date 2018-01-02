var projects = [];
var poses = [];
var sites = [];
var allDirectories = [];
var currentDirectory = null;

//load all data before the loading the page
$(document).ready(function () {
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

//for control the size of input bar
$(".tt-hint").addClass("form-control");

//select all project from the database and make it as typeahaed
function getAllProject() {
    var req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallproject");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            var responds = JSON.parse(req.responseText);
            //alert(req.responseText);
            projects = [];
            for (var  i = 0; i < responds.length; i++) {

                projects.push(responds[i].name);
            }

            var project = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: projects
            });

            $('#project_div .typeahead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 'project',
                    source: project
                })
        }
    }
    req.send();
}
//
function getAllPose() {}
//     var req = new XMLHttpRequest();
//
//     req.open("GET", "/dynamic/selectallpose");
//     req.onreadystatechange = function () {
//         if (req.readyState == 4) {
//
//             var responds = JSON.parse(req.responseText);
//             //alert(req.responseText);
//             projects = [];
//             for (var i = 0; i < responds.length; i++) {
//
//                 poses.push(responds[i].name);
//             }
//
//             var pose = new Bloodhound({
//                 datumTokenizer: Bloodhound.tokenizers.whitespace,
//                 queryTokenizer: Bloodhound.tokenizers.whitespace,
//                 local: poses
//             });
//
//             $('#pose_div .typeahead').typeahead({
//                     hint: true,
//                     highlight: true,
//                     minLength: 1
//                 },
//                 {
//                     name: 'pose',
//                     source: pose
//                 })
//         }
//     }
//     req.send();
// }

function getAllSite() {
    var req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallsite");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            var sites = JSON.parse(req.responseText);
            alert(req.responseText);


            var site = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: sites
            });

            $('#site_div .typeahead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 'site',
                    source: site
                })
        }
    }
    req.send();
}

//function for setting the type of the asset as 'Asset' when click the 'Assets' on the nav bar
function asset(){
    $("#asset_type").val("Asset");
}

//function for setting the type of the asset as 'Statue' when click the 'Statues' on the nav bar
function statue() {
    $("#asset_type").val("Statue");
}

//function for setting the type of the asset as 'Architectural Element' when click the 'Architectural Element' on the nav bar
function archtecturalElement() {
    $("#asset_type").val("Architectural Element");
}

//function for setting the type of the asset as 'Prop' when click the 'Props' on the nav bar
function prop(type) {
    $("#asset_type").val("Prop");
    $("#prop_type").val(type);
}

//function for setting the type of the asset as 'Shader' when click the 'Shader' on the nav bar
function shader() {
    $("#asset_type").val("Shader");
}

//function for setting the type of the asset as 'Diagram' when click the 'Diagrams' on the nav bar
function diagram() {
    $("#asset_type").val("Diagram");
}



function getAllDirectory(callback) {
    var req = new XMLHttpRequest();
    req.open("GET", "/dynamic/selectalldirectory");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);

            callback(req.responseText);

        }
    }
    req.send();
};

function getFoldersById(id) {
    var folders = [];

    for (var i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i].super == id) {
            folders.push(allDirectories[i]);
        }
    }
    //alert(folders);
    return folders;
};

function getSuperFolderIdById(id) {
    for (var i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i]._id == id) {
            return allDirectories[i].super;
        }
    }
}
function getFolderObjectById(id) {
    for (var i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i]._id == id) {
            return allDirectories[i]
        }
    }
}
function back(id) {
    if (id == null) {
        return;
    }
    currentDirectory = getSuperFolderIdById(id);
    var currentFolderName;
    if (currentDirectory == null) {
        currentFolderName = 'Root';
    } else {
        var currentFolder = getFolderObjectById(currentDirectory);
        currentFolderName = currentFolder.name;
    }
    setDirectoryTableHeader(currentFolderName);
    setDirectoryTableBody();

}

function explore(id) {
    //alert();
    currentDirectory = id;
    var currentFolder = getFolderObjectById(id);
    setDirectoryTableHeader(currentFolder.name);
    setDirectoryTableBody();
}

function setDirectoryTableHeader(name) {
    $("#directory_tbody").html('<th scope="row"><botton type="button" class="btn glyphicon glyphicon-arrow-left" onclick="back(\''
        + currentDirectory + '\')"></botton>' +
        '<botton type="button" class="btn-lg glyphicon glyphicon-folder-open" > ' + name + '</botton></th><th scope="row"/>');
}

function setDirectoryTableBody() {
    var folders = getFoldersById(currentDirectory);
    for (var i = 0, len = folders.length; i < len; i++) {
        var html = '<tr/><th scope="row"><botton  type="button" class="btn glyphicon glyphicon-folder-close onclick=" onclick="explore(\'' + folders[i]._id + '\')" > ' + folders[i].name + '</botton></th><th scope="row"/>';
        //alert(html);
        $("#directory_tbody").append(html);
    }
}

function save() {
    if (currentDirectory == null) {
        alert('Can\'t save assets in root directory,\nplease choose another');
        return;
    }
    $("#directory").val(currentDirectory);
    var req = new XMLHttpRequest();
    req.open("GET", "/dynamic/getfullfolderdirectory?id=" + currentDirectory);
    req.onreadystatechange = function () {

        if (req.readyState == 4) {

            $("#directory_content").html('Root' + req.responseText);
            $("#directory_selector").modal('hide');
        }
    }
    req.send();
}

function checkRequire() {
    if ($("#directory").val() == '') {
        alert("please select a directory");
        return false;
    } else {

        return true;
    }
}