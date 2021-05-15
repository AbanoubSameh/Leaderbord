import { CounterDTO, CounterInDTO } from "../models/counter";
import { v4 as uuid } from "uuid";
import { UUID } from "../../common/models/uuid";
import { mockCounters } from "../models/counter-mock.const";

class CountersService {
  private static instance: CountersService;
  counters: CounterDTO[] = [
   ...mockCounters
  ];
  static getInstance(): CountersService {
    if (!CountersService.instance) {
      CountersService.instance = new CountersService();
    }
    return CountersService.instance;
  }

  public async getAll() {
    return this.counters;
  }

  public async getById(id: UUID) {
    return this.counters.find((counter: CounterDTO) => counter.id === id);
  }

  public async create(counter: CounterInDTO) {
    const obj: CounterDTO = Object.assign({ id: uuid() }, counter);
    this.counters.push(obj);
    return obj;
  }

  public async update(id: UUID, counter: CounterInDTO) {
    const objIndex = this.counters.findIndex(
      (obj: CounterDTO) => obj.id === id
    );
    this.counters.splice(
      objIndex,
      1,
      Object.assign({}, this.counters[objIndex], counter)
    );
    return this.counters[objIndex];
  }

  public async increment(id: UUID) {
    const objIndex = this.counters.findIndex(
      (obj: CounterDTO) => obj.id === id
    );
    this.counters[objIndex].value++;
    return this.counters[objIndex];
  }

  public async delete(id: UUID) {
    const objIndex = this.counters.findIndex(
      (obj: CounterDTO) => obj.id === id
    );
    this.counters.splice(objIndex, 1);
    return id;
  }
}
export default CountersService.getInstance();
