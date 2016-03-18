import { Pipe, PipeTransform } from "angular2/core";

@Pipe( { name: "excerpt" } )
export default class PostExcerptPipe implements PipeTransform {
	transform( value:string, args:any[] ):string {
		// TODO: Get only one portion of the post
		return value;
	}
}