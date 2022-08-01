const Mailchimp = require('mailchimp-api-v3');

const {
    MAILCHIMP_API_KEY,
    MAILCHIMP_LIST_ID,
} = process.env;

const mailchimp = new Mailchimp(MAILCHIMP_API_KEY);

module.exports = {
    async createCampaign(campaign, listId = MAILCHIMP_LIST_ID) {
        const response = await mailchimp.post('/campaigns', {
            type: 'regular',
            recipients: {
                list_id: listId,
            },
            settings: {
                subject_line: campaign.subjectLine,
                preview_text: campaign.previewText,
                title: campaign.title,
                from_name: 'Clarity Hub',
                reply_to: 'opensource@clarityhub.io',
                auto_footer: true,
            }
        });

        return response;
    },

    /**
     * 
     * @param {*} campaign (campaign contains a mailchimpId)
     * @param {*} listId 
     */
    async updateCampaign(campaign, listId = MAILCHIMP_LIST_ID) {
        if (!campaign.mailchimpId) {
            throw new Error('mailchimpId is required in updateCampaign');
        }

        const response = await mailchimp.patch(`/campaigns/${campaign.mailchimpId}`, {
            type: 'regular',
            recipients: {
                list_id: listId,
            },
            settings: {
                subject_line: campaign.subjectLine,
                preview_text: campaign.previewText,
                title: campaign.title,
                from_name: 'Clarity Hub',
                reply_to: 'opensource@clarityhub.io',
                auto_footer: true,
            }
        });

        return response;
    },

    async setCampaignEmail(campaign, html) {
        if (!campaign.mailchimpId) {
            throw new Error('mailchimpId is required in updateCampaign');
        }

        const response = await mailchimp.put(`/campaigns/${campaign.mailchimpId}/content`, {
            html,
        });

        return response;
    },

    async sendTestEmail(campaign, emails) {
        if (emails.length === 0) {
            throw new Error('You must specify at least one email to send a test email');
        }

        const response = await mailchimp.post(`/campaigns/${campaign.mailchimpId}/actions/test`, {
            test_emails: emails,
            send_type: 'html',
        });

        return response;
    },

    async schedule(campaign, datetime) {
        if (!datetime) {
            throw new Error('You must specify a valid datetime to schedule a campaign');
        }

        const response = await mailchimp.post(`/campaigns/${campaign.mailchimpId}/actions/schedule`, {
            // TODO make sure the datetime is in increments of 15 minutes
            schedule_time: datetime.toISOString(),
        });

        return response;
    }
}