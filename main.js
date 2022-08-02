console.log('connected!')

let resultsDiv = document.querySelector('.MainPage')
console.log('results div', resultsDiv)

let searchUrl = 'https://itunes.apple.com/search?term=david+hasselhoff&media=music'

fetch(searchUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
})
    // response is whatever the fetch returns
    .then(function (response) {
        return response.json()
    })
    // data is whatever the above code returns, in this case response.json()
    .then(function (data) {
        let songs = data.results;
        console.log(songs)
    })