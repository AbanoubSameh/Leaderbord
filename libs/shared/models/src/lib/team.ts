import { UUID } from "./common-types";

export interface TeamDTO {
    id: UUID;
    name: string;
}

export interface TeamInDTO {
    name: string;
}