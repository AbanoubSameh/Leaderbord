import { UUID } from "../../common/models/uuid";

export interface CounterDTO {
    id: UUID;
    value: number;
    userId: UUID;
}

export interface CounterInDTO {
    value: number;
    userId: UUID;
}