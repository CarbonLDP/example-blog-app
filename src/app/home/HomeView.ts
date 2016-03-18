import {Component, ElementRef} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";
import Post from "app/models/Post";
import PostTileComponent from "app/post-tile/PostTileComponent";
import template from "./template.html!";
import style from "./style.css!";

@Component( {
	selector: "app",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, PostTileComponent ],
} )
export default class HomeView {
	posts:Post[] = [
		{
			slug: "example-post",
			title: "Example Post",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: new Date(),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post",
			title: "Example Post",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: new Date(),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post",
			title: "Example Post",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: new Date(),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post",
			title: "Example Post",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: new Date(),
			comments: [],
			likes: [],
		},
		{
			slug: "example-post",
			title: "Example Post",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non hendrerit nisl. Nulla ornare aliquam cursus. Phasellus interdum enim a risus consectetur pellentesque. Duis non felis a odio aliquet egestas nec et quam. Curabitur vitae gravida odio, a congue ligula. ",
			author: {
				name: "John Smith"
			},
			publishedOn: new Date(),
			comments: [],
			likes: [],
		}
	];

	constructor( private element:ElementRef ) {

	}
}
