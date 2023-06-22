import { request } from './api.js';
import Header from './Header.js';
import { parse } from './querystring.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import UserList from './UserList.js';

export default function App({ $target }) {
    const $userListContainer = document.createElement('div');
    const $todoListContainer = document.createElement('div');

    $target.appendChild($userListContainer);
    $target.appendChild($todoListContainer);

    this.state = {
        userList: [],
        selectedUsername: null,
        todos: [],
        isTodoLoading: false,
    };

    const userList = new UserList({
        $target: $userListContainer,
        initialState: this.state.userList,
        onSelect: async (username) => {
            history.pushState(null, null, `/?selectedUsername=${username}`);
            this.setState({
                ...this.state,
                selectedUsername: username,
            });
            await fetchTodo();
        },
    });
    const header = new Header({
        $target: $todoListContainer,
        initialState: {
            isLoading: this.state.isTodoLoading,
            selectedUsername: this.state.selectedUsername,
        },
    });

    new TodoForm({
        $target: $todoListContainer,
        onSubmit: async (content) => {
            const isFirstTodoAdd = this.state.todos.length === 0;
            const todo = {
                content,
                isCompleted: false,
            };
            //client에 먼저 추가
            this.setState({
                ...this.state,
                todos: [...this.state.todos, todo],
            });

            //서버와 통신
            await request(`/${this.state.selectedUsername}`, {
                method: 'POST',
                body: JSON.stringify({
                    content,
                    isCompleted: false,
                }),
            });
            await fetchTodo();

            if (isFirstTodoAdd) {
                await fetchUserList();
            }
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        header.setState({
            isLoading: this.state.isTodoLoading,
            selectedUsername: this.state.selectedUsername,
        });
        todoList.setState({
            isLoading: this.state.isTodoLoading,
            todos: this.state.todos,
            selectedUsername: this.state.selectedUsername,
        });

        userList.setState(this.state.userList);
        this.render();
    };

    this.render = () => {
        const { selectedUsername } = this.state;
        $todoListContainer.style.display = selectedUsername ? 'block' : 'none';
    };

    const todoList = new TodoList({
        $target: $todoListContainer,
        initialState: {
            isTodoLoading: this.state.isTodoLoading,
            todos: this.state.todos,
            selectedUsername: this.state.selectedUsername,
        },
        onToggle: async (id) => {
            const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);

            const nextTodos = [...this.state.todos];
            nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted;
            this.setState({
                ...this.state,
                todos: nextTodos,
            });
            await request(`/${this.state.selectedUsername}/${id}/toggle`, { method: 'PUT' });

            await fetchTodo();
        },
        onRemove: async (id) => {
            const todoIndex = this.state.todos.findIndex((todo) => todo._id === id);

            const nextTodos = [...this.state.todos];
            nextTodos.splice(todoIndex, 1);
            this.setState({
                ...this.state,
                todos: nextTodos,
            });

            await request(`/${this.state.selectedUsername}/${id}`, { method: 'DELETE' });

            await fetchTodo();
        },
    });

    const fetchUserList = async () => {
        const userList = await request('/users');

        this.setState({
            ...this.state,
            userList,
        });
    };

    const fetchTodo = async () => {
        const { selectedUsername } = this.state;
        if (selectedUsername) {
            this.setState({
                ...this.state,
                isTodoLoading: true,
            });
            const todos = await request(`/${selectedUsername}`);
            this.setState({
                ...this.state,
                todos,
                isTodoLoading: false,
            });
        }
    };

    const init = async () => {
        await fetchUserList();

        //url에 특정 사용자를 나타내는 값이 있는 경우
        const { search } = location;

        if (search.length > 0) {
            const { selectedUsername } = parse(search.substring(1));
            /*
            const queryStrings = search.substring(1).split('&');
            const selectedUsernameQuerystring = queryStrings.find((qs) => qs.includes('selectedUsername'));

            const selectedUsername = selectedUsernameQuerystring ? selectedUsernameQuerystring.split('=')[1] : null;
*/
            if (selectedUsername) {
                this.setState({
                    ...this.state,
                    selectedUsername,
                    //selectedUsername: pathname.substring(1),
                });
                await fetchTodo();
            }
        }
    };

    this.render();
    init();
    //뒤로 가기로 했을 때
    window.addEventListener('popstate', () => {
        init();
    });
}
