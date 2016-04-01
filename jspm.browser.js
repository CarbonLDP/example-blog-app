SystemJS.config({
  baseURL: "/",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "assets/": "src/assets/",
    "semantic-ui/": "src/assets/vendor/semantic-ui/components/",
    "app/": "src/app/"
  }
});
