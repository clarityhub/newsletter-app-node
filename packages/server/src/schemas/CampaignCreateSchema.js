const BASE_URL = '';

// Example:
//
// {
//     title: '',
//     subjectLine: '',
//     previewText: '',
//     mailchimpId: '',
//     mailchimpUrl: 'https://www.github.com',
//     greeting: '',
//     blogPosts: [{
//         url: '',
//         title: '',
//         description: '',
//         imageUrl: '',
//     }],
//     issues: [{
//         type: 'github',
//         url: 'url',
//         htmlUrl: 'https://www.github.com',
//         repositoryUrl: 'https://www.github.com',
//         repositoryTitle: '',
//         repositoryDescription: '',
//         title: '',
//         description: '',
//         htmlDescription: '',
//         htmlShortDescription: '',
//     }],
// }


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
            "issueLinks"
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
            "blogPostLinks": {
                "$id": "#/properties/blogPostLinks",
                "type": "string",
                "title": "Blog Post Links",
                "description": "One link per line",
                "default": "",
                "examples": [
                    ""
                ],
                "pattern": "^([\\s\\S]*)$"
            },
            "issueLinks": {
                "$id": "#/properties/issueLinks",
                "type": "string",
                "title": "Issue Links",
                "description": "One link per line",
                "default": "",
                "examples": [
                    ""
                ],
                "pattern": "^([\\s\\S]*)$"
            },
            // "blogPosts": {
            //     "$id": "#/properties/blogPosts",
            //     "type": "array",
            //     "title": "The Blogposts Schema",
            //     "items": {
            //         "$id": "#/properties/blogPosts/items",
            //         "type": "object",
            //         "title": "The Items Schema",
            //         "required": [
            //             "url",
            //             "title",
            //             "description",
            //             "imageUrl"
            //         ],
            //         "properties": {
            //             "url": {
            //                 "$id": "#/properties/blogPosts/items/properties/url",
            //                 "type": "string",
            //                 "title": "The Url Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "title": {
            //                 "$id": "#/properties/blogPosts/items/properties/title",
            //                 "type": "string",
            //                 "title": "The Title Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "description": {
            //                 "$id": "#/properties/blogPosts/items/properties/description",
            //                 "type": "string",
            //                 "title": "The Description Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "imageUrl": {
            //                 "$id": "#/properties/blogPosts/items/properties/imageUrl",
            //                 "type": "string",
            //                 "title": "The Imageurl Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             }
            //         }
            //     }
            // },
            // "issues": {
            //     "$id": "#/properties/issues",
            //     "type": "array",
            //     "title": "The Issues Schema",
            //     "items": {
            //         "$id": "#/properties/issues/items",
            //         "type": "object",
            //         "title": "The Items Schema",
            //         "required": [
            //             "type",
            //             "url",
            //             "htmlUrl",
            //             "repositoryUrl",
            //             "repositoryTitle",
            //             "repositoryDescription",
            //             "title",
            //             "description",
            //             "htmlDescription",
            //             "htmlShortDescription"
            //         ],
            //         "properties": {
            //             "type": {
            //                 "$id": "#/properties/issues/items/properties/type",
            //                 "type": "string",
            //                 "title": "The Type Schema",
            //                 "default": "",
            //                 "examples": [
            //                     "github"
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "url": {
            //                 "$id": "#/properties/issues/items/properties/url",
            //                 "type": "string",
            //                 "title": "The Url Schema",
            //                 "default": "",
            //                 "examples": [
            //                     "url"
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "htmlUrl": {
            //                 "$id": "#/properties/issues/items/properties/htmlUrl",
            //                 "type": "string",
            //                 "title": "The Htmlurl Schema",
            //                 "default": "",
            //                 "examples": [
            //                     "https://www.github.com"
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "repositoryUrl": {
            //                 "$id": "#/properties/issues/items/properties/repositoryUrl",
            //                 "type": "string",
            //                 "title": "The Repositoryurl Schema",
            //                 "default": "",
            //                 "examples": [
            //                     "https://www.github.com"
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "repositoryTitle": {
            //                 "$id": "#/properties/issues/items/properties/repositoryTitle",
            //                 "type": "string",
            //                 "title": "The Repositorytitle Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "repositoryDescription": {
            //                 "$id": "#/properties/issues/items/properties/repositoryDescription",
            //                 "type": "string",
            //                 "title": "The Repositorydescription Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "title": {
            //                 "$id": "#/properties/issues/items/properties/title",
            //                 "type": "string",
            //                 "title": "The Title Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "description": {
            //                 "$id": "#/properties/issues/items/properties/description",
            //                 "type": "string",
            //                 "title": "The Description Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "htmlDescription": {
            //                 "$id": "#/properties/issues/items/properties/htmlDescription",
            //                 "type": "string",
            //                 "title": "The Htmldescription Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             },
            //             "htmlShortDescription": {
            //                 "$id": "#/properties/issues/items/properties/htmlShortDescription",
            //                 "type": "string",
            //                 "title": "The Htmlshortdescription Schema",
            //                 "default": "",
            //                 "examples": [
            //                     ""
            //                 ],
            //                 "pattern": "^(.*)$"
            //             }
            //         }
            //     }
            // }
        }
    };
};