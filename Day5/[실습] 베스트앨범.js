function solution(genres, plays) {
    var answer = [];
    /*
        속한 노래가 많이 재생된 장르를 먼저 수록합니다.
        장르 내에서 많이 재생된 노래를 먼저 수록합니다.
        장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
    */
    const table = new Map();
    const map = new Map();
    for(let i = 0; i < genres.length; i++){
        
        if(!map.has(genres[i])) {
            map.set(genres[i], plays[i]);
            table.set(genres[i], [[i, plays[i]]]);
        }
        else{
            table.set(genres[i],  ...table.get(genres[i]) , [ i, plays[i]]);
            map.set(genres[i], map.get(genres[i])+plays[i]);
        }
    }

    let mapToArray = [...map];
    let tableToArray = [...table.values()];
    const sortedMap = new Map(mapToArray.sort((a, b) => b[1] - a[1]));
    console.log(tableToArray);
    const sortedTable = new Map(tableToArray.sort((a, b) => {
        if(a[1][0] === b[1][0]) {
            if(a[1][1] === b[1][1]) return a[0]-b[0];
            else return b[1][1] - a[1][1];
        }
        else return b[1][0] - a[1][0];
        
    }));
    console.log(sortedMap);
    console.log(table);
    console.log(sortedTable);
    return answer;
}

console.log(solution(["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500])); //[4,1,3,0]

function solution(genres, plays){
    const map = new Map();

    genres.map((genre, index) => [genre, plays[index]])
    .forEach(([genre, play], index) => {
        const data = map.get(genre) || {total: 0, songs: [] };
        map.set(genre, {
            total: data.total + play,
            songs: [...data.songs, {play, index}]
            .sort((a,b) => b.play - a.play)
            .slice(0,2)
        })
        
        
    });
    return([...map.entries()]
        .sort((a,b) => b[1].total - a[1].total)
        .flatMap(item => item[1].songs)
        .map(song => song.index))
}