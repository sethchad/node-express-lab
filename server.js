
const express = require('express');
const app = express();
const methodOverride = require('method-override');


// Middleware Starts
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
// Middleware Ends


// Controllers and Routes
app.use('/pokemon', require('./controllers/pokemonController.js'));
app.use('/users', require('./controllers/usersController.js'));


app.listen(3000, () => {
  console.log("I'm listening");
});
