import {Component, ElementRef, Inject} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, ControlGroup, Control, Validators, FormBuilder} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

import {NotAuthenticated} from "angular2-carbonldp/decorators";

import LoginComponent from "app/blog/auth/login/LoginComponent";

import template from "./template.html!";
import style from "./style.css!";

@Component( {
	selector: ".l-content.l-expanded.l-columns",
	template: template,
	styles: [ style ],
	providers: [ FORM_PROVIDERS ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES, LoginComponent ],
} )
@NotAuthenticated( {
	redirectTo: [ "./Home" ],
} )
export default class AuthView {
	constructor( private element:ElementRef ) {

	}
}
