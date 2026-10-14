const express = require('express');
const router = express.Router();

const services = require('../data/services.json');
const stats = require('../data/stats.json');
const gallery = require('../data/gallery.json');
const processSteps = require('../data/process.json');
const team = require('../data/team.json');
const testimonials = require('../data/testimonials.json');
const contact = require('../data/contact.json');

const pageData = { services, stats, gallery, processSteps, team, testimonials, contact };

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Jade & Andy Vintage Specialist - Classic Car Repair Garage',
    metaDescription: 'Professional vintage car repair and restoration services. Expert mechanics specializing in classic automobiles.',
    ...pageData
  });
});

module.exports = router;
module.exports.pageData = pageData;