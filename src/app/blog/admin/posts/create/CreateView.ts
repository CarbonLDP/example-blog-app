import {Component, ElementRef, Inject, DynamicComponentLoader, Injector, ComponentRef, Type, EventEmitter} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {HtmlParseTreeResult} from "angular2/src/compiler/html_parser";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";

import "rxjs/add/operator/debounceTime";

import * as Pointer from "carbonldp/Pointer";

import Post from "app/blog/models/Post";
import * as PostService from "app/services/PostService";

import CodeMirror from "codemirror/lib/codemirror";
import CodeMirrorComponent from "app/components/code-mirror/CodeMirrorComponent";
import PostBodyComponentBuilder from "app/blog/components/post-body/PostBodyComponentBuilder";

import template from "./template.html!";
import style from "./style.css!text";

import previewStyle from "./preview.style.css!text";

@Component( {
	selector: "postsCreateView.l-expanded.l-rows",
	template: template,
	styles: [ style ],
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, CodeMirrorComponent ],
} )
export default class AdminView {

	slug:string = "";
	sending:boolean = false;

	title:string = "Here goes the title";
	content:string = `
			<div class="ui container center aligned padded-y grid">
				<div class="twelve wide computer fourteen wide tablet sixteen wide phone left aligned column">
					<h1>{{ title }}</h1>
					<p>And here goes the content</p>
				</div>
			</div>
	`;
	style:string = "";

	contentCodeMirror:CodeMirror;

	activeTab:string = "content";

	private imageTypes:string[] = [
		"image/gif",
		"image/png",
		"image/jpeg",
	];
	private refreshPreviewEmitter:EventEmitter<any> = new EventEmitter();

	constructor( private element:ElementRef,
	             private router:Router,
	             @Inject( PostService.Token ) private postService:PostService.Class,
	             private postBodyComponentBuilder:PostBodyComponentBuilder,
	             private dynamicComponentLoader:DynamicComponentLoader,
	             private injector:Injector ) {}

	ngAfterContentInit():void {
		this.registerRefreshPreviewListener();
		this.refreshPreviewEmitter.emit( null );
	}

	titleChanged( title:string ):void {
		this.title = title;
		this.refreshPreviewEmitter.emit( null );
		this.generateSlug( title );
	}

	onTitleChange( title:string ):void {
		this.title = title;
		this.refreshPreviewEmitter.emit( null );
	}

	onContentChange( content:string ):void {
		this.content = content;
		this.refreshPreviewEmitter.emit( null );
	}

	onStyleChange( style:string ):void {
		this.style = style;
		this.refreshPreviewEmitter.emit( null );
	}

	onFileDrop( event:DragEvent ):void {
		if( event.preventDefault ) event.preventDefault();

		let dataTransfer:DataTransfer = event.dataTransfer;
		if( dataTransfer === null ) return;
		if( ! ( "files" in dataTransfer ) ) return;

		let fileList:FileList = dataTransfer.files;
		if( fileList.length === 0 ) return;
		if( fileList.length > 1 ) {
			console.warn( "Multiple file uploads are currently not supported" );
			return;
		}

		for( let i:number = 0, length = fileList.length; i < length; i++ ) {
			let file:File = fileList[ i ];

			if( this.imageTypes.indexOf( file.type ) === -1 ) {
				console.warn( "Non image files are currently not supported" );
			}

			let fileReader:FileReader = new FileReader();
			fileReader.onloadend = ( event:ProgressEvent ) => {
				let result:string = fileReader.result;
				if( this.contentCodeMirror.somethingSelected() ) {

				} else {
					let cursorPosition:any = this.contentCodeMirror.getCursor();
					this.contentCodeMirror.replaceRange( `<img src="${result}">`, cursorPosition );
					this.refreshPreviewEmitter.emit( null );
				}
			};
			fileReader.readAsDataURL( file );
		}
	}

	cancelEvent( event:Event ):boolean {
		if( event.preventDefault ) event.preventDefault();
		return false;
	}

	onSubmit( data:any ):void {
		this.sending = true;
		if ( ! this.formIsValid() ) {
			this.sending = false;
			// TODO: Add visual feedback
			return;
		}

		let post:Post = {
			title: this.title,
			content: this.content,
			publishedOn: new Date(),
		};

		this.postService.create( post, this.slug ).then( ( postPointer:Pointer.Class ) => {
			this.sending = false;
			this.router.navigate( [ "List" ] );
		} ).catch( ( error ) => {
			console.error( error );
			this.sending = false;
		} );
	}

	formIsValid():boolean {
		if ( ! this.title || ! this.title.trim() ) return false;
		if ( ! this.content || ! this.content.trim() ) return false;
		return true;
	}

	private registerRefreshPreviewListener():void {
		this.refreshPreviewEmitter.asObservable().debounceTime( 500 ).subscribe( this.refreshPreview.bind( this ) );
	}

	private refreshPreview():void {
		let content:string = this.content;
		let style:string = this.style;
		let styles:string[] = [ previewStyle, style ];

		let postBodyComponent:Type;
		try {
			postBodyComponent = this.postBodyComponentBuilder.build( this.title, content, styles );
		} catch ( error ) {
			// TODO: Handle error
			let rootNodesAndErrors:HtmlParseTreeResult;
			console.log( "Error parsing post content" );
			return;
		}

		this.dynamicComponentLoader.loadAsRoot( postBodyComponent, ".previewPanel", this.injector ).then( ( componentRef:ComponentRef ) => {
			componentRef.hostView.changeDetectorRef.detectChanges();
		} ).catch( ( error ) => {
			console.error( "Error loading component" );
			console.error( error );
		} );
	}

	private generateSlug( title:string ):void {
		this.slug = this.slugify( title );
	}

	private slugify( value:string ):string {
		return value.toLowerCase()
			.replace( /[^\w\s-]/g, '' ) // Remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
			.replace( /[\s_-]+/g, '-' ) // Swap any length of whitespace, underscore, hyphen characters with a single -
			.replace( /^-+|-+$/g, '' ); // Remove leading, trailing -
	}
}
