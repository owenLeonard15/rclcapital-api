const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) =>{res.send('it is working!')});

app.post('/contact', (req,res) =>{
    const {name, email} = req.body;
    console.log({name, email});
    db('*').insert({
        name: name,
        email: email,
        submitted: new Date()
    })
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`);
})