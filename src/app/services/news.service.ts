import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsDetail } from '../newsdetail';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }
  getNewsDetails(q:string):any{
    return this.http.get<NewsDetail>(`https://newsapi.org/v2/${q}&apiKey=${environment.key}`);
  }

}
