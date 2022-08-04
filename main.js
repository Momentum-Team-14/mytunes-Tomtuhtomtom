// verify connected
console.log('connected!');
//declare some global const that will be needed
const mainPage = document.querySelector('.MainPage');
const nowPlayingBox = document.querySelector('#soundbar');
//create and element to hold now playing message and display current song
const nowPlaying = document.createElement('p');
nowPlaying.classList.add("nowPlaying");
nowPlayingBox.appendChild(nowPlaying);
//link to API url
let searchBaseUrl = 'https://itunes.apple.com/search?term='
// variable to grab search bar and add user input
let searchForm = document.querySelector('#searchForm');
//Event listener for user submission and function to add input to url
searchForm.addEventListener('submit', (event) => {
    let searchUrl = '';
    event.preventDefault();
    let userEntry = document.querySelector('#userEntry');
    let searchQuery = userEntry.value;
    let adjustedUserEntry = searchQuery;
    searchUrl = `${searchBaseUrl}${adjustedUserEntry}&limit=200`;
    console.log(searchUrl);
    getSearchResults(searchUrl);
});
//AJAX fetch embedded in function to plug in url from above
function getSearchResults(url) {
    fetch(url, {
        method: 'GET', //getting data only
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => { //verify response from API
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request Failed!');  //throw network error if no response
    }, networkError => console.log(networkError.message)
    )
    .then(data => {
        let songs = data.results;
        console.log(songs);
        if (songs.length === 0) {  //if statement for bad search to display nothing found
                mainPage.innerHTML = '';
                const errorBox = document.createElement('div');
                const errorMessage = document.createElement('p');
                errorBox.classList.add("error");
                errorMessage.innerText = "Wow, so much empty!!";
                mainPage.appendChild(errorBox);
                errorBox.appendChild(errorMessage);
        } else {
                    bringUpResults(songs);  //calls the function that runs the results
            }
        });
}

function bringUpResults (resultArray) {
    mainPage.innerHTML = '';  //refreshes the page before uploading next search request
    //"result" is the individual result and will be used inside the loop to grab specific data
    for (let result of resultArray) {
        // Variable creation to create elements
        const resultBox = document.createElement('div');
        const imageBox = document.createElement('img');
        const songnameBox = document.createElement('h2');
        const artistBox = document.createElement('h3');
        const albumBox = document.createElement('p');
        const dateBox = document.createElement('p');
        //adding classes to elements created
        resultBox.classList.add("results");
        imageBox.classList.add("pics");
        songnameBox.classList.add("songs");
        artistBox.classList.add("artists");
        albumBox.classList.add("albums");
        dateBox.classList.add("dates");
        //entering information for elements
        artistBox.innerText = result.artistName;
        imageBox.src = result.artworkUrl100;
        songnameBox.innerText = `"${result.trackName}"`;
        albumBox.innerText = result.collectionName;
        dateBox.innerText = `Release Date: ${moment(result.releaseDate).format('MMM D, Y')}`;
        //appending elements
        mainPage.appendChild(resultBox);
        resultBox.appendChild(imageBox);
        resultBox.appendChild(songnameBox);
        resultBox.appendChild(artistBox);
        resultBox.appendChild(albumBox);
        resultBox.appendChild(dateBox);
        
        //set up audio to play
        let playAudio = document.querySelector('#playAudio');
        imageBox.addEventListener("click", (event) => {
            nowPlaying.innerText = '';
            playAudio.src = result.previewUrl;
            nowPlaying.innerText = `Currently playing: ${songnameBox.innerText} By ${artistBox.innerText}`;
        })
    }}

    