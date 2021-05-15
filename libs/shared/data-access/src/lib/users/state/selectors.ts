import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { UserState, userAdapter } from './state';
import { UserDTO, UserInDTO, UUID } from '@shared/models';

const getError = (state: UserState): any => state.error;
const getIsLoading = (state: UserState): boolean => state.isLoading;
const getIsSuccess = (state: UserState): boolean => !state.isLoading && state.error == null;
const getPending = (state: UserState): UserInDTO => state.pendingItem;

export const selectState: MemoizedSelector<
  object,
  UserState
> = createFeatureSelector<UserState>('users');

export const selectAllItems: (
  state: object
) => UserDTO[] = userAdapter.getSelectors(selectState).selectAll;

export const selectUserById = (id: UUID) =>
  createSelector(selectAllItems, (allUsers: UserDTO[]) => {
    if (allUsers) {
      return allUsers.find(p => p.id === id);
    } else {
      return null;
    }
  });

export const selectUsersByTeamId = (teamId: UUID) =>
  createSelector(selectAllItems, (allUsers: UserDTO[]) => {
    if (allUsers) {
      return allUsers.filter(p => p.teamId === teamId);
    } else {
      return null;
    }
  });

export const selectUsersByIds = (ids: UUID[]) =>
  createSelector(selectAllItems, (allUsers: UserDTO[]) => {
    if (allUsers) {
      return allUsers.filter(p => ids.includes(p.id));
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
