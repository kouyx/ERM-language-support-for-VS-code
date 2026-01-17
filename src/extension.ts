import * as vscode from 'vscode';
import { toggleErmComment } from './commentToggle';
import { formatErmInlineComment } from './commentFormat';

export function activate(context: vscode.ExtensionContext) {
  // 注册注释切换命令
  const toggleCmd = vscode.commands.registerCommand(
    'erm-language-support.toggleErmComment',
    toggleErmComment
  );

  // 注册注释格式化命令
  const formatCmd = vscode.commands.registerCommand(
    'erm-language-support.formatErmInlineComment',
    formatErmInlineComment
  );

  // 注册代码补全（对应sublime-completions）
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    'erm',
    {
      provideCompletionItems(doc: vscode.TextDocument, pos: vscode.Position) {
        // 示例补全（可从erm_consts.sublime-completions等文件导入）
        const completions = [
          { label: '!!set', kind: vscode.CompletionItemKind.Keyword, detail: 'ERM Set Variable' },
          { label: '!?if', kind: vscode.CompletionItemKind.Keyword, detail: 'ERM If Condition' },
          { label: '!$', kind: vscode.CompletionItemKind.Keyword, detail: 'ERM Variable Command' }
        ];
        return completions.map(item => new vscode.CompletionItem(item.label, item.kind));
      }
    },
    '!' // 输入!触发补全
  );

  context.subscriptions.push(toggleCmd, formatCmd, completionProvider);
}

export function deactivate() {}