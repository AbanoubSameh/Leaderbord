import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TeamDTO, TeamInDTO } from '@shared/models';

export const teamAdapter: EntityAdapter<TeamDTO> = createEntityAdapter<TeamDTO>({
  selectId: model => model.id
});

export interface TeamState extends EntityState<TeamDTO> {
  isLoading?: boolean;
  count?: number;
  error?: any;
  pendingItem?: TeamInDTO | any;
}

export const initialState: TeamState = teamAdapter.getInitialState(
  {
    isLoading: false,
    count: null,
    error: null,
    pendingItem: null,
  }
);
