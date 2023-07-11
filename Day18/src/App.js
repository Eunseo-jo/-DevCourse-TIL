import PostsPage from './PostsPage.js';
import PostEditPage from './PostEditPage.js';
import { initRouter } from './router.js';

//url 규칙
// root: postsPage render
// /posts/(id) - id에 해당하는 post 생성
// /posts.new - 새 포스트 생성

export default function App({ $target }) {
    //routing 처리 필요
    const postsPage = new PostsPage({
        $target,
    });
    const postEditPage = new PostEditPage({
        $target,
        initialState: {
            postId: 'new',
            post: {
                title: '',
                content: '',
            },
        },
    });

    this.route = () => {
        $target.innerHTML = '';
        const { pathname } = window.location;

        if (pathname === '/') {
            postsPage.setState();
        } else if (pathname.indexOf('/posts/') === 0) {
            const [, , postId] = pathname.split('/');
            postEditPage.setState({ postId });
        }
    };

    this.route();

    initRouter(() => this.route());
}
