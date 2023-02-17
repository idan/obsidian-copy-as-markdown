import { Editor, Plugin } from "obsidian"

export default class CopyAsMarkdown extends Plugin {
	async onload() {
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "copy-as-md-command",
			name: "Copy as Markdown command",
			editorCallback: (editor: any) => this.copyAsMarkdown(editor),
		})
	}

	copyAsMarkdown(editor: Editor) {
		const raw = editor.getSelection()
		const text = raw.replace(/\[\[([^\]]*)\]\]/g, "$1")
		const blob = new Blob([text], {
			type: "text/plain",
		})
		const data = [
			new ClipboardItem({
				["text/plain"]: blob,
			}),
		]
		navigator.clipboard.write(data)
	}

	onunload() {}
}
