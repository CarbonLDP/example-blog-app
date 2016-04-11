import Author from "./Author";
import Comment from "./Comment";
import Like from "./Like";

export const RDF_CLASS:string = "http://example.com/ns#Post";


export interface Class {
	slug?:string;
	title?:string;
	style?:string;
	content?:string;
	author?:Author;
	publishedOn?:Date;
	comments?:Comment[];
	likes?:Like[];
}

export default Class;
