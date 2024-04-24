const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const button = document.getElementById('search-btn');
const input = document.getElementById('input');
const infoContainer = document.getElementById('information');
const sound = document.getElementById('sound');

button.addEventListener('click', ()=>{getData()})

const getData = async ()=>{
    try {
        const request = await fetch(`${url}${input.value}`);
        const response = await request.json();
        console.log(response)
        infoContainer.innerHTML = `
        <div class="word-container">
                <h1 class="inp-word">${input.value}</h1>
                <button class="speaker-icon" onClick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="grammar">
                <p>${response[0].meanings[0].partOfSpeech}   ${response[0].phonetics[0].text} </p>
            </div>
            <div class="meaning">
                <p>${response[0].meanings[0].definitions[0].definition}</p>

            </div>
            <div class="example">
                <p>
                ${
                    (response[0].meanings[1].definitions[0].example == undefined) ? response[0].meanings[2].definitions[1].example : response[0].meanings[1].definitions[0].example
                }
                    </p>
            </div>
        `;
        sound.setAttribute('src', `${response[0].phonetics[1].audio}`);
        // console.log(sound)
    } catch (error) {
        console.log(error)
    }
    input.value = " ";
}

function playSound(){
   sound.play();
    // console.log(sound);
}



