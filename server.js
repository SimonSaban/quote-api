const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT,()=> {
    console.log(`Listening to port ${PORT}`);
});

app.get('/api/quotes/random', (req, res) => {
    const quote = {
        quote: getRandomElement(quotes)
    }
    res.send(quote);

});

app.get('/api/quotes', (req, res) => {
    if(req.query.person) {
        const personQuotes = quotes.filter(quote => quote.person === req.query.person);
        const quotesObject = {
            quotes: personQuotes
        };
        res.send(quotesObject);       
    } else {
        const allQuotes = {
            quotes: quotes
        }
        res.send(allQuotes);
    }
});

app.post('/api/quotes', (req, res) => {
    if(req.query.person && req.query.quote) {
        const newQuote = {
            quote: req.query.quote,
            person: req.query.person
        }
        quotes.push(newQuote);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send();
    }
})
