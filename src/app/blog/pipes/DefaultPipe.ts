import { Pipe, PipeTransform } from "angular2/core";

@Pipe( { name: "default" } )
export default class DefaultPipe implements PipeTransform {
	transform( value:string, args:any[] ):string {
		if( value !== null ) return value;
		if( args === null || args.length === 0 ) return "";
		return args[ 0 ];
	}
}
