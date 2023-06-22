export const parse = (querystring) =>
    // '?name=roto&position=bassist'
    // &로 쪼개기
    // key=value의 조합을 object형태로 만들기
    // 만들어진거 리턴
    // 루프를 돌면서 querystring에 키와 값 추가
    querystring.split('&').reduce((acc, keyAndValue) => {
        const [key, value] = keyAndValue.split('=');
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {});
