import {Component, ElementRef} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";

import {RequiresAppContext} from "app/carbon/Carbon";
import { Authenticated } from "app/blog/auth/Auth";

import PostsView from "app/blog/admin/posts/PostsView";

import Post from "app/blog/models/Post";

import template from "./template.html!";
import style from "./style.css!";

@Authenticated({
	redirectTo: [ "/Blog" ]
} )
@Component( {
	selector: "admin",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
} )
@RouteConfig( [
	{ path: "/", redirectTo: [ "./Posts" ], useAsDefault: true },
	{ path: "/posts", as: "Posts", component: PostsView },
] )
export default class AdminView {

	constructor( private element:ElementRef ) {

	}
}