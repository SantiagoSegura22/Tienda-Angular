import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Comestible } from '../models/Comestible';


@Injectable({
  providedIn: 'root',
})
export class InicioService {
    private comestiblesUrl = 'http://localhost:3000/comestibles'

    constructor(private http: HttpClient){}

    getComestibles(): Observable<Comestible[]>{
        return this.http.get<Comestible[]>(this.comestiblesUrl);
    }
}
