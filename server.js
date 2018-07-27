const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'owen',
      password : 'Otrain15$',
      database : 'rcl'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) =>{res.send('it is working!')});

app.post('/contact', (req,res) =>{
    const {name, email} = req.body;
    db('submissions')
    .returning('*')
    .insert({
        name: name,
        email: email,
        submitted: new Date()
    })
    .then(response => res.json(response))
    .catch(err => res.status(400).json('unable to enter into db'));
})

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`);
})