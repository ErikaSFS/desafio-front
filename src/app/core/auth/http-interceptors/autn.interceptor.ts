import {  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../../services/storage.service";




@Injectable()
export class AutnInterceptor implements HttpInterceptor {
    constructor(private storageService: StorageService) {}


    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.storageService.getToken();
        let request: HttpRequest<any> = req;
        if (token) {
            request = req.clone({
                headers: req.headers.set('Authorization', `Token ${token}`),

            });
        }
        return next.handle(request);
    }
}
