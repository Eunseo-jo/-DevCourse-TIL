export default function TodoComments({ $target, initialState }) {
    const $element = document.createElement('div');
    $target.appendChild($element);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { selectedTodo, comments } = this.state;
        if (!selectedTodo || !comments) {
            $element.innerHTML = '';
            return;
        }
        $element.innerHTML = `
        <h2>${selectedTodo}의 댓글들</h2>
        ${comments.length === 0 ? ' 댓글이 없습니다' : ''}
        <ul>
        ${comments.map(({ content }) => `<li>${content}</li>`.join(''))}
        </ul>
        `;
    };
    this.render();
}
