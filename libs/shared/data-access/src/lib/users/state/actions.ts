import { Action } from '@ngrx/store';
import { UserDTO, UserInDTO, UUID } from '@shared/models';

export enum ActionTypes {
  LOAD = '[User] Load',
  LOAD_SUCCESS = '[User] Load Success',

  LOAD_ITEM = '[User] Load Item',

  ADD = '[User] Add',
  ADD_SUCCESS = '[User] Add Success',
  UPDATE = '[User] Update',

  UPSERT_ITEM = '[User] Upsert Item',
  UPSERT_ITEMS = '[User] Upsert Items',

  DELETE = '[User] Delete',
  DELETE_SUCCESS = '[User] Delete Success',

  FAILURE = '[User] Failure',
}

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;
  constructor() {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: UserDTO[] }) {}
}
export class LoadItemAction implements Action {
  readonly type = ActionTypes.LOAD_ITEM;
  constructor(public payload: { id: UUID }) {}
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: { id: UUID; item: UserInDTO }) {}
}
export class AddAction implements Action {
  readonly type = ActionTypes.ADD;
  constructor(public payload: { item: UserInDTO }) {}
}
export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: { item: UserDTO }) {}
}

export class UpsertItemAction implements Action {
  readonly type = ActionTypes.UPSERT_ITEM;
  constructor(public payload: { item: UserDTO }) {}
}

export class UpsertItemsAction implements Action {
  readonly type = ActionTypes.UPSERT_ITEMS;
  constructor(public payload: { items: UserDTO[] }) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: { id: UUID }) {}
}
export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: { id: UUID }) {}
}
export class FailureAction implements Action {
  readonly type = ActionTypes.FAILURE;
  constructor(public payload: { error?: string; failureAction?: string }) {}
}

export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadItemAction
  | UpdateAction
  | DeleteAction
  | DeleteSuccessAction
  | AddAction
  | AddSuccessAction
  | UpsertItemAction
  | UpsertItemsAction
  | FailureAction;
