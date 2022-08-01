# Clarity Hub Newsletter Builder

Create email campaigns and schedule them in Mailchimp.

## Getting Started

```sh
npm run start
```

If you are working on the backend, you'll want to run the following in another terminal as well:

```sh
cd ./packages/server
npm run build
```

This will rebuild the React that runs on the server.

## About the Project

This repo is built using a client written in React and a backend written in Node.

### Client

The client generates most of its forms based on schemas provided by the backend. You can read up on the JSON Schema format
used [here](https://react-jsonschema-form.readthedocs.io/en/latest/form-customization/).

The tables are built using JSON API.

The front end uses the Unity Design System by Clarity Hub.

### Backend

The backend uses the filesystem as a database when storing and reading campaigns. The titles of the campaigns
are assumed to be unique.

The backend generates emails using React as well. The ES6 code is in `./server/services/ReactNewsletter.module.js`. This code
is transpiled to `./server/services/ReactNewsletter.js` so that it can be used by the node server.
