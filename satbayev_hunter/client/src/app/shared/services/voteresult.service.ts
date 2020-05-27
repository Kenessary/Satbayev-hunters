import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voteresult, Message } from '../interfaces';

@Injectable({
    providedIn: 'root'
})

export class VoteresultService{
    constructor(private http: HttpClient){
    }

    fetch(params: any = {}): Observable<Voteresult[]>{
        return this.http.get<Voteresult[]>('http://localhost:5000/api/voteresult',{
            params: new HttpParams({
                fromObject: params
            })
        })
    }

    getById(id: string): Observable<Voteresult>{
        return this.http.get<Voteresult>(`http://localhost:5000/api/voteresult/${id}`)
     }

     create(voteresult: Voteresult):Observable<Voteresult>{
        return this.http.post<Voteresult>('http://localhost:5000/api/voteresult', voteresult)
    }

                  
    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`http://localhost:5000/api/voteresult/${id}`)
    }
}