import { provide, Provider } from "angular2/core";

import * as AuthService from "./AuthService";
import DummyAuthService from "./DummyAuthService";

import * as PostService from "./PostService";
import DummyPostService from "./DummyPostService";

export const DUMMY_SERVICE_PROVIDERS:Provider[] = [
	provide( AuthService.Token, {
		useClass: DummyAuthService,
	} ),
	provide( PostService.Token, {
		useClass: DummyPostService,
	} ),
];
