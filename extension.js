/* eslint-disable no-unused-vars */
const vscode = require("vscode");

const swapCursor = () => {
  try {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      if (!selection.isEmpty) {
        const newSelection = new vscode.Selection(
          selection.active,
          selection.anchor
        );
        editor.selection = newSelection;
      }
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      "An error occurred during command execution. Please check the console for details."
    );
  }
};

const moveCursorLineToCenter = () => {
  try {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = editor.selection.active;
      const range = new vscode.Range(position, position);
      editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      "An error occurred during command execution. Please check the console for details."
    );
  }
};

const moveCursorLineToTop = () => {
  try {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = editor.selection.active;
      const range = new vscode.Range(position, position);
      editor.revealRange(range, vscode.TextEditorRevealType.AtTop);
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      "An error occurred during command execution. Please check the console for details."
    );
  }
};

const CURSOR_OFFSET = 10;
const moveCursorLineToBottom = () => {
  try {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      // 当前光标位置
      const position = editor.selection.active;
      // 当前文档的总长度
      // const lineCount = editor.document.lineCount;

      // 可视区域的范围
      const visibleRanges = editor.visibleRanges;

      if (visibleRanges.length > 0) {
        // 可视区域行差
        const visibleRangesLine =
          visibleRanges[0].end.line - visibleRanges[0].start.line;

        // 目标起始位置
        const startLine = position.line + CURSOR_OFFSET - visibleRangesLine;

        // 目标结束位置
        const endLine = position.line + CURSOR_OFFSET;

        if (startLine >= 0) {
          const startPosition = new vscode.Position(startLine, 0);
          const endPosition = new vscode.Position(endLine, 0);
          const range = new vscode.Range(startPosition, endPosition);
          editor.revealRange(range, vscode.TextEditorRevealType.Default);
        }
      }
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      "An error occurred during command execution. Please check the console for details."
    );
  }
};
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const swapCursorFunc = vscode.commands.registerCommand(
    "cursor-dance.SwapSelectionCursor",
    swapCursor
  );
  const moveCursorLineToCenterFunc = vscode.commands.registerCommand(
    "cursor-dance.MoveCursorLineToCenter",
    moveCursorLineToCenter
  );
  const moveCursorLineToTopFunc = vscode.commands.registerCommand(
    "cursor-dance.MoveCursorLineToTop",
    moveCursorLineToTop
  );
  const moveCursorLineToBottomFunc = vscode.commands.registerCommand(
    "cursor-dance.MoveCursorLineToBottom",
    moveCursorLineToBottom
  );
  context.subscriptions.push(
    swapCursorFunc,
    moveCursorLineToCenterFunc,
    moveCursorLineToTopFunc,
    moveCursorLineToBottomFunc
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
