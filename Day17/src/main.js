import App from './App.js';

const DUMMY_DATA = [
    {
        _id: 1,
        content: 'JS 학습하기',
        isCompleted: true,
    },
    {
        _id: 2,
        content: 'JS 복습하기',
        isCompleted: false,
    },
];

const $target = document.querySelector('#app');

new App({ $target });
