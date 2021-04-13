import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
const fontkit = require('fontkit');
const http = require('http');
const url = require('url');
const mimetype = require('mimetype');

export default (req, res) => {
   const { method } = req
   switch (method) {
      case 'POST':
         console.log("getting font data")
         console.log(apiUrl)
         http.get(url.parse(apiUrl.replace("localhost", "host.docker.internal") + req.body.url), function(response) {
            var data = [];
            response.on('data', function(chunk) {
               data.push(chunk);
            }).on('end', function() {
               let buffer = Buffer.concat(data);
               let font = fontkit.create(buffer);
               let fontInfo = {

                  // 'CFF ': font['CFF '],
                  // GPOS: font.GPOS,
                  // GSUB: font.GSUB,
                  // cmap: font.cmap,
                  // hhea: font.hhea,
                  // hmtx: font.hmtx,
                  // maxp: font.maxp,
                  // post: font.post,
                  // head: font.head,
                  'OS/2': font['OS/2'],
                  name: font.name,
                  postscriptName: font.postscriptName,
                  fullName: font.fullName,
                  familyName: font.familyName,
                  subfamilyName: font.subfamilyName,
                  copyright: font.copyright,
                  version: font.version,
                  unitsPerEm: font.unitsPerEm,
                  ascent: font.ascent,
                  descent: font.descent,
                  lineGap: font.lineGap,
                  underlinePosition: font.underlinePosition,
                  underlineThickness: font.underlineThickness,
                  italicAngle: font.italicAngle,
                  capHeight: font.capHeight,
                  xHeight: font.xHeight,
                  // bbox: font.bbox,
                  numGlyphs: font.numGlyphs,
                  // characterSet: font.characterSet,
                  availableFeatures: font.availableFeatures,
                  variationAxes: font.variationAxes,
                  namedVariations: font.namedVariations, 
                  mimetype: "",
                  extension: req.body.originUrl.split('.').pop()
               };
               if(req.body.originUrl){
                  fontInfo.mimetype = mimetype.lookup(req.body.originUrl);

               }
               res.send({ ...fontInfo });
            });
            
          });
         break
      default:
         res.setHeader('Allow', ['POST'])
         res.status(405).end(`Method ${method} Not Allowed`)
   }
}