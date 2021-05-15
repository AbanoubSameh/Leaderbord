import { UserDTO, UserInDTO } from "../models/user";
import { v4 as uuid } from "uuid";
import { UUID } from "../../common/models/uuid";
import { mockUsers } from "../models/users-mock.const";

class UsersService {
    private static instance: UsersService;
    users: UserDTO[] = [
        ...mockUsers
    ];
    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    async getAll() {
        return this.users;
    }

    async getById(id: UUID) {
        return this.users.find((user: UserDTO) => user.id === id);
    }

    async getByTeamId(teamId: UUID) {
        return this.users.filter((user: UserDTO) => user.teamId === teamId);
    }

    async create(user: UserInDTO) {
        const obj: UserDTO = Object.assign({ id: uuid() }, user)
        this.users.push(obj);
        return obj;
    }

    async update(id: UUID, user: UserInDTO) {
        const objIndex = this.users.findIndex((obj: UserDTO) => obj.id === id);
        this.users.splice(objIndex, 1, Object.assign({}, this.users[objIndex], user));
        return this.users[objIndex];
    }

    async delete(id: UUID) {
        const objIndex = this.users.findIndex((obj: UserDTO) => obj.id === id);
        this.users.splice(objIndex, 1);
        return id;
    }
}
export default UsersService.getInstance();