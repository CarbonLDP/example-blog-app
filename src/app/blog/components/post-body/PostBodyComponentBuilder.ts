import {Component, Injectable, ViewEncapsulation, Type} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {HtmlParser, HtmlParseTreeResult} from "angular2/src/compiler/html_parser";

import CodeMirrorComponent from "app/components/code-mirror/CodeMirrorComponent";

import defaultStyle from "./style.css!text";

@Injectable()
export default class PostBodyComponentBuilder {
	constructor( private htmlParser:HtmlParser ) {}

	build( title?:string, content?:string, style?:string ):Type
	build( title?:string, content?:string, styles?:string[] ):Type
	build( title:string = "", content:string = "", styleOrStyles:any = "" ):Type {
		let styles:string[] = Array.isArray( styleOrStyles ) ? styleOrStyles : [ styleOrStyles ];
		styles = [ defaultStyle ].concat( styles );

		let rootNodesAndErrors:HtmlParseTreeResult;
		rootNodesAndErrors = this.htmlParser.parse( content, "" );

		if ( rootNodesAndErrors.errors.length > 0 ) {
			throw rootNodesAndErrors.errors;
		}

		@Component( {
			template: content,
			styles: styles,
			encapsulation: ViewEncapsulation.Emulated,
			directives: [ CORE_DIRECTIVES, CodeMirrorComponent ],
		} )
		class PostBodyComponent {
			title:string = title;
		}

		return PostBodyComponent;
	}
}
