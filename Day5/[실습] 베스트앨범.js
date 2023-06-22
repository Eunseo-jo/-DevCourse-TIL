function solution(genres, plays) {
    const map = new Map();
    for (let i = 0; i < genres.length; i++) {
        if (!map.has(genres[i])) {
            //장르가 map에 없을 때
            map.set(genres[i], {
                total: plays[i],
                songs: [{ play: plays[i], index: i }],
            });
        } else {
            //이미 장르가 map안에 있을 떄
            map.set(genres[i], {
                total: map.get(genres[i]).total + plays[i],
                songs: [...map.get(genres[i]).songs, { play: plays[i], index: i }]
                    .sort((a, b) => b.play - a.play)
                    .slice(0, 2),
            });
        }
    }
    return [...map.entries()]
        .sort((a, b) => b[1].total - a[1].total)
        .flatMap((item) => item[1].songs)
        .map((song) => song.index);
}
//모범 답안 코드
function solution(genres, plays) {
    const map = new Map();

    genres
        .map((genre, index) => [genre, plays[index]])
        .forEach(([genre, play], index) => {
            const data = map.get(genre) || { total: 0, songs: [] };
            map.set(genre, {
                total: data.total + play,
                songs: [...data.songs, { play, index }].sort((a, b) => b.play - a.play).slice(0, 2),
            });
        });
    return [...map.entries()]
        .sort((a, b) => b[1].total - a[1].total)
        .flatMap((item) => item[1].songs)
        .map((song) => song.index);
}

console.log(solution(['classic', 'pop', 'classic', 'classic', 'pop'], [500, 600, 150, 800, 2500])); //[4,1,3,0]
