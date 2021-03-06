import { Component } from "angular2/core";
import { ROUTER_DIRECTIVES, RouteConfig } from "angular2/router";

import TestView from "app/test/TestView";
import ErrorView from "app/error/ErrorView";
import BlogView from "app/blog/BlogView";

@Component( {
	selector: "app",
	template: `<router-outlet></router-outlet>`,
	directives: [ ROUTER_DIRECTIVES ],
} )
@RouteConfig( [
	{ path: "test", as: "Test", component: TestView },
	{ path: "error", as: "Error", component: ErrorView },
	{ path: "...", as: "Blog", component: BlogView },
] )
export default class AppComponent {

}
