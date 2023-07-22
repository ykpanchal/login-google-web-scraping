"use strict";

var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    route = express.Router(),
    app = express(),
    port = process.env.PORT || 8002;

route.get('/scraper', function (req, res) {
    request("https://www.amazon.com/s?srs=5286335011", function (err, resp, body) {
        if (!err && resp.statusCode === 200) {
            var $ = cheerio.load(body),
                productsData = [];

            $('.a-size-base-plus a-color-base a-text-normal').map(function (i, data) {
                var productName = $(data).text(),
                    productLink = $(data).attr('href');

                productsData.push({
                    prodlink: productLink,
                    prodName: productName
                });
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(productsData));
        }
    });
});
app.use('/', route);
app.listen(port);
console.log('Your server goes on localhost:' + port);
