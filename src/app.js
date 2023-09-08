const path = require("path")
const express = require("express")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const hbs = require("hbs")


const app = express()
const PORT = process.env.PORT || 3000 //heroku dynamic port setting


// define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// set up Handlebars engine and views location
app.set('view engine', 'hbs') // setting for handlebars (to create dynamic template )
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath)) // express要使用哪裡的靜態檔案

// app.get 裡面有兩個重要的參數：visited url、function to be done
// app.get 裡的function 會有兩個重要參數：request(req) ,response(res)
// 使用index.html 會直接導向default page, 所以此段程式碼就不需要了

// app.get("", (req, res) => {res.send("<h1>Hello Express!</h1>")})


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Hanna Wu"
    }) // using hbs view

})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Hanna Wu"
    })

})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Nothing here!",
        name: "Hanna Wu"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "Please provide location!"
        })
    }

    else {
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({error})
                }

                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
              })
        })
    } 
})

app.get("/product", (req, res) => {
    // console.log(req.query)
    if (!req.query.search){
        return res.send({
            error: "Please provide search term"
        })

    }
    res.send({
        product: []
    })
})
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Hanna Wu",
        errorMessage: "Help Article Not Found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Hanna Wu",
        errorMessage: "Page Not Found"
    })

})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}!`)
})
