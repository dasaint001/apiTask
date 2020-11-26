const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});


router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        type: req.body.type,
        crux: req.body.crux,
        color: req.body.color,
        title: req.body.title
    });

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.type = req.body.type
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.crux = req.body.crux
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.color = req.body.color
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.title = req.body.title
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'Data Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});


async function getSubscriber(req, res, next) {
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if (Subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    } catch (err) {
         return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();
}



module.exports = router;