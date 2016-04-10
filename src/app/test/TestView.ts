import { Component, ElementRef } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES } from "angular2/router";

import CodeMirror from "app/components/code-mirror/CodeMirrorComponent";

import template from "./template.html!";

@Component( {
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, CodeMirror ],
} )
export default class ErrorView {
	private $element:JQuery;

	constructor( private element:ElementRef ) {}

	ngAfterViewInit():void {
		this.$element = $( this.element.nativeElement );
	}
}
