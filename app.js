// const BASE_URL = "http://numbersapi.com/"
// let $facts_list = $(".facts")

// function getNumberFact(num, times = 1) {
    //     return new Promise(() => {
        //         let i = 0
        
        //         while (i < times) {
            //             axios.get(`${BASE_URL}${num}?json`)
            //             .then(result => {
                //                 console.log(result.data.text)
                //                 // resolve(result.data.text)
                //                 $facts_list.append(`<li>${result.data.text}</li>`)
                //                 return result.data.text
                //             })
                //             .catch(err => console.log(err))
                
                //             i++}
                //     })
                // }
                
                
const BASE_URL = "https://deckofcardsapi.com/api/deck"
let $deckDiv = $(".deck")
let deckId 

function randomRotation() {
    // 180 degrees in a rotation
    return Math.floor(Math.random() * 180);
}

function appendCard(obj, cls='card_img') {
    console.log(`${obj.value} of ${obj.suit}`)

    let $card = $('<img />', {
        class: cls, 
        src: obj.image});
    $card.css('rotate', `${randomRotation()}deg`);
    $card.appendTo($deckDiv);
}


function drawCard() {
    return new Promise(() => {
        axios.get(`${BASE_URL}/${deckId}/draw/`)
        .then(result => {
            // draw and append new card
            let firstCard = result.data.cards[0];
            appendCard(firstCard)
            return
            })
        .catch(err => console.log(err))
    })
}

        
function drawNewDeck() {
return new Promise(() => {
        axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
        .then(result => {
            // Generate a deck ID
            deckId = result.data.deck_id;
            return
        })
        .catch(err => console.log(err))
    })
}

drawNewDeck();

$('.get_card').on('click', function() {
    drawCard();
})