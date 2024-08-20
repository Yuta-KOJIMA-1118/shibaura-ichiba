

# ファイル構造  
.git : gitシステム．編集不可  
client : vueプロジェクトを使用可能で，フロント側を管理する．この中かserverの中を編集する  
node_modules : ejsなどのnodeのモジュールを管理している．編集不可  
server : expressアプリを使用可能で，バック側を管理する．この中かclientの中を編集する  
package.json : 使用する環境を記述する．無断では編集不可  
package-lock.json : package.jsonに対応して自動生成される．編集不可  
README.md : このファイル．  
.gitignore : git add の対象にしたくないファイル名を記述する．編集は追記と個人的に追加した部分の削除のみ可  

## clientディレクトリ
clientディレクトリ直下にはファイルを追加しないこと．    
node_modules : プロジェクトのモジュールが含まれている．編集不可    
public : 画像や使用するフォントデータ等の静的なデータが含まれる．ファイルサイズの大きな画像やcssで参照する画像をここに入れる．    
src : src直下には．主要なコンポーネントである，App.vueとmain.jsが入る．ページを管理する大きなコンポーネントはviewsに入れる．それ以外のコンポーネントはcomponetsに入れる．assetsにファイルサイズの小さな画像やロゴを入れる．     
これ以外のファイルは全て自動生成されたもののため，基本的には編集不可．  

## serverディレクトリ  
serverディレクトリ直下にはファイルを追加しないこと．  
bin : wwwファイルがあり，wwwファイルはサーバーを起動するエントリーポイントとなる．編集不可    
routes : URLに対するルーティングをするファイルが入っている．
views : .ejsファイルが入る．  
apps.js : Expressのエントリーポイント．全体の初期化などが行われる．  
package.json : 設定ファイル．許可なく変更不可  
components : 各コンポーネントを制御するjsファイルが含まれる．ここを主に編集する．


# 外部リンク  
## public
[GitHub scomb-shibaura-ichiba](https://github.com/Yuta-KOJIMA-1118/scomb-shibaura-ichiba.git)  
[GitHub textbook_scraping](https://github.com/Yuta-KOJIMA-1118/textbook-scraping)
## private
[notion](https://www.notion.so/_root-page-9418dfa95bca453dabec127c4508da76?pvs=4) 
[googleDrive_要求仕様書](https://drive.google.com/drive/folders/1ZWvDJBzTcUa21DfyPxEyPraTMfR09C7q?usp=drive_link)  
[googleDrive_外部設計書](https://drive.google.com/drive/folders/1O8eMgV0bmtwfKMiYWlpc1mTvH6Agm0xm?usp=drive_link)  
[googleDrive_内部仕様書](https://drive.google.com/drive/folders/1-c5IZqpbHbGpLCM_CnZuUVkFjutWIb5U?usp=drive_link)  
[JavaScriptコーディング規約](https://drive.google.com/file/d/1flc5jVdeJqt1_O_RykmHa2w67FHrKh-W/view?usp=drive_link)  
[進捗報告](https://docs.google.com/spreadsheets/d/1iX0WWPveVi4395yHKzVXOoMFv1Qvxd5QNM16ZAoD0to/edit?usp=drive_link)  
