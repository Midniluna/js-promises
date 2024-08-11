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
        // if there's info already in there, remove it
        $pkmnList.empty();

        axios.get(`${BASE_URL}pokemon?limit=100000&offset=0`)
        .then(result => {
            // randomly select 3 pokemon from full database
            for (let i = 0; i < 3 ; i++) {
                let chosenMon = get_random(result.data.results)

                axios.get(chosenMon.url)
                .then(result => {
                    // Get name and species url for chosen pokemon
                    let pkmnName = result.data.name
                    let speciesUrl = result.data.species.url

                    // make request to species url to get pokedex data for chosen pokemon
                    axios.get(speciesUrl)
                    .then(speciesInfo => {
                        // Find an English entry and append it to the list with the name
                        let engFlavText 
                        let allEntries = speciesInfo.data.flavor_text_entries

                        for (let entry of allEntries) {
                            if (entry.language.name == 'en') {
                                engFlavText = entry.flavor_text;
                                break;
                            }
                            else {
                                continue;
                            }

                        }

                        // console.log(`${pkmnName}: ${engFlavText}`)
                        $pkmnList.append(`<li><b>${pkmnName}:</b> ${engFlavText}</li>`)

                    })
                })
            }
        })
        .catch(err => console.log(err))
    })
}

$('.get_pokemon').on('click', function() {
    getPokemon();
})