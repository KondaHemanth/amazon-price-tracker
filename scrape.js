function totalScrape(amt, addr) {

    const axios = require('axios')
    const cheerio = require('cheerio')
    require('dotenv').config();
    
    const accSID = process.env.SID;
    const authToken = process.env.AUTH_TOKEN;
    
    const client = require('twilio')(accSID, authToken);
    
    //console.log(accSID, authToken);
    
    const url = addr//'https://www.amazon.in/Nivea-Bath-Care-Shower-Cream/dp/B0017IMOL2?pd_rd_w=XsfMF&content-id=amzn1.sym.9f526935-7db9-4bc3-b3a1-e5f1fc192c96&pf_rd_p=9f526935-7db9-4bc3-b3a1-e5f1fc192c96&pf_rd_r=HRR6A5TWDCHRH9J0KXEQ&pd_rd_wg=bm7IU&pd_rd_r=7d042377-5233-4abf-9d4c-c28f4d79e0ef&pd_rd_i=B0017IMOL2&psc=1&ref_=pd_bap_d_rp_2_i'
    //console.log(url)
    
    const prod = {name: '', price: '', link: ''};
    
    // Setting interval
    const handle = setInterval(scrape, 24*60*60*1000);
    console.log(prod);
    
    async function scrape() {
        // fetching data
        const {data} = await axios.get(url);
        
        const $ = cheerio.load(data);
        const item = $('div#dp-container');
        
        prod.name = $(item).find('h1 span#productTitle').text().trim();
        prod.link = url;
        prod.price = $(item).find('span.a-price-whole').first().text().replace(/[,.]/g, "");

        const price = parseInt(prod.price);
        prod.price = price;
        console.log(amt)
        
        // Message
        if(price < (amt+0)){
            client.messages.create({
                body: `Price of ${prod.name} is at ${price}. Link: ${prod.link}`,
                from: '+18124899712',
                to: '+919361091681'
            }).then(message => {
                console.log(message);
            })
        }
        
        
    }

    scrape();
}

module.exports = totalScrape;