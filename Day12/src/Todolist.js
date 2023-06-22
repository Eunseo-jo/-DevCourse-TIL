// $target - 해당 컴포너너트가 추가가 될 DOM 엘리먼트
// initialState = 해당 컴포넌트의 초기 상태
function TodoList({ $target, initialState }) {
    //Class로해도 상관없음
    //$target; TodoList를 그릴 대상의 DOM
    //이 컴포넌트의 DOM
    //todoListElement
    const $todoList = document.createElement('div');
    $target.appendChild($todoList);
    //$는 DOM 객체

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        //실제로 그리기
        //this.state = [{text: '자바스크립트 공부하기'}]
        $todoList.innerHTML = `
            <ul>
            ${this.state.map(({ text }) => `<li>${text}</li>`).join('')}
            </ul>
        `;
    };

    this.render(); //TodoList 컴포넌트를 생성하자마자 initialState를 바로 화면에 그리는 효과
}
