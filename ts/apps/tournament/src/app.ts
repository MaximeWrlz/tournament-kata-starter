import * as express from 'express';
import { getTournament, postTournament, addParticipant } from './app/infra/api/tournament-api';
import * as bodyParser from 'body-parser';
import { myDB } from './app/infra/storage/database';
import TournamentSchema from "./app/domain/model/tournament"

myDB.initDB();

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournament!' });
});

app.get('/tournament', (req, res) => {

  TournamentSchema.find({}, function (err: unknown, tournaments: { name: unknown; }) {
    if (err) return console.error(err);
    res.send(tournaments.name)
  })
    ;
})

app.post('/api/tournaments', postTournament);
app.get('/api/tournaments/:id', getTournament);
app.post('/api/tournaments/:id/participants', addParticipant);