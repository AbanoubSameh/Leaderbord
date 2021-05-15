import { TeamDTO, TeamInDTO } from '../models/team';
import { v4 as uuid } from 'uuid';
import { UUID } from '../../common/models/uuid';
import { mockTeams } from '../models/teams-mock.const';

class TeamsService {
  private static instance: TeamsService;
  teams: TeamDTO[] = [...mockTeams];
  static getInstance(): TeamsService {
    if (!TeamsService.instance) {
      TeamsService.instance = new TeamsService();
    }
    return TeamsService.instance;
  }

  async getAll() {
    return this.teams;
  }

  async getById(id: UUID) {
    return this.teams.find((team: TeamDTO) => team.id === id);
  }

  async create(team: TeamInDTO) {
    const obj: TeamDTO = Object.assign({ id: uuid() }, team);
    this.teams.push(obj);
    return obj;
  }

  async update(id: UUID, team: TeamInDTO) {
    const objIndex = this.teams.findIndex((obj: TeamDTO) => obj.id === id);
    this.teams.splice(
      objIndex,
      1,
      Object.assign({}, this.teams[objIndex], team)
    );
    return this.teams[objIndex];
  }

  async delete(id: UUID) {
    const objIndex = this.teams.findIndex((obj: TeamDTO) => obj.id === id);
    this.teams.splice(objIndex, 1);
    return id;
  }
}
export default TeamsService.getInstance();
