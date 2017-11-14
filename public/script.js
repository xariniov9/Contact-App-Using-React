const RESPONSE_DONE = 4;
const STATUS_OK = 200;
window.onload = getContactsAJAX();

// adds all the items on the webpage.
// Basically used when whole page is reloaded or refreshed.
function getContactsAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/contact", true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                console.log(xhr.response);
                addContactElements(xhr.response);
            }
        }
    };
    xhr.send(data=null);
}

function addContactElements(contacts_data_json){
    var contacts = JSON.parse(contacts_data_json);
    var parent = document.getElementById("AllContacts");
    if(parent){
        parent.innerHTML = "";
        Object.keys(contacts).forEach( function (key) {
            var contactElement = createContactElement(key, contacts[key]);
            parent.appendChild(contactElement);
        });
    }
}

function createContactElement(id, contact_object) {
    var contact_element = document.createElement('li');
    contact_element.innerText = contact_object.name + " office: " + contact_object.phone_office + " personal: " + contact_object.phone_personal;
    contact_element.setAttribute("class",contact_object._id);

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    var str = "editContactAJAX(" + '"' + contact_object._id + '"'+ ", " + '"' + contact_object.name + '"' +"," +'"' + contact_object.phone_office + '"' + "," +'"' + contact_object.phone_personal + '"' +")";
    editButton.setAttribute("onclick",str);

    contact_element.appendChild(editButton);
    return contact_element;
}

function addContactAJAX() {
    var name= document.getElementById("name").value;
    document.getElementById("name").value = "";
    var phone_office = document.getElementById("phone_office").value;
    document.getElementById("phone_office").value = "";
    var phone_personal = document.getElementById("phone_personal").value;
    document.getElementById("phone_personal").value = "";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/contact", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "name=" + encodeURI(name) +"&phone_office="+encodeURI(phone_office)+"&phone_personal="+encodeURI(phone_personal);
    xhr.onreadystatechange = function () {
        //callback for open!
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            getContactsAJAX();
        }
    };
    xhr.send(data);
}

function editContactAJAX(_id, coname, cooffice, copersonal){
    console.log("Edit button pressed for "+_id);

    var name = document.createElement("input");
    name.setAttribute("value",coname);
    name.setAttribute("type","text");
    name.setAttribute("id","edit_name");

    var phone_office = document.createElement("input");
    phone_office.setAttribute("value",cooffice);
    phone_office.setAttribute("type","text");
    phone_office.setAttribute("id","edit_phone_office");

    var phone_personal = document.createElement("input");
    phone_personal.setAttribute("value",copersonal);
    phone_personal.setAttribute("type","text");
    phone_personal.setAttribute("id","edit_phone_personal");

    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.setAttribute("onclick", "editContactAJAXFinal(" + '"'+_id + '"'+")");
    edit_button.setAttribute("id", "edit_edit_button");


    document.body.appendChild(name);
    document.body.appendChild(phone_office);
    document.body.appendChild(phone_personal);
    document.body.appendChild(edit_button);
}

function editContactAJAXFinal(_id){
    console.log("Random");

    var name= document.getElementById("edit_name").value;
    var phone_office = document.getElementById("edit_phone_office").value;
    var phone_personal = document.getElementById("edit_phone_personal").value;

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/contact/"+_id, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "name=" + encodeURI(name) +"&phone_office="+encodeURI(phone_office)+"&phone_personal="+encodeURI(phone_personal);
    xhr.onreadystatechange = function () {
        //callback for open!
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            getContactsAJAX();
        }
    };
    xhr.send(data);


    document.body.removeChild(document.getElementById("edit_name"));
    document.body.removeChild(document.getElementById("edit_phone_personal"));
    document.body.removeChild(document.getElementById("edit_phone_office"));
    document.body.removeChild(document.getElementById("edit_edit_button"));

}
