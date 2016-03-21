import Author from "./Author";
import Comment from "./Comment";
import Like from "./Like";

export interface Post {
	slug:string;
	title:string;
	content:string;
	author:Author;
	publishedOn:Date;
	comments:Comment[];
	likes:Like[];
}

export default Post;
