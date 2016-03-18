import {Component, ElementRef} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

import {NotAuthenticated} from "app/auth/Auth";

import Post from "app/models/Post";
import PostTileComponent from "app/post-tile/PostTileComponent";

import template from "./template.html!";

@Component( {
	selector: "app",
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, PostTileComponent ],
} )
@NotAuthenticated( {
	redirectTo: [ "/Home" ],
} )
export default class AuthView {
	post:Post;

	constructor( private element:ElementRef ) {

	}
}
