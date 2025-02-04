import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import React from 'react';

interface cardData {
  title: string,
  content: string,
  externalLink: string,
  location: string,
}

const cardsData: cardData[] = [

  {
    title: "ADDC",
    content: "Where you can pay your water and electricity bills!",
    externalLink: "https://www.addc.ae/en-US/home/pages/AboutUs.aspx",
    location:"/images/addc.jpg"
  },
  {
    title: "DARB",
    content: "Abu Dhabi’s smart mobility platform for real-time public transport, traffic, and parking information.",
    externalLink: "https://darb.qmobility.ae/RucWeb/login",
    location:"/images/darb.png"
  },
  {
    title:"Abu Dhabi Police",
    content:"The law enforcement agency responsible for maintaining security, traffic regulation, and public safety in Abu Dhabi.",
    externalLink:"https://es.adpolice.gov.ae/trafficservices/",
    location:"/images/adpolice.jpg"
  },
  {
    title:"The Entertainer",
    content:"A lifestyle app offering discounts and buy-one-get-one-free deals on dining, entertainment, and leisure activities",
    externalLink:"https://www.theentertainerme.com/en-ae/abu-dhabi-al-ain",
    location:"/images/entertainer.jpg"
  }

]

export default function CaseTips() {
  return (
    <div className="flex-1 p-5 overflow-auto h-screen">
      <h1 className="text-white text-2xl mb-4"> <b>Tips</b> </h1>
      <h3 className="text-gray-400 text-l mb-6"> The essentials to navigating the UAE</h3>
      <div className="grid grid-cols-2 gap-6">

        {cardsData.map( (card, index) => (
          <Card key={index} className="w-full min-w-[120px] bg-gray-800 border-gray-700 min-h-[200px] select-none cursor-pointer hover:bg-gray-700/50 transition-colors">
            <CardHeader className="text-white text-lg font-semibold mb-2 line-clamp-2">

              <a href={card.externalLink}>
                <img
                  src={card.location} 
                  className="w-full h-36 object-cover rounded-md mb-2">
                </img>
              </a>
              <CardTitle className="text-lg text-center mb-0">
                <p>{card.title}</p>
              </CardTitle>

            </CardHeader>
            <CardContent className="text-gray-400 text-sm line-clamp-3 text-center">
              <p>{card.content}</p>
            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}