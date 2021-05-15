import { UUID } from "../../common/models/uuid";

export interface UserDTO {
    id: UUID;
    name: string;
    teamId: UUID;
}

export interface UserInDTO {
    name: string;
    teamId: UUID;
}