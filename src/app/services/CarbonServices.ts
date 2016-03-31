import { provide, Provider } from "angular2/core";

import * as PostService from "./PostService";
import CarbonPostService from "./CarbonPostService";

export const SERVICE_PROVIDERS:Provider[] = [
	provide( PostService.Token, {
		useClass: CarbonPostService,
	} ),
];
