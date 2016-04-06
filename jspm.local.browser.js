SystemJS.config({
	baseURL: "/example-blog-app/",
	paths: {
		"github:*": "jspm_packages/github/*",
		"npm:*": "jspm_packages/npm/*",
		"assets/": "src/assets/",
		"semantic-ui/": "src/assets/vendor/semantic-ui/components/",
		"app/": "src/app/",
		"carbonldp/": "src/../../CarbonLDP-JS-SDK/dist/"
	}
});
