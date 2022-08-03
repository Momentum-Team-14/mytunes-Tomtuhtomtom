const mainPage = document.querySelector('.MainPage');

function bringUpResults (resultArray) {
    for (let result of resultArray) {
        // Variable creation to create elements
        const resultBox = document.createElement('div');
        const imageBox = document.createElement('img');
        const songnameBox = document.createElement('h1');
        const artistBox = document.createElement('h2');
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
        imageBox.src = result.artworkUrl100;
        songnameBox.innerText = `${result.trackName}`;
        artistBox.innerText = `${result.artistName}`;
        albumBox.innerText = `${result.collectionName}`;
        dateBox.innerText = `Release Date: ${moment(result.releaseDate).format('MMM D, Y')}`
        //appending elements
        mainPage.appendChild(resultBox);
        resultBox.appendChild(imageBox);
        resultBox.appendChild(songnameBox);
        resultBox.appendChild(artistBox);
        resultBox.appendChild(albumBox);
        resultBox.appendChild(dateBox);
    }
}
bringUpresults(songs);