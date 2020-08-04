const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
// const {parse, stringify} = require('flatted');


export default (req, res) => {
   res.statusCode = 200
   res.setHeader('Content-Type', 'application/json')

   // console.log(req.query.url)
   scrape({
      urls: [req.query.url],
      directory: '/tmp/scrape-' + new Date().getTime(),
      plugins: [ 
         new PuppeteerPlugin({
            scrollToBottom: { timeout: 10000, viewportN: 10 }, /* optional */
            blockNavigation: true, /* optional */
         })
      ]
   }).then((result) => {
      // console.log(result[0].text)
      // res.end(stringify(result[0].text))
      res.end(JSON.stringify(result[0].text))
   });

}