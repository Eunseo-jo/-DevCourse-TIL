/* initialState: [
    {
        id: 1,
        imageUrl: '',
    }

] */

export default function PhotoList({ $target, initialState, onScrollEnded }) {
    let isInitialize = false;

    const $photoList = document.createElement('ul');
    $target.appendChild($photoList);
    this.state = initialState;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                //entry가 화면에 닿았는지 확인
                if (entry.isIntersecting && !this.state.isLoading) {
                    if (this.state.totalCount > this.state.photos.length) {
                        onScrollEnded();
                    }
                }
            });
        },
        {
            threshold: 0.5, //이미지가 절반 정도 보여줬을 때 옵저버 호출
        }
    );

    let $lastLi = null;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        if (!isInitialize) {
            $photoList.innerHTML = `
                <ul class="PhotoList__photos"></ul>
            `;
        }

        const $photos = $photoList.querySelector('.PhotoList__photos');

        this.state.photos.forEach((photo) => {
            // photo의 id 기준으로 렌더링이 되어있는지 체크
            if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null) {
                // 없으면 li todtjd & $photos에 appendChild
                const $li = document.createElement('li');
                $li.setAttribute('data-id', photo.id);
                $li.style = 'list-style: none; min-height: 500px';
                $li.innerHTML = `<img "width=100%" src="${photo.imagePath}" />`;

                $photos.appendChild($li);
            }
        });

        let $nextLi = $photos.querySelector('li:last-child');

        if ($nextLi !== null) {
            // 이전에 감시하고 있던 값 빼내기
            if ($lastLi !== null) {
                observer.unobserve($lastLi);
            }
            $lastLi = $nextLi;
            observer.observe($lastLi);
        }
    };

    this.render();

    window.addEventListener('scroll', () => {
        const { isLoading, totalCount, photos } = this.state;
        const isScrollEnded = window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;
        if (isScrollEnded && !isLoading && photos.length < totalCount) {
            onScrollEnded();
        }
    });
}
