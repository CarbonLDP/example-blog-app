interface MediumEditorToolbarOptions {
	allowMultiParagraphSelection?:boolean;
	buttons?:string[];
	diffLeft?:number;
	diffTop?:number;
	firstButtonClass?:string;
	lastButtonClass?:string;
	standardizeSelectionStart?:boolean;
	static?:boolean;

	align?:"left" | "center" | "right";
	sticky?:boolean;
	stickyTopOffset?:number;
	updateOnEmptySelection?:boolean;
}

interface MediumEditorAnchorPreviewOptions {
	hideDelay?:number;
	previewValueSelector?:string;
	showWhenToolbarIsVisible?:boolean;
}

interface MediumEditorPlaceholderOptions {
	text?:string;
	hideOnClick?:boolean;
}

interface MediumEditorAnchorFormOptions {
	customClassOption?:string;
	customClassOptionText?:string;
	linkValidation?:boolean;
	placeholderText?:string;
	targetCheckbox?:boolean;
	targetCheckboxText?:string;
}

interface MediumEditorPasteOptions {
	forcePlainText?:boolean;
	cleanPastedHTML?:boolean;
	cleanReplacements?:[ RegExp, string ][];
	cleanAttrs?:string[];
	cleanTags?:string[];
}

interface MediumEditorKeyboardCommand {
	command:string;
	key:string;
	meta:boolean;
	shift:boolean;
}

interface MediumEditorKeyboardCommands {
	commands?:MediumEditorKeyboardCommand[];
}

interface MediumEditorOptions {
	activeButtonClass?:string;
	buttonLabels?:boolean;
	contentWindow?:Node;
	delay?:number;
	disableReturn?:boolean;
	disableDoubleReturn?:boolean;
	disableExtraSpaces?:boolean;
	disableEditing?:boolean;
	elementsContainer?:Node;
	extensions?:Object;
	ownerDocument?:Node;
	spellcheck?:boolean;
	targetBlank?:boolean;
	toolbar?:boolean | MediumEditorToolbarOptions;
	anchorPreview?:boolean | MediumEditorAnchorPreviewOptions;
	placeholder?:boolean | MediumEditorPlaceholderOptions;
	anchor?:boolean | MediumEditorAnchorFormOptions;
	paste?:MediumEditorPasteOptions;
	keyboardCommands?:boolean | MediumEditorKeyboardCommands;
	autoLink?:boolean;
	imageDragging?:boolean;
}

interface MediumEditorSelectionState {

}

declare module "medium-editor" {
	export default class {
		constructor( element:HTMLElement[], options?:MediumEditorOptions );
		constructor( element:HTMLElement, options?:MediumEditorOptions );
		constructor( selector:string, options?:MediumEditorOptions );

		destroy():void;
		setup():void;

		on( target:HTMLElement, event:string, listener:( event:Event ) => void, useCapture:boolean ):void;
		off( target:HTMLElement, event:string, listener:( event:Event ) => void, useCapture:boolean ):void;
		subscribe( name:string, listener:( data:Event | Object, editable:HTMLElement ) => void ):void;
		unsubscribe( name:string, listener:( data:Event | Object, editable:HTMLElement ) => void ):void;

		trigger( name:string, data:Event | Object, editable:HTMLElement );

		checkSelection():void;
		exportSelection():MediumEditorSelectionState;
		importSelection( selectionState:MediumEditorSelectionState, favorLaterSelectionAnchor:boolean ):void;
		getfocusedElement():HTMLElement;
		getSelectedParentElement( range:any ):HTMLElement;
		restoreSelection():void;
		saveSelection():void;
		selectlAllContents():void;
		selectElement( element:HTMLElement ):void;
		stopSelectionUpdates():void;
		startSelectionUpdates():void;
		cleanPaste( text:string ):void;

		// TODO: Define options type
		createLink( options:any ):void;
		execAction( action:string, options:any ):void;
		pasteHTML( html:string, options:any ):void;
		queryCommandState( action:string ):void;

		delay( fn:( ...args:any[] ) => any ):void;
		getExtensionByName( name:string ):Object;
		serialize():string;
		setContent( html:string, index?:number ):void;
	}
}
