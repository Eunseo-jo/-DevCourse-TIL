export default function Header({ $target, initialState }) {
    const $h2 = document.createElement('h2');
    $target.appendChild($h2);
    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { selectedUsername, isLoading } = this.state;
        if (!selectedUsername) {
            $h2.innerHTML = ``;
            return;
        }
        $h2.innerHTML = `${selectedUsername}님의 할 일 목록 ${isLoading ? '로딩 중..' : ''}`;
    };

    this.render();
}
