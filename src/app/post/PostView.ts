import {Component, ElementRef} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";
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
	post:Post;

	constructor( private element:ElementRef, private routeParams:RouteParams ) {

	}

	routerOnActivate():void {
		// this.routeParams.get( "slug" );
	}
}
