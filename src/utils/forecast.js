const request = require("request")


const forecast = (longitude, latitude, callback) => {
    const query = latitude.toString() + "," + longitude.toString()
    const url = `http://api.weatherstack.com/current?access_key=54517935bd1219e6755db512da88c39a&query=${query}`
    // console.log("forecast url: "+ url)

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect forecast service!", undefined)
        } else if (body.success === false) {
            callback("Unable to find forecast, pls try another param", undefined)
        }
        else {
            const current_temperature = body.current["temperature"]
            const feelslike_temperature = body.current["feelslike"]
            const weather_descriptions = body.current["weather_descriptions"][0]
            const current_humidity = body.current["humidity"]
            callback(undefined, 
                 `<<${weather_descriptions}>>
                 It's currently ${current_temperature} degrees out.
                 It feels like ${feelslike_temperature} degrees out! 
                 And the humidity is ${current_humidity}%.`)
        }

    })


}

// forecast(-75.7088, 4400000.1545, (error, data) => {
//     console.log('Error: ', error)
//     console.log('Data:  ', data)
//   })
module.exports = forecast