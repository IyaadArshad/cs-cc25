"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import CustomMarkdown from "@/components/custom-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessage: Message = {
  role: "assistant",
  content: "Hello! 😊 How can I assist you in settling into your new life in Abu Dhabi? 🏙️",
  timestamp: new Date().toLocaleTimeString(),
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingWords, setTypingWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!chatStarted || !hasRun.current) return;
    
    // Start typing animation only after chat has started
    hasRun.current = true;
    setIsTyping(true);

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
        let delay = 40; // Adjust typing speed (faster)

        // Check if we should pause
        if (charCount >= 80) { // Reduced character count before pause
          const lastWord = typedWords[typedWords.length - 1];
          if (/[.,!?;:]/.test(lastWord.slice(-1))) {
            delay = 400; // Shorter pause for punctuation
            charCount = 0;
            additionalCharCount = 0;
          } else {
            additionalCharCount += word.length + 1;
            if (additionalCharCount >= 30) { // Shorter distance before force pause
              delay = 400;
              charCount = 0;
              additionalCharCount = 0;
            }
          }
        }

        setTimeout(typeWord, delay);
      } else {
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { ...updated[updated.length - 1], content: typedWords.join(" ") };
          }
          return updated;
        });
        setTimeout(() => setIsTyping(false), 500); // Remove cursor after typing
      }
    };

    typeWord();
  }, [chatStarted]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, typingWords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    const newUserMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    // If this is the first message, start the chat
    if (!chatStarted) {
      setChatStarted(true);
      setMessages([
        newUserMessage,
        {
          role: "assistant",
          content: "",
          timestamp: new Date().toLocaleTimeString(),
        }
      ]);
    } else {
      setMessages((prev) => [...prev, newUserMessage]);
      
      // Add a temporary loading message from assistant
      setMessages((prev) => [
        ...prev, 
        {
          role: "assistant",
          content: "",
          timestamp: new Date().toLocaleTimeString(),
        }
      ]);
    }
    
    setInput("");

    // Prepare the payload for API
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
      
      // Update the last message with the response
      if (data.message) {
        setMessages((prev) => {
          const updated = [...prev];
          // Update the last message which should be the assistant
          if (updated.length > 0 && updated[updated.length - 1].role === "assistant") {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: data.message,
            };
          }
          return updated;
        });
        
        // Start typing animation for the new response
        setIsTyping(true);
        setTypingWords([]);
        const words = data.message.split(" ");
        let index = 0;
        let typedWords: string[] = [];
        
        const typeWord = () => {
          if (index < words.length) {
            typedWords.push(words[index]);
            setTypingWords([...typedWords]);
            index++;
            setTimeout(typeWord, 40); // Fast typing speed
          } else {
            setIsTyping(false);
          }
        };
        
        typeWord();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Update the last message to show an error
      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].role === "assistant") {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: "Sorry, I couldn't process your request. Please try again. 😔",
          };
        }
        return updated;
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!chatStarted) {
    return (
      <>
        <div className="absolute top-0 left-0 p-4">
        </div>
        <motion.div
          className="flex flex-col items-center justify-center h-full space-y-4 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden p-1">
              <Avatar className="w-full h-full">
                <AvatarImage src="/images/assistant.png" />
              </Avatar>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-3 w-full max-w-md"
          >
            <h1 className="text-3xl font-bold text-white">
              What can I help with?
            </h1>
            <div className="p-4 rounded-lg">
              <form
                className="flex gap-2"
                onSubmit={handleSubmit}
              >
                <Input
                  placeholder="Ask me anything about Abu Dhabi..."
                  className="flex-1 bg-gray-800/60 chat-input focus:cursor-text border-white/20"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button
                  size="icon"
                  type="submit"
                  className="border-white/20 bg-[#2563eb]/90 hover:bg-[#2156c9]/80"
                  disabled={!input.trim() || isSubmitting}
                >
                  <Send className="h-4 text-white w-4" />
                  <span className="sr-only">Start chat</span>
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center p-4"
      >
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
      </motion.div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-auto h-8">
                    <AvatarImage
                      src={
                        message.role === "user"
                          ? "/images/default_pfp.png"
                          : "/images/assistant.png"
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
                        {isTyping && message.role === "assistant" && index === messages.length - 1 ? (
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

      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800/60 chat-input focus:cursor-text border-white/20"
            disabled={isSubmitting}
          />
          <Button
            size="icon"
            type="submit"
            className="border-white/20 bg-[#2563eb]/90 hover:bg-[#2156c9]/80"
            disabled={!input.trim() || isSubmitting}
          >
            <Send className="h-4 text-white w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}