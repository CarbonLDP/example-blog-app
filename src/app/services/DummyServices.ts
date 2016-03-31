import { provide, Provider } from "angular2/core";

import { AuthService } from "angular2-carbonldp/services";
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
