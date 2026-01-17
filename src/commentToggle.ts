import * as vscode from 'vscode';

/**
 * ERM注释切换：!!↔*!、!?↔*?、!$↔*$、!#↔*#
 */
export function toggleErmComment() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor!');
    return;
  }

  const doc = editor.document;
  if (doc.languageId !== 'erm') {
    vscode.window.showWarningMessage('Only work with ERM files!');
    return;
  }

  let isCommented: -1 | 0 | 1 = -1; // -1未识别 0未注释 1已注释
  const replaceList: { range: vscode.Range; text: string }[] = [];

  // 遍历选中的行，识别注释状态
  editor.selections.forEach(sel => {
    for (let lineNum = sel.start.line; lineNum <= sel.end.line; lineNum++) {
      const line = doc.lineAt(lineNum);
      const text = line.text;

      if (isCommented === -1) {
        if (/![\!\?\$\#]/.test(text)) isCommented = 0;
        else if (/\*[\!\?\$\#]/.test(text)) isCommented = 1;
      }

      // 执行替换
      let newText = text;
      if (isCommented === 0) {
        newText = text.replace(/!!/g, '*!')
                      .replace(/!\?/g, '*?')
                      .replace(/!\$/g, '*$')
                      .replace(/!\#/g, '*#');
      } else if (isCommented === 1) {
        newText = text.replace(/\*\!/g, '!!')
                      .replace(/\*\?/g, '!?')
                      .replace(/\*\$/g, '!$')
                      .replace(/\*\#/g, '!#');
      }

      if (newText !== text) {
        replaceList.push({ range: line.range, text: newText });
      }
    }
  });

  // 应用替换
  editor.edit(edit => {
    replaceList.forEach(item => edit.replace(item.range, item.text));
  });
}