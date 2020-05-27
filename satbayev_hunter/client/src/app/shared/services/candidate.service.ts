import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Candidate, Message} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CandidateService{
    constructor(private http: HttpClient){
    }

    fetch(params: any = {}): Observable<Candidate[]>{
        return this.http.get<Candidate[]>('http://localhost:5000/api/submission',{
            params: new HttpParams({
                fromObject: params
            })
        })
    }

    getById(id: string): Observable<Candidate>{
       return this.http.get<Candidate>(`http://localhost:5000/api/submission/${id}`)
    }

    create(
            name: string,
            surname: string,
            email: string,
            phone: string | Blob,
            position: string,
            faculty: string,
            docsSrc: File 
            ) : Observable<Candidate>{
                const fd = new FormData()

                if(docsSrc){
                    fd.append('application', docsSrc, docsSrc.name)
                }
                fd.append('name', name),
                fd.append('surname', surname),
                fd.append('email', email),
                fd.append('phone', phone),
                fd.append('position', position),
                fd.append('faculty', faculty)


                 return this.http.post<Candidate>('http://localhost:5000/api/submission', fd)
            }

            
    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`http://localhost:5000/api/submission/${id}`)
    }
}