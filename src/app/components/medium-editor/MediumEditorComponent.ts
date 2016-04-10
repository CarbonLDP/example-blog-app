import {Component, ElementRef, Input, Output, EventEmitter, SimpleChange} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css!";
import "medium-editor/dist/css/themes/beagle.css!";

import template from "./template.html!";
import style from "./style.css!text";

@Component( {
	selector: "medium-editor",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES ],
} )
export default class MediumEditorComponent {
	@Input() placeholder:string;
	@Input() content:string;
	@Output() contentChange:EventEmitter<string> = new EventEmitter();

	editable:HTMLElement;
	editor:MediumEditor;

	private internallyChanged:boolean = false;
	private lastUpdates:string[] = [];

	constructor( private element:ElementRef ) {}

	ngOnInit():void {
		this.editable = this.element.nativeElement.querySelector( ".editable" );
		this.editor = new MediumEditor( this.editable );

		let defaultContent:string = !! this.content ? this.content : "<p><br></p>";
		this.editor.setContent( defaultContent );
		this.editor.subscribe( "editableInput", ( event:Event, editable:HTMLElement ) => {
			if( this.internallyChanged ) {
				this.internallyChanged = false;
				return;
			}
			let lastUpdate:string = this.editable.innerHTML;
			this.contentChange.emit( lastUpdate );
			this.lastUpdates.push( lastUpdate );
		});
	}

	ngOnChanges( changeRecord:{ content?:SimpleChange } ):void {
		if( "content" in changeRecord && this.editable ) {
			if( this.lastUpdates.length > 0 && this.lastUpdates[ 0 ] === changeRecord.content.currentValue ) {
				this.lastUpdates.shift();
			} else {
				this.internallyChanged = true;
				this.lastUpdates = [];
				this.editor.setContent( changeRecord.content.currentValue );
			}
		}
	}
}
