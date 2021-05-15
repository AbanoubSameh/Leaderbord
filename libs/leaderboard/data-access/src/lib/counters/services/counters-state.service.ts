import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from '@shared/models';
import { Observable } from 'rxjs';
import { CounterDTO, CounterInDTO } from '../models/counter';
import * as actions from '../state/actions';
import * as selectors from '../state/selectors';
import { CounterState } from '../state/state';

@Injectable({
  providedIn: 'root',
})
export class CountersStateService {
  constructor(protected store: Store<any>) {}

  selectState(): Observable<CounterState> {
    return this.store.select(selectors.selectState);
  }
  selectItems(): Observable<CounterDTO[]> {
    return this.store.select(selectors.selectAllItems);
  }
  selectUsersCounter(userIds: UUID[]): Observable<CounterDTO[]> {
    return this.store.select(selectors.selectCountersByUserIds(userIds));
  }
  selectUsersTotalCounter(userIds: UUID[]): Observable<number> {
    return this.store.select(selectors.selectUsersTotalCounter(userIds));
  }
  selectItemById(id: UUID): Observable<CounterDTO> {
    return this.store.select(selectors.selectCounterById(id));
  }

  selectPendingItem(): Observable<CounterDTO> {
    return this.store.select(selectors.selectPending);
  }

  selectError(): Observable<UUID> {
    return this.store.select(selectors.selectError);
  }

  selectIsLoading(): Observable<boolean> {
    return this.store.select(selectors.selectLoading);
  }

  selectIsSuccess(): Observable<boolean> {
    return this.store.select(selectors.selectSuccess);
  }

  /************** Dispatchers ************** */

  dispatchLoad() {
    this.store.dispatch(new actions.LoadAction());
  }

  dispatchLoadItembyId(id: UUID) {
    this.store.dispatch(new actions.LoadItemAction({ id }));
  }
  dispatchIncrementItemValue(id: UUID) {
    this.store.dispatch(new actions.IncrementItemValueAction({ id }));
  }

  dispatchAddItem(item: CounterInDTO) {
    this.store.dispatch(new actions.AddAction({ item }));
  }

  dispatchUpdateItem(id: UUID, item: CounterInDTO) {
    this.store.dispatch(new actions.UpdateAction({ id, item }));
  }

  dispatchDeleteItem(id: UUID) {
    this.store.dispatch(new actions.DeleteAction({ id }));
  }
}
