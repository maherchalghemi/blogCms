import { Like } from "./like";

export class Article {
    name : String;
    description : String;
    like : Like ;
    author : String ;
    category : String;
    comment : [Object];
    url : String;
    date : Date;
}