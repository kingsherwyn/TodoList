//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//FUNCTIONS
function addTodo(event){
    //Prevent from submitting
    event.preventDefault();

    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add Todo to Local Storage 
    saveLocalTodos(todoInput.value);

    //Check Complete Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<span class="material-icons">done</span>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //Check Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<span class="material-icons">delete</span>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Append to list
    if (todoInput.value != "") {
        todoList.appendChild(todoDiv);
    }

    //Cleat todo Iput Value
    todoInput.value = "";
}

//Delete And Check Complete Todo 
function deleteCheck(e){
    const item = e.target;

    //Delete Todo
    if(item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;

        //Call Animation
        todo.classList.add('fall');

        // Remove From Local Storage
        removeLocalTodos(todo);

        // After Animation Delete Todo
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check Complete Todo
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//FILTER TODO LIST VIA SELECT
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//SAVE TO LOCAL STORAGE
function saveLocalTodos(todo){
    //Check If Todo Exist is Local Storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//GET FROM LOCAL STORAGE
function getTodos(){
    //Check If Todo Exist is Local Storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check Complete Button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<span class="material-icons">done</span>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        //Check Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<span class="material-icons">delete</span>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        //Append to list
        if (todo != "") {
            todoList.appendChild(todoDiv);
        }
    });
}

//REMOVE TODO FROM LOCAL STORAGE
function removeLocalTodos(todo){
    let todos;

    //Check If Todo Exist is Local Storage
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}