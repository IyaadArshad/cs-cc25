import React, { JSX } from "react";
import { motion } from "framer-motion";

interface CustomMarkdownProps {
	children: string;
	isTyping?: boolean;
}

interface Token {
	type: "text" | "bold" | "italic" | "bolditalic";
	content: string;
}

// New helper to parse inline tokens for any text content.
const parseInlineTokens = (text: string): React.ReactNode[] => {
	const tokens: Token[] = [];
	const regex = /(\*\*\*([^*]+)\*\*\*\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
	let lastIndex = 0;
	let match;
	while ((match = regex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			tokens.push({ type: "text", content: text.slice(lastIndex, match.index) });
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
				return <strong key={idx}><em>{animatedContent}</em></strong>;
			case "bold":
				return <strong key={idx}>{animatedContent}</strong>;
			case "italic":
				return <em key={idx}>{animatedContent}</em>;
			default:
				return <span key={idx}>{animatedContent}</span>;
		}
	});
};

const parseMarkdownLine = (line: string, isTyping: boolean): React.ReactNode => {
	// Check for a horizontal rule
	if (/^[-]{3,}$/.test(line.trim())) {
		return <hr />;
	}

	// Handle headings (# up to ######) and add font size classes
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
		return React.createElement(HeadingTag, { className: classes[level] }, content);
	}

	// Handle bullet points (- or *) at beginning of line
	const bulletMatch = line.match(/^\s*([-*])\s+(.*)/);
	if (bulletMatch) {
		const content = parseInlineTokens(bulletMatch[2]);
		return <li>{content}</li>;
	}

	// Default inline tokenization for normal lines
	const content = parseInlineTokens(line);
	return isTyping ? <>{content}</> : <p>{content}</p>;
};

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ children, isTyping }) => {
	const lines = children.split("\n");
	return (
		<>
			{lines.map((line, idx) => (
				<React.Fragment key={idx}>
					{parseMarkdownLine(line, !!isTyping)}
				</React.Fragment>
			))}
		</>
	);
};

export default CustomMarkdown;
