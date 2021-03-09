const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            } else {
                console.log(data)
                msgOne.textContent = 'place: ' + data.location
                msgTwo.textContent = 't: ' + data.forecast.temperature 
                + ', feelsLike: ' + data.forecast.feelslike
            }
        })
    })
})