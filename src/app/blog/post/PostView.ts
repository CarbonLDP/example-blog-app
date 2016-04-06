import {Component, ElementRef, Inject} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";

import Post from "app/blog/models/Post";
import * as PostService from "app/services/PostService";

import PostTileComponent from "app/blog/post-tile/PostTileComponent";

import DefaultPipe from "app/blog/pipes/DefaultPipe";

import template from "./template.html!";
import style from "./style.css!";

@Component( {
	selector: "app",
	template: template,
	styles: [ style ],
	pipes: [ DefaultPipe ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, PostTileComponent ],
} )
export default class HomeView {
	post:Post;

	constructor( private element:ElementRef, private routeParams:RouteParams, @Inject( PostService.Token ) private postService:PostService.Class ) {

	}

	routerOnActivate():void {
		let slug:string = this.routeParams.get( "slug" );
		this.postService.get( slug ).then( ( post:Post ) => {
			this.post = post;
		});
	}
}
