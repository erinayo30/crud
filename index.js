       const DB_NAME = "todo_db"
       const todoInput = document.querySelector("#todo-input");

        // CREATE TODO FUNCTION
        const createTodo = () => {
            
            
            if (!todoInput.value){
              showMessage("Todo title cannot be empty")

                return;
            }

            const newTodo = {
                id: uuid(),
                title: todoInput.value,
                created_at: Date.now(),
            };

            // check for ls
            const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
            
            // add new todo db array
            const new_todo_db = [...todo_db, newTodo];

            // Store updated todos in localStorage
            localStorage.setItem(DB_NAME, JSON.stringify(new_todo_db));
            fetchTodos();
            resetFormInput();
        };
        // READ TODO FUNCTION
        const fetchTodos = () =>  {
            const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
            const noTodo = todo_db.length === 0;
            const todoListContainer = document.querySelector("#todo-list-container");
            if (noTodo) {
                todoListContainer.innerHTML = `<p class="text-center text-slate-600">Your Tasks will appear here</p>`;
                return
            }
            const todos = todo_db
            .sort((a, b) => 
            a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
            )
            .map((todo) => {
                return ` 
                    <div 
                    class="group flex justify-between py-3 px-2.5 rounded-lg hover:bg-gray-400 "
                >
                        <a href="">${todo.title}</a>
                        <section class="flex gap-4 hidden group-hover:flex">
                            <button onclick="handleEditMode('${todo.id}')">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="w-6 h-6">
                                    <path stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>                          
                            </button>
                            
                            <button onclick="deleteTodo('${todo.id}')">
                                <svg
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="w-6 h-6">
                                    <path stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>                          
                            </button>
                        </section>
                    </div>
        `;
            });

            todoListContainer.innerHTML = todos.join("");
            
        };


        // DELETE TODOs
        const deleteTodo = (id) => {
            Swal.fire({
                title: 'Delete Todo',
                text: 'Do you want to continue',
                icon: 'warning',
                confirmButtonText: 'Delete',
                showCancelButton: true,
              }).then((res) => {
                    console.log(res.isConfirmed);
                    if (res.isConfirmed){
                        console.log(id);

                    // get todo from localStorage
                    const todo_db = JSON.parse(localStorage.getItem(DB_NAME));
                    // fliter
                    const new_todo_db = todo_db.filter((todo) => todo.id !== id);
                    console.log(new_todo_db)
        
                    // set the new todos without the todo that match the id to the localstorage
                    localStorage.setItem(DB_NAME, JSON.stringify(new_todo_db));
                    fetchTodos()
                    } else {
                        return;
                    }
                    
              });

        };

        // UPDATE TODO
        const handleEditMode = (id) => {
          
            const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
            const todo_to_update = todo_db.find((todo) => todo.id === id);
           
            if (!todo_to_update){
                return;
            }

           
            todoInput.value = todo_to_update.title;

            const updateTodoBtn= document.querySelector("#update_todo_btn")
            updateTodoBtn.classList.remove("hidden");
            updateTodoBtn.setAttribute("todo_id_to_update", id)

            // todo_id_to_update
            const addTodoBtn =document.querySelector("#add_todo_btn");
            addTodoBtn.classList.add("hidden");
        };

        const updateTodo = () => {
           
            if (!todoInput.value){
                const formMessageSpan = document.querySelector("#form-message");
                formMessageSpan.innerHTML = "Please provide update task";
                formMessageSpan.classList.remove("hidden")
                formMessageSpan.classList.add("text-xs", "text-red-600");
              
              setTimeout(() =>{
                formMessageSpan.classList.add("hidden");
              }, 2000);

                return;
        
            }

            const updateTodoBtn = document.querySelector("#update_todo_btn");
            const todo_id_to_update = updateTodoBtn.getAttribute("todo_id_to_update");
            const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
            const updated_todo_db = todo_db.map((todo) =>{
                if(todo.id === todo_id_to_update) {
                    return {...todo, title: todoInput.value};
                }else {
                    return todo;
                }                
            });

        localStorage.setItem(DB_NAME, JSON.stringify(updated_todo_db));
        fetchTodos();
        
        resetFormInput();

        updateTodoBtn.classList.add("hidden");
        

        // todo_id_to_update
        const addTodoBtn =document.querySelector("#add_todo_btn");
        addTodoBtn.classList.remove("hidden");

        };


        fetchTodos();
        // 