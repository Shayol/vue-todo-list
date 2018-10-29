export default {
    save: function () {
        localStorage.setItem("todoStorage", JSON.stringify(this.lists));
    },
    makeNewList: function (list) {
        this.lists.push(list);
        this.save();
    },
    findList: function (id) {
        return this.lists.find(el => el.listId == id);
    },
    findListByName: function (name) {
        return this.lists.find(el => el.name == name);
    },
    editList: function (listId, name) {
        let list = this.findList(listId);
        if (list) {
            list.name = name;
            this.save();
        }
    },
    deleteList: function (listId) {
        let list = this.findList(listId);
        let index = this.lists.indexOf(list);
        if (index > -1) {
            this.lists.splice(index, 1);
            this.save();
        }
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
        this.save();
    },
    editTodoTitle: function (listId, todoId, title) {
        let todo = this.findTodo(listId, todoId);
        if (todo) {
            todo.title = title;
            this.save();
        }
    },
    editTodoChecked: function (listId, todoId, checked) {
        let todo = this.findTodo(listId, todoId);
        if (todo) {
            todo.checked = checked;
            this.save();
        }
    },
    deleteTodo: function (listId, todoId) {
        let todo = this.findTodo(listId, todoId);
        if (todo) {
            let list = this.findList(listId);
            let index = list.todos.indexOf(todo);
            list.todos.splice(index, 1);
            this.save();
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