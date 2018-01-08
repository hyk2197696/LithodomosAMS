let projects = [];
let poses = [];
let sites = [];
let allDirectories = [];
let currentDirectory = null;

let setDefaultTabs = (type) => {
    switch (type) {
        case 'Asset':
            $("#asset_form").addClass('in active');
            $("#asset_nav").addClass('active');
            break;
        case 'Statue':
            $("#statue_form").addClass('in active');
            $("#statue_nav").addClass('active');
            break;
        case 'Architectural Element':
            $("#architectural_element_form").addClass('in active');
            $("#architectural_element_nav").addClass(' active');
            break;
        case 'Prop':
            $("#prop_form").addClass('in active');
            //$("#prop_form").addClass('in active');
            break;
        case 'Shader':
            $("#shader_form").addClass('in active');
            $("#shader_nav").addClass(' active');
            break;
        case 'Diagram':
            $("#diagram_form").addClass('in active');
            $("#diagram_nav").addClass(' active');
            break;
    }
};
let getAllProject = () => {
    let req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallproject");
    req.onreadystatechange = () => {
        if (req.readyState === 4) {

            let responds = JSON.parse(req.responseText);
            //alert(req.responseText);
            projects = [];
            for (let i = 0; i < responds.length; i++) {
                projects.push(responds[i].name);
            }

            let project = new Bloodhound({
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
    };
    req.send();
};

let getAllPose = () => {

};
let getAllSite = () => {
    let req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallsite");
    req.onreadystatechange = () => {
        if (req.readyState == 4) {

            let sites = JSON.parse(req.responseText);
            //alert(req.responseText);


            let site = new Bloodhound({
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
    };
    req.send();
};
let getAllDirectory = callback => {

    let req = new XMLHttpRequest();
    req.open("GET", "/dynamic/selectalldirectory");
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            //alert(req.responseText);

            callback(req.responseText);

        }
    };

    req.send();
};


//function for setting the type of the asset as 'Asset' when click the 'Assets' on the nav bar
let asset = () => {
    $("#asset_type").val("Asset");
};

//function for setting the type of the asset as 'Statue' when click the 'Statues' on the nav bar
let statue = () => {
    $("#asset_type").val("Statue");
};

//function for setting the type of the asset as 'Architectural Element' when click the 'Architectural Element' on the nav bar
let archtecturalElement = () => {
    $("#asset_type").val("Architectural Element");
};

//function for setting the type of the asset as 'Prop' when click the 'Props' on the nav bar
let prop = type => {
    $("#asset_type").val("Prop");
    $("#prop_type").val(type);
};

//function for setting the type of the asset as 'Shader' when click the 'Shader' on the nav bar
let shader = () => {
    $("#asset_type").val("Shader");
};

//function for setting the type of the asset as 'Diagram' when click the 'Diagrams' on the nav bar
let diagram = () => {
    $("#asset_type").val("Diagram");
};


let getFoldersById = id => {
    let folders = [];

    for (let i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i].super === id) {
            folders.push(allDirectories[i]);
        }
    }
    //alert(folders);
    return folders;
};

let getSuperFolderIdById = id => {
    for (let i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i]._id === id) {
            return allDirectories[i].super;
        }
    }
};

let getFolderObjectById = id => {
    for (let i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i]._id === id) {
            return allDirectories[i]
        }
    }
};

let back = (id) => {
    if (id === null) {
        return;
    }
    currentDirectory = getSuperFolderIdById(id);
    let currentFolderName;
    if (currentDirectory === null) {
        currentFolderName = 'Root';
    } else {
        let currentFolder = getFolderObjectById(currentDirectory);
        currentFolderName = currentFolder.name;
    }
    setDirectoryTableHeader(currentFolderName);
    setDirectoryTableBody();

};

let explore = id => {
    //alert();
    currentDirectory = id;
    let currentFolder = getFolderObjectById(id);
    setDirectoryTableHeader(currentFolder.name);
    setDirectoryTableBody();
};

let setDirectoryTableHeader = name => {
    $("#directory_tbody").html('<th scope="row"><botton type="button" class="btn glyphicon glyphicon-arrow-left" onclick="back(\''
        + currentDirectory + '\')"></botton>' +
        '<botton type="button" class="btn-lg glyphicon glyphicon-folder-open" > ' + name + '</botton></th><th scope="row"/>');
};

let setDirectoryTableBody = () => {
    let folders = getFoldersById(currentDirectory);
    for (let i = 0, len = folders.length; i < len; i++) {
        let html = '<tr/><th scope="row"><botton  type="button" class="btn glyphicon glyphicon-folder-close onclick=" onclick="explore(\'' + folders[i]._id + '\')" > ' + folders[i].name + '</botton></th><th scope="row"/>';
        //alert(html);
        $("#directory_tbody").append(html);
    }
};


let save = () => {
    if (currentDirectory === null) {
        alert('Can\'t save assets in root directory,\nplease choose another');
        return;
    }
    $("#directory").val(currentDirectory);
    let req = new XMLHttpRequest();
    req.open("GET", "/dynamic/getfullfolderdirectory?id=" + currentDirectory);
    req.onreadystatechange = () => {
        if (req.readyState === 4) {

            $("#directory_content").html('Root' + req.responseText);
            $("#directory_selector").modal('hide');
        }
    };
    req.send();
};

