import { Injectable } from "angular2/core";

import { Context } from "carbonldp/App";

import * as AuthService from "app/services/AuthService";

@Injectable()
export default class DummyAuthService implements AuthService.Class {
	private _authenticated = false;

	isAuthenticated():boolean {
		return this._authenticated;
	}

	login( username:string, password:string, rememberMe:boolean ):Promise<any> {
		// TODO: Return the correct error
		if( username !== "user" || password !== "pass" ) return Promise.reject( new Error() );

		this._authenticated = true;
		return Promise.resolve();
	}

	logout():void {
		this._authenticated = false;
	}
}
