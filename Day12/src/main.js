const initialState = storage.getItem('todos', []);

const $app = document.querySelector('.app');

new App({
    $target: $app,
    initialState,
});
