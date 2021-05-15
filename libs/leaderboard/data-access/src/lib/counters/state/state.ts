import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CounterDTO, CounterInDTO } from '../models/counter';

export const counterAdapter: EntityAdapter<CounterDTO> = createEntityAdapter<CounterDTO>({
  selectId: model => model.id
});

export interface CounterState extends EntityState<CounterDTO> {
  isLoading?: boolean;
  count?: number;
  error?: any;
  pendingItem?: CounterInDTO | any;
}

export const initialState: CounterState = counterAdapter.getInitialState(
  {
    isLoading: false,
    count: null,
    error: null,
    pendingItem: null,
  }
);
