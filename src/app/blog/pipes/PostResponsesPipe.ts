import { Pipe, PipeTransform } from "angular2/core";

@Pipe( { name: "responses" } )
export default class PostResponsesPipe implements PipeTransform {
	transform( value:number, args:any[] ):string {
		if( value === 0 || value > 1 ) return `${value} responses`;
		else return `1 response`;
	}
}