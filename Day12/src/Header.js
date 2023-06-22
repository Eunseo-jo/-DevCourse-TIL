function Header({ $target, text }) {
    const $header = document.createElement('h1');

    $target.appendChild($header);

    this.render = () => {
        $header.textContent = text;
    };

    this.render();
}
