import { Request, Response } from 'express';
import { TournamentRepository } from '../repository/tournament-repository';
import { TournamentToAdd } from './api-model';
import { Participant } from './api-model';
import { v4 as uuidv4 } from 'uuid';

const tournamentRepository = new TournamentRepository();

export const postTournament = (req: Request, res: Response) => {
  const tournamentToAdd: TournamentToAdd = req.body;

  const tournament = { id: uuidv4(), name: tournamentToAdd.name, phases: [], participants: [] };

  if (tournament.name == null) {
    res.status(400);
    res.send("❌ Le champ 'nom' est manquant ou vide ! ❌");
  }
  
  tournamentRepository.saveTournament(tournament);
  
  res.status(201);
  res.send({ id: tournament.id, name: tournament.name });
};

export const getTournament = (req: Request, res: Response) => {
  
  const id = req.params['id'];

  const tournament = tournamentRepository.getTournament(id);

  if (!tournament) {
    res.status(404);
    res.send("❌ Le tournoi n'existe pas ! ❌");
  }

  res.status(200);
  res.send(tournament);
};

export const addParticipant = (req: Request, res: Response) => {
  const playerToAdd: Participant = req.body;

  if (!playerToAdd.name || !playerToAdd.elo || !Number.isInteger(playerToAdd.elo)) {
    res.status(400).send("❌ Le nom ou l'elo sont incorrects ❌");
  }

  const participant = { id: uuidv4(), name: playerToAdd.name, elo: playerToAdd.elo};
  const id = req.params.id;
  const tournament = tournamentRepository.getTournament(id);
  if (!tournament) {
    res.status(404).send("❌ Le tournoi n'existe pas ❌");
  }
  tournament.participants = [...tournament.participants, participant];
  const result = tournamentRepository.saveTournament(tournament);

  res.status(201);
  res.send({ id: participant.id });
};
