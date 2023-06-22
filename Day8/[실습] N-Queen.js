function check(queen, row) {
    // 이전까지 두었던 퀸의 위치를 확인한다.
    for (let i = 0; i < row; i += 1) {
        // 행의 위치와 대각선의 위치를 체크한다.
        if (queen[i] === queen[row] || Math.abs(queen[i] - queen[row]) === row - i) {
            return false; // 둘 수 없다면 false
        }
    }

    return true; // 모두 통과되면 true
}

function search(queen, row) {
    const n = queen.length;
    let count = 0;
    // console.log('::', row, queen);
    if (n === row) {
        // 체스판 끝에 도달했다면.. 재귀의 탈출 조건
        console.log('count ', count);
        return 1;
    }

    for (let col = 0; col < n; col += 1) {
        // 0부터 n까지 열을 돌면 둘 수 있게 만든다.
        queen[row] = col; // 우선 퀸을 둔다

        if (check(queen, row)) {
            // 퀸을 둘 수 있다면..
            console.log('true; ', queen);
            count += search(queen, row + 1); // 다음 행으로 이동!
        }
    }
    console.log('count: ', count);

    return count;
}

function solution(n) {
    // 미리 n개 만큼의 배열을 초기화한다. 0번 행부터 시작한다.
    return search(
        Array.from({ length: n }, () => 0),
        0
    );
}

console.log(solution(4));
