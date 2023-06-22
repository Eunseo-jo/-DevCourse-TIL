export default function ProductOptions({ $target, initialState, onSelect }) {
    const $select = document.createElement('select');
    $target.appendChild($select);

    /*
    상품 옵션 이름 렌더링 시 상품명 + 옵션명 + 재고: n개 이런 형식으로 보여주기
    //재고가 0인 상품인 경우 옵션 선택 불가
    //옵션 데이터는 현업에서 캐시 가능 -- 재고 데이터는 불가
    [
        {
            optionId: 1,
            optionName: '상품명',
            optionPrice: 1000,
            stock: 10,
        },
        ...
    ]
    */
    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    const createOptionFullName = ({ optionName, optionPrice, stock }) => {
        return `${optionName} ${optionPrice > 0 ? `(옵션가 ${optionPrice})` : ''} | ${
            stock > 0 ? `재고 ${stock}` : '재고 없음'
        }`;
    };

    //이벤트 바인딩
    $select.addEventListener('change', (e) => {
        const optionId = parseInt(e.target.value);
        const option = this.state.find((option) => option.optionId === optionId);
        if (option) {
            onSelect(option);
        }
    });
    this.render = () => {
        //render는 외부 요소 없이 렌더링 되어야함
        if (this.state && Array.isArray(this.state)) {
            //render가 1초에 수십 번 불리면 innerHTML 쓰는 게 안 좋음
            $select.innerHTML = `
            <option>선택하세요</option>
            ${this.state
                .map(
                    (option) =>
                        `<option ${option.stock === 0 ? 'disabled' : ''} value="${
                            option.optionId
                        }"> ${createOptionFullName(option)}</option>
                        `
                )
                .join('')}
            `;
        }
    };
}
