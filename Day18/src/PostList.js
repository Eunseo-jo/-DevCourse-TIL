import { push } from './router.js';

export default function PostList({ $target, initialState }) {
    const $postList = document.createElement('div');
    $target.appendChild($postList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        $postList.innerHTML = `
        <ul>
        ${this.state
            .map(
                (post) => `
                <li data-id"${post.id}">${post.title}</li>
        `
            )
            .join('')}
        </ul>
        `;
    };
    this.render();

    $postList.addEventListener('click', (e) => {
        const $li = e.target.closest('li');

        if ($li) {
            const { id } = $li.dataset;
            push(`/posts/${id}`);
        }
    });
}
