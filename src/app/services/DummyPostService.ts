import { Injectable } from "angular2/core";

import Post from "app/blog/models/Post";

function getDate( daysAgo:number ):Date {
	let date:Date = new Date();
	date.setDate( date.getDate() - daysAgo );
	return date;
}

@Injectable()
export default class DummyPostService {
	constructor() {}

	private _posts:Post[] = [
		{
			slug: "example-post-0",
			title: "Example Post-0",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 0 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-1",
			title: "Example Post-1",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 1 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-2",
			title: "Example Post-2",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 2 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-3",
			title: "Example Post-3",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 3 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-4",
			title: "Example Post-4",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 4 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-5",
			title: "Example Post-5",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 5 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-6",
			title: "Example Post-6",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 6 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-7",
			title: "Example Post-7",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 7 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-8",
			title: "Example Post-8",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 8 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-9",
			title: "Example Post-9",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 9 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-10",
			title: "Example Post-10",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 10 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-11",
			title: "Example Post-11",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 11 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-12",
			title: "Example Post-12",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 12 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-13",
			title: "Example Post-13",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 13 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-14",
			title: "Example Post-14",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 14 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-15",
			title: "Example Post-15",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 15 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-16",
			title: "Example Post-16",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 16 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-17",
			title: "Example Post-17",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 17 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-18",
			title: "Example Post-18",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 18 ),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post-19",
			title: "Example Post-19",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: getDate( 19 ),
			comments: [],
			likes: [],
		},
	];

	get( numberOfPosts:number, offset:number, orderBy:string, ascending:boolean ):Promise<Post[]>;
	get( slug:string ):Promise<Post>;
	get():Promise<Post[]>;
	get( slugOrNumberOfPosts:any = null, offset:number = null, orderBy:string = null, ascending:boolean = null ):Promise<any> {
		let slug:string = typeof slugOrNumberOfPosts === "string" ? slugOrNumberOfPosts : null;
		let numberOfPosts = typeof slugOrNumberOfPosts !== "string" ? slugOrNumberOfPosts : null;

		if( slug !== null ) return this.getSingle( slug );
		if( numberOfPosts === null ) return this.getAll();
	}

	create( post:Post, slug:string = null ):Promise<Pointer.Class> {

	}

	private getSingle( slug:string ):Promise<Post> {
		let post:Post = this._posts.find( ( post ) => post.slug === slug );
		if( typeof post === "undefined" ) {
			return Promise.reject<Post>( new Error( "Post not found" ) );
		} else {
			return Promise.resolve( post );
		}
	}

	private getAll():Promise<Post[]> {
		return Promise.resolve( this._posts.slice() );
	}
}
