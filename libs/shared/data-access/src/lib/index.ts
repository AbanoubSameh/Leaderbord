import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { TeamState } from './teams/state/state';
import { UserState } from './users/state/state';
export type AppRootState = {
  users: UserState;
  teams: TeamState;
};
export const reducers: ActionReducerMap<any> = {};
export const metaReducers: MetaReducer<AppRootState>[] = [];
