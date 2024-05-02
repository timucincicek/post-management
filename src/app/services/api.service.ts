import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private readonly http: HttpClient) { }

  get baseUrl(): string {
    return environment.apiUrl;
  }

  getPosts() {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`)
  }

}
