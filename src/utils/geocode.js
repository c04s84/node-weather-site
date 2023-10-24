const request = require("request")

const geocode = (address, callback) => {
    const api_token = "YOUR API TOKEN"
    const query_lang = "zh_Hans"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${api_token}&language=${query_lang}&limit=1`
    
    request({url, json: true}, (err, {body}) => {
        if (err){
            callback("Ubable to connect location service!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location, pls check your query parameters!", undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            // callback(undefined, `the center for ${address} is long: ${longitude}, lat: ${latitude}`)
            }
        })
    }


module.exports = geocode