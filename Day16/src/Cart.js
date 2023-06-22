/* state 형태
{
    productName: 상품명,
    basePrice: 상품 기본 가격,
    selectedOptions: [Option]
}
*/

export default function Cart({ $target, initialState, onRemove }) {
    const $cart = document.createElement('div');

    $target.appendChild($cart);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    const calculateTotalPrice = () => {
        const { basePrice, selectedOptions } = this.state;
        return selectedOptions.reduce((acc, option) => acc + (basePrice + option.optionPrice) * option.ea, 0);
    };

    const renderOption = (option, index) => {
        const { productName, basePrice } = this.state;
        return `
        <li data-index=${index} class="cartItem">${productName} - ${option.optionName} | ${
            basePrice + option.optionPrice
        }, ${option.ea}개
        <button class="remove">x</button>
        </li>
        `;
    };
    this.render = () => {
        const { selectedOptions } = this.state;
        $cart.innerHTML = `
        <ul>
            ${
                Array.isArray(selectedOptions) &&
                selectedOptions.map((option, index) => renderOption(option, index)).join('')
            }
        </ul>
        <div>
            ${calculateTotalPrice()} 원
        </div>
        `;

        $cart.querySelectorAll('.remove').forEach((button) =>
            button.addEventListener('click', (e) => {
                const $li = e.target.closest('.cartItem'); //클릭한 대상으로부터 가장 인접한 DOM 가져오기
                const { index } = $li.dataset; //data-로 붙은 값들을 뽑아오기
                if ($li) {
                    const { index } = $li.dataset;
                    onRemove(parseInt(index));
                }
            })
        );
    };

    this.render();
}
