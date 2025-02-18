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

const parseMarkdownBlocks = (text: string, isTyping: boolean): React.ReactNode[] => {
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
		let line = lines[i];

		// Code block handling (fenced with ```)
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
			let mathContent: string[] = [];
			let j = i + 1;
			while (j < lines.length && !lines[j].startsWith("$$")) {
				mathContent.push(lines[j]);
				j++;
			}
			elements.push(
				<div key={`math-${i}`} className="math-block bg-gray-100 p-2 rounded my-2">
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
				const header = tableGroup[0].split("|").map(s => s.trim()).filter(Boolean);
				const bodyRows = tableGroup.slice(2).map(row => row.split("|").map(s => s.trim()).filter(Boolean));
				elements.push(
					<table key={`table-${i}`} className="table-auto border-collapse border border-gray-300 my-2">
						<thead>
							<tr>
								{header.map((cell, idx) => (
									<th key={idx} className="border border-gray-300 px-2 py-1">{cell}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{bodyRows.map((row, ridx) => (
								<tr key={ridx}>
									{row.map((cell, cidx) => (
										<td key={cidx} className="border border-gray-300 px-2 py-1">{cell}</td>
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
					<blockquote key={`quote-${i}`} className="border-l-4 pl-4 italic text-gray-700 my-2">
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
			elements.push(React.createElement(HeadingTag, { key: i, className: classes[level] }, content));
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

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ children, isTyping }) => {
	const elements = parseMarkdownBlocks(children, !!isTyping);
	return <>{elements}</>;
};

export default CustomMarkdown;
