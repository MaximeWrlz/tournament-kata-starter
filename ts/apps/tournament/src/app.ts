import * as express from 'express';
import { getTournament, postTournament, addParticipant } from './app/api/tournament-api';
import * as bodyParser from 'body-parser';
import { myDB } from './app/api/database';
import TournamentSchema from "./app/model/tournament"

myDB.initDB();

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournament!' });
});

app.get('/tournament', (req, res) => {

  TournamentSchema.find({}, function (err, tournaments) {
    if (err) return console.error(err);
    res.send(tournaments.name)
  })
    ;
})

app.post('/api/tournaments', postTournament);
app.get('/api/tournaments/:id', getTournament);
app.post('/api/tournaments/:id/participants', addParticipant);