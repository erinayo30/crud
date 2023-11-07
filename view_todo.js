const DB_NAME = "todo_db"
const renderCurrentPreviewTodo = () =>{
    const todo_db = getdb("todo_db")
    const currentPreviewTodoId = getdb("current_preview_todo_id")
    const currentTodo = todo_db.find((todo)=> todo.id === currentPreviewTodoId)
    const {title, id, description, created_at}= currentTodo;

const todo_preview_container = document.querySelector("#todo_preview_container");

todo_preview_container.innerHTML = `
<section class="items-center gap-2 text-slate-800 hover:text-blue-800">

            <section class="flex justify-between items-center">
                <h3 class="text-xl font-bold">${title}</h3>
                <div >
                    <button onclick="editPreviewMode('${id}')">
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
                    
                    <button onclick="deleteTodo('${id}')">
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
                </div>
              
            </section>
            <section class="mt-3">
                <p class="text-slate-600 mb-2">${description || ""}</p>
                <span class="">${generateDate(created_at)}</span>
                <span class="bg-slate-500 text-sm rounded-full px-2 py-1 text-white">Pending</span>
             </section>
            
        </section>

        <section class="mt-3 ">
            <a href="/index.html"
            class="mx-auto ">
                <section class="mt-4">
                    <button class="flex items-center gap-2 text-slate-800 hover:text-blue-200 text-4xl">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            stroke-width="1.5" stroke="currentColor" 
                            class="w-5 h-5">
                                <path stroke-linecap="round" 
                                stroke-linejoin="round" 
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                              </svg>
    
                        <span class="text-sm"> 
                            View all Tasks</span>
                    </button>
                </section>
            </a> 
        </section>
    </section>`
};

// update preview
 const editPreviewMode =(id) => {
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const  todo_id_to_update = todo_db.find((todo) => todo.id === id);

    if (!todo_id_to_update){
        return;
    }

    renderCurrentPreviewTodo.value = todo_id_to_update.title
 } 

renderCurrentPreviewTodo();