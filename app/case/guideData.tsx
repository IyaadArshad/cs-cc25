"use client";
import { motion } from "framer-motion";
import { cardData } from "./guide";


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
}

export const DrivingData = () => {

}

export const WalkingData = () => {

}

export const EscooterData = () => {

}

export const VisaResidencyData = () => {

}

export const LocalLawsData = () => {
}

export const DisputeResolutionData = () => {
}

export const EmploymentLawData = () => {
}

export const ArabicPhrasesData = () => {
}

export const ArabicNumbersData = () => {
}

export const IntroductionData = () => {
}

export const SentencesData = () => {
}