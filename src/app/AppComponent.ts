import { Component, ViewEncapsulation } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES, RouteConfig } from "angular2/router";

import HomeView from "app/home/HomeView";
import PostView from "app/post/PostView";

import AuthView from "app/auth/AuthView";

import template from "./template.html!";
import style from "./style.css!";

@Component( {
	selector: "app",
	template: template,
	styles: [ style ],
	encapsulation: ViewEncapsulation.None,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ]
} )

@RouteConfig( [
	{ path: "", redirectTo: [ "./Home" ] },

	{ path: "/home", as: "Home", component: HomeView },
	{ path: "/post/:slug", as: "Post", component: PostView },

	{ path: "/auth", as: "Auth", component: AuthView },
] )
export default class AppComponent {
	constructor() {

	}
}
