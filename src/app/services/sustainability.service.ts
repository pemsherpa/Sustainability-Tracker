import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface defining the structure of a sustainability action
export interface SustainabilityAction {
  id: number;
  action: string;
  date: string;
  points: number;
}

@Injectable({
  providedIn: 'root'// Makes the service available throughout the app
})
export class SustainabilityService {
  private apiUrl = 'http://localhost:3000/api/actions';

  constructor(private http: HttpClient) { }

   // Fetch all actions from the backend (GET request)
  getActions(): Observable<SustainabilityAction[]> {
    return this.http.get<SustainabilityAction[]>(this.apiUrl);
  }

  // Add a new action to the backend (POST request)
  addAction(action: Omit<SustainabilityAction, 'id'>): Observable<SustainabilityAction> {
    return this.http.post<SustainabilityAction>(this.apiUrl, action);
  }
}