import TodoList from './TodoList.js';
import TodoComments from './TodoComments.js';
import { request } from './api.js';

export default function App({ $app }) {
    this.state = {
        todos: [],
        selectedTodo: null,
        comments: [],
    };

    this.setState = (nextState) => {
        this.state = nextState;
        todoList.setState(this.state.todo);
        todoComments.setState({
            selectedTodo: this.state.selectedTodo,
            comments: this.state.comments,
        });
    };

    const todoList = new TodoList({
        $target: $app,
        initialState: this.todos,
        onClick: (id) => {
            const selectedTodo = this.state.todos.find((todo) => todo.id === id);

            this.setState({
                ...this.state,
                selectedTodo,
            });

            //댓글 목록 불러오기
            request(`https://kdt.roto.codes/comments?todo.id=${id}`, (comments) => {
                this.setState({
                    ...this.state,
                    comments,
                });
            });
        },
    });

    const todoComments = new TodoComments({
        $target: $app,
        initialState: {
            selectedTodo: this.state.selectedTodo,
            comments: this.state.comments,
        },
    });

    //Todos 불러오기
    this.init = () => {
        request('https://kdt.roto.codes/todos', (todos) => {
            this.setState({
                ...this.state,
                todos,
            });
        });
    };
}
