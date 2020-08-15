
var list = document.getElementById("listSection");

firebase.database().ref('list/items').on('child_added', function(data) {
    var listItem = document.createElement("li");
    listItem.classList.add('list', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    var listText = document.createTextNode(data.val().value);
    listItem.setAttribute('id', data.val().key);
    // done n edit n delete btns
    var spanFa = document.createElement('span');
    spanFa.classList.add('badge', 'badge-light', 'spanFa');
    var doneBtn = document.createElement('i');
    doneBtn.classList.add("fa", "fa-check-square");
    doneBtn.setAttribute("onclick", 'done(this)');
    doneBtn.setAttribute("type", 'button');
    var editBtn = document.createElement('i');
    editBtn.classList.add("fa", "fa-pencil");
    editBtn.setAttribute("onclick", 'edit(this)');
    editBtn.setAttribute("type", 'button');
    var delBtn = document.createElement('i');
    delBtn.classList.add("fa", "fa-trash");
    delBtn.setAttribute("onclick", 'del(this)');
    delBtn.setAttribute("type", 'button'); 
    // append to each other
    spanFa.appendChild(doneBtn);
    spanFa.appendChild(editBtn);
    spanFa.appendChild(delBtn);
    listItem.appendChild(listText);
    listItem.appendChild(spanFa);
    list.appendChild(listItem);
})

function addToList() 
{
    // add to firebase db
    var inputText = document.getElementById("inputBox");
    if (inputText.value.length == 0 || inputText.value == null) 
    {
        alert("Type in your list!");
    }
    else
    {
        list.style.display = 'block';
        var listItemKey = firebase.database().ref('list/items').push().key;
        var todo = {
        value: inputText.value,
        key: listItemKey
        };
        firebase.database().ref('list/items').child(listItemKey).set(todo);
    }    
    inputText.value = "";
    // if db is non-empty, able DelAll Btn
    var DelAllBtn = document.getElementById('delAllBtn');
    var ref = firebase.database().ref("list/");
    ref.once("value")
     .then(function(snapshot) {
            var a = snapshot.exists(); 
            if(a == true)
            {
                DelAllBtn.disabled = false;
            } 
            else if(a == true)
            {
                DelAllBtn.disabled = false;
            }
    });


    // // w/o firebase db
    // list.style.display = 'block';
    // var inputText = document.getElementById("inputBox");
    // var listItem = document.createElement("li");
    // listItem.classList.add('list', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    // var listText = document.createTextNode(inputText.value);
    // // done n edit n delete btns
    // var spanFa = document.createElement('span');
    // spanFa.classList.add('badge', 'badge-light', 'spanFa');
    // var doneBtn = document.createElement('i');
    // doneBtn.classList.add("fa", "fa-check-square");
    // doneBtn.setAttribute("onclick", 'done(this)');
    // doneBtn.setAttribute("type", 'button');
    // var editBtn = document.createElement('i');
    // editBtn.classList.add("fa", "fa-pencil");
    // editBtn.setAttribute("onclick", 'edit(this)');
    // editBtn.setAttribute("type", 'button');
    // var delBtn = document.createElement('i');
    // delBtn.classList.add("fa", "fa-trash");
    // delBtn.setAttribute("onclick", 'del(this)');
    // delBtn.setAttribute("type", 'button'); 
    // if (inputText.value.length != 0) 
    // {
    //     spanFa.appendChild(doneBtn);
    //     spanFa.appendChild(editBtn);
    //     spanFa.appendChild(delBtn);
    //     listItem.appendChild(listText);
    //     listItem.appendChild(spanFa);
    //     list.appendChild(listItem);
    //     inputText.value = "";
    // }
    // else
    //     alert("Type in your list!");

    // un-disbale delAllBtn
    // var ableDelAllBtn = document.getElementById('delAllBtn');
    // if(list.innerHTML != null)
    // {
    //     ableDelAllBtn.disabled = false;
    // }
}

function delAll() 
{
    var confirmDelete = confirm("All list items would be deleted. Are you sure you want to delete everything?");
    if(confirmDelete == true)
    {
        // on browser
        list.innerHTML = "";
        list.style.display = 'none';

        firebase.database().ref('list/items').remove();
        // if db is empty, disable DelAll Btn
        var DelAllBtn = document.getElementById('delAllBtn');
        var ref = firebase.database().ref("list/item");
        ref.once("value")
        .then(function(snapshot) {
            var a = snapshot.exists(); 
            if(a == false)
            {
                DelAllBtn.disabled = true;
            }
            // else if(a == true)
            // {
            //     DelAllBtn.disabled = false;
            // } 
          });
    
        // w/o db
        // list.innerHTML = "";
        // list.style.display = 'none';
        // if(list.innerHTML == null || list.innerHTML == "" )
        // {
        //     ableDelAllBtn.disabled = true;
        // }
        }
}

function done(a)
{
    // on browser
    var checked = a.parentNode.parentNode;
    if(checked.style.textDecoration != 'line-through')
        checked.style.textDecoration = 'line-through';
    else 
        checked.style.textDecoration = 'none';
}

function edit(a) 
{
    var mainLi = a.parentNode.parentNode;
    var key = a.parentNode.parentNode.id;
    var edited = prompt("Enter changes: ", mainLi.childNodes[0].nodeValue);
    if(edited != null)
    {
        // on browser
        mainLi.childNodes[0].nodeValue = edited;

        var changedToDo = {
            key: key,
            value: edited
        }
        firebase.database().ref('list/items').child(key).set(changedToDo);

    }
}

function del(a) 
{
    var x = a.parentNode.parentNode;
    x.remove();
    var key = a.parentNode.parentNode.id;
    firebase.database().ref('list/items').child(key).remove();
    // if db is empty, disable DelAll Btn
    var DelAllBtn = document.getElementById('delAllBtn');
    var ref = firebase.database().ref("list/");
    ref.once("value")
     .then(function(snapshot) {
            var a = snapshot.exists(); 
            if(a == false)
            {
                DelAllBtn.disabled = true;
            } 
            else if(a == true)
            {
                DelAllBtn.disabled = false;
            }
    });
    
    // w/o db
    // var x = a.parentNode.parentNode;
    // x.remove();

    // disbale deleteAllBtn
    // var ableDelAllBtn = document.getElementById('delAllBtn');
    // if(list.innerHTML == null || list.innerHTML == "" )
    //     {
    //         ableDelAllBtn.disabled = true;
    //     }

}

