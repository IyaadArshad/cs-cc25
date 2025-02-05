const axios = require("axios");

const links = [
    "https://www.szgmc.gov.ae/en",
    "https://www.louvreabudhabi.ae",
    "https://www.qasralwatan.ae",
    "https://www.yasisland.ae",
    "https://visitabudhabi.ae/en/where-to-go/beaches/corniche-beach",
    "https://www.mandarinoriental.com/abu-dhabi/emirates-palace",
    "https://visitabudhabi.ae/en/where-to-go/parks-and-zoos/mangrove-national-park",
    "https://sstation.ae",
    "https://www.nandos.ae",
    "https://shakespeareandcompany.com",
    "https://almandi-house.ae/",
    "https://zahratlebnan.com/",
    "https://visitabudhabi.ae/en/where-to-go/dining-and-restaurants/al-mrzab-restaurant",
    "https://yasmall.ae",
    "https://thegalleria.ae",
    "https://abudhabi-mall.com",
    "https://madinatzayed-mall.com",
    "https://wtcad.ae",
    "https://dalmamall.ae",
    "https://mushrifmall.com",
    "https://tamm.abudhabi",
    "https://seha.ae",
    "https://es.adpolice.gov.ae/trafficservices/",
    "https://dmt.gov.ae",
    "https://addc.ae",
    "https://abudhabichamber.ae",
    "https://adjd.gov.ae"
  ]
  ;

/*
note from danny
this is being used to automatically check for broken links becoz doing it manually is alot of work
just input some text into chatgpt and let it scrape all the links out for you and return it in an array
and then just hard code the array above and run the program 
*/

async function checkLinks() {
  for (const link of links) {
    try {
      const response = await axios.get(link);
      console.log(`[✔] ${link} - ${response.status}`);
    } catch (error) {
      console.log(`[✘] ${link} - ${error.response ? error.response.status : "Failed to fetch"}`);
    }
  }
}

checkLinks();
