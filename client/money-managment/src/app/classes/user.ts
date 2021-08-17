import { Category } from "./category";

export class User {
    id:number;
    name:string;
    surname:string;
    email:string;
    password:string;
    expenses:Category[];
    savings:Category[];
    

    constructor(name: string, email: string, password: string) {
        this.id = 0;
        this.email=email;
        this.name = name;
        this.surname='';
        this.password=password;
        this.expenses=[];
        this.savings=[];
    }
}