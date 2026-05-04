import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {
  protected baseUrl = `${environment.apiUrl}/api`;
  protected http = inject(HttpClient);
}
