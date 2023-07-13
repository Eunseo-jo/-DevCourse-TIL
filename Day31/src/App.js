import { request } from './api.js';
import TodoList from './TodoList.js';
import SyncTaskManager from './SyncTaskManager.js';

export default function App({ $target }) {
    const tasks = new SyncTaskManager();

    const handleTodoDrop = async (todoId, updateValue) => {
        const nextTodos = [...this.state.todos];
        const todoIndex = nextTodos.findIndex((todo) => todo._id === todoId);

        nextTodos[todoIndex].isCompleted = updateValue;
        this.setState({
            ...this.state,
            todos: nextTodos,
        });
        tasks.addTask({
            url: `/${todoId}/toggle`,
            method: 'PUT',
        });
        /*
            tasks.addTask(async () => {
                await request(`/${todoId}/toggle`, {
                    method: 'PUT',
                });
            });
            */
    };

    const handleTodoRemove = (todoId) => {
        const nextTodos = [...this.state.todos];

        const todoIndex = nextTodos.findIndex((todo) => todo._id === todoId);

        nextTodos.splice(todoIndex, 1);

        this.setState({
            ...this.state,
            todos: nextTodos,
        });

        tasks.removeTasks(`/${todoId}`);

        tasks.addTask({
            url: `/${todoId}`,
            method: 'DELETE',
        });
    };
    const incompletedTodoList = new TodoList({
        $target,
        initialState: {
            title: '완료되지 않은 일들',
            todos: [],
        },
        onDrop: (todoId) => handleTodoDrop(todoId, false),
        onRemove: handleTodoRemove,
    });

    const completedTodoList = new TodoList({
        $target,
        initialState: {
            title: '완료된 일들',
            todos: [],
        },
        onDrop: (todoId) => handleTodoDrop(todoId, true),
        onRemove: handleTodoRemove,
    });

    this.state = {
        todos: [],
    };

    this.setState = (nextState) => {
        this.state = nextState;

        const { todos } = this.state;

        incompletedTodoList.setState({
            ...incompletedTodoList.state,
            todos: todos?.filter((todo) => !todo.isCompleted),
        });

        completedTodoList.setState({
            ...completedTodoList.state,
            todos: todos?.filter((todo) => todo.isCompleted),
        });
    };

    const fetchTodos = async () => {
        const todos = await request('');
        this.setState({
            ...this.state,
            todos,
        });
    };
    fetchTodos();
}
