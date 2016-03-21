import { OpaqueToken } from "angular2/core";
import Post from "app/models/Post";

export interface Class {
	get( numberOfPosts:number, offset:number, orderBy:string, ascending:boolean ):Promise<Post[]>;
	get( slug:string ):Promise<Post>;
	get():Promise<Post[]>;

	getLatest( ):Promise<Post[]>;

	// TODO: Answer - What to do with Pointers?
	create( post:Post, slug?:string ):Promise<any>;
}

export const Token = new OpaqueToken( "PostService" );
