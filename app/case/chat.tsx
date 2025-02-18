"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessage: Message = {
  role: "assistant",
  content:
    "Welcome to Abu Dhabi! I'm here to assist you with your settlement process. Whether you need information about visas, housing, schools, or any other aspect of settling in, I'm here to help. What would you like to know about first? Feel free to ask about the visa process, finding accommodation, enrolling in schools, healthcare options, or any other topics related to your move to Abu Dhabi.",
  timestamp: new Date().toLocaleTimeString(),
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "",
    timestamp: new Date().toLocaleTimeString(),
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let index = 0;
    const words = initialMessage.content.split(" ");

    const typeWord = () => {
      if (index < words.length) {
        const word = words[index];
        setMessages(prev => {
          const updated = [...prev];
          updated[0] = {
            ...updated[0],
            content: updated[0].content
              ? `${updated[0].content} ${word}`
              : word,
          };
          return updated;
        });
        index++;
        setTimeout(typeWord, 100); // Adjust speed here
      } else {
        setTimeout(() => setIsTyping(false), 1000); // Remove cursor after 1 second
      }
    };

    typeWord();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [scrollAreaRef]); // Removed typedText from dependencies

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
                      <p className="text-sm">
                        {message.content}
                        {isTyping && message.role === "assistant" && index === 0 && (
                          <span className="inline-block w-2 h-2 bg-white rounded-full ml-1 animate-pulse" />
                        )}
                      </p>
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
    </div>
  );
}