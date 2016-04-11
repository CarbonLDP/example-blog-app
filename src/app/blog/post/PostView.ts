import {Component, ElementRef, ComponentRef, Inject, ViewEncapsulation, Injector, DynamicComponentLoader, Type} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";

import Post from "app/blog/models/Post";
import * as PostService from "app/services/PostService";
import PostBodyComponentBuilder from "app/blog/components/post-body/PostBodyComponentBuilder";

import PostTileComponent from "app/blog/post-tile/PostTileComponent";

import DefaultPipe from "app/blog/pipes/DefaultPipe";

import template from "./template.html!";
import style from "./style.css!text";

@Component( {
	selector: "app",
	template: template,
	styles: [ style ],
	pipes: [ DefaultPipe ],
	encapsulation: ViewEncapsulation.None,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, PostTileComponent ],
} )
export default class HomeView {
	post:Post;

	constructor( private element:ElementRef,
	             private routeParams:RouteParams,
	             @Inject( PostService.Token ) private postService:PostService.Class,
	             private postBodyComponentBuilder:PostBodyComponentBuilder,
	             private dynamicComponentLoader:DynamicComponentLoader,
	             private injector:Injector ) {

	}

	routerOnActivate():void {
		let slug:string = this.routeParams.get( "slug" );
		this.postService.get( slug ).then( ( post:Post ) => {
			let postBodyComponent:Type = this.postBodyComponentBuilder.build( post.title, post.content, post.style );
			this.dynamicComponentLoader.loadAsRoot( postBodyComponent, ".post-content", this.injector ).then( ( componentRef:ComponentRef) => {
				componentRef.hostView.changeDetectorRef.detectChanges();
				this.post = post;
			});
		} ).catch( ( error ) => {
			// TODO: Handle error
			console.error( "Couldn't load post" );
			console.error( error );
		} );
	}
}
