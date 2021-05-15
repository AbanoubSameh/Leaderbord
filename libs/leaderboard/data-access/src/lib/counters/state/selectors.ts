import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { UUID } from '@shared/models';
import { CounterInDTO, CounterDTO } from '../models/counter';

import { CounterState, counterAdapter } from './state';

const getError = (state: CounterState): any => state.error;
const getIsLoading = (state: CounterState): boolean => state.isLoading;
const getIsSuccess = (state: CounterState): boolean =>
  !state.isLoading && state.error == null;
const getPending = (state: CounterState): CounterInDTO => state.pendingItem;

export const selectState: MemoizedSelector<
  object,
  CounterState
> = createFeatureSelector<CounterState>('counters');

export const selectAllItems: (
  state: object
) => CounterDTO[] = counterAdapter.getSelectors(selectState).selectAll;

export const selectCounterById = (id: UUID) =>
  createSelector(selectAllItems, (allCounters: CounterDTO[]) => {
    if (allCounters) {
      return allCounters.find((p) => p.id === id);
    } else {
      return null;
    }
  });

export const selectCountersByUserIds = (userIds: UUID[]) =>
  createSelector(selectAllItems, (allCounters: CounterDTO[]) => {
    return allCounters.filter((c) => userIds.includes(c.userId));
  });

export const selectUsersTotalCounter = (userIds: UUID[]) =>
  createSelector(
    selectCountersByUserIds(userIds),
    (usersCounters: CounterDTO[]) =>
      usersCounters.reduce((a, b) => a + b.value, 0)
  );

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
