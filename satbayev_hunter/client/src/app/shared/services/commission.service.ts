import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Message } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CommissionService{
    constructor(private http: HttpClient){
    }

    fetch(): Observable<User[]>{
        return this.http.get<User[]>('http://localhost:5000/api/commission')
    }

    getById(id: string): Observable<User>{
        return this.http.get<User>(`http://localhost:5000/api/commission/${id}`)
     }

     delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`http://localhost:5000/api/commission/${id}`)
    }
}