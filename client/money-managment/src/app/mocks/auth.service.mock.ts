import { Subject } from 'rxjs';
import { Credentials } from '../classes/credentials';
import { User } from '../classes/user';

export class AuthServiceMock {
    token: string;
    user: User;
    userRefresh=new Subject<User>()
    constructor() {
        this.token = '';
        this.user = new User('', '', '')
        this.userRefresh.subscribe(data => {
            this.user = data;
        });
        this.refreshUser();
    }

    loginUser(user: Credentials): Promise<void> {
        this.token = 'fakeToken';
        this.user = new User(user.email, user.email, user.password);
        return new Promise(resolve => {
            return resolve();
        });
    }

    refreshUser(){
        this.userRefresh.next(this.user);
    }

    logOut(){
        this.token = '';
        this.user = new User('','','');
    }

    isLoggedIn() {
        return this.token.length !== 0;
    }
}

