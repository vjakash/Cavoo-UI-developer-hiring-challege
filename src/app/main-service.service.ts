import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  constructor(private http:HttpClient) { }
  getUsers():Observable<any>{
    return this.http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json',{
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }
} 
