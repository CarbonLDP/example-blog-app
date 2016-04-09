import {Component, ElementRef, Inject} from "angular2/core";
import {CORE_DIRECTIVES, ControlGroup, Control, Validators, FormBuilder} from "angular2/common";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";

import * as Document from "carbonldp/Document";
import * as Pointer from "carbonldp/Pointer";

import MediumEditorComponent from "app/components/medium-editor/MediumEditorComponent";
import MediumEditableDirective from "app/directives/medium-editable/MediumEditableDirective";

import Post from "app/blog/models/Post";
import * as PostService from "app/services/PostService";

import template from "./template.html!";

@Component( {
	selector: "admin",
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, MediumEditableDirective, MediumEditorComponent ],
} )
export default class AdminView {

	form:ControlGroup;
	controls:{ [ name:string ]:Control } = {};

	slug:string = "";
	sending:boolean = false;

	title:string = "";
	content:string;

	constructor( private element:ElementRef, private router:Router, @Inject( PostService.Token ) private postService:PostService.Class, private formBuilder:FormBuilder ) {
		this.form = this.formBuilder.group( this.controls );
	}

	titleChanged( title:string ):void {
		this.title = title;
		this.generateSlug( title );
	}

	onSubmit( data:any ):void {
		this.sending = true;
		if( ! this.formIsValid() ) {
			this.sending = false;
			// TODO: Add visual feedback
			return;
		}

		let post:Post = {
			title: this.title,
			content: this.content,
			publishedOn: new Date(),
		};

		this.postService.create( post, this.slug ).then( ( postPointer:Pointer.Class) => {
			this.sending = false;
			this.router.navigate( [ "List" ] );
		}).catch( ( error ) => {
			console.error( error );
			this.sending = false;
		});
	}

	formIsValid():boolean {
		if( ! this.title || ! this.title.trim() ) return false;
		if( ! this.content || ! this.content.trim() ) return false;
		return true;
	}

	private generateSlug( title:string ):void {
		this.slug = this.slugify( title );
	}

	private slugify( value:string ):string {
		return value.toLowerCase()
			.replace(/[^\w\s-]/g, '') // Remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
			.replace(/[\s_-]+/g, '-') // Swap any length of whitespace, underscore, hyphen characters with a single -
			.replace(/^-+|-+$/g, ''); // Remove leading, trailing -
	}
}
