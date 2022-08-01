const deepmerge = require('deepmerge');

module.exports = class CampaignController {
    constructor({ container }) {
        this.container = container;
    }

    async getAll() {
        const { FileSystem } = this.container;
        const files = await FileSystem.glob('*.json');

        return files;
    }

    async get({ title }) {
        const { FileSystem } = this.container;
        const file = await FileSystem.get(`${title}.json`);

        return file;
    }

    async create(data) {
        const { FileSystem, Blog, Github } = this.container;

        const title = data.title || new Date().toISOString().split('T')[0] + '-newsletter';

        // XXX don't override a file that already exists

        const issuesPromises = Github.bulkGet(data.issueLinks);
        const blogLinksPromises = Blog.bulkGet(data.blogPostLinks);

        const [issues, posts] = await Promise.all([
            Promise.all(issuesPromises), 
            Promise.all(blogLinksPromises)
        ]);

        data.blogPosts = posts;
        data.issues = issues;

        delete data.issueLinks;
        delete data.blogPostLinks;

        const file = await FileSystem.create(`${title}.json`, data);

        return file;
    }

    async update(title, data) {
        const { FileSystem } = this.container;

        const newFile = await FileSystem.create(`${title}.json`, data);

        return newFile;
    }

    async preview({ title }) {
        const { FileSystem, ReactNewsletter } = this.container;
        const data = await FileSystem.get(`${title}.json`);

        const html = ReactNewsletter.render(data);

        return html;
    }

    async destroy({ title }) {
        const { FileSystem } = this.container;

        // XXX detatch from mailchimp

        if (await FileSystem.exists(`${title}.json`)) {
            const success = await FileSystem.destroy(`${title}.json`);

            return success;
        }

        throw new Error(`${title} not found`);
    }

    async schedule({ title, emails, scheduledTime }) {
        const { FileSystem, Mailchimp } = this.container;

        if (!emails) {
            throw new Error('You must provide at least 1 email');
        }

        if (!scheduledTime) {
            throw new Error('You must provide a time');
        }

        const parsedTime = new Date(scheduledTime);
        const parsedEmails = emails;

        if (await FileSystem.exists(`${title}.json`)) {
            let campaign = await FileSystem.get(`${title}.json`);

            if (!campaign.mailchimpId) {
                // There is no Mailchimp campaign associated with this campaign.
                // Let's create one

                const result = await Mailchimp.createCampaign(campaign);
                
                campaign.mailchimpId = result.id;
                const webId = result.web_id;
                campaign.mailchimpUrl = `https://us18.admin.mailchimp.com/campaigns/show/?id=${webId}`;
    
                // Save
                campaign = await FileSystem.create(`${title}.json`, campaign);
            } else {
                await Mailchimp.updateCampaign(campaign);
            }

            const html = await this.preview({ title });

            await Mailchimp.setCampaignEmail(campaign, html);
            await Mailchimp.sendTestEmail(campaign, parsedEmails);
            await Mailchimp.schedule(campaign, parsedTime);

            return campaign;
        }

        throw new Error(`${title} not found`);
    }

    /**
     * Slightly misleading. This simply detaches the campaign from Mailchimp,
     * it does not fully unschedule it.
     */
    async unschedule({ title, emails, scheduledTime }) {
        const { FileSystem } = this.container;

        if (await FileSystem.exists(`${title}.json`)) {
            let campaign = await FileSystem.get(`${title}.json`);

            if (campaign.mailchimpId) {
                campaign.mailchimpId = null;
                campaign.mailchimpUrl = null;

                // Save
                campaign = await FileSystem.create(`${title}.json`, campaign);
            } else {
                throw new Error(`${title} was not scheduled`);
            }

            return campaign;
        }

        throw new Error(`${title} not found`);
    }
}