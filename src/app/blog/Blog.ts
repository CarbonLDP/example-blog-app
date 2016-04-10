import { provide, Provider } from "angular2/core";

import PostBodyComponentBuilder from "./components/post-body/PostBodyComponentBuilder";

export const BLOG_PROVIDERS:Provider[] = [
	provide( PostBodyComponentBuilder, {
		useClass: PostBodyComponentBuilder,
	} ),
];
