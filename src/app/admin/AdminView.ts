import {Component, ElementRef} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";
import Post from "app/models/Post";

import template from "./template.html!";

@Component( {
	selector: "admin",
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
} )
export default class AdminView {

	constructor( private element:ElementRef ) {

	}
}
