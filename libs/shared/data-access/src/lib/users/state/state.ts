import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserDTO, UserInDTO } from '@shared/models';

export const userAdapter: EntityAdapter<UserDTO> = createEntityAdapter<UserDTO>({
  selectId: model => model.id
});

export interface UserState extends EntityState<UserDTO> {
  isLoading?: boolean;
  count?: number;
  error?: any;
  pendingItem?: UserInDTO | any;
}

export const initialState: UserState = userAdapter.getInitialState(
  {
    isLoading: false,
    count: null,
    error: null,
    pendingItem: null,
  }
);
