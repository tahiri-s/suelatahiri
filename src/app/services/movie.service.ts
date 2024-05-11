import { Injectable } from "@angular/core";
import { ClientService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class MovieService extends ClientService {
  constructor(_httpClient: HttpClient) {
    super(_httpClient)
  }

  getByTitle(title: string | undefined): Observable<any> {
    return this.get(`s=${title}`)
  }

  getByImdbId(id: string): Observable<any> {
    return this.get(`i=${id}`)
  }
}