import { UUID } from '@shared/models';

export interface UserCounter {
  id: UUID;
  name: string;
  counterValue: number;
}
