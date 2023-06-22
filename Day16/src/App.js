import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';

export default function App({ $target }) {
    const homepage = new HomePage({ $target });
    const productPage = new ProductPage({ $target, initialState: {} });

    this.route = () => {
        //pathname에 따라 page component 렌더링 처리
        const { pathname } = location;

        $target.innerHTML = ''; //기존꺼 지우고 재렌더링

        if (pathname === '/') {
            //homepage 렌더링
            homepage.render();
        } else if (pathname.indexOf('/products/') > -1) {
            //product page 렌더링
            //url에서 productId 뽑기
            // const productId = pathname.split('/products/')[1]
            const [, , productId] = pathname.split('/');
            productPage.setState({
                productId,
            });
        } else {
            //404처리
            $target.innerHTML = `<h1>404 Not Found</h1>`;
        }
    };

    this.init = () => {
        this.route(); //처음 진입시 현재 url에 맞는 페이지 그리기
    };

    window.addEventListener('click', (e) => {
        if (e.target.className === 'link') {
            e.preventDefault(); //a 태그 기본 속성 없애기
            const { href } = e.target;
            history.pushState(null, null, href.replace(location.origin, '')); //화면 이동 없이 url만 고치기
            this.route();
        }
    });

    window.addEventListener('popstate', () => this.route()); //뒤로 가기/앞으로 가기할 때 바뀐 화면 그려주기
    this.init();
}
