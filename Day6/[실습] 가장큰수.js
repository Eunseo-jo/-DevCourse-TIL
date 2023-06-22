function solution(numbers) {
    let stringNum = numbers.map((num) => num.toString());
    stringNum.sort((a, b) => b + a - (a + b));
    if (stringNum.every((num) => num === '0')) return '0';
    else return stringNum.join('');
}

console.log(solution([6, 10, 2]));
console.log(solution([3, 30, 34, 5, 9]));
