export default function TodoList({ $target, initialState, onClick }) {
    const $element = document.createElement('div');
    $target.appendChild($element);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        if (Array.isArray(this.state)) {
            $element.innerHTML = `
            <h1>Simple TodoList</h1>    
            <ul>
                ${this.state.map(({ id, text }) => `<li data-id="${id}">${text}</li>`).join('')}
                </ul>
            `;

            $element.querySelectorAll('li').forEach(($li) =>
                $li.addEventListener('click', (e) => {
                    const { id } = e.target.dataset;
                    onClick(parseInt(id));
                })
            );
        }
    };

    this.render();
}
