const BASE_URL = '';

module.exports = () => {
    const tomorrowNine = new Date();
    tomorrowNine.setUTCHours(15, 0, 0, 0);

    return {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": `${BASE_URL}/schemas/scheduleCampaign.json`,
        "type": "object",
        "title": "Schedule Campaign",
        "description": "Schedule a campaign with Mailchimp",
        "required": [
            "emails",
            "scheduledTime",
        ],
        "properties": {
            "emails": {
                "$id": "#/properties/emails",
                "type": "array",
                "title": "Test Emails",
                "description": "Test emails to send the campaign to",
                "default": [""],
                "items": {
                    "$id": "#/properties/emails/email",
                    "type": "string",
                    "title": "Email",
                }
            },
            "scheduledTime": {
                "$id": "#/properties/scheduledTime",
                "type": "string",
                "title": "Scheduled Time",
                "description": "When to send the email",
                "default": tomorrowNine.toISOString(),
                "pattern": "^(.*)$"
            },
            
        }
    };
};