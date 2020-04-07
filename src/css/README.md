# css 関連の変更点について

- **css ファイルを新たに作る時**

拡張子を`.css`ではなく`.module.css`としてください。

---

- **css ファイルを`import`する時**

```js
// 例
import * as styles from "css/hoge/hoge.module.css";
```

`baseUrl`を`src`にしているため、`css`以下のファイルのパスを書いてください。

---

- **css ファイルを編集する時**

```sh
yarn css
```

と shell に入力してそのまま放っておいてください。
編集した時、ファイルを追加した時に自動で`.d.ts`ファイルを変更、または`src/@types`以下に新たに生成してくれます。

---

- **(css ファイルを入れる)フォルダを新たに追加する時**

`tsconfig.paths.json`の`"paths"`に例のように書き足してください。

```json
"paths": {
  "css/*.module.css": ["@types/*.module.css"],
  "css/comp/*.module.css": ["@types/comp/*.module.css"],
  "css/comp/pages/*.module.css": ["@types/comp/pages/*.module.css"],
  // 例↓ hogeフォルダを src/css/ 以下に追加した時
  "css/hoge/*.module.css":["@types/hoge/*.module.css"]
},
```

---

**_一番下の項目は自動化できませんでした、ごめんなさい、、、_**
