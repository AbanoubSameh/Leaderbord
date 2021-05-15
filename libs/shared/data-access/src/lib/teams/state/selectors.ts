import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { TeamState, teamAdapter } from './state';
import { TeamDTO, TeamInDTO, UUID } from '@shared/models';

const getError = (state: TeamState): any => state.error;
const getIsLoading = (state: TeamState): boolean => state.isLoading;
const getIsSuccess = (state: TeamState): boolean => !state.isLoading && state.error == null;
const getPending = (state: TeamState): TeamInDTO => state.pendingItem;

export const selectState: MemoizedSelector<
  object,
  TeamState
> = createFeatureSelector<TeamState>('teams');

export const selectAllItems: (
  state: object
) => TeamDTO[] = teamAdapter.getSelectors(selectState).selectAll;

export const selectTeamById = (id: UUID) =>
  createSelector(selectAllItems, (allTeams: TeamDTO[]) => {
    if (allTeams) {
      return allTeams.find(p => p.id === id);
    } else {
      return null;
    }
  });


export const selectPending: MemoizedSelector<object, any> = createSelector(
  selectState,
  getPending
);

export const selectError: MemoizedSelector<object, any> = createSelector(
  selectState,
  getError
);

export const selectLoading: MemoizedSelector<object, any> = createSelector(
  selectState,
  getIsLoading
);

export const selectSuccess: MemoizedSelector<object, any> = createSelector(
  selectState,
  getIsSuccess
);
