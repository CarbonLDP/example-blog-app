import "zone.js";
import "reflect-metadata";

import { bootstrap } from "angular2/platform/browser";
import { provide, Provider, ComponentRef } from "angular2/core";
import { FORM_PROVIDERS } from "angular2/common";
import { ROUTER_PROVIDERS, APP_BASE_HREF } from "angular2/router";
import { HTTP_PROVIDERS } from "angular2/http";

import { appInjector, activeContext, CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import Carbon from "carbonldp/Carbon";

import AppComponent from "./AppComponent";

import { SERVICE_PROVIDERS } from "app/services/CarbonServices";
import { DUMMY_SERVICE_PROVIDERS } from "app/services/DummyServices";

import { BLOG_PROVIDERS } from "app/blog/Blog";

let providers:Provider[] = [];
if( true ) {
	let carbon:Carbon = new Carbon();
	carbon.setSetting( "domain", "dev.carbonldp.com" );

	carbon.extendObjectSchema( {
		"acl": "http://www.w3.org/ns/auth/acl#",
		"api": "http://purl.org/linked-data/api/vocab#",
		"c": "http://carbonldp.com/ns/v1/platform#",
		"cs": "http://carbonldp.com/ns/v1/security#",
		"cp": "http://carbonldp.com/ns/v1/patch#",
		"cc": "http://creativecommons.org/ns#",
		"cert": "http://www.w3.org/ns/auth/cert#",
		"dbp": "http://dbpedia.org/property/",
		"dc": "http://purl.org/dc/terms/",
		"doap": "http://usefulinc.com/ns/doap#",
		"example": "http://example.org/ns#",
		"ex": "http://example.org/ns#",
		"exif": "http://www.w3.org/2003/12/exif/ns#",
		"fn": "http://www.w3.org/2005/xpath-functions#",
		"foaf": "http://xmlns.com/foaf/0.1/",
		"geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
		"geonames": "http://www.geonames.org/ontology#",
		"gr": "http://purl.org/goodrelations/v1#",
		"http": "http://www.w3.org/2006/http#",
		"ldp": "http://www.w3.org/ns/ldp#",
		"log": "http://www.w3.org/2000/10/swap/log#",
		"owl": "http://www.w3.org/2002/07/owl#",
		"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
		"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
		"rei": "http://www.w3.org/2004/06/rei#",
		"rsa": "http://www.w3.org/ns/auth/rsa#",
		"rss": "http://purl.org/rss/1.0/",
		"sd": "http://www.w3.org/ns/sparql-service-description#",
		"sfn": "http://www.w3.org/ns/sparql#",
		"sioc": "http://rdfs.org/sioc/ns#",
		"skos": "http://www.w3.org/2004/02/skos/core#",
		"swrc": "http://swrc.ontoware.org/ontology#",
		"types": "http://rdfs.org/sioc/types#",
		"vcard": "http://www.w3.org/2001/vcard-rdf/3.0#",
		"wot": "http://xmlns.com/wot/0.1/",
		"xhtml": "http://www.w3.org/1999/xhtml#",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	} );

	carbon.extendObjectSchema( {
		"blog": "http://example.com/ns#",
	});

	carbon.extendObjectSchema( {
		"title": {
			"@id": "blog:title",
			"@type": "xsd:string",
		},
		"content": {
			"@id": "blog:content",
			"@type": "xsd:string",
		},
		"style": {
			"@id": "blog:style",
			"@type": "xsd:string",
		},
		"author": {
			"@id": "blog:author",
			"@type": "@id",
		},
		"publishedOn": {
			"@id": "blog:publishedOn",
			"@type": "xsd:dateTime"
		},
		"comments": {
			"@id": "blog:comment",
			"@type": "@id",
			"@container": "@set",
		},
		"likes": {
			"@id": "blog:like",
			"@type": "@id",
			"@container": "@set",
		},
	});

	activeContext.initialize( carbon, "example-blog/" );

	providers = providers
		.concat( CARBON_PROVIDERS )
		.concat( CARBON_SERVICES_PROVIDERS )
		.concat( SERVICE_PROVIDERS );
} else {
	providers = providers
		.concat( DUMMY_SERVICE_PROVIDERS );
}

bootstrap( AppComponent, [
	FORM_PROVIDERS,
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,

	provide( APP_BASE_HREF, { useValue: "/src/" } ),

	providers,
	BLOG_PROVIDERS,
] ).then( ( appRef:ComponentRef ) => {
	appInjector( appRef.injector );
}).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
});
