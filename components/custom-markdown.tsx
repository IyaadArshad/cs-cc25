import React from "react";

interface CustomMarkdownProps {
	children: string;
}

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ children }) => {
	// Split incoming text into lines
	const lines = children.split("\n");
	const rendered = lines.map((line, idx) => {
		// Render a separator if the line is a horizontal rule (three or more dashes)
		if (/^[-]{3,}$/.test(line.trim())) {
			return <hr key={idx} />;
		}

		// Process inline markdown:
		// Bold and italic: ***text***
		let html = line.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
		// Bold: **text**
		html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
		// Italic: *text*
		html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

		return <p key={idx} dangerouslySetInnerHTML={{ __html: html }} />;
	});
	return <>{rendered}</>;
};

export default CustomMarkdown;
