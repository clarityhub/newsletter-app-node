const BASE_URL = '';

module.exports = () => {
    const title = new Date().toISOString().split('T')[0] + '-newsletter';

    return {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": `${BASE_URL}/schemas/campaign.json`,
        "type": "object",
        "title": "Campaign",
        "description": "A campaign email for creating a newsletter with blog posts and issue links",
        "required": [
            "title",
            "subjectLine",
        ],
        "properties": {
            "title": {
                "$id": "#/properties/title",
                "type": "string",
                "title": "Title",
                "description": "The name of the email",
                "default": title,
                "examples": [
                    "Open Source Email [date]"
                ],
                "pattern": "^(.*)$"
            },
            "subjectLine": {
                "$id": "#/properties/subjectLine",
                "type": "string",
                "title": "Subject Line",
                "description": "The subject line that will appear in the user's inbox",
                "default": "Stellar Newsletter by Clarity Hub",
                "examples": [
                    "Stellar Newsletter by Clarity Hub"
                ],
                "pattern": "^(.*)$"
            },
            "previewText": {
                "$id": "#/properties/previewText",
                "type": "string",
                "title": "Preview Text",
                "description": "The first line of text that will appear in the user's inbox",
                "default": "Your weekly does of Open Source Issues and programming blog posts",
                "examples": [
                    "Your weekly does of Open Source Issues and programming blog posts"
                ],
                "pattern": "^(.*)$"
            },
            "greeting": {
                "$id": "#/properties/greeting",
                "type": "string",
                "title": "Greeting",
                "description": "This appears at the top of the email. Say something nice!",
                "default": "",
                "examples": [
                    ""
                ],
                "pattern": "^(.*)$"
            },
            "blogPosts": {
                "$id": "#/properties/blogPosts",
                "type": "array",
                "title": "Blog Posts",
                "items": {
                    "$id": "#/properties/blogPosts/items",
                    "type": "object",
                    "title": "Blog Post",
                    "required": [
                        // "description",
                        // "image",
                        // "title",
                        // "url"
                    ],
                    "properties": {
                        "title": {
                            "$id": "#/properties/blogPosts/items/properties/title",
                            "type": "string",
                            "title": "Title",
                            "default": "",
                            "examples": [
                                "Low Coupling, High Cohesion | Clarity Hub Stellar Blog"
                            ],
                            "pattern": "^(.*)$"
                        },
                        "description": {
                            "$id": "#/properties/blogPosts/items/properties/description",
                            "type": "string",
                            "title": "Description",
                            "default": "",
                            "examples": [
                                "The key to creating maintainable code is adhering to “low coupling, high cohesion”. But what exactly does this mean? At what point is your code loosely coupled and highly cohesive?"
                            ],
                            "pattern": "^([\\s\\S]*)$"
                        },
                        "image": {
                            "$id": "#/properties/blogPosts/items/properties/image",
                            "type": "string",
                            "title": "Image Url",
                            "default": "",
                            "examples": [
                                ""
                            ],
                            "pattern": "^(.*)$"
                        },
                        "url": {
                            "$id": "#/properties/blogPosts/items/properties/url",
                            "type": "string",
                            "title": "Blog Post URL",
                            "default": "",
                            "examples": [
                                "https://stellar.clarityhub.io"
                            ],
                            "pattern": "^(.*)$"
                        }
                    }
                }
            },
            "issues": {
                "$id": "#/properties/issues",
                "type": "array",
                "title": "Issues",
                "items": {
                    "$id": "#/properties/issues/items",
                    "type": "object",
                    "title": "Issue",
                    "required": [
                        // "description",
                        // "image",
                        // "title",
                        // "url"
                    ],
                    "properties": {
                        "title": {
                            "$id": "#/properties/issues/items/properties/title",
                            "type": "string",
                            "title": "Title",
                            "default": "",
                            "examples": [
                                "Module parse failed: Unexpected token (473:30)"
                            ],
                            "pattern": "^(.*)$"
                        },
                        "body": {
                            "$id": "#/properties/issues/items/properties/body",
                            "type": "string",
                            "title": "Body",
                            "default": "",
                            "examples": [
                                "Module parse failed: Unexpected token (473:30)"
                            ],
                            "pattern": "^([\\s\\S]*)$"
                        },
                        "repo": {
                            "type": "object",
                            "title": "Repo",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "title": "Repo Name",
                                },
                                "description": {
                                    "type": "string",
                                    "title": "Repo Description",
                                    "pattern": "^([\\s\\S]*)$"
                                },
                            }
                        }
                    },
                },
            },
        }
    };
};