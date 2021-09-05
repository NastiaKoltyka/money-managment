import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from './classes/credentials';
import { User } from './classes/user';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private helper = new JwtHelperService();
    private host: string = 'http://127.0.0.1:3000/api';
    token: string;
    user: User;
    options: {headers?: { [header: string]: string | string[] } | undefined};
    userRefresh=new Subject<User>()
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token') ?? '';
        this.options = this.getOptions();
        this.user = this.token.length == 0 ? new User('', '', '') : this.helper.decodeToken<User>(this.token);
        this.userRefresh.subscribe(data => {
            this.user = data;
        });
    }

    loginUser(user: Credentials): Promise<void> {
        return this.http.post(`${this.host}/auth/login`, user)
            .toPromise()
            .then((data: any) => {
                this.token = data.token;
                this.options = this.getOptions();
                localStorage.setItem('token', this.token);
                this.user = this.helper.decodeToken<User>(this.token);
            });
    }

    getOptions(): {headers?: { [header: string]: string | string[] } | undefined}{
        return { headers: { 'Authorization': `Bearer ${this.token}` } };
    }

    refreshUser(){
        this.http.get<User>(`${this.host}/users/${this.user.id}`, this.options).subscribe(data => this.userRefresh.next(data));
    }

    logOut(){
        this.token = '';
        this.options = {};
        localStorage.setItem('token', this.token);
        this.user = new User('','','');
    }

    isLoggedIn() {
        return this.token.length !== 0;
    }
}

