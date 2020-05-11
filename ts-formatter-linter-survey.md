2020-05-05 17:59:05

- linter: eslint
- formatter: prettier or eslint --fix

- [Lintersとの統合・Prettier](https://prettier.io/docs/en/integrating-with-linters.html)
- [ESLintのルールを全部手動で設定するのは大変だからやめておけ - Qiita](https://qiita.com/khsk/items/0f200fc3a4a3542efa90)
- [もうprettierで消耗したくない人へのvueでのeslint設定 - Qiita](https://qiita.com/diggy-mo/items/bb01bcb54237f16bb008)

> パーサー部分の構造に問題があり、"project": "./tsconfig.json"を指定するとパフォーマンスがかなり悪化する模様。
> そのため上記オプションと"plugin:@typescript-eslint/recommended-requiring-type-checking"を外しました。@yumetodoさんありがとうございます。
- [VSCodeでESLint+@typescript-eslint+Prettierを導入する（v2.0.0修正版） - Qiita](https://qiita.com/madono/items/a134e904e891c5cb1d20)

## typescript + eslint + prettier
eslint
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

prettier
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

prettier/eslint-config-prettier, prettier/eslint-plugin-prettier
> この辺を組み込むと、eslint --fixをした時にprettier準拠でフォーマットがされることになる。

prettier の設定を `.prettierrc` に書いてもおｋだし、 `package.json` や `eslintrc.js` に書いてもおｋ

- .prettierrc で prettier の設定をする場合

``` json
{
  "bracketSpacing": true,
  "printWidth": 80,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "useTabs": false,
}
```

- package.json で prettier の設定をする場合
``` json
  "scripts": {
    ...
    "format": "eslint --fix \"**/*.{js,jsx,ts,tsx}\""
    // "format": "prettier --write \"**/*.{js,jsx,ts,tsx}\"",
    ...
  }

  "prettier": {
    "singleQuote": true,
    "semi": false
  },
...
```

- eslintrc.js で prettier の設定をする場合

``` json
module.exports = {
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        semi: true,
        singleQuote: true,
        printWidth: 120,
      },
    ],
  }
}
```


eslintrc.js

tsconfig.json

## eslint
- 'React' is defined but never used の対処方法

eslintrc.js
``` typescript
"react/jsx-uses-react": 1
```

- 以下の JSX でimport App from './App'が no-unused-vars で エラー となってしまう問題への対処

``` typescript
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

eslintrc.js
``` typescript
'react/jsx-uses-vars': 1
```


cf.
- [SFCでのeslintの'React' is defined but never used - development log](http://makotottn.hatenablog.com/entry/2017/09/07/010100)
- [[Firebase x React] ESLintとPrettierをReactに適用 | Today's Commit](https://t-kojima.github.io/2018/08/12/0039-firebase-react-eslint-prettier/)
