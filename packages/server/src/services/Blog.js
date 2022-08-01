const got = require('got');
const metascraper = require('metascraper')([
    require('metascraper-date')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-title')(),
    require('metascraper-url')()
]);

const empty = (s) => Boolean(s);

const splitLinks = (links) => {
    const arr = links.split(/\r?\n/).filter(empty);

    return arr;
};

module.exports = {
    bulkGet(links = '') {
        const linksArr = splitLinks(links);

        return linksArr.map(link => this.get(link));
    },

    async get(link) {
        const { body: html, url } = await got(link)
        const metadata = await metascraper({ html, url });

        metadata.title = metadata.title.replace(' | Clarity Hub Stellar Blog', '');
        metadata.url = link;

        return metadata;
    }
};