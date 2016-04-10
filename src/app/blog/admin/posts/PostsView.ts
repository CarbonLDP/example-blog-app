import {Component, ElementRef, Inject} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";

import * as PostService from "app/services/PostService";

import ListView from "./list/ListView";
import CreateView from "./create/CreateView";

@Component( {
	selector: ".l-expanded.l-columns",
	template: `<router-outlet></router-outlet>`,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
} )
@RouteConfig( [
	{ path: "/", as: "List", component: ListView, useAsDefault: true },
	{ path: "/create", as: "Create", component: CreateView },
] )
export default class AdminView {
	constructor( private element:ElementRef, @Inject(PostService.Token) private postService:PostService.Class ) {

	}
}
