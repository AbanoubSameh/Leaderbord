import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments';
import { UUID } from '@shared/models';
import { CounterDTO, CounterInDTO } from '../models/counter';

@Injectable({
  providedIn: 'root',
})
export class CountersService {
  private baseUrl: string = 'counters';
  constructor(private http: HttpClient) {}

  getAll(counterId?: UUID): Observable<CounterDTO[]> {
    if (counterId)
      return this.http.get<CounterDTO[]>(
        `${environment.apiUrl}/${this.baseUrl}?counterId=${counterId}`
      );
    return this.http.get<CounterDTO[]>(`${environment.apiUrl}/${this.baseUrl}`);
  }

  increment(userId: UUID): Observable<CounterDTO> {
    return this.http.put<CounterDTO>(
      `${environment.apiUrl}/${this.baseUrl}/${userId}/increment`,
      null
    );
  }

  getById(id: UUID): Observable<CounterDTO> {
    return this.http.get<CounterDTO>(
      `${environment.apiUrl}/${this.baseUrl}/${id}`
    );
  }

  create(obj: CounterInDTO): Observable<CounterDTO> {
    return this.http.post<CounterDTO>(
      `${environment.apiUrl}/${this.baseUrl}`,
      obj
    );
  }

  update(id: UUID, obj: CounterInDTO): Observable<CounterDTO> {
    return this.http.put<CounterDTO>(
      `${environment.apiUrl}/${this.baseUrl}/${id}`,
      obj
    );
  }

  delete(id: UUID): Observable<UUID> {
    return this.http.delete<UUID>(
      `${environment.apiUrl}/${this.baseUrl}/${id}`
    );
  }
}
