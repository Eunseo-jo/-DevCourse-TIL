import { request } from './api.js';
import Editor from './Editor.js';
import LinkButton from './LinkButton.js';
import { getItem, removeItem, saveItem } from './storage.js';

export default function PostEditPage({ $target, initialState }) {
    const $page = document.createElement('div');

    this.state = initialState;

    let postLocalSaveKey = `temp-post-${this.state.postId}`;

    const post = getItem(postLocalSaveKey, {
        title: '',
        content: '',
    });

    let timer = null;

    const editor = new Editor({
        $target,
        initialState: post,
        onEditing: (post) => {
            if (timer !== null) {
                //에디팅 발생시 타이머 날리기
                clearTimeout(timer);
            }
            //연속으로 입력을 하고 있을 때는 이벤트 발생 지연
            //마지막으로 이벤트가 발생하고 일정 시간이 지났을 때 지연시켰던 이벤트 실행 -> 디바운드
            timer = setTimeout(async () => {
                //1초 뒤에 로컬 스토리지에 저장
                saveItem(postLocalSaveKey, {
                    ...post,
                    tempSaveDate: new Date(),
                });

                const isNew = this.state.postId === 'new';
                if (isNew) {
                    const createdPost = await request('/posts', {
                        method: 'POST',
                        body: JSON.stringify(post),
                    });
                    history.replaceState(null, null, `/posts/${createdPost.id}`);
                    removeItem(postLocalSaveKey);

                    this.setState({
                        postId: createdPost.id,
                    });
                } else {
                    await request(`/posts/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post),
                    });
                    removeItem(postLocalSaveKey);
                }
            }, 2000);
        },
    });

    this.setState = async (nextState) => {
        if (this.state.postId !== nextState.postId) {
            postLocalSaveKey = `temp-post-${nextState.postId}`;
            this.state = nextState;
            if (this.state.postId === 'new') {
                const post = getItem(postLocalSaveKey, {
                    title: '',
                    content: '',
                });
                this.render();
                editor.setState(post);
            } else {
                await fetchPost();
            }
            return;
        }
        this.state = nextState;

        this.render();

        editor.setState(
            this.state.post || {
                title: '',
                content: '',
            }
        );
    };

    this.render = () => {
        $target.appendChild($page);
    };

    const fetchPost = async () => {
        const { postId } = this.state;
        if (this.state !== 'new') {
            const post = await request(`/posts/${postId}`);

            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: '',
            });

            if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
                if (confirm('저장되지 않는 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost,
                    });
                    return;
                }
            }
            this.setState({
                ...this.state,
                post,
            });
        }
    };

    new LinkButton({
        $target: $page,
        initialState: {
            text: '목록으로 이동',
            link: '/',
        },
    });
}
