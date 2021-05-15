import { UUID } from "./common-types";

export interface UserDTO {
    id: UUID;
    name: string;
    teamId: UUID;
}

export interface UserInDTO {
    name: string;
    teamId: UUID;
}