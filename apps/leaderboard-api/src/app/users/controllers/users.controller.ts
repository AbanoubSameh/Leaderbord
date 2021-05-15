import { Body, Delete, Get, Path, Post, Put, Query, Route } from "tsoa";
import { UUID } from "../../common/models/uuid";
import { UserDTO, UserInDTO } from "../models/user";
import UsersService from "../services/users.service";

@Route("users")
class UsersController {
  private static instance: UsersController;

  static getInstance(): UsersController {
    if (!UsersController.instance) {
      UsersController.instance = new UsersController();
    }
    return UsersController.instance;
  }

  @Get("/")
  public async getAll(@Query() teamId?: UUID): Promise<UserDTO[]> {
    if (teamId) return await UsersService.getByTeamId(teamId);
    return await UsersService.getAll();
  }

  @Post("/")
  public async create(@Body() user: UserInDTO): Promise<UserDTO> {
    return await UsersService.create(user);
  }

  @Get("/{id}")
  public async getById(@Path() id: UUID): Promise<UserDTO> {
    return await UsersService.getById(id);
  }

  @Put("/{id}")
  public async update(@Path() id: UUID, @Body() user: UserInDTO): Promise<UserDTO> {
    return await UsersService.update(id,user);
  }

  @Delete("/{id}")
  public async delete(@Path() id: UUID): Promise<UUID> {
    return await UsersService.delete(id);
  }
}

export default UsersController.getInstance();
