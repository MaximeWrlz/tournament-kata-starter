import * as express from 'express';
import { getTournament, postTournament, addParticipant } from './app/api/tournament-api';
import * as bodyParser from 'body-parser';
import mongoose = require('mongoose');

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://jaunni:archilogynov2021@cluster0.demen.mongodb.net/tournament-ynov?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournament!' });
});

app.post('/api/tournaments', postTournament);
app.get('/api/tournaments/:id', getTournament);
app.post('/api/tournaments/:id/participants', addParticipant);