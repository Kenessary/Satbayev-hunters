import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote, Message } from '../interfaces';


@Injectable({
    providedIn: 'root'
})

export class VoteService{
    constructor(private http: HttpClient){
    }

    fetch(params: any = {}): Observable<Vote[]>{
        return this.http.get<Vote[]>('http://localhost:5000/api/vote',{
            params: new HttpParams({
                fromObject: params
            })
        })
    }

    getById(id: string): Observable<Vote>{
        return this.http.get<Vote>(`http://localhost:5000/api/vote/${id}`)
     }

     create(vote: Vote):Observable<Vote>{
        return this.http.post<Vote>('http://localhost:5000/api/vote', vote)
    }

                  
    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`http://localhost:5000/api/vote/${id}`)
    }
}