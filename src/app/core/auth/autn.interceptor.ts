import {  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";




@Injectable()
export class Autn implements HttpInterceptor {
    constructor(private storageService: StorageService) {}


    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.storageService.getToken() ;
        let request: HttpRequest<any> = req;
        if (token) {
            request = req.clone({
                headers: req.headers.set('Authorization', `Token ${token}`,

            });
        }

        return next.handle(request);
        
    }
}
