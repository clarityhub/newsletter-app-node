const Bottle = require('bottlejs');
const FileSystem = require('./services/FileSystem');
const Github = require('./services/Github');
const Blog = require('./services/Blog');
const Mailchimp = require('./services/Mailchimp');
const ReactNewsletter = require('./services/ReactNewsletter');

const bottle = new Bottle();

bottle.factory('Mailchimp', () => Mailchimp);
bottle.factory('FileSystem', () => FileSystem);
bottle.factory('Github', () => Github);
bottle.factory('Blog', () => Blog);
bottle.factory('ReactNewsletter', () => ReactNewsletter);

module.exports = bottle;
