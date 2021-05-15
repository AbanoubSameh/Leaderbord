import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamDTO, TeamInDTO, UUID } from '@shared/models';
import { Observable } from 'rxjs';
import { AppRootState } from '../..';
import * as actions from '../state/actions'
import * as selectors from '../state/selectors'
import { TeamState } from '../state/state';

@Injectable({
  providedIn: 'root'
})
export class TeamsStateService {

  constructor(
    protected store: Store<AppRootState>,
  ) { }

  selectState(): Observable<TeamState> {
    return this.store.select(selectors.selectState)
  }

  selectItems(): Observable<TeamDTO[]> {
    return this.store.select(selectors.selectAllItems);
  }

  selectItemById(id: UUID): Observable<TeamDTO> {
    return this.store.select(selectors.selectTeamById(id))
  }

  selectPendingItem(): Observable<TeamDTO> {
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

  dispatchAddItem(item: TeamInDTO) {
    this.store.dispatch(new actions.AddAction({ item }))
  }

  dispatchUpdateItem(id: UUID, item: TeamInDTO) {
    this.store.dispatch(new actions.UpdateAction({ id, item }))
  }

  dispatchDeleteItem(id: UUID) {
    this.store.dispatch(new actions.DeleteAction({ id }))
  }


}
