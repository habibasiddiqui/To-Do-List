
var list = document.getElementById("listSection");

function addToList() 
{
    list.style.display = 'block';
    var inputText = document.getElementById("inputBox");
    var listItem = document.createElement("li");
    listItem.classList.add('list', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    var listText = document.createTextNode(inputText.value);
    // edit n delete btns
    var spanFa = document.createElement('span');
    spanFa.classList.add('badge', 'badge-light', 'spanFa');
    var editBtn = document.createElement('i');
    editBtn.classList.add("fa", "fa-pencil");
    editBtn.setAttribute("onclick", 'edit(this, this.parentNode)');
    editBtn.setAttribute("type", 'button');
    var delBtn = document.createElement('i');
    delBtn.classList.add("fa", "fa-trash");
    delBtn.setAttribute("onclick", 'del(this)');
    delBtn.setAttribute("type", 'button'); 
    if (inputText.value.length != 0) 
    {
        spanFa.appendChild(editBtn);
        spanFa.appendChild(delBtn);
        listItem.appendChild(listText);
        listItem.appendChild(spanFa);
        list.appendChild(listItem);
        inputText.value = "";
    }
    else
        alert("Type in your list!");
    // un-disbale delAllBtn
    var ableDelAllBtn = document.getElementById('delAllBtn');
    if(list.innerHTML != null)
    {
        ableDelAllBtn.disabled = false;
    }
}

function delAll() 
{
    var ableDelAllBtn = document.getElementById('delAllBtn');
    var confirmDelete = confirm("All list items would be deleted. Are you sure you want to delete everything?");
    if(confirmDelete == true)
    {
        list.innerHTML = "";
        list.style.display = 'none';
        if(list.innerHTML == null || list.innerHTML == "" )
        {
            ableDelAllBtn.disabled = true;
        }
    }
}

function edit(a, b) 
{
    var mainLi = a.parentNode.parentNode;
    var edited = prompt("Enter changes: ", mainLi.childNodes[0].nodeValue);
    if(edited != null)
        mainLi.childNodes[0].nodeValue = edited;
}

function del(a) 
{
    var x = a.parentNode.parentNode;
    x.remove();
    // disbale deleteAllBtn
    var ableDelAllBtn = document.getElementById('delAllBtn');
    if(list.innerHTML == null || list.innerHTML == "" )
        {
            ableDelAllBtn.disabled = true;
        }

}

