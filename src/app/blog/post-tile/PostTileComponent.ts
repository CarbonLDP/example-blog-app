import {Component, ElementRef, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

import Post from "app/blog/models/Post";

import DefaultPipe from "app/blog/pipes/DefaultPipe";
import PostExcerptPipe from "app/blog/pipes/PostExcerptPipe";
import PostResponsesPipe from "app/blog/pipes/PostResponsesPipe";

import template from "./template.html!";
import style from "./style.css!text";



@Component( {
	selector: "post-tile",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
	pipes: [ DefaultPipe, PostExcerptPipe, PostResponsesPipe ],
} )
export default class PostTileComponent {
	@Input() post:Post;

	constructor( private element:ElementRef ) {

	}
}
