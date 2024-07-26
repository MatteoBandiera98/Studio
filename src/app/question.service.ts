import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) { }

  addQuestion(question: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, question);
  }

  searchQuestions(category: string, keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, {
      params: { category, keyword }
    });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  addCategory(category: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/categories`, { category });
  }

  removeCategory(category: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories`, { params: { category } });
  }
}
