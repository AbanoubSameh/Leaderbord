import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamDTO, TeamInDTO, UUID } from '@shared/models';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private baseUrl: string = 'teams';
  constructor(private http: HttpClient) {}

  getAll(teamId?: UUID): Observable<TeamDTO[]> {
    if (teamId)
      return this.http.get<TeamDTO[]>(`${environment.apiUrl}/${this.baseUrl}?teamId=${teamId}`);
    return this.http.get<TeamDTO[]>(`${environment.apiUrl}/${this.baseUrl}`);
  }

  getById(id: UUID): Observable<TeamDTO> {
    return this.http.get<TeamDTO>(`${environment.apiUrl}/${this.baseUrl}/${id}`);
  }

  create(obj: TeamInDTO): Observable<TeamDTO> {
    return this.http.post<TeamDTO>(`${environment.apiUrl}/${this.baseUrl}`, obj);
  }

  update(id: UUID, obj: TeamInDTO): Observable<TeamDTO> {
    return this.http.put<TeamDTO>(`${environment.apiUrl}/${this.baseUrl}/${id}`, obj);
  }

  delete(id: UUID): Observable<UUID> {
    return this.http.delete<UUID>(`${environment.apiUrl}/${this.baseUrl}/${id}`);
  }
}
