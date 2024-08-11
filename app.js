// const BASE_URL = "https://deckofcardsapi.com/api/deck"
// let $deckDiv = $(".deck")
// let deckId 

// function randomRotation() {
//     // 180 degrees in a rotation
//     return Math.floor(Math.random() * 180);
// }

// function appendCard(obj, cls='card_img') {
//     console.log(`${obj.value} of ${obj.suit}`)

//     let $card = $('<img />', {
//         class: cls, 
//         src: obj.image});
//     $card.css('rotate', `${randomRotation()}deg`);
//     $card.appendTo($deckDiv);
// }


// function drawCard() {
//     return new Promise(() => {
//         axios.get(`${BASE_URL}/${deckId}/draw/`)
//         .then(result => {
//             // draw and append new card
//             let firstCard = result.data.cards[0];
//             appendCard(firstCard)
//             return
//             })
//         .catch(err => console.log(err))
//     })
// }

        
// function drawNewDeck() {
// return new Promise(() => {
//         axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
//         .then(result => {
//             // Generate a deck ID
//             deckId = result.data.deck_id;
//             return
//         })
//         .catch(err => console.log(err))
//     })
// }

// drawNewDeck();

// $('.get_card').on('click', function() {
//     drawCard();
// })

const BASE_URL = "https://pokeapi.co/api/v2/"

function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

function getPokemon() {
    return new Promise(() => {
        let $pkmnList = $(".pokemon_list")
        $pkmnList.empty();

        // Make get request to pull all pokemon from database
        axios.get(`${BASE_URL}pokemon?limit=100000&offset=0`)
        .then(result => {
            // randomly select 3 pokemon from full database
            for (let i = 0; i < 3 ; i++) {
                let chosenMon = get_random(result.data.results)
                let pkmnName
                let engFlavText 

                axios.get(chosenMon.url)
                .then(result => {
                    // Set name value for chosen pokemon and make a new request with that pokemon's species url to get the pokedex entry
                    pkmnName = result.data.name;
                    return axios.get(result.data.species.url); 
                })
                .then(speciesInfo => {
                // Find an English pokedex entry for that species and save its value
                    let allEntries = speciesInfo.data.flavor_text_entries

                    // ----- LOOP ----
                    for (let entry of allEntries) {
                        if (entry.language.name == 'en') {
                            engFlavText = entry.flavor_text;
                            break;
                        }
                        else {
                            continue;
                        }
                    }
                    // ----- LOOP ----
                })
                
                // append pkmn data onto list (name and pokedex entry)
                $pkmnList.append(`<li><b>${pkmnName}:</b> ${engFlavText}</li>`)
            }
        })
        .catch(err => console.log(err))
    })
}

$('.get_pokemon').on('click', function() {
    getPokemon();
})