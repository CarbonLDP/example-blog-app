import { Component, ElementRef, ViewEncapsulation, Inject } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES, RouteConfig } from "angular2/router";

import { RequiresActiveContext } from "angular2-carbonldp/decorators";

import { AuthService } from "angular2-carbonldp/services";

import HomeView from "app/blog/home/HomeView";
import PostView from "app/blog/post/PostView";

import AuthView from "app/blog/auth/AuthView";

import AdminView from "app/blog/admin/AdminView";

import $ from "jquery";
import "semantic-ui/transition";
import "semantic-ui/dropdown";

import template from "./template.html!";
import style from "./style.css!text";

@RequiresActiveContext({
	redirectTo: [ "/Blog" ]
})
@Component( {
	selector: "blog",
	template: template,
	styles: [ style ],
	encapsulation: ViewEncapsulation.None,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
} )
@RouteConfig( [
	{ path: "", as: "Home", component: HomeView, useAsDefault: true },

	{ path: "post/:slug", as: "Post", component: PostView },

	{ path: "auth", as: "Auth", component: AuthView },

	{ path: "admin/...", as: "Admin", component: AdminView },
] )
export default class BlogView {
	private $element:JQuery;
	private $userDropdown:JQuery;

	constructor( private element:ElementRef, @Inject( AuthService.Token ) private authService:AuthService.Class ) {}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );

		if( this.authService.isAuthenticated() ) this.initializeDropdowns();
		this.authService.authChangedEmitter.subscribe( () => {
			if( this.authService.isAuthenticated() ) this.initializeDropdowns();
		});
	}

	initializeDropdowns():void {
		this.$element.find( ".ui.dropdown" ).dropdown();
	}

	logout():void {
		this.authService.logout();
	}
}
