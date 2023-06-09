//Parametric Search
function solution(n, times) {
    let sortedTimes = times.sort((a,b)=> a-b);
    let left = 1; //최소 1분
    let right = sortedTimes[sortedTimes.length-1] * n; //최대시간 * n
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        //SUM += 시간 / 심사시간
        let sum = times.reduce((acc, time) => acc + Math.floor(mid/time), 0);

        if(sum < n) left = mid+1;
        else right = mid - 1;

    }
    return left;
}

console.log(solution(6, [7,10])); //28