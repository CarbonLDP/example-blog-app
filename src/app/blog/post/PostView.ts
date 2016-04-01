import {Component, ElementRef} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";
import Post from "app/blog/models/Post";
import PostTileComponent from "app/blog/post-tile/PostTileComponent";

import template from "./template.html!";

@Component( {
	selector: "app",
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, PostTileComponent ],
} )
export default class HomeView {
	post:Post;

	constructor( private element:ElementRef, private routeParams:RouteParams ) {

	}

	routerOnActivate():void {
		// this.routeParams.get( "slug" );
	}
}
