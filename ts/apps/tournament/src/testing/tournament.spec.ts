import { app } from '../app';
import * as request from 'supertest';
import { Participant, Tournament, TournamentPhaseType } from '../app/api/api-model';

const exampleTournament = {
  name: 'Unreal',
} as Tournament;

const exampleParticipant = {
  name: 'Novak Djokovic',
  elo: 2500
} as Participant;

describe('/tournament endpoint', () => {
  describe('[POST] when creating a tournament', () => {
    it('should return the correct id', async () => {
      const { body } = await request(app).post('/api/tournaments').send(exampleTournament).expect(201);

      expect(body.id).not.toBeUndefined();
    });

    it('should return a name', async () => {
      await request(app).post('/api/tournaments').send({}).expect(400);
    });

    it('should have stored the tournament', async () => {
      const { body } = await request(app).post('/api/tournaments').send(exampleTournament).expect(201);

      const get = await request(app).get(`/api/tournaments/${body.id}`).expect(200);

      expect(get.body.name).toEqual(exampleTournament.name);
    });

    it('should not return the correct name & elo', async () => {
      const { body } = await request(app).post('/api/tournaments').send(exampleTournament).expect(201);

      await request(app).post(`/api/tournaments/${body.id}/participants`).send(body.id, exampleParticipant).expect(400);
    });
  });
});
