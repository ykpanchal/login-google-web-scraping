"use strict";

const axios = require("axios");
const cheerio = require("cheerio");
var express = require('express');
var route = express.Router();
var app = express();
var port = process.env.PORT || 8002;

/**
 * Function to fetch webscrapers data from URL
 * @createdDate 22-07-2023
 * @author Yogesh
 */
route.get('/scraper', function (req, res) {
    try {
        const fetchWebScrapers = async () => {
            try {
                const response = await axios.get('https://www.amazon.com/s?srs=5286335011');
                const html = response.data;
                const $ = cheerio.load(html);
                const productsData = [];
                $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_index, element) => {
                    const shelf = $(element);
                    const title = shelf.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
                    const image = shelf.find('img.s-image').attr('src');
                    const price = shelf.find('span.a-price > span.a-offscreen').text();
                    let prodsInfo = {
                        title,
                        image,
                        price,
                    }
                    productsData.push(prodsInfo);
                });
                return productsData;
            } catch (error) {
                throw error;
            }
        };

        fetchWebScrapers().then((productsData) => console.log(productsData));
    } catch (error) {
        throw error;
    }
});
app.use('/', route);
app.listen(port);
console.log('Your server goes on localhost:' + port);