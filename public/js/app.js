const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            } else {
                console.log(data)
                msgOne.textContent = 'place: ' + data.location
                msgTwo.textContent = '°C: ' + data.forecast.temperature + '\n'
                + 'feelsLike: ' + data.forecast.feelslike + '\n'
                + 'humidity: ' + data.forecast.humidity 
            }
        })
    })
})