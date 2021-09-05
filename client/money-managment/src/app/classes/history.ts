export class History {
    date: Date;
    amount:number;
    savingId:number;
    expenseId:number;
    
    constructor() {
        this.date=new Date;
        this.amount=0;
        this.savingId=0;
        this.expenseId=0;
        
    }
}