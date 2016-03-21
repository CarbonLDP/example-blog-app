import { Injectable } from "angular2/core";

import { Context } from "carbonldp/App";
import * as Document from "carbonldp/Document";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as Pointer from "carbonldp/Pointer";
import * as Response from "carbonldp/HTTP/Response";
import * as Utils from "carbonldp/Utils";

import Post from "app/models/Post";
import * as PostService from "app/services/PostService";

@Injectable()
export default class CarbonPostService implements PostService.Class {
	private postsContainer:string = "posts/";

	constructor( private appContext:Context ) {}

	get( numberOfPosts:number, offset:number, orderBy:string, ascending:boolean ):Promise<Post[]>;
	get( slug:string ):Promise<Post>;
	get():Promise<Post[]>;
	get( slugOrNumberOfPosts:any = null, offset:number = null, orderBy:string = null, ascending:boolean = null):Promise<any> {
		let slug:string = Utils.isString( slugOrNumberOfPosts ) ? slugOrNumberOfPosts : null;
		let numberOfPosts:number = Utils.isNumber( slugOrNumberOfPosts ) ? slugOrNumberOfPosts : null;

		if( slug !== null ) return this.getSingle( slug );
		if( slugOrNumberOfPosts === null ) return this.getAll();

		// TODO
	}

	getLatest( ):Promise<Post[]> {
		return this.appContext.documents.getMembers( this.postsContainer ).then( ( [ posts, response ]:[ Pointer.Class[], Response.Class ] ) => {
			return Pointer.Util.resolveAll( posts );
		}).then( ( [ posts, responses ]:[ PersistedDocument.Class[], Response.Class[] ] ) => {
			return <any> posts;
		});
	}

	create( post:Post, slug:string = null ):Promise<Pointer.Class> {
		// TODO: Validate properties

		// TODO: Move this to a Factory?
		let postDocument:Document.Class = Document.Factory.createFrom( post );

		let promise:Promise<[ Pointer.Class, Response.Class ]>;
		if( slug === null ) {
			promise = this.appContext.documents.createChild( this.postsContainer, postDocument );
		} else {
			promise = this.appContext.documents.createChild( this.postsContainer, slug, postDocument );
		}

		return promise.then( ( [ postPointer, response ]:[ Pointer.Class, Response.Class ] ) => {
			return postPointer;
		});
	}

	private getSingle( slug:string ):Promise<Post> {
		return this.appContext.documents.get( `${this.postsContainer}${slug}/` ).then( ( [ document, response ]:[ PersistedDocument.Class, Response.Class ] ) => {
			return <any> document;
		});
	}

	private getAll():Promise<Post[]> {
		return this.appContext.documents.getMembers( this.postsContainer ).then( ( [ posts, response ]:[ Pointer.Class[], Response.Class ] ) => {
			// TODO: Fix getMembers
			posts = !! posts ? posts : [];
			return Pointer.Util.resolveAll( posts );
		}).then( ( [ posts, responses ]:[ PersistedDocument.Class[], Response.Class[] ] ) => {
			return !! posts ? posts : [];
		});
	}
}
