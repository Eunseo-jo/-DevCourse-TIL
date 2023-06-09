function solution(number, k) {
  var answer = '';
  let stack = [];
  for(const num of number){
    while(k>0 && stack[stack.length-1] < num){
      stack.pop();
      k--;
    }
    stack.push(num);
  }
  
  
  stack.splice(stack.length - k, k); //k가 남아있다면
  answer = stack.join("");
    return answer;
}

console.log(solution("4177252841", 4));