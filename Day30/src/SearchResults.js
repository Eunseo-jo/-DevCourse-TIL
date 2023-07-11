export default function SearchResults({ $target, initialState }) {
    const $searchResults = document.createElement('div');
    $searchResults.className = 'SearchResults';

    $target.appendChild($searchResults);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        $searchResults.innerHTML = `${this.state.map(
            (result) => `<div>
            <img src="${result.url}" />
        </div>`
        )}`;
    };

    this.render();
}
