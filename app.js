const BASE_URL = "http://numbersapi.com/"
let $facts_list = $(".facts")

function getNumberFact(num, times = 1) {
    return new Promise(() => {
        let i = 0

        while (i < times) {
            axios.get(`${BASE_URL}${num}?json`)
            .then(result => {
                console.log(result.data.text)
                // resolve(result.data.text)
                $facts_list.append(`<li>${result.data.text}</li>`)
                return result.data.text
            })
            .catch(err => console.log(err))

            i++}
    })
}