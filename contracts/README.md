# convictionfi-contracts

## 予件整理

- ゴール: Sui Overflow Hackathon 2025 で勝つ
- 目指す成果物: Sui Move のスマートコントラクト
- 前提条件:
  - プロジェクト全体の要求定義や要件定義は完成済み
  - dApps 側や web2 側の開発への考慮も一応 OK（＝ MOVE コントラクトの MVP 開発に着手できる状態）
- リソース: 各種 AI ツールに課金済み

## 使用する AI ツール一覧

ChatGPT と Claude が最も重要。

- **ChatGPT**:

  - ブラウザで使用
  - 開発するプロジェクト（ConvictionFi）について、チャットを横断して高度にコンテキストを保持している
  - MOVE については弱い（検索させて学習させるなどしたが、Claude より劣る）

- **Claude**:

  - ブラウザで使用
  - コンテキストは保持していないが、MOVE については ChatGPT より強い
  - プログラミング能力も高い

- **Claude Code**:

  - CLI で使用
  - パフォーマンス最大化に向けて最適なディレクトリ構成を模索

- VSCode Copilot:

  - ローカルで使用
  - GitHub リポジトリの管理と細かい調整

- Cursor:
  - ローカルで使用
  - 細かい修正
  - MOVE の本開発にはあまり使わない

## AI 開発フロー

※実際には完全にリニアな作業フローではなく ChatGPT への戻し作業が発生している。

### ChatGPT でコントラクト要件整理

1. ChatGPT で ConvictionFi のスマートコントラクト側で必要な機能要件と、スマートコントラクト外で担当する機能要件を区別する
2. ChatGPT で、ConvictionFi のスマートコントラクトに必要な機能をテキストベースで整理する
3. 上記を確認して、細かい点を修正する
4. 英語に翻訳

### Claude でコントラクト生成プロンプトの作成

1. コントラクト要件を与えて、MOVE の AI 生成のためのプロンプトを作成させる
2. 出力結果に対して汎用パワハラプロンプトを実行して、強制的に出力精度を向上させる

> では、この出力を 60 点とします。これを 60 点とした時に 100 点とはどのようなものですか？ 100 点にするために足りないものを列挙した後に、100 点の回答を作成してください

3. [WIP] できたプロンプトは間違いなく精度は上がったが、長大すぎて One-Shot Prompting としては不適切だから、段階的に実行できるように分割する

### Claude Code で MOVE コントラクト生成

1. ChatGPT で Claude Code について検索させて、学習させる
2. [WIP] ChatGPT で ClaudeCode のパフォーマンスを最大化させるためのディレクトリ構造とファイル群を作成させる（前述の長大プロンプトの分割など）

```md
convictionfi-move/
├── sources/
│ └── conviction_fi.move # Claude による出力をここに保存
├── .claude/
│ └── commands/
│ ├── 01_core_infra.md
│ ├── 02_security.md
│ ├── 03_ai_agent.md
│ ├── 04_testing.md
│ ├── 05_events.md
│ ├── 06_advanced_features.md
│ ├── 07_utilities_init.md
│ ├── 08_deployment.md
│ └── README.md # 分割方針と Claude への指示の概要
└── CLAUDE.md # プロジェクト全体の仕様と前提条件
```

3. ChatGPT にて、Claude が生成した長大プロンプトをもとに、上記ファイルを生成

- ※最終的にはプロンプトやファイル群は全て英語に翻訳してから実行する（英語の方が精度が高いため）。しかし、まずは日本語で確認する

4. [NOT STARTED] Claude Code で段階的に実行
