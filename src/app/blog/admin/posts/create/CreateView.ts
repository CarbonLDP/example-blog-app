import {Component, ElementRef, Inject, EventEmitter} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, ControlGroup, Control, Validators, FormBuilder} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

import Post from "app/models/Post";
import * as PostService from "app/services/PostService";

import template from "./template.html!";

@Component( {
	selector: "admin",
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
} )
export default class AdminView {

	form:ControlGroup;
	controls:{ [ name:string ]:Control } = {
		title: null,
		content: null,
	};

	slug:string = "";

	constructor( private element:ElementRef, @Inject( PostService.Token ) private postService:PostService.Class, private formBuilder:FormBuilder ) {
		this.controls[ "title" ] = new Control( "", Validators.required );
		this.controls[ "content" ] = new Control( "", Validators.required );

		this.form = this.formBuilder.group( this.controls );

		// this.controls[ "content" ].valueChanges
	}

	onTitleChange( event:Event ):void {
		console.log( "%o", this.controls[ "title" ] );
	}
}
