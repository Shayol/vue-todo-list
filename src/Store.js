export default {
    findList: function (id) {
        return this.lists.find(el => el.listId == id);
    },
    lists: [
        {
            name: "I'm first",
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
        },
        {
            name: "I'm second",
            listId: 2,
            editing: false,
            todos: [
                {
                    todoId: 1,
                    title: "I'm first todo in second list",
                    checked: false,
                    editing: false
                },
                {
                    todoId: 2,
                    title: "I'm second todo in second list",
                    checked: false,
                    editing: false
                }
            ]
        }
    ]
}