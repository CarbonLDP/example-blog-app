import {CanActivate} from "angular2/src/router/lifecycle/lifecycle_annotations_impl";
import {makeDecorator} from "angular2/src/core/util/decorators";
import {Router, ComponentInstruction} from "angular2/router";

import { makeChainableDecorator, AbstractSecurityAnnotation } from "app/carbon/Carbon";

import * as AuthService from "app/services/AuthService";

import {appInjector} from "app/boot";

// class NotAuthenticatedAnnotation extends CanActivate {
// 	constructor( options:{ redirectTo: any[] } ) {
// 		let evaluationFn:( next:ComponentInstruction, previous:ComponentInstruction ) => Promise<boolean> | boolean = function( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean {
// 			let authService:AuthService.Class = inject( AuthService.Token );
// 			let router:Router = inject( Router );
//
// 			let isAuthenticated:boolean = authService.isAuthenticated();
// 			if( isAuthenticated && previous === null ) router.navigate( options.redirectTo );
//
// 			return ! isAuthenticated;
// 		};
//
// 		super( evaluationFn );
// 	}
// }

class NotAuthenticatedAnnotation extends AbstractSecurityAnnotation {
	constructor( options:{ redirectTo: any[] } ) {
		super();
		this.evaluate = function( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean {
			let authService:AuthService.Class = inject( AuthService.Token );
			let router:Router = inject( Router );

			let isAuthenticated:boolean = authService.isAuthenticated();
			if( isAuthenticated && previous === null ) router.navigate( options.redirectTo );

			return ! isAuthenticated;
		};
	}
}

class AuthenticatedAnnotation extends AbstractSecurityAnnotation {
	constructor( options:{ redirectTo: any[] } ) {
		super();
		this.evaluate = function( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean {
			let authService:AuthService.Class = inject( AuthService.Token );
			let router:Router = inject( Router );

			let isAuthenticated:boolean = authService.isAuthenticated();
			if( ! isAuthenticated && previous === null ) router.navigate( options.redirectTo );

			return isAuthenticated;
		};
	}
}

function inject( token:any ):any {
	return appInjector().get( token );
}

export let NotAuthenticated: ( options:{ redirectTo: any[] } ) => ClassDecorator = makeChainableDecorator( NotAuthenticatedAnnotation );
export let Authenticated: ( options:{ redirectTo: any[] } ) => ClassDecorator = makeChainableDecorator( AuthenticatedAnnotation );
