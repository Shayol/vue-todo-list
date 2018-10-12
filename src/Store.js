export default {
    makeNewList: function (list) {
        this.lists.push(list);
        localStorage.setItem("todoStorage", JSON.stringify(this.lists));
    },
    findList: function (id) {
        return this.lists.find(el => el.listId == id);
    },
    editList: function (listId, name) {
        let list = this.findList(listId);
        if (list) {
            list.name = name;
        }
        localStorage.setItem("todoStorage", JSON.stringify(this.lists));
    },
    deleteList: function (listId) {
        let list = this.findList(listId);
        let index = this.lists.indexOf(list);
        if (index > -1) {
            this.lists.splice(index, 1);
        }
        localStorage.setItem("todoStorage", JSON.stringify(this.lists));
    },
    findTodo: function (listId, todoId) {
        return this.findList(listId)
            .todos.find(el => el.todoId == todoId);
    },
    addTodo: function (id, title) {
        this.findList(id).todos.push({
            todoId: new Date().getTime(),
            title: title,
            checked: false,
            editing: false
        });
        localStorage.setItem("todoStorage", JSON.stringify(this.lists));
    },
    editTodoTitle: function (listId, todoId, title) {
        let todo = this.findTodo(listId, todoId);
        if (todo) {
            todo.title = title;
            localStorage.setItem("todoStorage", JSON.stringify(this.lists));
        }
    },
    editTodoChecked: function (listId, todoId, checked) {
        let todo = this.findTodo(listId, todoId);
        if (todo) {
            todo.checked = checked;
            localStorage.setItem("todoStorage", JSON.stringify(this.lists));
        }
    },
    deleteTodo: function (listId, todoId) {
        let todo = this.findTodo(listId, todoId);
        if (todo) {
            let list = this.findList(listId);
            let index = list.todos.indexOf(todo);
            list.todos.splice(index, 1);
            localStorage.setItem("todoStorage", JSON.stringify(this.lists));
        }
    },
    lists: [
        {
            name: "Todo",
            listId: 1,
            editing: false,
            todos: [
                {
                    todoId: 1,
                    title: "I'm first todo in first list",
                    checked: false,
                    editing: false
                },
                {
                    todoId: 2,
                    title: "I'm second todo in first list",
                    checked: false,
                    editing: false
                }
            ]
        }
        // {
        //     name: "I'm second",
        //     listId: 2,
        //     editing: false,
        //     todos: [
        //         {
        //             todoId: 1,
        //             title: "I'm first todo in second list",
        //             checked: false,
        //             editing: false
        //         },
        //         {
        //             todoId: 2,
        //             title: "I'm second todo in second list",
        //             checked: false,
        //             editing: false
        //         }
        //     ]
        // }
    ]
}