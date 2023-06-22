//버튼 3개 만들기
const $button1 = document.createElement('button1');
$button1.textContent = 'Button1';

const $button2 = document.createElement('button2');
$button2.textContent = 'Button2';

const $button3 = document.createElement('button3');
$button3.textContent = 'Button3';
//만든 버튼을 화면에 그리기
const $main = document.querySelector('#app');

$main.appendChild($button1);
$main.appendChild($button2);
$main.appendChild($button3);

//버튼을 클릭하면 삭선이 그어지기
/*
$button1.addEventListener('click', () => {
    if ($button1.style.textDecoration === 'line-through') {
        $button1.style.textDecoration === 'none';
    } else {
        $button1.style.textDecoration === 'line-through';
    }
});

$button2.addEventListener('click', () => {
    if ($button2.style.textDecoration === 'line-through') {
        $button2.style.textDecoration === 'none';
    } else {
        $button2.style.textDecoration === 'line-through';
    }
});

$button3.addEventListener('click', () => {
    if ($button3.style.textDecoration === 'line-through') {
        $button3.style.textDecoration === 'none';
    } else {
        $button3.style.textDecoration === 'line-through';
    }
});
*/
const toggleButton = ($button) => {
    if ($button.style.textDecoration === 'line-through') {
        $button.style.textDecoration = 'none';
    } else $button.style.textDecoration = 'line-through';
};
document.querySelectorAll('button').forEach(($button) => {
    $button.addEventListener('click', (e) => {
        /*
        const { target } = e;
        if (target.style.textDecoration === 'line-through') {
            target.style.textDecoration = 'none';
        } else target.style.textDecoration = 'line-through';
        */
        toggleButton(target);
    });
});

//ToggleButton으로 추상화하기
//독립적으로 돌아갈 수 있게
function ToogleButton({ $target, text }) {
    const $button = document.createElement('button');

    $target.appendChild($button);
    $button.addEventListener('click', () => {
        if ($button.style.textDecoration === 'line-through') $button.style.textDecoration = '';
        else $button.style.textDecoration = 'line-through';
    });
    this.render = () => {
        $button.textContent = text;
    };
    this.render();
}

const $app = document.querySelector('#app');

new ToogleButton({
    //추가하자마자 바로 생성될 것
    $target: $app,
    text: 'Button1',
});

new ToogleButton({
    //추가하자마자 바로 생성될 것
    $target: $app,
    text: 'Button2',
});

new ToogleButton({
    //추가하자마자 바로 생성될 것
    $target: $app,
    text: 'Button3',
});
//컴포넌트 방식 추상화
//기능 추가, 확장이 쉬움
//렌더리 되어 있는 시점이나 명확
