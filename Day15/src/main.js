import ProductPage from './ProductPage.js';
/*
const dummyData = [
    {
        optionId: 1,
        optionName: 'dummyData1',
        optionPrice: 10000,
        stock: 10,
    },
    {
        optionId: 2,
        optionName: 'dummyData2',
        optionPrice: 15000,
        stock: 10,
    },
    {
        optionId: 3,
        optionName: 'dummyData3',
        optionPrice: 1000,
        stock: 0,
    },
];
*/
const $target = document.querySelector('#app');

new ProductPage({
    $target,
    initialState: {
        productId: 1,
    },
});
