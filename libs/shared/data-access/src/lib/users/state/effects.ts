import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as userActions from './actions';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  @Effect()
  loadEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadAction>(userActions.ActionTypes.LOAD),
    switchMap(() => {
      return this.usersService.getAll().pipe(
        map((items) => new userActions.LoadSuccessAction({ items })),
        catchError((error) =>
          of(
            new userActions.FailureAction({
              error,
              failureAction: 'Load Users Failure',
            })
          )
        )
      );
    })
  );

  @Effect()
  loadItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadItemAction>(userActions.ActionTypes.LOAD_ITEM),
    switchMap((action) => {
      return this.usersService.getById(action.payload.id).pipe(
        map((item) => new userActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new userActions.FailureAction({
              error,
              failureAction: 'Load User By Id Failure',
            })
          )
        )
      );
    })
  );

  @Effect()
  AddItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.AddAction>(userActions.ActionTypes.ADD),
    switchMap((action) =>
      this.usersService.create(action.payload.item).pipe(
        map((item) => new userActions.AddSuccessAction({ item })),
        catchError((error) =>
          of(
            new userActions.FailureAction({
              error,
              failureAction: 'Add User Failure',
            })
          )
        )
      )
    )
  );

  @Effect()
  UpdateItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UpdateAction>(userActions.ActionTypes.UPDATE),
    switchMap((action) =>
      this.usersService.update(action.payload.id, action.payload.item).pipe(
        map((item) => new userActions.UpsertItemAction({ item })),
        catchError((error) =>
          of(
            new userActions.FailureAction({
              error,
              failureAction: 'Update User Failure',
            })
          )
        )
      )
    )
  );

  @Effect()
  DeleteItemEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.DeleteAction>(userActions.ActionTypes.DELETE),
    switchMap((action) =>
      this.usersService.delete(action.payload.id).pipe(
        map(
          () => new userActions.DeleteSuccessAction({ id: action.payload.id })
        ),
        catchError((error) =>
          of(
            new userActions.FailureAction({
              error,
              failureAction: 'Delete User Failure',
            })
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  FailureEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.FailureAction>(userActions.ActionTypes.FAILURE),
    tap((action) => {
      console.log(action); //handle errors
    })
  );
}
