import { CROSS, NOUGHT } from 'core/constants';

export function getScores(state) {
  return state.scores;
}

export function getNoughtScore(state) {
  return getScores(state)[NOUGHT];
}

export function getCrossScore(state) {
  return getScores(state)[CROSS];
}

export function getDrawScore(state) {
  return getScores(state).draws;
}
