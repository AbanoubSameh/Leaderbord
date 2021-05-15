import { Action } from '@ngrx/store';
import { UUID } from '@shared/models';
import { CounterDTO, CounterInDTO } from '../models/counter';

export enum ActionTypes {
  LOAD = '[Counter] Load',
  LOAD_SUCCESS = '[Counter] Load Success',

  LOAD_ITEM = '[Counter] Load Item',
  INCREMENT = '[Counter] Increment Value',

  ADD = '[Counter] Add',
  UPDATE = '[Counter] Update',

  UPSERT_ITEM = '[Counter] Upsert Item',
  UPSERT_ITEMS = '[Counter] Upsert Items',

  DELETE = '[Counter] Delete',
  DELETE_SUCCESS = '[Counter] Delete Success',

  FAILURE = '[Counter] Failure',
}

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;
  constructor() { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: CounterDTO[] }) { }
}
export class LoadItemAction implements Action {
  readonly type = ActionTypes.LOAD_ITEM;
  constructor(public payload: { id: UUID }) { }
}
export class IncrementItemValueAction implements Action {
  readonly type = ActionTypes.INCREMENT;
  constructor(public payload: { id: UUID }) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: { id: UUID, item: CounterInDTO }) { }
}
export class AddAction implements Action {
  readonly type = ActionTypes.ADD;
  constructor(public payload: { item: CounterInDTO }) { }
}

export class UpsertItemAction implements Action {
  readonly type = ActionTypes.UPSERT_ITEM;
  constructor(public payload: { item: CounterDTO }) { }
}

export class UpsertItemsAction implements Action {
  readonly type = ActionTypes.UPSERT_ITEMS;
  constructor(public payload: { items: CounterDTO[] }) { }
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


export type Actions = LoadAction | LoadSuccessAction | LoadItemAction | UpdateAction | IncrementItemValueAction |
  DeleteAction | DeleteSuccessAction | AddAction |
  UpsertItemAction | UpsertItemsAction | FailureAction;

