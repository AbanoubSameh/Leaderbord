import { Body, Delete, Get, Path, Post, Put, Query, Route } from "tsoa";
import { UUID } from "../../common/models/uuid";
import { CounterDTO, CounterInDTO } from "../models/counter";
import CountersService from "../services/counters.service";

@Route("counters")
class CountersController {
  private static instance: CountersController;

  static getInstance(): CountersController {
    if (!CountersController.instance) {
      CountersController.instance = new CountersController();
    }
    return CountersController.instance;
  }

  @Get("/")
  public async getAll(): Promise<CounterDTO[]> {
    return await CountersService.getAll();
  }

  @Post("/")
  public async create(@Body() counter: CounterInDTO): Promise<CounterDTO> {
    return await CountersService.create(counter);
  }

  @Get("/{id}")
  public async getById(@Path() id: UUID): Promise<CounterDTO> {
    return await CountersService.getById(id);
  }

  @Put("/{id}")
  public async update(@Path() id: UUID, @Body() counter: CounterInDTO): Promise<CounterDTO> {
    return await CountersService.update(id,counter);
  }

  @Put("/{id}/increment")
  public async increment(@Path() id: UUID): Promise<CounterDTO> {
    return await CountersService.increment(id);
  }

  @Delete("/{id}")
  public async delete(@Path() id: UUID): Promise<UUID> {
    return await CountersService.delete(id);
  }
}

export default CountersController.getInstance();
