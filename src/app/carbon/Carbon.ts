import {provide, Provider} from "angular2/core";
import {CanActivate} from "angular2/src/router/lifecycle/lifecycle_annotations_impl";
import {TypeDecorator, Class} from "angular2/src/core/util/decorators";
import {Router, ComponentInstruction} from "angular2/router";

import Cookies from "js-cookie";

import {appInjector} from "app/boot";

import Carbon from "carbonldp/Carbon";
import * as App from "carbonldp/App";
import Context from "carbonldp/Context";
import * as Token from "carbonldp/Auth/Token";

let carbon:Carbon = null;

export const AUTH_COOKIE:string = "carbon-token";

function authenticationCookieIsPresent():boolean {
	return typeof Cookies.get( AUTH_COOKIE ) !== "undefined";
}

function authenticateWithCookie( context:Context ):Promise<any> {
	let token:Token.Class;
	try {
		token = Cookies.getJSON( AUTH_COOKIE );
	} catch( error ) {
		return Promise.reject( error );
	}
	return context.auth.authenticateUsing( "TOKEN", token );
}

export const appContext:{ ():App.Context; promise?:Promise<void>, initialize?:( carbon:Carbon, appSlug?:string ) => Promise<void> } = ( ():{ ():App.Context; promise?:Promise<void> } => {
	let appContext:App.Context = null;

	let appContextFn:{ ():App.Context; promise?:Promise<void>, initialize?:( carbon:Carbon, appSlug?:string ) => Promise<void> } = ():App.Context => {
		if( appContext === null ) throw new Error( "The App Context hasn't been initialized" );
		return appContext;
	};
	appContextFn.promise = Promise.resolve();
	appContextFn.initialize = ( configuredCarbon:Carbon = new Carbon(), appSlug:string = null ):Promise<void> => {
		carbon = configuredCarbon;

		if( appSlug === null ) return appContextFn.promise;

		appContextFn.promise = carbon.apps.get( appSlug ).then( ( context:App.Context ) => {
			appContext = context;

			if( authenticationCookieIsPresent() ) {
				return authenticateWithCookie( appContext );
			}
		}).catch( ( error ) => {
			console.error( "Couldn't initialize carbon's app context" );
			console.error( error );
			return Promise.reject( error );
		});

		return appContextFn.promise;
	};

	return appContextFn;
})();

export const CARBON_PROVIDERS:Provider[] = [
	provide( Carbon, {
		useValue: carbon,
	} ),
	provide( App.Context, {
		useFactory: ():App.Context => {
			return appContext();
		},
	} ),
];

export abstract class AbstractSecurityAnnotation {
	private _evaluate:( next:ComponentInstruction, previous:ComponentInstruction ) => Promise<boolean> | boolean;
	get evaluate():( next:ComponentInstruction, previous:ComponentInstruction ) => Promise<boolean> | boolean {
		return this._evaluate;
	}
	set evaluate( evaluate:( next:ComponentInstruction, previous:ComponentInstruction ) => Promise<boolean> | boolean ) {
		this._evaluate = ( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean => {
			return appContext.promise.then( () => {
				return evaluate( next, previous );
			});
		};
	}

}

interface ChainableFn {
	( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean;
	evaluateFunctions?:Array<( next:ComponentInstruction, previous:ComponentInstruction ) => Promise<boolean> | boolean>;
}

class ChainableCanActivateAnnotation extends CanActivate {
	public fn:ChainableFn;

	constructor() {
		let fn:ChainableFn = ( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean => {
			let promises:Promise<boolean>[] = [];
			for( let evaluateFunction of fn.evaluateFunctions ) {
				let result:Promise<boolean> | boolean = evaluateFunction( next, previous );
				if( typeof result === "boolean" ) {
					promises.push( Promise.resolve( result ) );
				} else {
					promises.push( result );
				}
			}
			return Promise.all( promises ).then( ( results:boolean[] ) => {
				return results.reduce( ( previous, current ) => previous && current, true );
			});
		};
		fn.evaluateFunctions = [];
		super( fn );
	}
}

export function makeChainableDecorator( annotationCls:{ new( ...args:any[] ):AbstractSecurityAnnotation } ):( ...args:any[] ) => ( cls:any ) => any {
	function DecoratorFactory( objOrType ):( cls: any ) => any {
		let annotationInstance:AbstractSecurityAnnotation = new annotationCls( objOrType );

		if (this instanceof annotationCls) {
			return <any> annotationInstance;
		} else {
			let chainAnnotation = typeof this === "undefined" && this.annotations instanceof Array ? this.annotations : [];
			chainAnnotation.push(annotationInstance);

			let TypeDecorator: TypeDecorator = <TypeDecorator>function TypeDecorator( cls ) {
				let annotations = Reflect.getOwnMetadata( "annotations", cls );
				annotations = annotations || [];

				let chainableCanActivateAnnotation:ChainableCanActivateAnnotation = annotations.find( ( annotation ) => annotation instanceof ChainableCanActivateAnnotation );
				if( typeof chainableCanActivateAnnotation === "undefined" ) {
					chainableCanActivateAnnotation = new ChainableCanActivateAnnotation();
					annotations.push( chainableCanActivateAnnotation );
				}

				chainableCanActivateAnnotation.fn.evaluateFunctions.push( annotationInstance.evaluate );

				Reflect.defineMetadata( "annotations", annotations, cls );
				return cls;
			};

			TypeDecorator.annotations = chainAnnotation;
			TypeDecorator.Class = Class;

			return TypeDecorator;
		}
	}
	DecoratorFactory.prototype = Object.create( annotationCls.prototype );
	return DecoratorFactory;
}

class RequiresAppContextAnnotation extends AbstractSecurityAnnotation {
	constructor( options:{ redirectTo: any[] } ) {
		super();
		this.evaluate = function( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean {
			let router:Router = inject( Router );

			return appContext.promise.then( () => {
				return true;
			}).catch( ( error ) => {
				router.navigate( options.redirectTo );
				return false;
			});
		};
	}
}

function inject( token:any ):any {
	return appInjector().get( token );
}
export let RequiresAppContext: ( options:{ redirectTo: any[] } ) => ClassDecorator = makeChainableDecorator( RequiresAppContextAnnotation );
