import { Action } from '@ngrx/store';
import { TeamDTO, TeamInDTO, UUID } from '@shared/models';

export enum ActionTypes {
  LOAD = '[Team] Load',
  LOAD_SUCCESS = '[Team] Load Success',

  LOAD_ITEM = '[Team] Load Item',

  ADD = '[Team] Add',
  UPDATE = '[Team] Update',

  UPSERT_ITEM = '[Team] Upsert Item',
  UPSERT_ITEMS = '[Team] Upsert Items',

  DELETE = '[Team] Delete',
  DELETE_SUCCESS = '[Team] Delete Success',

  FAILURE = '[Team] Failure',
}

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;
  constructor() { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: TeamDTO[] }) { }
}
export class LoadItemAction implements Action {
  readonly type = ActionTypes.LOAD_ITEM;
  constructor(public payload: { id: UUID }) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: { id: UUID, item: TeamInDTO }) { }
}
export class AddAction implements Action {
  readonly type = ActionTypes.ADD;
  constructor(public payload: { item: TeamInDTO }) { }
}

export class UpsertItemAction implements Action {
  readonly type = ActionTypes.UPSERT_ITEM;
  constructor(public payload: { item: TeamDTO }) { }
}

export class UpsertItemsAction implements Action {
  readonly type = ActionTypes.UPSERT_ITEMS;
  constructor(public payload: { items: TeamDTO[] }) { }
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: { id: UUID }) { }
}
export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: { id: UUID }) { }
}
export class FailureAction implements Action {
  readonly type = ActionTypes.FAILURE;
  constructor(public payload: { error?: string, failureAction?: string }) { }
}


export type Actions = LoadAction | LoadSuccessAction | LoadItemAction | UpdateAction |
  DeleteAction | DeleteSuccessAction | AddAction |
  UpsertItemAction | UpsertItemsAction | FailureAction;

