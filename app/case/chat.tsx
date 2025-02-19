"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import type { JSX } from "react";

interface CustomMarkdownProps {
  children: string;
  isTyping?: boolean;
}

interface Token {
  type: "text" | "bold" | "italic" | "bolditalic";
  content: string;
}

const parseInlineTokens = (text: string): React.ReactNode[] => {
  const tokens: Token[] = [];
  const regex = /(\*\*\*([^*]+)\*\*\*\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }
    if (match[1]) {
      if (match[2] !== undefined) {
        tokens.push({ type: "bolditalic", content: match[2] });
      } else if (match[3] !== undefined) {
        tokens.push({ type: "bold", content: match[3] });
      } else if (match[4] !== undefined) {
        tokens.push({ type: "italic", content: match[4] });
      }
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: "text", content: text.slice(lastIndex) });
  }

  return tokens.map((token, idx) => {
    const animatedContent = (
      <motion.span
        key={idx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {token.content}
      </motion.span>
    );
    switch (token.type) {
      case "bolditalic":
        return (
          <strong key={idx}>
            <em>{animatedContent}</em>
          </strong>
        );
      case "bold":
        return <strong key={idx}>{animatedContent}</strong>;
      case "italic":
        return <em key={idx}>{animatedContent}</em>;
      default:
        return <span key={idx}>{animatedContent}</span>;
    }
  });
};

const parseMarkdownBlocks = (
  text: string,
  isTyping: boolean
): React.ReactNode[] => {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletGroup: React.ReactNode[] = [];
  let numberGroup: React.ReactNode[] = [];
  let tableGroup: string[] = [];
  let codeBlock: string[] = [];
  let inCodeBlock = false;
  let codeLang: string | null = null;
  let quoteGroup: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block handling (fenced with \`\`\`)
    if (inCodeBlock) {
      if (line.startsWith("```")) {
        elements.push(
          <pre key={`code-${i}`} className="bg-gray-800 text-white p-2 rounded">
            <code>{codeBlock.join("\n")}</code>
          </pre>
        );
        inCodeBlock = false;
        codeBlock = [];
        codeLang = null;
      } else {
        codeBlock.push(line);
      }
      continue;
    }
    if (line.startsWith("```")) {
      inCodeBlock = true;
      codeLang = line.replace("```", "").trim();
      continue;
    }

    // Math block handling (fenced with $$)
    if (line.startsWith("$$")) {
      const mathContent: string[] = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith("$$")) {
        mathContent.push(lines[j]);
        j++;
      }
      elements.push(
        <div
          key={`math-${i}`}
          className="math-block bg-gray-100 p-2 rounded my-2"
        >
          {`$$\n${mathContent.join("\n")}\n$$`}
        </div>
      );
      i = j; // Skip processed lines
      continue;
    }

    // Table handling: group rows that start with |
    if (line.trim().startsWith("|")) {
      tableGroup.push(line);
      if (i === lines.length - 1 || !lines[i + 1].trim().startsWith("|")) {
        // Process tableGroup assuming first row header, second separator, rest body
        const header = tableGroup[0]
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean);
        const bodyRows = tableGroup.slice(2).map((row) =>
          row
            .split("|")
            .map((s) => s.trim())
            .filter(Boolean)
        );
        elements.push(
          <table
            key={`table-${i}`}
            className="table-auto border-collapse border border-gray-300 my-2"
          >
            <thead>
              <tr>
                {header.map((cell, idx) => (
                  <th key={idx} className="border border-gray-300 px-2 py-1">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ridx) => (
                <tr key={ridx}>
                  {row.map((cell, cidx) => (
                    <td key={cidx} className="border border-gray-300 px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
        tableGroup = [];
      }
      continue;
    }

    // Bullet list handling
    const bulletMatch = line.match(/^\s*([-*])\s+(.*)/);
    if (bulletMatch) {
      bulletGroup.push(<li key={i}>{parseInlineTokens(bulletMatch[2])}</li>);
      if (i === lines.length - 1 || !lines[i + 1].match(/^\s*([-*])\s+(.*)/)) {
        elements.push(
          <ul key={`ul-${i}`} className="list-disc ml-5 my-2">
            {bulletGroup}
          </ul>
        );
        bulletGroup = [];
      }
      continue;
    }

    // Numbered list handling
    const numberMatch = line.match(/^\s*\d+\.\s+(.*)/);
    if (numberMatch) {
      numberGroup.push(<li key={i}>{parseInlineTokens(numberMatch[1])}</li>);
      if (i === lines.length - 1 || !lines[i + 1].match(/^\s*\d+\.\s+(.*)/)) {
        elements.push(
          <ol key={`ol-${i}`} className="list-decimal ml-5 my-2">
            {numberGroup}
          </ol>
        );
        numberGroup = [];
      }
      continue;
    }

    // Blockquote handling
    const quoteMatch = line.match(/^>\s+(.*)/);
    if (quoteMatch) {
      quoteGroup.push(<p key={i}>{parseInlineTokens(quoteMatch[1])}</p>);
      if (i === lines.length - 1 || !lines[i + 1].match(/^>\s+(.*)/)) {
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="border-l-4 pl-4 italic text-gray-700 my-2"
          >
            {quoteGroup}
          </blockquote>
        );
        quoteGroup = [];
      }
      continue;
    }

    // Headings handling
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = parseInlineTokens(headingMatch[2]);
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      const classes: { [key: number]: string } = {
        1: "text-4xl font-bold",
        2: "text-3xl font-bold",
        3: "text-2xl font-bold",
        4: "text-xl font-semibold",
        5: "text-lg font-semibold",
        6: "text-base font-medium",
      };
      elements.push(
        React.createElement(
          HeadingTag,
          { key: i, className: classes[level] },
          content
        )
      );
      continue;
    }

    // Regular paragraph or empty line
    if (line.trim() === "") {
      elements.push(<br key={i} />);
    } else {
      elements.push(<p key={i}>{parseInlineTokens(line)}</p>);
    }
  }

  return elements;
};

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
  children,
  isTyping,
}) => {
  const elements = parseMarkdownBlocks(children, !!isTyping);
  return <>{elements}</>;
};

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

export default function ChatInterface() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingWords, setTypingWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  const startChat = async () => {
    setShowWelcome(false);
    setIsTyping(true);
    setMessages([
      {
        role: "assistant",
        content: "",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    hasRun.current = false;
  };

  useEffect(() => {
    if (hasRun.current || showWelcome) return;
    hasRun.current = true;

    const words = initialMessage.content.split(" ");
    let index = 0;
    const typedWords: string[] = [];
    let charCount = 0;
    let additionalCharCount = 0;

    const typeWord = () => {
      if (index < words.length) {
        const word = words[index];
        typedWords.push(word);
        setTypingWords([...typedWords]);
        charCount += word.length + 1;

        index++;
        let delay = 100;

        if (charCount >= 149) {
          const lastWord = typedWords[typedWords.length - 1];
          if (/[.,!?;:]/.test(lastWord.slice(-1))) {
            delay = 1000;
            charCount = 0;
            additionalCharCount = 0;
          } else {
            additionalCharCount += word.length + 1;
            if (additionalCharCount >= 50) {
              delay = 1000;
              charCount = 0;
              additionalCharCount = 0;
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
        setTimeout(() => setIsTyping(false), 1000);
      }
    };

    typeWord();
  }, [showWelcome]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [scrollAreaRef.current]); //Corrected dependency

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

  if (showWelcome) {
    return (
      <>
        <div className="absolute top-0 left-0 p-4">
          <h1 className="text-2xl font-bold text-white flex items-center">
            Mutasil AI Chat
            <svg width="0" height="0">
              <defs>
                <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="50%" stopColor="#e0f0ff" />
                  <stop offset="100%" stopColor="#ffe0f0" />
                </linearGradient>
              </defs>
            </svg>
          </h1>
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
                <AvatarImage src="http://localhost:3000/images/assistant.png" />
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
                onSubmit={(e) => {
                  e.preventDefault();
                  startChat();
                }}
              >
                <Input
                  placeholder="Ask me anything about Abu Dhabi..."
                  className="flex-1 bg-gray-800/60 chat-input focus:cursor-text border-white/20"
                />
                <Button
                  size="icon"
                  type="submit"
                  className="border-white/20 bg-[#2563eb]/90 hover:bg-[#2156c9]/80"
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
    <motion.div
      className="flex overflow-y-auto flex-col h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative flex-1 flex flex-col">
        <ScrollArea className="flex-1 px-4 pb-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={`message-${index}-${message.timestamp}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 ${
                      message.role === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
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
      </div>
    </motion.div>
  );
}