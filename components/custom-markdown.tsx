import React from "react";
import { motion } from "framer-motion";

interface CustomMarkdownProps {
	children: string;
	isTyping?: boolean;
}

interface Token {
	type: "text" | "bold" | "italic" | "bolditalic";
	content: string;
}

const parseMarkdownLine = (line: string, isTyping: boolean): React.ReactNode => {
	// Check for a horizontal rule
	if (/^[-]{3,}$/.test(line.trim())) {
		return <hr />;
	}

	const tokens: Token[] = [];
	// Regex for ***text***, **text**, or *text*
	const regex = /(\*\*\*([^*]+)\*\*\*\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
	let lastIndex = 0;
	let match;

	while ((match = regex.exec(line)) !== null) {
		if (match.index > lastIndex) {
			tokens.push({ type: "text", content: line.slice(lastIndex, match.index) });
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
	if (lastIndex < line.length) {
		tokens.push({ type: "text", content: line.slice(lastIndex) });
	}

	const content = tokens.map((token, idx) => {
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

	return isTyping ? <>{content}</> : <p>{content}</p>;
};

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ children, isTyping }) => {
	const lines = children.split("\n");
	return (
		<>
			{lines.map((line, idx) => (
				<React.Fragment key={idx}>{parseMarkdownLine(line, !!isTyping)}</React.Fragment>
			))}
		</>
	);
};

export default CustomMarkdown;
