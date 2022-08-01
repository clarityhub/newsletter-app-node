const Octokit = require('@octokit/rest');

const octokit = new Octokit();

const empty = (s) => Boolean(s);

const splitLinks = (links) => {
    const arr = links.split(/\r?\n/).filter(empty);

    return arr;
};

const getIssueParts = (link) => {
    const matches = link.match(/github\.com\/(.*)\/(.*)\/issues\/(.*)\/?/)

    const org = matches[1];
    const repo = matches[2];
    const issueNumber = matches[3];

    return {
        org,
        repo,
        issueNumber,
    };
};

module.exports = {
    bulkGet(links = '') {
        const linksArr = splitLinks(links);

        return linksArr.map(link => this.get(link));
    },

    async get(link) {
        // get the issue parts for each link
        const {
            org,
            repo,
            issueNumber,
        } = getIssueParts(link);

        const [repoData, issueData] = await Promise.all([
            octokit.repos.get({ owner: org, repo }),
            octokit.issues.get({
                owner: org,
                repo,
                number: issueNumber,
            })
        ]);

        return Object.assign({}, issueData.data, {
            repo: repoData.data,
        });
    }
}