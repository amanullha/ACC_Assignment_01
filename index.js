const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const usersRoutes = require('./routes/v1/users.route');
const { errorHandler } = require('./middleware/errorHandler');
require('dotenv').config()

const app = express();

// middleware 
app.use(cors());

// convert data to json
app.use(express.json());




// Routing start here 


app.use('/api/v1/users', usersRoutes)














// Routing ends here










app.get('/', (req, res) => {
    res.send("server is started!")
})


// If no route exits 

app.all('*', (req, res) => {

    // res.send("No route found");
    // res.render('noRouteFound')
    res.render('noRouteFound.ejs', { text: 'No Route Found!!' })

})


// Global Error Handler

app.use(errorHandler);




app.listen(PORT, () => {
    console.log("listening port at :", PORT);
})





// if express can't handle the error

process.on("unhandledRejection", (error) => {

    console.log(error.name, error.message);

    app.close(() => {
        process.exit();
    })
})



















































