function ToogleButton({ $target, text, onClick }) {
    const $button = document.createElement('button');

    this.state = {
        //렌더링에 영향을 주는 것들은 state로 추상화
        clickCount: 0,
        toggled: false, //버튼 상태
    };

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        //상태를 기준으로 렌더링
        $button.textContent = text;
        $button.style.textDecoration = this.state.toggled ? 'line-through' : 'none';
        //컴포넌트 상태를 기준으로
    };

    $button.addEventListener('click', () => {
        this.setState({
            //상태에 따라 화면에 렌더링
            clickCount: this.state.clickCount + 1,
            toggled: !this.state.toggled,
        });

        if (onClick) {
            onClick(this.state.clickCount);
        }
    });
    this.render = () => {
        $button.textContent = text;
    };
    this.render();
}

function TimerButton({ $target, text, timer = 3000 }) {
    //토글 버튼 확장
    const button = new ToogleButton({
        $target,
        text,
        onClick: () => {
            setTimeout(() => {
                button.setState(() => {
                    button.setState({
                        ...button.state,
                        toggled: !button.state.toggled,
                    });
                }, timer);
            });
        },
    });
}

function ButtonGroup({ $target, buttons }) {
    const $group = document.createElement('div');
    let isInit = false;

    this.render = () => {
        if (!isInit) {
            buttons.forEach(({ type, ...props }) => {
                if (type === 'toggle') {
                    new ToogleButton({ $target: $group, ...props });
                } else if (type === 'timer') {
                    new TimerButton({ $target: $group, ...props });
                }
            });
            $target.appendChild($group);
            isInit = true;
        }
    };
    this.render();
}

new TimerButton({
    $target: $app,
    text: '3초 뒤에 자동 토글',
});

new TimerButton({
    $target: $app,
    text: '10초 뒤에 자동 토글',
    timer: 1000 * 10,
});

new ButtonGroup({
    $target: $app,
    buttons: [
        {
            type: 'toggle',
            text: 'toggle',
        },
        {
            type: 'timer',
            text: 'timer',
            timer: 1000,
        },
    ],
});
