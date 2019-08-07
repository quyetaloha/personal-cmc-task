import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
 })
export class CourseService {
    urlGetSourseData="http://108.160.133.232:4040/api/subjects";
    doGetSourseData(tokenID:string) {
        let token="Token "+tokenID
        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': "application/json",
              'authorization':token
            })
        }

        return this.http.get(this.urlGetSourseData,httpOptions);
    }

    constructor(private http: HttpClient){

    }
}
