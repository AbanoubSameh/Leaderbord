import { UUID } from "../../common/models/uuid";

export interface TeamDTO {
    id: UUID;
    name: string;
}

export interface TeamInDTO {
    name: string;
}