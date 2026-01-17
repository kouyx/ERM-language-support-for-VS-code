import * as vscode from 'vscode';

/**
 * ERM行内注释格式化（核心逻辑对齐原Python脚本）
 */
export function formatErmInlineComment() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'erm') {
    vscode.window.showWarningMessage('Only available for ERM files!');
    return;
  }

  const doc = editor.document;
  const replaceList: { range: vscode.Range; text: string }[] = [];

  // 工具函数：查找ERM命令体结束位置（复刻Python的findCodeBodyEnd）
  const findCodeBodyEnd = (lineText: string): [number, number] => {
    const cmdChars = ['!', '#', '$', '?'];
    let lastCmdStart = -1;
    let codeEnd = -1;
    let textBlockOpen = 0;

    for (let i = 0; i < lineText.length; i++) {
      if (lineText[i] === '^') textBlockOpen = textBlockOpen ? 0 : 1;
      if (textBlockOpen === 0) {
        if (lineText[i] === ';' && codeEnd === -1) codeEnd = i;
        if (i + 1 < lineText.length && lineText[i] === '!' && cmdChars.includes(lineText[i+1])) {
          lastCmdStart = i;
          codeEnd = -1;
        }
      }
    }
    return [lastCmdStart, codeEnd];
  };

  // 工具函数：查找注释起始位置（复刻Python的findCommentStart）
  const findCommentStart = (lineText: string, codeEnd: number): [number, number] => {
    let commentStart = -1;
    let spaceCnt = 0;
    for (let i = codeEnd + 1; i < lineText.length; i++) {
      if (lineText[i] === ' ' || lineText[i] === '\t') spaceCnt++;
      else {
        commentStart = i;
        break;
      }
    }
    return [commentStart, spaceCnt];
  };

  // 遍历选中行执行格式化
  editor.selections.forEach(sel => {
    for (let lineNum = sel.start.line; lineNum <= sel.end.line; lineNum++) {
      const line = doc.lineAt(lineNum);
      const text = line.text;
      const [lastCmdStart, codeEnd] = findCodeBodyEnd(text);

      if (lastCmdStart < 0 || codeEnd <= 0) continue;
      const [commentStart, spaceCnt] = findCommentStart(text, codeEnd);
      if (commentStart < 0) continue;

      // 核心格式化逻辑（可根据原Python脚本调整）
      let newText = text;
      // 规则1：注释对齐到40列
      const targetIndent = 40;
      const currentIndent = codeEnd + 1 + spaceCnt;
      if (currentIndent < targetIndent) {
        const addSpace = targetIndent - currentIndent;
        newText = text.slice(0, codeEnd + 1) + ' '.repeat(addSpace) + text.slice(codeEnd + 1);
      }
      // 规则2：移除//，替换为[]包裹
      if (newText.slice(commentStart).startsWith('//')) {
        const commentPart = newText.slice(commentStart + 2).trim();
        newText = newText.slice(0, commentStart) + `[${commentPart}]`;
      }

      if (newText !== text) {
        replaceList.push({ range: line.range, text: newText });
      }
    }
  });

  // 应用格式化
  editor.edit(edit => {
    replaceList.forEach(item => edit.replace(item.range, item.text));
  });
}