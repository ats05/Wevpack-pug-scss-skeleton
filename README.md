# WebpackでPugとSCSSを扱うための最小セット


## コマンド

*資材のビルド*

```
$ npm run build:dev
もしくは
$ npm run build:dev:watch
```

*開発サーバーの起動*

```
$ npm run serve
```
`/public/`をルートディレクトリとしたサーバーが立ち上がります。


## ビルドの動き

*pug*

`/src/pug`配下に設置したpugファイルが、`/public`配下にhtmlとして出力されます。
頭にアンダースコアをつけたファイル（例：`_hoge.pug`）は出力されません。

例）
▼ソースコード
```
src/pug/
├── common
│   └── _hoge.pug
├── index.pug
└── page
    └── page.pug
    
```

▼ビルド結果
```
public
├── index.html
└── page
    └── page.html
```


*SCSS*

`/src/scss`配下に設置したpugファイルが、`/public/assets/css`配下に出力されます。
頭にアンダースコアをつけたファイル（例：`_hoge.scss`）は出力されません。

例）
▼ソースコード
```
src/scss
├── common
│   └── _hoge.scss
├── index.scss
└── page
    └── index.scss
    
```

▼ビルド結果
```
public/assets/
└── css
    ├── index.css
    └── page
        └── index.css
```
