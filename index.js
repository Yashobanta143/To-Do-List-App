// Get DOM elements:
const app = document.getElementById('to-do-list');
const input = document.getElementById('input');
const mainBtn = document.getElementById('mainBtn');


// Function to add new To-do:
function submitBtn() {
    const count = app.childElementCount;
    if (count === 12) {
        alert ("Max To-do limit reached, Delete some To-dos to add one.");
    } else {
        const value = input.value;
        if (value != '') {
            input.value = '';
            renderTodoList(text = value, time = dateTime());
        } else {
            alert('Cannot add empty To-do.');
        }
    }
}


// Adding eventlistener to mainBtn and enterkey.
mainBtn.addEventListener('click', submitBtn);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitBtn();
});


// Eventlistener When User Refresh The Page:
document.addEventListener('DOMContentLoaded',getTodo);  


// Render To-do List:
function renderTodoList(text, time) {
    let isEditting = false;
    // creating a todo div and adding text, time, buttons and checkbox to it.
    const todo = document.createElement('div');
    const todoText = document.createElement('h2');
    const todoTime = document.createElement('p');
    const checkBox = document.createElement('input');
    const editBtn = document.createElement('button');
    const saveBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    todo.className = 'todo';
    todo.id = Date.now();
    todoText.textContent = text;
    todoTime.textContent = time;
    checkBox.type = 'checkbox';
    editBtn.type = 'button';
    editBtn.className = 'editBtn';
    editBtn.textContent = 'Edit';
    saveBtn.type = 'button';
    saveBtn.className = 'saveBtn';
    saveBtn.textContent = 'Save';
    deleteBtn.type = 'button';
    deleteBtn.className = 'delBtn';
    deleteBtn.textContent = 'Del';
    todo.append(todoText, todoTime, checkBox, editBtn, deleteBtn);
    app.appendChild(todo);

    // Adding eventlistener to buttons:
    checkBox.addEventListener('change', () => {
        todoText.classList.toggle('checked');
    });
    deleteBtn.addEventListener('click', (index) => {
        app.removeChild(todo);
        deleteTodo(index);
        saveTodo();  
        }
    )
    editBtn.addEventListener('click', () => {
        if (!isEditting) {
            todoText.contentEditable = 'true';
            todoText.focus();
            editBtn.style.display = 'none';
            deleteBtn.style.display = 'none';
            todo.appendChild(saveBtn);
            saveBtn.style.display = 'inline-block';
            isEditting = true;

        }
    })
    saveBtn.addEventListener('click', () => {
        if (isEditting) {
            todoText.contentEditable = 'false';
            todoTime.textContent = dateTime();
            saveBtn.style.display = 'none';
            editBtn.style.display = 'inline-block'
            deleteBtn.style.display = 'inline-block';
            isEditting = false;
            saveTodo();
        }
    })

    // Adding eventlistener to enter key:
    todo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (isEditting) {
                text.contentEditable = 'false';
                saveBtn.style.display = 'none';
                editBtn.style.display = 'inline-block'
                deleteBtn.style.display = 'inline-block';
                isEditting = false;
            }
        }
    })
    saveTodo();    
}


// Date-time Function.
function dateTime() {
    const d = new Date();
    const hour = d.getHours();
    const min = d.getMinutes();
    const days = ["sun","mon","tue","wed","thu","fri","sat"];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const fullTime = hour + ":" + min + "  " + day + " " + date + "-" + month + "-" + year;
    return fullTime;
}


// Function to save Todos in LocalStorage:
function saveTodo() {
    h2 = app.querySelectorAll('h2');
    p = app.querySelectorAll('p');
    const todo = Array.prototype.map.call(h2, h2 => h2.textContent);
    const time = Array.prototype.map.call(p, p => p.textContent);
    localStorage.setItem('data', JSON.stringify(todo));
    localStorage.setItem('time', JSON.stringify(time));
}


// Getting The Stored Todos
const storedTodo = JSON.parse(localStorage.getItem('data'));
const storedTime = JSON.parse(localStorage.getItem('time'));


// Function to Retrieve Todos:
function getTodo() {
    for (let i = 0; i < storedTodo.length; i++) {
        renderTodoList(text = storedTodo[i], time = storedTime[i]);
        localStorage.clear();
        saveTodo();

    }
}


// Function to delete Todo:
function deleteTodo(index) {
    storedTodo.splice(index, 1);
    storedTime.splice(index, 1);
}

