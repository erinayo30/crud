        // Utility Function
        function uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0,
                 v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }

        const resetFormInput = () =>{
            const todoInput = document.querySelector("#todo-input");

            todoInput.value = "";
        };

        const showMessage = (title) => {
            const formMessageSpan =document.querySelector("#form-message");
            formMessageSpan.innerHTML = title;
            formMessageSpan.classList.remove("hidden")
            formMessageSpan.classList.add("text-xs", "text-red-600");
          
          setTimeout(() =>{
            formMessageSpan.classList.add("hidden");
          }, 2000);

        };

        // local storage
        const getdb = (DB_NAME) =>{
            if (!DB_NAME){
                throw new Error("Something went wrong in the code")
            }
            return JSON.parse(localStorage.getItem(DB_NAME)) || [];
        }