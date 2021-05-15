import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as teamActions from './actions';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
} from 'rxjs/operators';
import { TeamsService } from '../services/teams.service';

@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private teamsService: TeamsService
  ) {}

  @Effect()
  loadEffect$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.LoadAction>(teamActions.ActionTypes.LOAD),
    switchMap((action) => {
      return this.teamsService.getAll().pipe(
        map((items) => new teamActions.LoadSuccessAction({ items })),
        catchError((error) =>
          of(
            new teamActions.FailureAction({
              error,
              failureAction: 'Load Teams Failure',
            })
          )
        )
      );
    })
  );

  @Effect()
  loadItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.LoadItemAction>(teamActions.ActionTypes.LOAD_ITEM),
    switchMap((action) => {
      return this.teamsService.getById(action.payload.id).pipe(
        map((item) => new teamActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new teamActions.FailureAction({
              error,
              failureAction: 'Load Team By Id Failure',
            })
          )
        )
      );
    })
  );

  @Effect()
  AddItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.AddAction>(teamActions.ActionTypes.ADD),
    switchMap((action) =>
      this.teamsService.create(action.payload.item).pipe(
        map((item) => new teamActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new teamActions.FailureAction({
              error,
              failureAction: 'Add Team Failure',
            })
          )
        )
      )
    )
  );

  @Effect()
  UpdateItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.UpdateAction>(teamActions.ActionTypes.UPDATE),
    switchMap((action) =>
      this.teamsService.update(action.payload.id, action.payload.item).pipe(
        map((item) => new teamActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new teamActions.FailureAction({
              error,
              failureAction: 'Update Team Failure',
            })
          )
        )
      )
    )
  );

  @Effect()
  DeleteItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.DeleteAction>(teamActions.ActionTypes.DELETE),
    switchMap((action) =>
      this.teamsService.delete(action.payload.id).pipe(
        map(
          (item) =>
            new teamActions.DeleteSuccessAction({ id: action.payload.id })
        ),
        catchError((error) =>
          of(
            new teamActions.FailureAction({
              error,
              failureAction: 'Delete Team Failure',
            })
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  FailureEffect$: Observable<Action> = this.actions$.pipe(
    ofType<teamActions.FailureAction>(teamActions.ActionTypes.FAILURE),
    tap((action) => {
      console.log(action); //handle errors
    })
  );
}
