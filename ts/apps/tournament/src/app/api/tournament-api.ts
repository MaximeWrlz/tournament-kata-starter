import { Request, Response } from 'express';
import { TournamentRepository } from '../repository/tournament-repository';
import { TournamentToAdd } from './api-model';
import { Participant } from './api-model';
import { v4 as uuidv4 } from 'uuid';

const tournamentRepository = new TournamentRepository();

export const postTournament = (req: Request, res: Response) => {
  const tournamentToAdd: TournamentToAdd = req.body;

  const tournament = { id: uuidv4(), name: tournamentToAdd.name, phases: [], participants: [] };
  tournamentRepository.saveTournament(tournament);

  if (tournament.name == null) {
    res.status(400);
    res.send("❌ Le champ 'nom' est manquant ou vide ! ❌");
  }
  
  res.status(201);
  res.send({ id: tournament.id, name: tournament.name });
};

export const getTournament = (req: Request, res: Response) => {
  const id = req.params['id'];

  const tournament = tournamentRepository.getTournament(id);

  res.status(200);
  res.send(tournament);
};

export const addParticipant = (req: Request, res: Response) => {
  const playerToAdd: Participant = req.body;

};
