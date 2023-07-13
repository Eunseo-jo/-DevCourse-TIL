export default function TodoList({ $target, initialState, onDrop, onRemove }) {
    const $todoList = document.createElement('div');
    $todoList.setAttribute('droppable', 'true');

    this.state = initialState;
    $target.appendChild($todoList);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { title, todos = [] } = this.state;

        $todoList.innerHTML = `
        <h2>${title}</h2>
        <ul>
        ${todos
            .map(
                ({ todo }) => `
        <li data-id=${todo._id} draggable="true">${todo.content}<button>x</button></li>`
            )
            .join('')}
        </ul>
        ${todos.length === 0 ? '설정된 일이 없습니다' : ''}
        `;
    };
    this.render();

    $todoList.addEventListener('dragstart', (e) => {
        const $li = e.target.closest('li');

        e.dataTransfer.setData('todoId', $li.dataset.id);
    });

    $todoList.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    $todoList.addEventListener('drop', (e) => {
        e.preventDefault();
        const droppedTodoId = e.dataTransfer.getData('todoId');

        //현재 TodoList의 Todo가 아닌 경우 상위 컴포넌트에 알리기
        const { todos } = this.state;
        if (todos.find((todo) => todo.id === droppedTodoId)) {
            onDrop(droppedTodoId);
        }
    });
    $todoList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const $li = e.target.closest('li');
            if ($li) {
                onRemove($li.dataset.id);
            }
        }
    });
}
