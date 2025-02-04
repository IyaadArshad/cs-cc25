import { NextResponse } from "next/server";

// Remove or comment out OpenAI package import and initialization
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bio = searchParams.get("bio");
    const origin = searchParams.get("originCountry");
    console.log("Bio ->", bio);
    console.log("Origin ->", origin);

    const userPrompt = `"origin_country"="${origin}","description"="${bio}"`;

    const payload = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              text: "You look at people's descriptions and determine whether they like certain hobbies or not. Based on the user's country and social media bio, put boolean value true for potential interests. Maximum of 15 interests. Minimum of 5 interests. Ignore any interests that the user may not be interested in.",
              type: "text",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              text: userPrompt,
              type: "text",
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "hobbies_interest",
          schema: {
            type: "object",
            required: ["interests"],
            properties: {
              interests: {
                type: "object",
                required: [
                  "cooking", "dancing", "painting", "photography", "travelling", "writing",
                  "badminton", "basketball", "cricket", "football", "golf", "hockey",
                  "tennis", "baking", "bird_watching", "blogging", "board_games",
                  "camping", "chess", "collecting", "cycling", "diy", "diving", "gaming",
                  "karaoke", "meditation", "mountain_biking", "piano", "podcasting",
                  "reading", "running", "soccer", "swimming", "table_tennis", "tai_chi",
                  "ukulele", "video_editing", "volleyball", "watercolor", "weightlifting",
                  "wood_working", "yoga", "astronomy", "calligraphy", "candle_making",
                  "card_games", "language_learning", "vlogging", "comic_reading",
                  "anime_watching", "social_media", "book_club", "bread_making",
                  "cheese_making", "ice_cream_making", "cake_decorating",
                  "food_photography", "meal_prep", "roller_skating", "skateboarding",
                  "bowling", "darts", "ping_pong", "storytelling", "voice_acting",
                  "standup_comedy", "improv", "debate", "public_speaking", "mentoring",
                  "teaching", "music", "online_courses", "programming"
                ],
                properties: {
                  cooking: { type: "boolean" },
                  dancing: { type: "boolean" },
                  painting: { type: "boolean" },
                  photography: { type: "boolean" },
                  travelling: { type: "boolean" },
                  writing: { type: "boolean" },
                  badminton: { type: "boolean" },
                  basketball: { type: "boolean" },
                  cricket: { type: "boolean" },
                  football: { type: "boolean" },
                  golf: { type: "boolean" },
                  hockey: { type: "boolean" },
                  tennis: { type: "boolean" },
                  baking: { type: "boolean" },
                  bird_watching: { type: "boolean" },
                  blogging: { type: "boolean" },
                  board_games: { type: "boolean" },
                  camping: { type: "boolean" },
                  chess: { type: "boolean" },
                  collecting: { type: "boolean" },
                  cycling: { type: "boolean" },
                  diy: { type: "boolean" },
                  diving: { type: "boolean" },
                  gaming: { type: "boolean" },
                  karaoke: { type: "boolean" },
                  meditation: { type: "boolean" },
                  mountain_biking: { type: "boolean" },
                  piano: { type: "boolean" },
                  podcasting: { type: "boolean" },
                  reading: { type: "boolean" },
                  running: { type: "boolean" },
                  soccer: { type: "boolean" },
                  swimming: { type: "boolean" },
                  table_tennis: { type: "boolean" },
                  tai_chi: { type: "boolean" },
                  ukulele: { type: "boolean" },
                  video_editing: { type: "boolean" },
                  volleyball: { type: "boolean" },
                  watercolor: { type: "boolean" },
                  weightlifting: { type: "boolean" },
                  wood_working: { type: "boolean" },
                  yoga: { type: "boolean" },
                  astronomy: { type: "boolean" },
                  calligraphy: { type: "boolean" },
                  candle_making: { type: "boolean" },
                  card_games: { type: "boolean" },
                  language_learning: { type: "boolean" },
                  vlogging: { type: "boolean" },
                  comic_reading: { type: "boolean" },
                  anime_watching: { type: "boolean" },
                  social_media: { type: "boolean" },
                  book_club: { type: "boolean" },
                  bread_making: { type: "boolean" },
                  cheese_making: { type: "boolean" },
                  ice_cream_making: { type: "boolean" },
                  cake_decorating: { type: "boolean" },
                  food_photography: { type: "boolean" },
                  meal_prep: { type: "boolean" },
                  roller_skating: { type: "boolean" },
                  skateboarding: { type: "boolean" },
                  bowling: { type: "boolean" },
                  darts: { type: "boolean" },
                  ping_pong: { type: "boolean" },
                  storytelling: { type: "boolean" },
                  voice_acting: { type: "boolean" },
                  standup_comedy: { type: "boolean" },
                  improv: { type: "boolean" },
                  debate: { type: "boolean" },
                  public_speaking: { type: "boolean" },
                  mentoring: { type: "boolean" },
                  teaching: { type: "boolean" },
                  music: { type: "boolean" },
                  online_courses: { type: "boolean" },
                  programming: { type: "boolean" }
                },
                description: "Potential interests based on country and bio.",
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          },
          strict: true,
        },
      },
      temperature: 0.99,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error("OpenAI API error:", errorText);
      throw new Error("OpenAI API call error");
    }

    const responseData = await openAIResponse.json();
    console.log("OpenAI Response:", responseData);
    if (!responseData?.choices || responseData.choices.length === 0 || !responseData.choices[0]?.message?.content) {
      console.error("Invalid response structure:", responseData);
      throw new Error("Invalid OpenAI response structure");
    }

    const interestReferences: { [key: string]: string } = {
        "cooking": "Cooking 🍳",
        "dancing": "Dancing 💃",
        "painting": "Painting 🎨",
        "photography": "Photography 📷",
        "travelling": "Travelling ✈️",
        "writing": "Writing ✍️",
        "badminton": "Badminton 🏸",
        "basketball": "Basketball 🏀",
        "cricket": "Cricket 🏏",
        "football": "Football ⚽",
        "golf": "Golf ⛳",
        "hockey": "Hockey 🏒",
        "tennis": "Tennis 🎾",
        "baking": "Baking 🧁",
        "bird_watching": "Bird Watching 🐦",
        "blogging": "Blogging 📝",
        "board_games": "Board Games 🎲",
        "camping": "Camping ⛺",
        "chess": "Chess ♟️",
        "collecting": "Collecting 📦",
        "cycling": "Cycling 🚴",
        "diy": "DIY 🔨",
        "diving": "Diving 🤿",
        "gaming": "Gaming 🎮",
        "karaoke": "Karaoke 🎤",
        "meditation": "Meditation 🧘",
        "mountain_biking": "Mountain Biking 🚵",
        "piano": "Piano 🎹",
        "podcasting": "Podcasting 🎙️",
        "reading": "Reading 📚",
        "running": "Running 🏃",
        "soccer": "Soccer ⚽",
        "swimming": "Swimming 🏊",
        "table_tennis": "Table Tennis 🏓",
        "tai_chi": "Tai Chi ☯️",
        "ukulele": "Ukulele 🪕",
        "video_editing": "Video Editing 🎬",
        "volleyball": "Volleyball 🏐",
        "watercolor": "Watercolor 🎨",
        "weightlifting": "Weightlifting 🏋️",
        "wood_working": "Wood Working 🪚",
        "yoga": "Yoga 🧘",
        "astronomy": "Astronomy 🔭",
        "calligraphy": "Calligraphy ✒️",
        "candle_making": "Candle Making 🕯️",
        "card_games": "Card Games 🃏",
        "language_learning": "Language Learning 🗣️",
        "vlogging": "Vlogging 📹",
        "comic_reading": "Comic Reading 📖",
        "anime_watching": "Anime Watching 📺",
        "social_media": "Social Media 📱",
        "book_club": "Book Club 📚",
        "bread_making": "Bread Making 🍞",
        "cheese_making": "Cheese Making 🧀",
        "ice_cream_making": "Ice Cream Making 🍦",
        "cake_decorating": "Cake Decorating 🎂",
        "food_photography": "Food Photography 📸",
        "meal_prep": "Meal Prep 🍱",
        "roller_skating": "Roller Skating 🛼",
        "skateboarding": "Skateboarding 🛹",
        "bowling": "Bowling 🎳",
        "darts": "Darts 🎯",
        "ping_pong": "Ping Pong 🏓",
        "storytelling": "Storytelling 📖",
        "voice_acting": "Voice Acting 🎙️",
        "standup_comedy": "Standup Comedy 😂",
        "improv": "Improv 🎭",
        "debate": "Debate 🗣️",
        "public_speaking": "Public Speaking 🎤",
        "mentoring": "Mentoring 👨‍🏫",
        "teaching": "Teaching 👩‍🏫",
        "music": "Music 🎵",
        "online_courses": "Online Courses 💻",
        "programming": "Programming 👨‍💻"
      }

    // Parse and filter the true interests using interestReferences mapping
    const responseContent = JSON.parse(responseData.choices[0].message.content as string);
    const trueInterests = Object.entries(responseContent.interests)
      .filter(([key, value]) => value === true)
      .map(([key]) => interestReferences[key]);

    // Final output formatted as required
    const output = {
      interests: trueInterests, // array of keys that have true value
    };

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    // ...error handling...
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}