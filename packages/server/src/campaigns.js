const express = require('express');
const bottle = require('./bottle');
const campaignCreateSchema = require('./schemas/CampaignCreateSchema');
const campaignUpdateSchema = require('./schemas/CampaignUpdateSchema');
const campaignScheduleSchema = require('./schemas/CampaignScheduleSchema');
const CampaignController = require('./controllers/CampaignController');

// XXX res.send(500) with message

const router = express.Router();

// XXX refactor BASE_URL
const BASE_URL = 'http://localhost:4000';

router.get('/', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const data = await controller.getAll();

        res.send({
            links: {
                self: `${BASE_URL}/campaigns`,
                // XXX pagination
            },
            data,
            meta: {
                count: data.length,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

router.get('/schema/create', async (req, res) => {
    res.send(campaignCreateSchema());
});

router.get('/schema/update', async (req, res) => {
    res.send(campaignUpdateSchema());
});

router.get('/schema/schedule', async (req, res) => {
    res.send(campaignScheduleSchema());
});

router.get('/:title', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const data = await controller.get({ title: req.params.title });

        res.send({
            links: {
                self: `${BASE_URL}/campaigns/${req.params.title}`,
            },
            data,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

router.get('/:title/preview', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const data = await controller.preview({ title: req.params.title });

        res.send({
            links: {
                self: `${BASE_URL}/campaigns/${req.params.title}/preview`,
            },
            data,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const data = await controller.create(req.body);

        res.send({
            links: {
                self: `${BASE_URL}/campaings/${data.title}`,
            },
            data,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

router.put('/:title', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const data = await controller.update(req.params.title, req.body);

        res.send({
            links: {
                self: `${BASE_URL}/campaings/${data.title}`,
            },
            data,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

router.post('/:title/actions/schedule', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const data = await controller.schedule({
            title: req.params.title,
            emails: req.body.emails,
            scheduledTime: req.body.scheduledTime,
        });

        res.send({
            links: {
                self: `${BASE_URL}/campaings/${data.title}`,
            },
            data,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

router.post('/:title/actions/unschedule', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const data = await controller.unschedule({
            title: req.params.title,
        });

        res.send({
            links: {
                self: `${BASE_URL}/campaings/${data.title}`,
            },
            data,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

router.delete('/:title', async (req, res) => {
    try {
        const controller = new CampaignController({
            container: bottle.container,
        });

        const success = await controller.destroy({ title: req.params.title });

        res.send({
            links: {
                self: `${BASE_URL}/campaings/${req.params.title}`,
            },
            data: {
                success,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            status: 'Something bad happened',
        });
    }
});

module.exports = router;
