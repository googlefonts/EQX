const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
// const {parse, stringify} = require('flatted');
const cheerio = require('cheerio');
const {Base64} = require('js-base64');
var async = require("async");
import axios from 'axios';

export default (req, res) => {
   res.statusCode = 200
   res.setHeader('Content-Type', 'application/json')
   scrape({
      urls: [req.query.url],
      directory: '/tmp/scrape-' + new Date().getTime(),
      sources: [
        {selector: 'img', attr: 'src'},
        {selector: 'link[rel="stylesheet"]', attr: 'href'},
        {selector: 'script', attr: 'src'}
      ],
      plugins: [ 
         new PuppeteerPlugin({
            scrollToBottom: { timeout: 1000, viewportN: 10 }, /* optional */
            blockNavigation: true, /* optional */
         })
      ]
   }).then((result) => {

      var html = result[0].text;
      const $ = cheerio.load(html);
      var url = [];
      async.each(result[0].children, function(item, callback) {

         url.push(item.url);
         var file = item.url.substring(item.url.lastIndexOf('.')+1, item.url.length) || item.url;
         // console.log(file);
         if (file.startsWith("jpg") || file.startsWith("png") || file.startsWith("gif") || file.startsWith("webp") || file.startsWith("svg")) {
            axios
               .get(item.url) 
               .then(response => {
                  var data = response.data;
                  data = Base64.encode(data); 
                  if (file.startsWith("jpg")) {
                     $('img[src="'+item.filename+'"], img[src="'+item.url+'"]').attr("src", "data:image/jpeg;base64," + data);
                  } else if (file.startsWith("png")) {
                     $('img[src="'+item.filename+'"], img[src="'+item.url+'"]').attr("src", "data:image/png;base64," + data);
                  } else if (file.startsWith("gif")) {
                     $('img[src="'+item.filename+'"], img[src="'+item.url+'"]').attr("src", "data:image/gif;base64," + data);
                  } else if (file.startsWith("webp")) {
                     $('img[src="'+item.filename+'"], img[src="'+item.url+'"]').attr("src", "data:image/webp;base64," + data);
                  } else if (file.startsWith("svg")) {
                     $('img[src="'+item.filename+'"], img[src="'+item.url+'"]').attr("src", "data:image/svg+xml;base64," + data);
                  }
                  callback();
               }).catch(error => {
                  callback();
               });

            } else if (file.startsWith("css")) {
               axios
                  .get(item.url) 
                  .then(response => {
                     var data = response.data;
                     $('link[href="'+item.filename+'"], link[href="'+item.url+'"]').remove();
                     $('html').append("<style>"+data+"</style>")
                     callback();
                  }).catch(error => {
                     callback();
                  });
   
            } else if (file.startsWith("js")) {
               axios
                  .get(item.url) 
                  .then(response => {
                     var data = response.data;
                     $('script[src="'+item.filename+'"], script[src="'+item.url+'"]').remove();
                     $('html').append("<script>"+data+"</script>")
                     callback();
                  }).catch(error => {
                     callback();
                  });
   
            } else {
            callback();
         }
      }, function(err) {

         console.log(url);
         $('a').attr('href', 'javascript:void(0)');
         // $('script').remove();
         if( err ) {
            console.log(err);
         } else {
            console.log($.html())
            res.end($.html())
            // res.end(stringify(result[0].text))
         }
      });
   });
}