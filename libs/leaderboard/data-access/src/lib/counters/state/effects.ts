import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UsersActions } from '@shared/data-access';
import * as counterActions from './actions';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { CountersService } from '../services/counters.service';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private countersService: CountersService
  ) {}

  @Effect()
  loadEffect$: Observable<Action> = this.actions$.pipe(
    ofType<counterActions.LoadAction>(counterActions.ActionTypes.LOAD),
    switchMap((action) => {
      return this.countersService.getAll().pipe(
        map((items) => new counterActions.LoadSuccessAction({ items })),
        catchError((error) =>
          of(
            new counterActions.FailureAction({
              error,
              failureAction: 'Load Counters Failure',
            })
          )
        )
      );
    })
  );

  @Effect()
  loadItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<counterActions.LoadItemAction>(counterActions.ActionTypes.LOAD_ITEM),
    switchMap((action) => {
      return this.countersService.getById(action.payload.id).pipe(
        map((item) => new counterActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new counterActions.FailureAction({
              error,
              failureAction: 'Load Counter By Id Failure',
            })
          )
        )
      );
    })
  );

  @Effect()
  IncrementItemValueEffect$: Observable<Action> = this.actions$.pipe(
    ofType<counterActions.IncrementItemValueAction>(
      counterActions.ActionTypes.INCREMENT
    ),
    switchMap((action) => {
      return this.countersService.increment(action.payload.id).pipe(
        map((item) => new counterActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new counterActions.FailureAction({
              error,
              failureAction: 'Incerement Item value Failure',
            })
          )
        )
      );
    })
  );

  @Effect()
  AddItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<counterActions.AddAction>(counterActions.ActionTypes.ADD),
    switchMap((action) =>
      this.countersService.create(action.payload.item).pipe(
        map((item) => new counterActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new counterActions.FailureAction({
              error,
              failureAction: 'Add Counter Failure',
            })
          )
        )
      )
    )
  );

  @Effect()
  userAddedEffect$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.AddSuccessAction>(UsersActions.ActionTypes.ADD_SUCCESS),
    switchMap(({ payload }) => {
      return this.countersService
        .create(Object.assign({ value: 0, userId: payload.item.id }))
        .pipe(
          map((item) => new counterActions.UpsertItemAction({ item })),
          catchError((error) =>
            of(
              new counterActions.FailureAction({
                error,
                failureAction: 'User Create, Add Counter  Failure',
              })
            )
          )
        );
    })
  );

  @Effect()
  UpdateItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<counterActions.UpdateAction>(counterActions.ActionTypes.UPDATE),
    switchMap((action) =>
      this.countersService.update(action.payload.id, action.payload.item).pipe(
        map((item) => new counterActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new counterActions.FailureAction({
              error,
              failureAction: 'Update Counter Failure',
            })
          )
        )
      )
    )
  );

  @Effect()
  DeleteItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<counterActions.DeleteAction>(counterActions.ActionTypes.DELETE),
    switchMap((action) =>
      this.countersService.delete(action.payload.id).pipe(
        map(
          (item) =>
            new counterActions.DeleteSuccessAction({ id: action.payload.id })
        ),
        catchError((error) =>
          of(
            new counterActions.FailureAction({
              error,
              failureAction: 'Delete Counter Failure',
            })
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  FailureEffect$: Observable<Action> = this.actions$.pipe(
    ofType<counterActions.FailureAction>(counterActions.ActionTypes.FAILURE),
    tap((action) => {
      console.log(action); //handle errors
    })
  );
}
