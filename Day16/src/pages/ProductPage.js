import ProductOptions from '../ProductOptions.js';
import Cart from '../Cart.js';
import { request } from '../api.js';
/* state 구조
{
    productId: 1,
    product: product,
    optionData: [],
    selectedOption: []
}
*/

export default function ProductPage({ $target, initialState }) {
    const $product = document.createElement('div');

    this.state = initialState;

    const productOptionsComponent = new ProductOptions({
        $target: $product,
        initialState: [],
        onSelect: (option) => {
            //selectedOption 작업
            const nextState = { ...this.state };
            const { selectedOptions } = nextState;

            const selectedOptionIndex = selectedOptions.findIndex(
                (selectedOption) => selectedOption.optionId === option.optionId
            );
            if (selectedOptionIndex > 0) {
                nextState.selectedOptions[selectedOptionIndex].ea++;
            } else {
                nextState.selectedOptions.push({
                    optionId: option.optionId,
                    optionName: option.optionName,
                    optionPrice: option.optionPrice,
                    ea: 1,
                });
            }

            this.setState(nextState);
        },
    });

    const cart = new Cart({
        $target: $product,
        initialState: {
            productName: '',
            basePrice: 0,
            selectedOptions: [],
        },
        onRemove: (selectedOptionIndex) => {
            const nextState = { ...this.state };
            nextState.selectedOptions.splice(selectedOptionIndex, 1);
            //splice index로 지정한 위치부터 1개만큼 빼고 원본 배열 바꾸기

            this.setState(nextState);
        },
    });

    this.setState = (nextState) => {
        if (nextState.productId !== this.state.productId) {
            fetchOptionData(nextState.productId);
            return;
        }
        this.state = nextState;

        const { product, selectedOptions, optionData } = this.state;
        productOptionsComponent.setState(optionData);
        cart.setState({
            productName: product.name,
            basePrice: product.basePrice,
            selectedOptions: selectedOptions,
        });

        this.render();
    };

    this.render = () => {
        $target.appendChild($product);
    };

    const fetchOptionData = (productId) => {
        return request(`/products/${productId}`)
            .then((product) => {
                this.setState({
                    ...this.state,
                    product,
                    optionData: [],
                    selectedOptions: [],
                });
                return request(`/product-options?product.id=${product.id}`);
            })
            .then((productOptions) => {
                return Promise.all([
                    Promise.resolve(productOptions),
                    Promise.all(
                        //api콜 한 번으로 여러 스톡 옵션 가져오기
                        //안에서 이행된 모든 promise의 값들을 배열로 줌
                        productOptions
                            .map((productOption) => productOption.id)
                            .map((id) => {
                                return request(`/product-option-stocks?productOption.id=${id}`);
                            })
                    ),
                ]);
            })
            .then((data) => {
                const [productOptions, stocks] = data;
                const optionData = productOptions.map((productOption, i) => {
                    const stock = stocks[i][0].stock;
                    return {
                        optionId: productOption.id,
                        optionName: productOption.optionName,
                        optionPrice: productOption.optionPrice,
                        stock,
                    };
                });
                this.setState({
                    ...this.state,
                    optionData,
                });
            });
        //productOptions와 productOptions의 stock데이터 한 번에 가져오기
        //then 중첩이 되면 promise 쓰는 의미가.. 음..
    };
}
