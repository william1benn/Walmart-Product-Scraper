const express = require('express');
const router  = express.Router();
const PriceFinder = require('price-finder');
const axios = require('axios');
const cheerio = require('cheerio');
const priceFinder = new PriceFinder();

router.get('/scrap/:id', (req, res, next) => {
  console.log(req.params.id);
axios.get(`https://www.walmart.com/search/?cat_id=0&query=${req.params.id}`)
.then(data =>{
let str = '<a href="/ip/'
let end = '</a>'
var result = data.data.match(/(?<=ip\DOCTYPE+).*?(?=\s+charset)/gs)


const $ = cheerio.load(data.data)

let arr = data.data.split(`productPageUrl":"/ip/`)
let urls = []

let cleaned=[]


for(let i=1; i<3; i++){
  urls.push(arr[i].split('","department":')[0])
}

for(let y=0; y < urls.length; y++){
cleaned.push(urls[y].split('",')[0])
}

console.log('----------------',cleaned);
  let input = cleaned[0]
  let second = cleaned[1]
  let priceArr = [];

  const uri = 'https://www.walmart.com/ip/'+input;
  console.log('=-=-=-=', uri)
  priceFinder.findItemDetails(uri, function(err, all) {

   priceArr.push(all)
    

  const uri2 = 'https://www.walmart.com/ip/'+second;
  console.log('=-=-=-=', uri2)
  priceFinder.findItemDetails(uri2, function(err, all2) {

  priceArr.push(all2)
  
axios.get(`https://www.amazon.com/s?k=${req.params.id}`)
.then(data =>{

  res.json(priceArr)

})

})

}).catch((err)=>{
  console.log(err)
})
})






module.exports = router;
