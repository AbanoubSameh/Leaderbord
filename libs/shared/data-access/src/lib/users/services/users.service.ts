import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO, UserInDTO, UUID } from '@shared/models';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'users';
  constructor(private http: HttpClient) {}

  getAll(teamId?: UUID): Observable<UserDTO[]> {
    if (teamId)
      return this.http.get<UserDTO[]>(`${environment.apiUrl}/${this.baseUrl}?teamId=${teamId}`);
    return this.http.get<UserDTO[]>(`${environment.apiUrl}/${this.baseUrl}`);
  }

  getById(id: UUID): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${environment.apiUrl}/${this.baseUrl}/${id}`);
  }

  create(obj: UserInDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${environment.apiUrl}/${this.baseUrl}`, obj);
  }

  update(id: UUID, obj: UserInDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${environment.apiUrl}/${this.baseUrl}/${id}`, obj);
  }

  delete(id: UUID): Observable<UUID> {
    return this.http.delete<UUID>(`${environment.apiUrl}/${this.baseUrl}/${id}`);
  }
}
