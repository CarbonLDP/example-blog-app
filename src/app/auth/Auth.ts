import {Injector} from "angular2/core";
import {CanActivate} from "angular2/src/router/lifecycle/lifecycle_annotations_impl";
import {makeDecorator} from "angular2/src/core/util/decorators";
import {Router, ComponentInstruction} from "angular2/router";

import * as App from "carbonldp/App";

import {appInjector} from "app/boot";

class NotAuthenticatedAnnotation extends CanActivate {
	constructor( options:{ redirectTo: any[] } ) {
		let evaluationFn:( next:ComponentInstruction, previous:ComponentInstruction ) => Promise<boolean> | boolean = function( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean {
			let injector:Injector = appInjector();
			let appContext:App.Context = injector.get( App.Context );
			let router:Router = injector.get( Router );

			if( previous === null ) router.navigate( options.redirectTo );

			return ! appContext.auth.isAuthenticated();
		};

		super( evaluationFn );
	}
}

export let NotAuthenticated: ( options:{ redirectTo: any[] } ) => ClassDecorator = makeDecorator( NotAuthenticatedAnnotation );
