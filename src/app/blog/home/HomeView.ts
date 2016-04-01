import {Component, ElementRef, Inject} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

import Post from "app/blog/models/Post";
import * as PostService from "app/services/PostService";

import PostTileComponent from "app/blog/post-tile/PostTileComponent";

import template from "./template.html!";
import style from "./style.css!";

@Component( {
	selector: "app",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, PostTileComponent ],
} )
export default class HomeView {
	posts:Post[] = [];
	constructor( private element:ElementRef, @Inject(PostService.Token) private postService:PostService.Class ) {

	} 

	ngOnInit():void {
		this.postService.get().then( ( posts:Post[] ) => {
			this.posts = posts;
		});
	}
}
