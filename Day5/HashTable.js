//객체를 이용한 해시 테이블
const table = {};
table["key"] = 100;
table["key2"] = "Hello";
console.log(table["key"]); //100
table["key"] = 349;
console.log(table["key"]); //349
delete table["key"];
console.log(table["key"]); //undefined

//Map을 이용한 해시 테이블
const table = new Map();
table.set("key", 100);
table.set("key2", "Hello");
console.log(table["key"]); //undefined
console.log(table.get["key"]); //100

const object = { a: 1};
table.set(object, "A1"); //Map은 object도 key로 쓸 수 있음
console.log(table.get(object)); // A1
table.delete(object);
console.log(table.get(object)); //undefined
console.log(table.keys()); // { 'key', 'key2'}
console.log(table.values()); // { '100', 'hello'}
table.clear();
console.log(table.values()); //{ }

//Set을 이용한 해시 테이블 --중복 내용 제거
const table = new Set(); //Key와 Value가 동일하게 들어감
table.add("key"); 
table.add("key2");
console.log(table.has("key")); //true
console.log(table.has("key3")); //false
table.delete("key2");
console.log(table.has("key2")); //false
table.add("key3");
console.log(table.size()); // 2
table.clear();
console.log(table.size()); //0