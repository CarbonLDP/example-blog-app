import {Component, ElementRef, Inject} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, ControlGroup, Control, Validators, FormBuilder} from "angular2/common";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";

import {AuthService} from "angular2-carbonldp/services";

import * as Errors from "carbonldp/HTTP/Errors";

import $ from "jquery";

import template from "./template.html!";

@Component( {
	selector: "login-form",
	template: template,
	providers: [ FORM_PROVIDERS ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES ],
} )
export default class LoginComponent {

	form:ControlGroup;
	controls:{ [ name:string ]:Control } = {
		username: null,
		password: null,
	};

	sending:boolean = false;

	private $form:JQuery;

	constructor( private element:ElementRef, @Inject(AuthService.Token) private authService:AuthService.Class, private formBuilder:FormBuilder, private router:Router ) {}

	ngAfterContentInit():void {
		this.$form = $( this.element.nativeElement ).children( ".ui.form" );

		this.controls[ "username" ] = new Control( "", Validators.required );
		this.controls[ "password" ] = new Control( "", Validators.required );
		this.controls[ "rememberMe" ] = new Control( true );

		this.form = this.formBuilder.group( this.controls );
	}

	onLogin( data:any ):void {
		this.sending = true;
		if( ! this.form.valid ) {
			this.sending = false;
			// TODO: Add visual feedback
			return;
		}

		this.authService.login( data.username, data.password, !! data.rememberMe ).then( () => {
			this.sending = false;
			this.router.navigate( [ "/Blog" ] );
		}).catch( ( error ) => {
			if( error instanceof Errors.UnauthorizedError ) {
				this.$form.transition( {
					animation: "shake",
					onComplete: () => {
						this.sending = false;
					}
				});
			} else {
				this.sending = false;
				console.error( error );
			}
		});
	}
}
