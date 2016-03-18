import {Component, ElementRef, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";
import Post from "app/models/Post";
import template from "./template.html!";
import style from "./style.css!";

import PostExcerptPipe from "app/pipes/PostExcerptPipe";
import PostResponsesPipe from "app/pipes/PostResponsesPipe";

@Component( {
	selector: "post-tile",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
	pipes: [ PostExcerptPipe, PostResponsesPipe ],
} )
export default class PostTileComponent {
	@Input() post:Post;

	constructor( private element:ElementRef ) {

	}
}
