import { provide, Provider } from "angular2/core";

import { Context } from "carbonldp/App";

import * as PostService from "./PostService";
import CarbonPostService from "./CarbonPostService";

import * as AuthService from "./AuthService";
import CarbonAuthService from "./CarbonAuthService";

export const CARBON_SERVICE_PROVIDERS:Provider[] = [
	provide( PostService.Token, {
		useClass: CarbonPostService,
	} ),
	provide( AuthService.Token, {
		useClass: CarbonAuthService,
	} ),
];
