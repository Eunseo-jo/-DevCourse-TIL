export default function TodoList({ $target, initialState, onToggle, onRemove }) {
    const $todo = document.createElement('div');
    $target.appendChild($todo);
    /*
        {
            todos: []
        }
    */
    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { isLoading, todos } = this.state;

        if (!isLoading && todos.length === 0) {
            $todo.innerHTML = `Todo가 없습니다!`;
            return;
        }
        $todo.innerHTML = `
        <ul>
        ${todos
            .map(
                ({ _id, content, isCompleted }) => `
        <li data-id="${_id}" class="todo-item">
        ${isCompleted ? `<s>${content}</s>` : content}

        <button class="remove">x</button>
        </li>
        `
            )
            .join('')}
        </ul>
        `;
    };
    $todo.addEventListener('click', (e) => {
        //상위에서 제일 가까운 li 태그 찾기
        const $li = e.target.closest('.todo-item');
        if ($li) {
            const { id } = $li.dataset;
            //실제 이벤트를 발생시킨 곳이 어디인지 찾기
            const { className } = e.target;
            //버튼을 눌렀을 때만 삭제
            if (className === 'remove') {
                onRemove(id);
            } else {
                //나머지는 토글처리
                onToggle(id);
            }
        }
    });
    this.render();
}
