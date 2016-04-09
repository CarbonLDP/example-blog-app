import { Injectable } from "angular2/core";

import * as AccessPoint from "carbonldp/AccessPoint";
import Context from "carbonldp/App/Context";
import * as Document from "carbonldp/Document";
import * as Fragment from "carbonldp/Fragment";
import * as PersistedDocument from "carbonldp/PersistedDocument";
import * as Pointer from "carbonldp/Pointer";
import * as RDF from "carbonldp/RDF";
import * as Response from "carbonldp/HTTP/Response";
import * as Utils from "carbonldp/Utils";

import Author from "app/blog/models/Author";
import * as Post from "app/blog/models/Post";
import * as PostService from "app/services/PostService";

@Injectable()
export default class CarbonPostService implements PostService.Class {
	private postsContainer:string = "posts/";

	constructor( private appContext:Context ) {}

	get( numberOfPosts:number, offset:number, orderBy:string, ascending:boolean ):Promise<Post.Class[]>;
	get( slug:string ):Promise<Post.Class>;
	get():Promise<Post.Class[]>;
	get( slugOrNumberOfPosts:any = null, offset:number = null, orderBy:string = null, ascending:boolean = null):Promise<any> {
		let slug:string = Utils.isString( slugOrNumberOfPosts ) ? slugOrNumberOfPosts : null;
		let numberOfPosts:number = Utils.isNumber( slugOrNumberOfPosts ) ? slugOrNumberOfPosts : null;

		if( slug !== null ) return this.getSingle( slug );
		if( slugOrNumberOfPosts === null ) return this.getAll();

		// TODO
	}

	create( post:Post.Class, slug:string = null ):Promise<Pointer.Class> {
		// TODO: Validate properties

		// TODO: Move this to a Factory?
		let postDocument:Document.Class & Post.Class = Document.Factory.createFrom( post );
		postDocument.types.push( Post.RDF_CLASS );
		
		let author:Fragment.Class & Author = postDocument.createFragment();
		author.name = "Pos yo!";
		postDocument.author = author;

		let promise:Promise<[ Pointer.Class, Response.Class ]>;
		if( slug === null ) {
			promise = this.appContext.documents.createChild( this.postsContainer, postDocument );
		} else {
			promise = this.appContext.documents.createChild( this.postsContainer, slug, postDocument );
		}

		let postPointer:Pointer.Class;
		return promise.then( ( [ pointer, response ]:[ Pointer.Class, Response.Class ] ) => {
			postPointer = pointer;

			let commentsAccessPoint:AccessPoint.Class = AccessPoint.Factory.create( postPointer, "http://example.com/ns#comments", "http://example.com/ns#post" );

			let promises:Promise<any>[] = [];
			promises.push( this.appContext.documents.createAccessPoint( commentsAccessPoint, "comments" ) );

			return Promise.all( promises );
		}).then( () => {
			return postPointer;
		});
	}

	private getSingle( slug:string ):Promise<Post.Class> {
		return this.appContext.documents.get( `${this.postsContainer}${slug}/` ).then( ( [ document, response ]:[ PersistedDocument.Class, Response.Class ] ) => {
			let post:Post.Class & PersistedDocument.Class = <any> document;
			this.assignSlug( post );

			return post;
		});
	}

	private getAll():Promise<Post.Class[]> {
		return this.appContext.documents.getMembers( this.postsContainer ).then( ( [ posts, response ]:[ Pointer.Class[], Response.Class ] ) => {
			// TODO: Fix getMembers
			posts = !! posts ? posts : [];
			return Pointer.Util.resolveAll( posts );
		}).then( ( [ posts, responses ]:[ PersistedDocument.Class[], Response.Class[] ] ) => {
			return <(Post.Class & PersistedDocument.Class)[]> ( !! posts ? posts : [] );
		}).then( ( posts:(Post.Class & PersistedDocument.Class)[] ) => {
			posts.forEach( ( post ) => this.assignSlug( post ) );
			posts.sort( ( postA:Post.Class, postB:Post.Class ) => {
				return postA.publishedOn > postB.publishedOn ? -1 : postA.publishedOn < postB.publishedOn ? 1 : 0;
			} );
			return posts;
		});
	}

	private assignSlug( post:Post.Class & Document.Class ):void {
		let slug:string = RDF.URI.Util.getSlug( post.id );
		slug = slug.endsWith( "/" ) ? slug.substring( 0, slug.length - 1 ) : slug;
		post.slug = slug;
	}
}
