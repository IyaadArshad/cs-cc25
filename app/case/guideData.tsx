"use client";
import { motion } from "framer-motion";
import { cardData } from "./guide";
import { BookOpen, Bus, HelpCircle, LibrarySquareIcon } from "lucide-react";
import { JSX } from "react";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.08,
            duration: 0.2,
            when: "beforeChildren"
        } 
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3 }
    },
};

export interface category {
    id: string;
    title: string;
    icon: JSX.Element;
    description: string;
    cards: cardData[];
  }



export const TraditionsData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Emirati Culture and Traditions
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Welcome to the UAE! Understanding Emirati culture will greatly enrich your experience here. Emirati culture is a beautiful blend of Bedouin heritage, Islamic values, and modern progress. Key aspects include hospitality, family ties, and community spirit.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Hospitality</h3>
                <p className="text-gray-400 mb-4">
                    Emiratis are known for their warm hospitality. Don't be surprised if you're invited for coffee or a meal! Traditional Arabic coffee (Gahwa) and dates are common symbols of welcome. Accepting such invitations is a great way to connect with locals.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Family</h3>
                <p className="text-gray-400 mb-4">
                    Family is incredibly important in Emirati culture. You'll notice strong family bonds and respect for elders. Extended families often live together, providing support and unity.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-400 mb-4">
                    Community is highly valued. The Majlis, a traditional gathering place, is where community members discuss important matters and share stories. Participating in community events is a great way to integrate.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Festivals</h3>
                <p className="text-gray-400 mb-4">
                    Keep an eye out for vibrant festivals like Eid al-Fitr and Eid al-Adha, celebrated with prayers, feasts, and charity. National Day is another major event, showcasing Emirati pride. Joining these celebrations will give you a deeper understanding of local traditions.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Oral Traditions</h3>
                <p className="text-gray-400 mb-4">
                    Storytelling and poetry are important aspects of Emirati heritage. Al-Taghrooda (Bedouin poetry) and Al-Ayyala (traditional dance) are celebrated art forms. Experience these traditions at cultural events to learn more about Emirati history and values.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const ClothesData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Traditional Emirati Wear
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                As a newcomer, you'll quickly notice the elegant and practical traditional Emirati clothing. These garments reflect cultural pride, religious values, and the desert environment.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Kandura</h3>
                <p className="text-gray-400 mb-4">
                    The Kandura is the long white robe worn by Emirati men. It's lightweight and perfect for the hot climate, symbolizing purity and simplicity. You'll see men wearing this daily.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Ghutra and Agal</h3>
                <p className="text-gray-400 mb-4">
                    The Ghutra is the headscarf worn by men, held in place by the Agal (black cord). The Ghutra can be white or checkered. Pay attention to how it's worn, as it can sometimes indicate status or origin.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Bisht</h3>
                <p className="text-gray-400 mb-4">
                    The Bisht is a formal cloak worn over the Kandura for special occasions. It signifies prestige and is often made of fine materials with gold or silver embroidery.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Abaya</h3>
                <p className="text-gray-400 mb-4">
                    The Abaya is the long black cloak worn by Emirati women, often paired with a Shayla (headscarf). Modern Abayas come in various designs, blending tradition with contemporary fashion.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Accessories</h3>
                <p className="text-gray-400 mb-4">
                    Emirati attire is often completed with accessories like jewelry, oud-based perfumes, and traditional sandals, adding a personal touch.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const FoodData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Emirati Food
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Exploring Emirati cuisine is a must for any newcomer! It's a delicious mix of Middle Eastern, Persian, and Indian flavors, known for its rich spices and aromas.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Machboos</h3>
                <p className="text-gray-400 mb-4">
                    Machboos is a spiced rice dish, usually cooked with meat, chicken, or fish. It's a staple in Emirati homes, flavored with saffron, cardamom, and cinnamon. Try it at a local restaurant!
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Harees</h3>
                <p className="text-gray-400 mb-4">
                    Harees is a porridge-like dish made from wheat and meat, slow-cooked until tender. It's often served during Ramadan and on special occasions.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Luqaimat</h3>
                <p className="text-gray-400 mb-4">
                    Luqaimat are sweet dumplings drizzled with date syrup – a favorite dessert, especially during Ramadan. You'll often find them served with Arabic coffee.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Balaleet</h3>
                <p className="text-gray-400 mb-4">
                    Balaleet is a unique sweet and savory noodle dish made with vermicelli, sugar, and eggs. It's often enjoyed for breakfast.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Thareed</h3>
                <p className="text-gray-400 mb-4">
                    Thareed is a traditional stew made with meat and vegetables, served over bread. It's a hearty and flavorful dish, perfect for experiencing local flavors.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const ReligionData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Religious Values and Beliefs
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Understanding the religious values of the UAE is key to respecting local culture. Islam plays a central role in Emirati society, influencing values, traditions, and daily life.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Mosques</h3>
                <p className="text-gray-400 mb-4">
                    The UAE is home to stunning mosques, like the Sheikh Zayed Grand Mosque, showcasing Islamic art and architecture. These are community hubs for prayer, education, and social events. Visiting mosques (respectfully) can offer insights into Islamic culture.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Friday Prayers</h3>
                <p className="text-gray-400 mb-4">
                    Friday prayers (Jumu'ah) are significant, bringing the community together for sermons and reflection. You're welcome to observe these prayers respectfully.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Ramadan</h3>
                <p className="text-gray-400 mb-4">
                    Ramadan is a holy month of fasting, prayer, and reflection. It's a time for spiritual growth and community bonding. Join an Iftar (evening meal to break the fast) to experience the spirit of Ramadan.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Generosity and Charity</h3>
                <p className="text-gray-400 mb-4">
                    Generosity is a core Islamic value, shown through Zakat (charitable giving) and Sadaqah (voluntary charity). During Ramadan, public Iftar tents welcome anyone to break their fast.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Hajj</h3>
                <p className="text-gray-400 mb-4">
                    Hajj, the pilgrimage to Mecca, is a significant spiritual journey for Muslims. Many Emiratis aspire to undertake this journey.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const TransportData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Getting Around Abu Dhabi
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Abu Dhabi offers a range of transportation options, making it easy to explore the city and beyond. Whether you prefer public transport, taxis, or driving, you'll find convenient ways to get around.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Buses</h3>
                <p className="text-gray-400 mb-4">
                    The city has an extensive bus network operated by the Department of Transport. Buses are modern, air-conditioned, and affordable. You can pay using a Hafilat card, available at bus stations and kiosks.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Taxis</h3>
                <p className="text-gray-400 mb-4">
                    Taxis are widely available and can be hailed on the street, booked via phone, or through apps like Abu Dhabi Taxi and Careem. All taxis are metered and safe.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Ride-Hailing Apps</h3>
                <p className="text-gray-400 mb-4">
                    Services like Careem and Uber operate in Abu Dhabi, offering convenient and cashless rides.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Ferries</h3>
                <p className="text-gray-400 mb-4">
                    Ferries connect Abu Dhabi city with nearby islands, such as Delma Island. Check schedules in advance.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Airport Transport</h3>
                <p className="text-gray-400 mb-4">
                    Abu Dhabi International Airport is well-connected by taxis, buses, and private transfers. Plan your journey ahead for a smooth arrival or departure.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const DrivingData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Driving in Abu Dhabi
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Driving is a popular way to get around Abu Dhabi. Roads are modern and well-maintained, but it's important to understand local rules and customs.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Licensing</h3>
                <p className="text-gray-400 mb-4">
                    Residents need a UAE driving license. Some nationalities can convert their license, while others must take lessons and a test. Visitors can drive with an international license for a limited period.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Road Rules</h3>
                <p className="text-gray-400 mb-4">
                    Drive on the right. Seat belts are mandatory for all passengers. Speed limits are strictly enforced with cameras. Avoid using your phone while driving.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Parking</h3>
                <p className="text-gray-400 mb-4">
                    Paid parking is common in the city. Use the "Mawaqif" system to pay via SMS or kiosks. Always park in designated areas to avoid fines.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Salik & Tolls</h3>
                <p className="text-gray-400 mb-4">
                    Abu Dhabi uses the "Darb" toll system on certain bridges. Register your vehicle and maintain a balance to avoid penalties.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Car Rentals</h3>
                <p className="text-gray-400 mb-4">
                    Car rental agencies are widely available. You'll need a valid license, passport, and credit card. Inspect the car before renting.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const WalkingData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Walking in Abu Dhabi
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Abu Dhabi is a pedestrian-friendly city, especially in cooler months. Many areas have wide sidewalks, parks, and scenic corniches for walking and jogging.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Popular Walking Areas</h3>
                <p className="text-gray-400 mb-4">
                    The Corniche, Eastern Mangroves, and parks like Umm Al Emarat are great for strolls. Many malls also offer indoor walking spaces.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Safety</h3>
                <p className="text-gray-400 mb-4">
                    Use pedestrian crossings and obey traffic signals. Jaywalking can result in fines. Stay hydrated, especially in summer.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Weather</h3>
                <p className="text-gray-400 mb-4">
                    Plan walks during early morning or evening in summer to avoid the heat. Wear sunscreen and a hat for protection.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const EscooterData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                E-Scooters in Abu Dhabi
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                E-scooters are a fun and eco-friendly way to get around certain parts of Abu Dhabi. They are ideal for short trips and exploring the city at your own pace.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Where to Ride</h3>
                <p className="text-gray-400 mb-4">
                    E-scooters are available in designated zones, such as the Corniche and Reem Island. Always check local rules before riding.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Safety</h3>
                <p className="text-gray-400 mb-4">
                    Wear a helmet, follow traffic rules, and avoid riding on main roads. Use bike lanes where available.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">How to Rent</h3>
                <p className="text-gray-400 mb-4">
                    Download an approved e-scooter app, scan the QR code on the scooter, and follow the instructions. Payment is usually per minute.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const VisaResidencyData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Visas and Residency
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Understanding visa and residency requirements is essential for living in Abu Dhabi. The UAE offers various visa types for tourists, workers, students, and investors.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Tourist Visas</h3>
                <p className="text-gray-400 mb-4">
                    Many nationalities can obtain a visa on arrival. Check the latest requirements before you travel. Tourist visas can be extended for a fee.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Residency Visas</h3>
                <p className="text-gray-400 mb-4">
                    Residency visas are typically sponsored by employers, family members, or through property investment. Medical tests and Emirates ID registration are required.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Golden Visa</h3>
                <p className="text-gray-400 mb-4">
                    The UAE offers a long-term Golden Visa for investors, entrepreneurs, and talented individuals. It provides extended residency and more flexibility.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Emirates ID</h3>
                <p className="text-gray-400 mb-4">
                    All residents must obtain an Emirates ID card, which is used for identification and accessing government services.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const LocalLawsData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Local Laws and Etiquette
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Abu Dhabi has its own set of laws and social customs. Respecting these will help you avoid misunderstandings and enjoy your stay.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Dress Code</h3>
                <p className="text-gray-400 mb-4">
                    Dress modestly in public places. Swimwear is acceptable at pools and beaches, but cover up elsewhere.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Public Behavior</h3>
                <p className="text-gray-400 mb-4">
                    Avoid public displays of affection. Swearing, rude gestures, and drunkenness are not tolerated and can result in fines or arrest.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Alcohol</h3>
                <p className="text-gray-400 mb-4">
                    Alcohol can only be consumed in licensed venues. Do not drink and drive. The legal drinking age is 21.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Photography</h3>
                <p className="text-gray-400 mb-4">
                    Always ask permission before photographing people, especially women. Avoid taking photos of government buildings and military sites.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const DisputeResolutionData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Dispute Resolution
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Abu Dhabi has clear processes for resolving disputes, whether personal, commercial, or employment-related. Understanding your options can help you resolve issues efficiently.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Police</h3>
                <p className="text-gray-400 mb-4">
                    For emergencies, call 999. The police are approachable and can assist with a range of issues, from lost property to serious crimes.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Courts</h3>
                <p className="text-gray-400 mb-4">
                    Abu Dhabi has a modern court system for civil, criminal, and family matters. Legal proceedings are conducted in Arabic, but translation is available.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Mediation</h3>
                <p className="text-gray-400 mb-4">
                    Many disputes can be resolved through mediation, especially in family and commercial cases. The Abu Dhabi Judicial Department offers mediation services.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Labour Disputes</h3>
                <p className="text-gray-400 mb-4">
                    The Ministry of Human Resources and Emiratisation provides support for employment-related disputes. File a complaint online or visit a Tasheel center.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const EmploymentLawData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Employment Law
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                If you plan to work in Abu Dhabi, it's important to understand your rights and responsibilities as an employee.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Contracts</h3>
                <p className="text-gray-400 mb-4">
                    All employees must have a written contract. Read it carefully before signing and keep a copy for your records.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Working Hours</h3>
                <p className="text-gray-400 mb-4">
                    The standard workweek is 48 hours, with reduced hours during Ramadan. Overtime pay is required for extra hours.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Leave</h3>
                <p className="text-gray-400 mb-4">
                    Employees are entitled to annual leave, sick leave, and public holidays. Check your contract for details.
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">End of Service</h3>
                <p className="text-gray-400 mb-4">
                    Employees are entitled to an end-of-service gratuity after completing at least one year of service.
                </p>
            </motion.div>
        </motion.div>
    );
}

export const ArabicPhrasesData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Useful Arabic Phrases
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Learning a few Arabic phrases will help you connect with locals and show respect for the culture. Here are some basics:
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Greetings</h3>
                <p className="text-gray-400 mb-4">
                    - Hello: "Marhaba" (مرحبا)<br/>
                    - Peace be upon you: "As-salamu alaykum" (السلام عليكم)<br/>
                    - Good morning: "Sabah al-khair" (صباح الخير)<br/>
                    - Good evening: "Masa' al-khair" (مساء الخير)
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Polite Expressions</h3>
                <p className="text-gray-400 mb-4">
                    - Thank you: "Shukran" (شكرا)<br/>
                    - Please: "Min fadlak" (من فضلك)<br/>
                    - Excuse me: "Afwan" (عفواً)
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Other Useful Phrases</h3>
                <p className="text-gray-400 mb-4">
                    - Yes: "Na'am" (نعم)<br/>
                    - No: "La" (لا)<br/>
                    - How much?: "Kam ath-thaman?" (كم الثمن؟)<br/>
                    - Where is ...?: "Ayna ...?" (أين ...؟)
                </p>
            </motion.div>
        </motion.div>
    );
}

export const ArabicNumbersData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Arabic Numbers
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Numbers are used everywhere! Here are the Arabic numerals and their pronunciations:
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">0-10</h3>
                <p className="text-gray-400 mb-4">
                    0 - صفر (sifr)<br/>
                    1 - واحد (wahid)<br/>
                    2 - اثنان (ithnan)<br/>
                    3 - ثلاثة (thalatha)<br/>
                    4 - أربعة (arba'a)<br/>
                    5 - خمسة (khamsa)<br/>
                    6 - ستة (sitta)<br/>
                    7 - سبعة (sab'a)<br/>
                    8 - ثمانية (thamaniya)<br/>
                    9 - تسعة (tis'a)<br/>
                    10 - عشرة (ashara)
                </p>
            </motion.div>
        </motion.div>
    );
}

export const IntroductionData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Introducing Yourself in Arabic
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Introducing yourself is one of the first steps to making new friends and connections. Here’s how you can introduce yourself in Arabic, along with some useful phrases.
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Basic Introduction</h3>
                <p className="text-gray-400 mb-4">
                    - My name is ... : "Ismi ..." (اسمي ...)<br/>
                    - I am from ... : "Ana min ..." (أنا من ...)<br/>
                    - I am ... years old: "Umri ... sana" (عمري ... سنة)
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Other Useful Phrases</h3>
                <p className="text-gray-400 mb-4">
                    - Nice to meet you: "Tasharraftu bima'rifatik" (تشرفت بمعرفتك)<br/>
                    - I work as ... : "A'mal ka ..." (أعمل كـ ...)<br/>
                    - I live in ... : "Askun fi ..." (أسكن في ...)
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Examples of Professions</h3>
                <p className="text-gray-400 mb-4">
                    - Engineer: "Muhandis" (مهندس)<br/>
                    - Doctor: "Tabib" (طبيب)<br/>
                    - Teacher: "Muallem" (معلم)<br/>
                    - Nurse: "Mumarrid" (ممرض)<br/>
                    - Student: "Talib" (طالب)<br/>
                    - Manager: "Mudir" (مدير)<br/>
                    - Driver: "Saa'iq" (سائق)<br/>
                    - Chef: "Tabaakh" (طباخ)
                </p>
            </motion.div>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Example</h3>
                <p className="text-gray-400 mb-4">
                    "Ismi Ahmed. Ana min Misr. Askunu fi Abu Dhabi. A'mal ka muhandis. Tasharraftu bima'rifatik."<br/>
                    (My name is Ahmed. I am from Egypt. I live in Abu Dhabi. I work as an engineer. Nice to meet you.)
                </p>
            </motion.div>
        </motion.div>
    );
}

export const SentencesData = () => {
    return (
        <motion.div
            className="bg-black p-4 rounded-lg w-full overflow-y-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-white text-2xl font-bold mb-4"
                variants={itemVariants}
            >
                Forming Simple Sentences
            </motion.h2>
            <motion.p className="text-gray-400 mb-4" variants={itemVariants}>
                Here are some simple Arabic sentences to help you get started with basic communication:
            </motion.p>
            <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold mb-2">Examples</h3>
                <p className="text-gray-400 mb-4">
                    - My name is ... : "Ismi ..." (اسمي ...)<br/>
                    - I am from ... : "Ana min ..." (أنا من ...)<br/>
                    - I don't understand: "La afham" (لا أفهم)<br/>
                    - Can you help me?: "Hal bisa'ta musa'adati?" (هل تستطيع مساعدتي؟)
                </p>
            </motion.div>
        </motion.div>
    );
}

const guideCategories : category[] = [
    {
      id: "culture",
      title: "Culture",
      icon: <BookOpen className="w-4 h-4" />,
      description:
        "Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key.",
      cards: [
        {
          id: "culture-1",
          title: "Emirati Culture and Traditions",
          src: "/img/guide/cultureVillage.webp",
          alt: "Culture Village",
          content:
            "Explore the rich tapestry of Emirati culture, from traditional Bedouin customs to modern artistic expressions. Discover the values of hospitality, family, and community that define the Emirati identity.",
          comp: TraditionsData,
        },
        {
          id: "culture-2",
          title: "Traditional Emirati Wear",
          src: "/img/guide/kandura.jpg",
          alt: "Kandura",
          content:
            "Uncover the significance of traditional Emirati clothing, such as the Kandura for men and the Abaya for women. Learn how these garments reflect cultural pride, religious values, and the desert environment.",
          comp: ClothesData,
        },
        {
          id: "culture-3",
          title: "Emirati Food",
          src: "/img/guide/luqaimat.jpg",
          alt: "Luqaimat",
          content:
            "Indulge in the flavors of Emirati cuisine, a delightful fusion of Middle Eastern, Persian, and Indian influences. From savory dishes like Machboos to sweet treats like Luqaimat, experience the culinary heritage of the UAE.",
          comp: FoodData,
        },
        {
          id: "culture-4",
          title: "Religious Values and Beliefs",
          src: "/img/guide/zayedMosque.jpg",
          alt: "Sheikh Zayed Mosque Main Hall",
          content:
            "Delve into the role of Islam in shaping Emirati society and values. Discover the importance of faith, compassion, and generosity in daily life, and explore the stunning mosques and religious sites that showcase Islamic art and architecture.",
          comp: ReligionData,
        },
      ],
    },
    {
      id: "getting-around",
      title: "Getting Around",
      icon: <Bus className="w-4 h-4" />,
      description:
        "Transportation options and guidance for navigating Abu Dhabi with ease.",
      cards: [
        {
          id: "transport-1",
          title: "Public Transport",
          src: "/img/guide/public-transport.jpg",
          alt: "Public Transport",
          content:
            "Information about buses, taxis, and other public transportation options in Abu Dhabi.",
          comp: TransportData,
        },
        {
          id: "transport-2",
          title: "Driving in Abu Dhabi",
          src: "/img/guide/driving.jpg",
          alt: "Driving",
          content:
            "Essential information for renting a car and driving in Abu Dhabi.",
          comp: DrivingData,
        },
        {
          id: "transport-3",
          title: "Walking & Cycling",
          src: "/img/guide/cycling.jpg",
          alt: "Cycling",
          content:
            "Options for walking and cycling around the city and popular recreational routes.",
          comp: WalkingData,
        },
        {
          id: "transport-4",
          title: "E-Scooters",
          src: "/img/guide/escooter.jpg",
          alt: "E-Scooter",
          content:
            "Learn about using e-scooters in Abu Dhabi, including safety tips, regulations, and where to find them for convenient short-distance travel.",
          comp: EscooterData,
        },
      ],
    },
    {
      id: "legal-advice",
      title: "Legal Advice",
      icon: <HelpCircle className="w-4 h-4" />,
      description:
        "Essential legal information and resources for residents and visitors in Abu Dhabi.",
      cards: [
        {
          id: "legal-1",
          title: "Visa & Residency",
          src: "/img/guide/visa-residency.jpg",
          alt: "Visa and Residency",
          content:
            "Guidance on visa types, residency permits, and legal requirements for staying in Abu Dhabi.",
          comp: VisaResidencyData,
        },
        {
          id: "legal-2",
          title: "Employment Law",
          src: "/img/guide/employment-law.jpg",
          alt: "Employment Law",
          content:
            "Overview of labor rights, contracts, and workplace regulations in the UAE.",
          comp: EmploymentLawData,
        },
        {
          id: "legal-3",
          title: "Local Laws & Customs",
          src: "/img/guide/local-laws.jpg",
          alt: "Local Laws",
          content:
            "Important local laws, customs, and regulations every visitor and resident should know.",
          comp: LocalLawsData,
        },
        {
          id: "legal-4",
          title: "Dispute Resolution",
          src: "/img/guide/dispute-resolution.jpg",
          alt: "Dispute Resolution",
          content:
            "Information on how to resolve disputes, including mediation and legal assistance.",
          comp: DisputeResolutionData,
        }
      ],
    },
    {
      id: "learn-arabic",
      title: "Learn Arabic",
      icon: <LibrarySquareIcon className="w-4 h-4" />,
      description: "Learn some basic Arabic phrases to enhance your experience.",
      cards: [
        {
          id: "arabic-1",
          title: "Basic Phrases for Everyday life",
          src: "/img/guide/arabic-letters.jpg",
          alt: "Arabic Phrases",
          content: "Learn essential Arabic greetings and phrases.",
          comp: ArabicPhrasesData,
        },
        {
          id: "arabic-2",
          title: "Numbers & Counting",
          src: "/img/guide/arabic-numbers.jpg",
          alt: "Arabic Numbers",
          content: "Learn how to count in Arabic.",
          comp: ArabicNumbersData,
        },
        {
          id: "arabic-3",
          title: "Forming Sentences",
          src: "/img/guide/forming-sentences.jpg",
          alt: "Forming Sentences",
          content: "Learn how to form sentences.",
          comp: SentencesData,
        },
        {
          id: "arabic-4",
          title: "How to introduce yourself",
          src: "/img/guide/introduction.jpg",
          alt: "Introduction",
          content: "Learn how to introduce yourself in Arabic.",
          comp: IntroductionData,
        }
      ],
    },
  ];