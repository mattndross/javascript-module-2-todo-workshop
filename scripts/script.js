let todos = [];

function createTodos(text){
   
    return todos.push({
        title : text,
        completed : false
    })
}

document.querySelector("#new-todo").addEventListener('submit', (e) => {
    e.preventDefault();
    const text = e.target.elements.text.value.trim();

    if (text.length > 0){
        createTodos(text);
        e.target.elements.text.value = '';
    }

    console.log(todos);
    renderTodos(todos)
})

const generateTodoDOM = (todoObj) => {
    
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const todoText = document.createElement('span');
    
    // set up checkbox
    const checkbox = document.createElement('input'); 
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todoObj.completed;
    containerEl.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        toggleTodo(todoObj.title);
        renderTodos(todos);
    })

    //set up text
    todoText.textContent = todoObj.title;
    containerEl.appendChild(todoText);

    //set up container
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    //set up remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text');
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodo(todoObj.title);
        renderTodos(todos)
    });

    return todoEl;
};

const toggleTodo = (title) => {
    const todo = todos.find(todo => todo.title.toLowerCase() === title.toLowerCase());

    if (todo) {
        todo.completed = !todo.completed;
    }
}

const renderTodos = (todos) => {
    
    //filter
    let filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(filters.searchTitle.toLocaleLowerCase()));
    if (filters.showFinished && filters.showUnfinished) {    
        //do nothing    
    } else if (filters.showFinished) {
        filteredTodos = filteredTodos.filter(todo => todo.completed)
    } else if (filters.showUnfinished) {
        filteredTodos = filteredTodos.filter(todo => !todo.completed)
    }

    const todoList = document.querySelector('#todos')
    if (filteredTodos.length > 0) {
        todoList.innerHTML = '';
        
        filteredTodos.forEach(todo => {
            const newTodo = generateTodoDOM(todo);
            todoList.appendChild(newTodo)
        })
    } else {  //si el mensaje ya existe no debería volver a aparecer


        const messegeEl = document.createElement('p');
        messegeEl.classList.add('empty-messege');
        messegeEl.textContent = 'There are no todos to show';
        todoList.appendChild(messegeEl);
    }
}
    

const removeTodo = (title) => {
    const todoIndex = todos.findIndex( todo => todo.title.toLowerCase() === title.toLowerCase());
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//set up filter todos
const filters = {
    searchTitle : '',
    showFinished : false,
    showUnfinished : false
};

const setFilters = (updates) => {
    if (typeof updates.searchTitle === 'string') {
        filters.searchTitle = updates.searchTitle;
    }

    if (typeof updates.showFinished === 'boolean') {
        filters.showFinished = updates.showFinished;
    }

    if (typeof updates.showUnfinished === 'boolean') {
        filters.showUnfinished = updates.showUnfinished;
    };

}

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchTitle : e.target.value
    })
    renderTodos(todos)
})

document.querySelector('#show-finished').addEventListener('input', (e) => {
    setFilters({
        showFinished : e.target.checked
    })
    renderTodos(todos)
})

document.querySelector('#show-unfinished').addEventListener('input', (e) => {
    setFilters({
        showUnfinished : e.target.checked
    })
    renderTodos(todos)
})



renderTodos(todos);





