const mainPage = document.querySelector('.MainPage');

function bringUpResults (resultArray) {
    for (let result of resultArray) {
        // Variable creation to create elements
        let entryBox = document.createElement('div');
        let imageBox = document.createElement('img');
        let nameBox = document.createElement('h1');
        let emailBox = document.createElement('h2');
        let addressBox = document.createElement('p');
        let dateBox = document.createElement('p');
        //adding classes to elements created
        entryBox.classList.add("entries");
        imageBox.classList.add("pics");
        nameBox.classList.add("names");
        emailBox.classList.add("emails");
        addressBox.classList.add("addresses");
        dateBox.classList.add("dobs");
        //Change state to abbreviation
        let resultAbrState = '';
        for (let state of usStates) {
            if (result.location.state.toUpperCase() === state.name) {
                resultAbrState = state.abbreviation;
            }
        }
        //entering information for elements
        imageBox.src = result.picture.large;
        nameBox.innerText = `${result.name.first.charAt(0).toUpperCase() 
                            + result.name.first.slice(1)} ${result.name.last.charAt(0).toUpperCase() 
                            + result.name.last.slice(1)}`;
        emailBox.innerText = `${result.email}`;
        addressBox.innerText = `${result.location.street.number} ${result.location.street.name}
                                ${result.location.city} ${resultAbrState} ${result.location.postcode}`;
        dateBox.innerText = `DOB: ${moment(result.dob.date).format('MMM D, Y')}
                                    result Since: ${moment(result.registered.date).format('MMM D, Y')}`
        //appending elements
        mainPage.appendChild(entryBox);
        entryBox.appendChild(imageBox);
        entryBox.appendChild(nameBox);
        entryBox.appendChild(emailBox);
        entryBox.appendChild(addressBox);
        entryBox.appendChild(dateBox);
    }
}
bringUpresults(results);