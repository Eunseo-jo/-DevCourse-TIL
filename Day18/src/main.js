import App from './App.js';
import PostEditPage from './PostEditPage.js';

const $target = document.querySelector('#app');

new App({ $target });

const postEditPage = new PostEditPage({
    $target,
    initialState: {
        postId: 'new',
    },
});

postEditPage.setState({
    postId: 1,
});
