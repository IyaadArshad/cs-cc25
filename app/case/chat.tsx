"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Maximize2, Minimize2, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import CustomMarkdown from "@/components/custom-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessage: Message = {
  role: "assistant",
  content:
    "# Heading 1\n" +
    "## Heading 2\n" +
    "### Heading 3\n" +
    "#### Heading 4\n" +
    "##### Heading 5\n" +
    "###### Heading 6\n" +
    "This is a **bold** text.\n" +
    "This is an *italic* text.\n" +
    "This is a ***bold and italic*** text.\n" +
    "- Bullet point item 1\n" +
    "- Bullet point item 2\n" +
    "- Bullet point item 3\n" +
    "1. Numbered list item 1\n" +
    "2. Numbered list item 2\n" +
    "3. Numbered list item 3\n" +
    "This is a [link](https://example.com).\n" +
    "This is an image: ![Image](https://example.com/image.png)\n" +
    "> This is a blockquote.\n" +
    "```js\n" +
    "console.log('This is a code block.');\n" +
    "```\n" +
    "This is a table:\n" +
    "| Header 1 | Header 2 | Header 3 |\n" +
    "|----------|----------|----------|\n" +
    "| Row 1    | Row 1    | Row 1    |\n" +
    "| Row 2    | Row 2    | Row 2    |\n" +
    "| Row 3    | Row 3    | Row 3    |\n" +
    "This is a ~~strikethrough~~ text.\n" +
    "This is a text with a footnote[^1].\n" +
    "[^1]: This is the footnote.\n" +
    "This is a text with a superscript: 2^10^.\n" +
    "This is a text with a subscript: H~2~O.\n" +
    "This is a text with an abbreviation: HTML.\n" +
    "This is a text with a mark: ==mark==.\n" +
    "This is a text with a definition: Apple:: A fruit.\n" +
    "This is a text with a math block:\n" +
    "$$\n" +
    "\\frac{1}{2}\n" +
    "$$\n" +
    "This is a text with a inline math: $\\frac{1}{2}$\n" +
    "This is a text with a mermaid diagram:\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    A[Christmas] -->|Get money| B(Go shopping)\n" +
    "    B --> C{Let me think}\n" +
    "    C -->|One| D[Laptop]\n" +
    "    C -->|Two| E[iPhone]\n" +
    "    C -->|Three| F[Car]\n" +
    "```\n" +
    "This is a text with a flowchart:\n" +
    "```flow\n" +
    "st=>start: Start\n" +
    "e=>end: End\n" +
    "op1=>operation: Operation 1\n" +
    "op2=>operation: Operation 2\n" +
    "op3=>operation: Operation 3\n" +
    "cond=>condition: Yes or No?\n" +
    "st->op1->cond\n" +
    "cond(yes)->op2->e\n" +
    "cond(no)->op3->e\n" +
    "```\n" +
    "Welcome to **Abu Dhabi! I'm here to assist you with** your settlement process. Whether you need information about visas, housing, schools, or any other aspect of settling in, I'm here to help. What would you like to know about first? Feel free to ask about the visa process, finding accommodation, enrolling in schools, healthcare options, or any other topics related to your move to Abu Dhabi.",
  timestamp: new Date().toLocaleTimeString(),
};

interface ChatInterfaceProps {
  onExpand: () => void;
  isExpanded: boolean;
}

export default function ChatInterface({
  onExpand,
  isExpanded,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [typingWords, setTypingWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const [isContentLoading, setIsContentLoading] = useState(true);

  useEffect(() => {
    setIsContentLoading(true);
    const timer = setTimeout(() => setIsContentLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const words = initialMessage.content.split(" ");
    let index = 0;
    let typedWords: string[] = [];
    let charCount = 0;
    let additionalCharCount = 0;

    const typeWord = () => {
      if (index < words.length) {
        const word = words[index];
        typedWords.push(word);
        setTypingWords([...typedWords]);
        charCount += word.length + 1; // +1 for the space

        index++;
        let delay = 100; // Adjust speed here

        // Check if we should pause
        if (charCount >= 149) {
          const lastWord = typedWords[typedWords.length - 1];
          if (/[.,!?;:]/.test(lastWord.slice(-1))) {
            delay = 1000; // Pause for 1 second
            charCount = 0; // Reset character count after pause
            additionalCharCount = 0; // Reset additional character count
          } else {
            additionalCharCount += word.length + 1;
            if (additionalCharCount >= 50) {
              // Force pause if no punctuation found within next 50 characters
              delay = 1000; // Pause for 1 second
              charCount = 0; // Reset character count after pause
              additionalCharCount = 0; // Reset additional character count
            }
          }
        }

        setTimeout(typeWord, delay);
      } else {
        setMessages((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], content: typedWords.join(" ") };
          return updated;
        });
        setTimeout(() => setIsTyping(false), 1000); // Remove cursor after 1 second
      }
    };

    typeWord();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [scrollAreaRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const payload = {
      messages: [...messages, newUserMessage].map(({ role, content }) => ({
        role,
        content,
      })),
      cookies: {
        id: {
          name: "Iyaad",
          location: "Abu Dhabi, UAE",
          comingFrom: "Sri Lanka",
        },
        tasks: {
          visa: "visa-work",
          school: "school-confirmed",
          dlicense: "dlicense-confimed",
          insurance: "insurance-confirmed",
          sim: "sim-confirmed",
          bank: "bank-confirmed",
        },
      },
    };

    try {
      const response = await fetch("/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      if (data.message) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleExpand = () => {
    scrollAreaRef.current?.scrollTo(0, 0); // Reset scroll position before transition
    onExpand();
  };

  return (
    <motion.div 
      className="flex overflow-y-auto flex-col h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header - Only show when not expanded */}
      {!isExpanded && (
        <div className="flex items-center p-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white flex items-center">
              Mutasil AI Chat
              <Sparkles className="ml-2 h-6 w-6 [&>path]:fill-transparent [&>path]:stroke-[url(#sparkleGradient)]" />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="50%" stopColor="#e0f0ff" />
                    <stop offset="100%" stopColor="#ffe0f0" />
                  </linearGradient>
                </defs>
              </svg>
            </h1>
          </div>
          <div className="ml-auto" />
          <button
            onClick={handleExpand}
            className="hidden sm:flex items-center justify-center text-white hover:opacity-70 transition-opacity"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Minimize button when expanded */}
      {isExpanded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleExpand}
          className="hidden sm:flex absolute top-10 right-10 text-white hover:opacity-70 transition-opacity z-10"
        >
          <Minimize2 className="h-5 w-5" />
        </motion.button>
      )}

      {/* Main content area */}
      <div className="relative flex-1 flex flex-col">
        {isContentLoading ? (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
    <Loader2 className="h-8 w-8 text-[#2563eb] animate-spin" />
    <div className="text-center space-y-2 max-w-sm px-4">
      <h3 className="text-white text-lg font-medium">
        {isExpanded ? "Switching to desktop view" : "Switching to mobile view"}
      </h3>
      <p className="text-gray-400 text-sm">
        {isExpanded 
          ? "Expanding the chat interface for a better desktop experience..."
          : "Optimizing the interface for mobile view..."}
      </p>
    </div>
  </div>
        ) : (
          <>
            <ScrollArea
              className={`flex-1 ${isExpanded ? "pt-4" : "pt-2"} px-4 pb-4`}
              ref={scrollAreaRef}
            >
              <div className={`space-y-4 ${!isExpanded ? "max-w-[600px] mx-auto" : ""}`}>
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={`message-${index}-${message.timestamp}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${isExpanded && index === 0 ? "mt-8" : ""}`}
                    >
                      <div
                        className={`flex items-start gap-2 ${
                          !isExpanded
                            ? "max-w-[80%]"
                            : message.role === "assistant"
                            ? "max-w-[85%] pr-12"
                            : "max-w-[75%]"
                        } ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className="w-auto h-8">
                          <AvatarImage
                            src={
                              message.role === "user"
                                ? "http://localhost:3000/images/default_pfp.png"
                                : "http://localhost:3000/images/assistant.png"
                            }
                          />
                        </Avatar>
                        <div
                          className={`flex flex-col ${
                            message.role === "user" ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-gradient-to-br from-[#2563eb] to-[#4C1D95] text-white"
                            }`}
                          >
                            <div className="text-sm">
                              {isTyping &&
                              message.role === "assistant" &&
                              index === 0 ? (
                                <>
                                  <CustomMarkdown isTyping>
                                    {typingWords.join(" ")}
                                  </CustomMarkdown>
                                  <span className="inline-block w-3 h-3 bg-white rounded-full ml-1 animate-pulse"></span>
                                </>
                              ) : (
                                <CustomMarkdown>{message.content}</CustomMarkdown>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
  
            {/* Input area */}
            <div className="p-4 bg-[#12121d] sticky bottom-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/60 chat-input focus:cursor-text border-white/20"
                />
                <Button
                  size="icon"
                  type="submit"
                  className="border-white/20 bg-[#2563eb]/90 hover:bg-[#2156c9]/80"
                >
                  <Send className="h-4 text-white w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}