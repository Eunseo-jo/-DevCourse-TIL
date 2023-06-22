function TodoForm({ $target, onSubmit }) {
    const $form = document.createElement('form');

    $target.appendChild($form);

    let isInit = false;

    this.render = () => {
        $form.innerHTML = `
        <input type='text' name="todo" />
        <button>Add</button>
        `;

        if (!isInit) {
            $form.addEventListener('submit', (e) => {
                e.preventDefault();

                const $todo = $form.querySelector('input[name=todo]');
                //input 태그 중 name atrribute가 todo 인 것
                const text = $todo.value;
                if (text.length > 1) {
                    $todo.value = '';
                    onSubmit(text); // onSubmit에 text만 넘겨주기 만드는 쪽에서 정의
                }
            });
            isInit = true;
        }
    };

    this.render();
}
