export class Category {
    id: number;
    category: string;
    picture:string;
    
    constructor(category: string, picture: string) {
        this.id = 0;
        this.category = category;
        this.picture = picture;
    }
}