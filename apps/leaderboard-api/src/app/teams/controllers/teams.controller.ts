import { Body, Delete, Get, Path, Post, Put, Query, Route } from "tsoa";
import { UUID } from "../../common/models/uuid";
import { TeamDTO, TeamInDTO } from "../models/team";
import TeamsService from "../services/teams.service";

@Route("teams")
class TeamsController {
  private static instance: TeamsController;

  static getInstance(): TeamsController {
    if (!TeamsController.instance) {
      TeamsController.instance = new TeamsController();
    }
    return TeamsController.instance;
  }

  @Get("/")
  public async getAll(): Promise<TeamDTO[]> {
    return await TeamsService.getAll();
  }

  @Post("/")
  public async create(@Body() team: TeamInDTO): Promise<TeamDTO> {
    return await TeamsService.create(team);
  }

  @Get("/{id}")
  public async getById(@Path() id: UUID): Promise<TeamDTO> {
    return await TeamsService.getById(id);
  }

  @Put("/{id}")
  public async update(@Path() id: UUID, @Body() team: TeamInDTO): Promise<TeamDTO> {
    return await TeamsService.update(id,team);
  }

  @Delete("/{id}")
  public async delete(@Path() id: UUID): Promise<UUID> {
    return await TeamsService.delete(id);
  }
}

export default TeamsController.getInstance();
