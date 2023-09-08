

const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")




weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = searchElement.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    const weatherUrl = `/weather?address=${location}`
    
    fetch(weatherUrl).then((response)=>{
        response.json().then((forecastData)=>{
            if (forecastData.error){
                messageOne.textContent = forecastData.error
            }else{
                messageOne.textContent = forecastData.location
                messageTwo.textContent = forecastData.forecast
        }
    })
})



})