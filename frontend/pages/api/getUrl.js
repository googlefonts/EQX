const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const PhantomPlugin = require('website-scraper-phantom');
// const {parse, stringify} = require('flatted');
const cheerio = require('cheerio');
const {Base64} = require('js-base64');
var async = require("async");
import axios from 'axios';

class utf8Fix {
   apply(registerAction) {
       let absoluteDirectoryPath, loadedResources = [];
       registerAction('beforeRequest', async ({resource, requestOptions}) => {
           const urlLower = resource.getUrl().toLowerCase();
           if (urlLower.endsWith('.html') || urlLower.endsWith('.js') || urlLower.endsWith('.css') || urlLower.endsWith('/')) {
               requestOptions.encoding = 'utf-8'
           } else {
               requestOptions.encoding = 'binary'
           }
           return {requestOptions};
       });
       registerAction('beforeStart', ({options}) => {
           if (!options.directory || typeof options.directory !== 'string') {
               throw new Error(`Incorrect directory ${options.directory}`);
           }

           absoluteDirectoryPath = path.resolve(process.cwd(), options.directory);

           if (fs.existsSync(absoluteDirectoryPath)) {
               throw new Error(`Directory ${absoluteDirectoryPath} exists`);
           }
       });

       registerAction('saveResource', async ({resource}) => {
           const filename = path.join(absoluteDirectoryPath, resource.getFilename());
           const text = resource.getText();
           const filenameLower = filename.toLowerCase();
           if (filenameLower.endsWith('.html') || filenameLower.endsWith('.css') || filenameLower.endsWith('.js')) {
               await fs.outputFile(filename, text, {encoding: 'utf-8'});
           } else {
               await fs.outputFile(filename, text, {encoding: 'binary'});
           }
           loadedResources.push(resource);
       });
       registerAction('error', async () => {
           if (loadedResources.length > 0) {
               await fs.remove(absoluteDirectoryPath);
           }
       });
   }
}

export default (req, res) => {
   res.statusCode = 200
   res.setHeader('Content-Type', 'application/json')
   scrape({
      urls: [req.query.url],
      directory: '/tmp/scrape-' + new Date().getTime(),
      sources: [
        {selector: 'img', attr: 'src'},
        {selector: 'link[rel="stylesheet"]', attr: 'href'},
        {selector: 'link[rel="stylesheet"]', attr: 'href'},
        {selector: 'script', attr: 'src'}
      ],
      plugins: [ 
         // new PhantomPlugin(),
         // new utf8Fix(),
         new PuppeteerPlugin({
            scrollToBottom: { timeout: 1000, viewportN: 10 }, /* optional */
            blockNavigation: true, /* optional */
         })
      ]
   }).then((result) => {

      var host = new URL(req.query.url).hostname + "/";
      console.log(host)
      var html = result[0].text;
      // html.match(new RegExp(/url\((.*?)\)/gi))
      // console.log(Array.from(html.matchAll(new RegExp(/url\((.*?)\)/gi))))
      async.each( [...new Set(Array.from(html.matchAll(new RegExp(/url\((.*?)\)/gi))))], function(string, callback){
         var urlGroup = string[0];
         var url = string[1];
         if (!url.startsWith("http")){
            url = ("http://" + host + url).replace("//", "/");
         }
         var file = url.substring(url.lastIndexOf('.')+1, url.length) || url;
         if (url.lastIndexOf('.') && (file.startsWith("svg") || file.startsWith("woff") || file.startsWith("woff2"))){
            axios
               .get(url) 
               .catch(error => { console.log(error); callback(); })
               .then(response => {
                  var data = response.data;
                  data = Base64.encode(data); 
                  if (file.startsWith("jpg")) {
                     data = "data:image/jpeg;base64," + data;
                  } else if (file.startsWith("png")) {
                     data = "data:image/png;base64," + data;
                  } else if (file.startsWith("gif")) {
                     data = "data:image/gif;base64," + data;
                  } else if (file.startsWith("webp")) {
                     data = "data:image/webp;base64," + data;
                  } else if (file.startsWith("svg")) {
                     data = "data:image/svg+xml;base64," + data;
                  } else if (file.startsWith("woff")) {
                     data = "data:font/woff;base64," + data;
                  } else if (file.startsWith("woff2")) {
                     data = "data:font/woff2;base64," + data;
                  }
                  html.replace(new RegExp(urlGroup,"g"), "url('"+data+"')");
                  callback();  
               });
         } else { callback(); }

      }, function(err) {
         const $ = cheerio.load(html);
         var url = [];
         async.each(result[0].children, function(item, callback) {
   
            url.push(item.url);
            var file = item.url.substring(item.url.lastIndexOf('.')+1, item.url.length) || item.url;
            if (file.startsWith("jpg") || file.startsWith("png") || file.startsWith("gif") || file.startsWith("webp") || file.startsWith("svg")) {
               axios
                  .get(item.url) 
                  .catch(error => { console.log(error); callback(); })
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
                     .catch(error => { console.log(error); callback(); })
                     .then(response => {
                        var cssFile = response.data;
                        $('link[href="'+item.filename+'"], link[href="'+item.url+'"]').remove();

                        async.each( [...new Set(Array.from(cssFile.matchAll(new RegExp(/url\((.*?)\)/gi))))], function(string, callback2){
                           var urlGroup = string[0];
                           var url = string[1];
                           if (!url.startsWith("http")){
                              url = (item.url + url).replace("//", "/");
                           }
                           console.log(url)
                           var file = url.substring(url.lastIndexOf('.')+1, url.length) || url;
                           if (url.lastIndexOf('.') && (file.startsWith("svg") || file.startsWith("woff") || file.startsWith("woff2"))){
                              axios
                                 .get(url) 
                                 .catch(error => { console.log(error); callback2(); })
                                 .then(response => {
                                    var data = response.data;
                                    data = Base64.encode(data); 
                                    if (file.startsWith("jpg")) {
                                       data = "data:image/jpeg;base64," + data;
                                    } else if (file.startsWith("png")) {
                                       data = "data:image/png;base64," + data;
                                    } else if (file.startsWith("gif")) {
                                       data = "data:image/gif;base64," + data;
                                    } else if (file.startsWith("webp")) {
                                       data = "data:image/webp;base64," + data;
                                    } else if (file.startsWith("svg")) {
                                       data = "data:image/svg+xml;base64," + data;
                                    } else if (file.startsWith("woff")) {
                                       data = "data:font/woff;base64," + data;
                                    } else if (file.startsWith("woff2")) {
                                       data = "data:font/woff2;base64," + data;
                                    }
                                    cssFile.replace(new RegExp(urlGroup,"g"), "url('"+data+"')");
                                    callback2();  
                                 });
                           } else { callback2(); }
                        }, function(err) {

                           $('html').append("<style>"+cssFile+"</style>")
                           callback();
                        });
                     }).catch(error => {
                        callback();
                     });
      
               } else if (file.startsWith("js")) {
                  axios
                     .get(item.url) 
                     .catch(error => { console.log(error); callback(); })
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
   
            $('a').attr('href', 'javascript:void(0)');
            // $('script').remove();
            if( err ) {
               console.log(err);
            } else {
               // console.log(         $('.Copy__body').html()            )
               res.end($.html())
               // res.end(stringify(result[0].text))
            }
         });
         
      });
     
   });
}