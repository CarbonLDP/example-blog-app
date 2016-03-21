import { Injectable } from "angular2/core";

import Cookies from "js-cookie";

import { Context } from "carbonldp/App";
import Credentials from "carbonldp/Auth/Credentials";

import { AUTH_COOKIE } from "app/carbon/Carbon";

import * as AuthService from "app/services/AuthService";

@Injectable()
export default class CarbonAuthService implements AuthService.Class {
	constructor( private context:Context ) {}

	isAuthenticated():boolean {
		return this.context.auth.isAuthenticated();
	}

	login( username:string, password:string, rememberMe:boolean ):Promise<any> {
		// TODO: Add rememberMe mechanism
		return this.context.auth.authenticate( username, password ).then( ( credentials:Credentials ) => {
			if( rememberMe ) {
				Cookies.set( AUTH_COOKIE, credentials );
			}
			return credentials;
		});
	}

	logout():void {
		Cookies.remove( AUTH_COOKIE );
		return this.context.auth.clearAuthentication();
	}
}
