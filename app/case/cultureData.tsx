export interface cardData {
    title: string;
    content: string;
    src: string;
    alt: string;
    comp: string;
}

export const cardsData: cardData[] = [
    {
      title: "Emirati Culture and Traditions",
      content:
        "Explore the rich tapestry of Emirati culture, from traditional Bedouin customs to modern artistic expressions. Discover the values of hospitality, family, and community that define the Emirati identity.",
      src: "/img/culture/cultureVillage.webp",
      alt: "Culture Village",
      comp: "TraditionsData"
    },
    {
      title: "Traditional Emirati Wear",
      content:
        "Uncover the significance of traditional Emirati clothing, such as the Kandura for men and the Abaya for women. Learn how these garments reflect cultural pride, religious values, and the desert environment.",
      src: "/img/culture/kandura.jpg",
      alt: "Kandura",
      comp: "ClothesData"
    },
    {
      title: "Emirati Food",
      content:
        "Indulge in the flavors of Emirati cuisine, a delightful fusion of Middle Eastern, Persian, and Indian influences. From savory dishes like Machboos to sweet treats like Luqaimat, experience the culinary heritage of the UAE.",
      src: "/img/culture/luqaimat.jpg",
      alt: "Luqaimat",
      comp: 'FoodData'
    },
    {
      title: "Religious Values and Beliefs",
      content:
        "Delve into the role of Islam in shaping Emirati society and values. Discover the importance of faith, compassion, and generosity in daily life, and explore the stunning mosques and religious sites that showcase Islamic art and architecture.",
      src: "/img/culture/zayedMosque.jpg",
      alt: "Sheikh Zayed Mosque Main Hall",
      comp: "ReligionData"
    },
  ];

export const TraditionsData = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg w-full overflow-y-auto max-h-[80vh]">
            <h2 className="text-white text-2xl font-bold mb-4">Emirati Culture and Traditions</h2>
            <p className="text-gray-400 mb-4">
                As an expat in Dubai, understanding Emirati culture and traditions can help you integrate and appreciate the local way of life. Emirati culture is a rich blend of Bedouin traditions, Islamic values, and modern influences. It is deeply rooted in hospitality, family, and community, which are the cornerstones of Emirati identity.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Hospitality</h3>
                <p className="text-gray-400 mb-2">
                    Hospitality is a cornerstone of Emirati culture. As an expat, you may often be invited to share a meal or coffee with locals. Guests are welcomed with traditional Arabic coffee (Gahwa) and dates, symbolizing warmth and friendship. Hosting guests is considered an honor, and Emiratis go to great lengths to ensure their comfort.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Family</h3>
                <p className="text-gray-400 mb-2">
                    The family unit is central to Emirati life. Extended families often live together, fostering a sense of unity and support. Respect for elders is deeply ingrained, and family gatherings are frequent and cherished. As an expat, you may notice the strong emphasis on family values in daily interactions.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-400 mb-2">
                    Community gatherings, such as weddings and religious celebrations, are integral to social life. The Majlis, a traditional sitting area, serves as a space for community members to discuss important matters, share stories, and strengthen bonds. Expats are often welcomed to participate in these gatherings, offering a unique opportunity to connect with locals.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Festivals</h3>
                <p className="text-gray-400 mb-2">
                    Emirati culture is marked by vibrant festivals such as Eid al-Fitr and Eid al-Adha. These occasions are celebrated with communal prayers, feasts, and acts of charity. National Day is another significant event, showcasing Emirati pride and unity. As an expat, participating in these festivals can provide a deeper understanding of local traditions.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-2">Oral Traditions</h3>
                <p className="text-gray-400 mb-2">
                    Storytelling and poetry are vital aspects of Emirati culture. Al-Taghrooda, a form of Bedouin poetry, and Al-Ayyala, a traditional dance, are celebrated cultural expressions. These art forms preserve history and values through generations. Expats can experience these traditions during cultural festivals and events.
                </p>
            </div>
        </div>
    );
}

export const ClothesData = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg w-full overflow-y-auto max-h-[80vh]">
            <h2 className="text-white text-2xl font-bold mb-4">Traditional Emirati Wear</h2>
            <p className="text-gray-400 mb-4">
                As an expat in Dubai, you will notice the elegance and practicality of traditional Emirati clothing. These garments reflect cultural pride, religious values, and the desert environment.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Kandura</h3>
                <p className="text-gray-400 mb-2">
                    The Kandura is a long white robe worn by Emirati men. It is lightweight and suitable for the desert climate, symbolizing purity and simplicity. The length and style of the Kandura can vary slightly between the emirates, reflecting regional identities.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Ghutra and Agal</h3>
                <p className="text-gray-400 mb-2">
                    The Ghutra is a traditional headscarf worn by men, secured with an Agal, a black cord. The Ghutra can be white or checkered, and its style of wear can signify the wearer’s status or origin. As an expat, you may see these worn during formal events or daily life.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Bisht</h3>
                <p className="text-gray-400 mb-2">
                    The Bisht is a cloak worn over the Kandura during formal occasions, symbolizing prestige and authority. It is often made from fine materials like wool or camel hair and is adorned with gold or silver embroidery.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Abaya</h3>
                <p className="text-gray-400 mb-2">
                    The Abaya is a long black cloak worn by Emirati women. It is elegant and modest, often paired with a Shayla (headscarf). Modern Abayas come in various designs, incorporating intricate embroidery and embellishments. As an expat, you may notice the balance of tradition and modernity in these garments.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-2">Accessories</h3>
                <p className="text-gray-400 mb-2">
                    Emirati attire is often complemented with accessories like jewelry, perfumes made from oud, and traditional sandals. These elements add a touch of sophistication and individuality.
                </p>
            </div>
        </div>
    );
}

export const FoodData = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg w-full overflow-y-auto max-h-[80vh]">
            <h2 className="text-white text-2xl font-bold mb-4">Emirati Food</h2>
            <p className="text-gray-400 mb-4">
                As an expat in Dubai, exploring Emirati cuisine is a delightful way to connect with the local culture. The food is a fusion of Middle Eastern, Persian, and Indian influences, characterized by rich flavors and aromatic spices.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Machboos</h3>
                <p className="text-gray-400 mb-2">
                    Machboos is a spiced rice dish often cooked with meat, chicken, or fish. It is a staple in Emirati households and is flavored with a blend of spices like saffron, cardamom, and cinnamon. As an expat, you can find this dish in many local restaurants.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Harees</h3>
                <p className="text-gray-400 mb-2">
                    Harees is a porridge-like dish made from wheat and meat, slow-cooked to perfection. It is a popular dish during Ramadan and special occasions. Many expats enjoy this dish during cultural festivals.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Luqaimat</h3>
                <p className="text-gray-400 mb-2">
                    Luqaimat are sweet dumplings drizzled with date syrup. They are a favorite dessert, especially during Ramadan, and are often served with Arabic coffee. Expats often find these at food markets and cultural events.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Balaleet</h3>
                <p className="text-gray-400 mb-2">
                    Balaleet is a sweet and savory noodle dish made with vermicelli, sugar, and eggs. It is often served as a breakfast dish. Expats can enjoy this dish at traditional Emirati breakfast spots.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-2">Thareed</h3>
                <p className="text-gray-400 mb-2">
                    Thareed is a traditional Emirati stew made with meat and vegetables, served over pieces of bread. It is a hearty and flavorful dish enjoyed by families. Expats can experience this dish during Ramadan or at local eateries.
                </p>
            </div>
        </div>
    );
}

export const ReligionData = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg w-full overflow-y-auto max-h-[80vh]">
            <h2 className="text-white text-2xl font-bold mb-4">Religious Values and Beliefs</h2>
            <p className="text-gray-400 mb-4">
                As an expat in Dubai, understanding the religious values and beliefs of the UAE can help you navigate and respect the local culture. Islam plays a central role in Emirati society, shaping its values, traditions, and daily life.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Mosques</h3>
                <p className="text-gray-400 mb-2">
                    The UAE is home to stunning mosques, such as the Sheikh Zayed Grand Mosque, which showcases Islamic art and architecture. Mosques serve as community centers where people gather for prayers, education, and social events. As an expat, visiting these mosques can provide insight into Islamic culture.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Friday Prayers</h3>
                <p className="text-gray-400 mb-2">
                    Friday prayers, known as Jumu'ah, are particularly significant, bringing the community together to listen to sermons and reflect on spiritual teachings. Expats are welcome to observe or participate in these prayers.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Ramadan</h3>
                <p className="text-gray-400 mb-2">
                    Ramadan is a holy month of fasting, prayer, and reflection. It is a time for spiritual growth and community bonding, with nightly Taraweeh prayers and communal Iftar meals. Expats can join Iftar events to experience the spirit of Ramadan.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">Generosity and Charity</h3>
                <p className="text-gray-400 mb-2">
                    Generosity is a key Islamic value, reflected in practices like Zakat (charitable giving) and Sadaqah (voluntary charity). Public Iftar tents are set up during Ramadan to welcome anyone who wishes to break their fast, including expats.
                </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-2">Hajj</h3>
                <p className="text-gray-400 mb-2">
                    Hajj, the pilgrimage to Mecca, is a significant spiritual journey for Muslims. It strengthens faith and community bonds, and many Emiratis aspire to undertake this journey at least once in their lifetime. Expats who are Muslim may also participate in this sacred journey.
                </p>
            </div>
        </div>
    );
}