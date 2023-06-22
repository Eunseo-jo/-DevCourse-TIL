export function request(url, successCallback, failCallback) {
    const xhr = new XMLHttpRequest(); //요즘은 fetch를 씀
    xhr.addEventListener('load', (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                successCallback(JSON.parse(xhr.responseText));
            } else {
                failCallback(xhr.statusText);
            }
        }
    });

    xhr.addEventListener('error', (e) => failCallback(xhr.statusText));

    xhr.open('GET', url);
    xhr.send();
}
