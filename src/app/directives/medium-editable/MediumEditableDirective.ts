import {Directive, ElementRef, Input, Output, EventEmitter, SimpleChange} from "angular2/core";

import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css!";
import "medium-editor/dist/css/themes/beagle.css!";

@Directive( {
	selector: "[mediumEditable]",
} )
export default class MediumEditableDirective {
	@Input( "placeholder" ) placeholder:string;
	@Input( "mediumEditable" ) content:string;
	@Output( "mediumEditableChange" ) contentChange:EventEmitter<string> = new EventEmitter();

	editable:HTMLElement;
	editor:MediumEditor;

	private internallyChanged:boolean = false;
	private lastUpdates:string[] = [];

	constructor( private element:ElementRef ) {}

	ngAfterContentInit():void {
		this.editable = this.element.nativeElement;
		this.editor = new MediumEditor( this.editable, {
			disableReturn: true,
			disableExtraSpaces: true,
			placeholder: {
				text: this.placeholder,
			},
			toolbar: false,
		});

		this.editor.subscribe( "editableInput", ( event:Event, editable:HTMLElement ) => {
			if( this.internallyChanged ) {
				this.internallyChanged = false;
				return;
			}
			let lastUpdate:string = this.editable.innerHTML;
			this.contentChange.emit( lastUpdate );
			this.lastUpdates.push( lastUpdate );
		});

		if( this.content ) this.editor.setContent( this.content );
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
