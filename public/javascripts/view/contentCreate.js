function projectCreate() {
    if ($("#new_project_name").val() == '') {
        alert('Please enter the project name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/projectcreate?name=" + $("#new_project_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            alert(req.responseText);
            $("#project_create").modal('hide');
            $("#project_name").val($("#new_project_name").val());
        }
    }
    req.send();
}

function referenceCreate() {
    if ($("#new_reference_name").val() == '') {
        alert('Please enter the reference name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/referencecreate?name=" + $("#new_reference_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#reference_create").modal('hide');
            $("#reference_default_option").val(response.newReference._id);
            $("#reference_default_option").html(response.newReference.name);
            $("#reference").prepend('<option value="-1">No reference</option>')

        }
    }
    req.send();
}

function periodCreate() {
    if ($("#new_period_name").val() == '') {
        alert('Please enter the period name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/periodcreate?name=" + $("#new_period_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#period_create").modal('hide');
            $("#period_name_default").val(response.newPeriod._id);
            $("#period_name_default").html(response.newPeriod.name);
            $("#period_name").prepend('<option value="-1">No period</option>')

        }
    }
    req.send();
}

function statueTypeCreate() {
    if ($("#new_statue_type_name").val() == '') {
        alert('Please enter the statue name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/statuetypecreate?name=" + $("#new_statue_type_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#statue_type_create").modal('hide');
            $("#statue_type_default").val(response.newType._id);
            $("#statue_type_default").html(response.newType.name);
            $("#statue_type_name").prepend('<option value="-1">No StatueType</option>')

        }
    }
    req.send();
}
function statueCultureCreate() {
    if ($("#new_statue_culture_name").val() == '') {
        alert('Please enter the culture name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/culturecreate?name=" + $("#new_statue_culture_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#statue_culture_create").modal('hide');
            $("#statue_culture_default").val(response.newCulture._id);
            $("#statue_culture_default").html(response.newCulture.name);
            $("#statue_culture_name").prepend('<option value="-1">No culture</option>')

        }
    };
    req.send();
}

function materialCreate() {
    if ($("#new_material_name").val() == '') {
        alert('Please enter the material name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/materialcreate?name=" + $("#new_material_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#material_create").modal('hide');
            $("#material_name_default").val(response.newMaterial._id);
            $("#material_name_default").html(response.newMaterial.name);
            $("#material_name").prepend('<option value="-1">No material</option>')

        }
    }
    req.send();
}
function architecturalCultureCreate() {
    if ($("#new_architectural_culture_name").val() == '') {
        alert('Please enter the culture name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/culturecreate?name=" + $("#new_architectural_culture_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#architectural_culture_create").modal('hide');
            $("#architectural_culture_default").val(response.newCulture._id);
            $("#architectural_culture_default").html(response.newCulture.name);
            $("#architectural_culture_name").prepend('<option value="-1">No Culture</option>')

        }
    }
    req.send();
}
function architecturalTypeCreate() {
    if ($("#new_architectural_type_name").val() == '') {
        alert('Please enter the new architectural type!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/architecturaltypecreate?name=" + $("#new_architectural_type_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#architectural_type_create").modal('hide');
            $("#architectural_type_default").val(response.newType._id);
            $("#architectural_type_default").html(response.newType.name);
            $("#architectural_type_name").prepend('<option value="-1">No type</option>')

        }
    }
    req.send();
}
function styleCreate() {
    if ($("#new_style_name").val() == '') {
        alert('Please enter the new style name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/stylecreate?name=" + $("#new_style_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#style_create").modal('hide');
            $("#style_default").val(response.newStyle.id);
            $("#style_default").html(response.newStyle.name);
            $("#style_name").prepend('<option value="-1">No style</option>')

        }
    }
    req.send();
}

function shaderTypeCreate() {
    if ($("#new_shader_type").val() == '') {
        alert('Please enter the shader type!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/shadertypecreate?name=" + $("#new_shader_type").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#shader_type_create").modal('hide');
            $("#shader_type_default").val(response.newType._id);
            $("#shader_type_default").html(response.newType.name);
            $("#shader_type_name").prepend('<option value="-1">No shader type</option>')

        }
    }
    req.send();
}

function diagramTypeCreate() {
    if ($("#new_diagram_type").val() == '') {
        alert('Please enter the diagram type!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/diagramtypecreate?name=" + $("#new_diagram_type").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#diagram_type_create").modal('hide');
            $("#diagram_type_default").val(response.newType._id);
            $("#diagram_type_default").html(response.newType.name);
            $("#diagram_type_name").prepend('<option value="-1">No diagram type</option>')

        }
    }
    req.send();
}

function publicationCreate() {
    if ($("#new_publication_name").val() == '') {
        alert('Please enter the new publication name !');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/dynamic/publicationcreate?name=" + $("#new_publication_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            alert(response.message);
            $("#publication_create").modal('hide');
            $("#publication_name_default").val(response.newPublication._id);
            $("#publication_name_default").html(response.newPublication.name);
            $("#publication_name").prepend('<option value="-1">No publication</option>')

        }
    }
    req.send();
}
