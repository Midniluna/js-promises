// I really missed coding. I was scared to try it again because it'd been so long, but despite everything, I always end up coming back to it because I love the way it scratches my brain. I couldn't get any sleep, so I figured what better way to pass the time than to give this a go again? I doubt this will be seen but if so, Hello! It's good to be back. I'll be pretty busy this month, but I genuinely do want to try to get back into the rhythm of coding... It's a beautiful night to be alive.

// God, I'm rusty. Here's hoping I've still got it. 

const BASE_URL = "http://numbersapi.com/"

function getNumberFact(num, times = 1) {
    return new Promise((resolve, reject) => {
        let i = 0

        while (i < times) {
            axios.get(`${BASE_URL}${num}?json`)
            .then(result => {
                console.log(result.data.text)
                return result.data.text
            })
            .catch(err => console.log(err))

            i++}
    })
}

// I DID ITTTT oh my goodness