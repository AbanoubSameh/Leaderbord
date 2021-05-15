import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDTO, UserInDTO, UUID } from '@shared/models';
import { Observable } from 'rxjs';
import { AppRootState } from '../..';
import * as actions from '../state/actions'
import * as selectors from '../state/selectors'
import { UserState } from '../state/state';

@Injectable({
  providedIn: 'root'
})
export class UsersStateService {

  constructor(
    protected store: Store<AppRootState>,
  ) { }

  selectState(): Observable<UserState> {
    return this.store.select(selectors.selectState)
  }

  selectItems(): Observable<UserDTO[]> {
    return this.store.select(selectors.selectAllItems);
  }

  selectItemsByteamId(teamId: UUID): Observable<UserDTO[]> {
    return this.store.select(selectors.selectUsersByTeamId(teamId));
  }
  selectItemById(id: UUID): Observable<UserDTO> {
    return this.store.select(selectors.selectUserById(id))
  }

  selectPendingItem(): Observable<UserDTO> {
    return this.store.select(selectors.selectPending)
  }

  selectError(): Observable<UUID> {
    return this.store.select(selectors.selectError)
  }

  selectIsLoading(): Observable<boolean> {
    return this.store.select(selectors.selectLoading)
  }

  selectIsSuccess(): Observable<boolean> {
    return this.store.select(selectors.selectSuccess)
  }


  /************** Dispatchers ************** */

  dispatchLoad() {
    this.store.dispatch(new actions.LoadAction())
  }

  dispatchLoadItembyId(id: UUID) {
    this.store.dispatch(new actions.LoadItemAction({ id }))
  }

  dispatchAddItem(item: UserInDTO) {
    this.store.dispatch(new actions.AddAction({ item }))
  }

  dispatchUpdateItem(id: UUID, item: UserInDTO) {
    this.store.dispatch(new actions.UpdateAction({ id, item }))
  }

  dispatchDeleteItem(id: UUID) {
    this.store.dispatch(new actions.DeleteAction({ id }))
  }


}
