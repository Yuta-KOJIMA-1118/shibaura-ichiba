# 芝浦市場

芝浦工業大学内で使用できるフリーマーケットアプリ。チームで1つのソフトウェアを開発する大学授業で、6人チームで制作した。

小島が技術リーダとして開発を主導した。小島が作成した部分はファイルの表題コメントに明記してある。

小島が作成した以下の2点は別リポジトリで管理している。
Chrome拡張機能（時間割取得）：https://github.com/Yuta-KOJIMA-1118/scomb-shibaura-ichiba  
教科書情報取得用Chrome拡張機能：https://github.com/Yuta-KOJIMA-1118/textbook-scraping

---

## 概要

芝浦市場は、芝浦工業大学内で使用できるフリーマーケットアプリである。（セキュリティに懸念点があったため、公開していない）

出品・購入・チャット機能を備えた一般的なフリーマーケットと同様の機能に加え、**学内で使用する教科書のサジェスト機能**が強みである。時間割を入力すると、芝浦生協で販売している教科書の中から自分の時間割に合う教科書が提案される。時間割の入力には、学内システム（Scomb）向けのChrome拡張（Scomb-Shibaura-Ichiba）を使うことで、時間割をワンクリックでコピーして貼り付けられる。

支払方法はチャット上で当事者間が合意した方法（QR決済・現金手渡し等）で行い、商品はキャンパスで直接受け渡す形式を採用した。これによりセンシティブな金融情報を扱わない設計としている。

---

## 使用技術

| 分類 | 技術 |
|---|---|
| フロントエンド | Vue.js |
| バックエンド | Node.js、Express |
| データベース | PostgreSQL |
| インフラ | Docker |
| バージョン管理 | Git / GitHub |
| その他 | Chrome拡張（Manifest V3） |

---

## 開発プロセス

要求定義 → 外部設計 → 内部設計 → コーディング → 単体テスト → 結合テスト → 総合テスト → 受け入れテスト → 納品という一連のソフトウェア開発プロセスを経て制作した。最終的に136件の受け入れテストで要件をすべて充足したと評価された。

---

## 小島の役割（技術リーダ）

### 担当した作業

- 技術選定・開発環境構築
- タスク分割・進捗管理・スケジュール管理
- 議事録作成（Notion）
- ドキュメント取りまとめ（要求定義書・外部設計書・内部設計書・コーディング規約書・テスト成績書）
- チームメンバーへの説明・相談対応
- プレゼンテーション後の質疑対応

### 実装を主担当した機能

- 時間割に基づく購入教科書のサジェスト機能
- 時間割取得用Chrome拡張（[Scomb-Shibaura-Ichiba]((https://github.com/Yuta-KOJIMA-1118/scomb-shibaura-ichiba.git))）
- 教科書情報取得用Chrome拡張（[textbook-scraping](https://github.com/Yuta-KOJIMA-1118/textbook-scraping)）

### 課題と対応

**認識の統一**：JavaScriptに初めて触れるメンバーが多く、目的と実装方針を口頭で伝えるだけでは認識がずれることが続いた。決定事項を議事録に残し、設計書を整備することで、口頭の認識に依存しない状態を作った。

**タスク遅延への対応**：進捗が遅れたタスクを個人の責任として扱わず、残作業と原因を確認してタスクを再分配する方針を取った。

**スコープ管理**：期限前にバタついた経験から、スケジュールに余裕を持たせることと、進捗確認の頻度を上げることの重要性を学んだ。

---

## 実装した機能（チーム全体）

- サインアップ・ログイン・ログアウト
- 商品一覧の表示と検索
- マイページ（出品中・取引中の商品閲覧）
- 購入希望・取引完了・取引中止
- チャット（出品者と購入希望者の1対1）

---

## 今後の改善点

- HTTP通信のHTTPS化
- パスワードのハッシュ化
- GETリクエストとPOSTリクエストの適切な使い分け

---

## 実行環境

- Node.js v20.12.2
- PostgreSQL（サーバー）/ MySQL 8.3.0（ローカル）
- Docker

### 起動方法

**ローカル**
1. `client` ディレクトリで `npm run serve`
2. `server` ディレクトリで `npm start`
3. ブラウザで `http://localhost:8080`

**サーバー**
1. ルートと `client` の `.env` を作成し、IPアドレスとポート番号を設定
2. `client` ディレクトリで `npm run build`
3. `server` ディレクトリで `npm start`

---

## 外部リンク

### public
- [GitHub: shibaura-ichiba](https://github.com/Yuta-KOJIMA-1118/shibaura-ichiba)
- [GitHub: scomb-shibaura-ichiba](https://github.com/Yuta-KOJIMA-1118/scomb-shibaura-ichiba.git)
- [GitHub: textbook_scraping](https://github.com/Yuta-KOJIMA-1118/textbook-scraping)

### private（芝浦ドメインのみ閲覧可能）
- [Notion](https://www.notion.so/_root-page-9418dfa95bca453dabec127c4508da76?pvs=4)
- [要求仕様書（Google Drive）](https://drive.google.com/drive/folders/1ZWvDJBzTcUa21DfyPxEyPraTMfR09C7q?usp=drive_link)
- [外部設計書（Google Drive）](https://drive.google.com/drive/folders/1O8eMgV0bmtwfKMiYWlpc1mTvH6Agm0xm?usp=drive_link)
- [内部仕様書（Google Drive）](https://drive.google.com/drive/folders/1-c5IZqpbHbGpLCM_CnZuUVkFjutWIb5U?usp=drive_link)
- [JavaScriptコーディング規約](https://drive.google.com/file/d/1flc5jVdeJqt1_O_RykmHa2w67FHrKh-W/view?usp=drive_link)
- [進捗報告](https://docs.google.com/spreadsheets/d/1iX0WWPveVi4395yHKzVXOoMFv1Qvxd5QNM16ZAoD0to/edit?usp=drive_link)
