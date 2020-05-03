2020-05-03 14:08:07

# りあクト！読んでみた
- [りあクト！ TypeScriptで始めるつらくないReact開発 第2版 - くるみ割り書房 - BOOTH](https://booth.pm/ja/items/1312652)

# 1 こんにちは React
- react で作られるアプリケーションはコンポーネントの組み合わせで構成される
- コンポーネント: イメージは任意のHTMLタグでくくられる単位の内容物
- jsx: js の中に html タグがほぼそのまま書ける拡張
  - tsx: 上記の typescript バージョン
- create react app: react のボイラーテンプレートを生成してくれるやつ。
  - react-scripts: エントリーファイルとして、 src/index.tsx を public/index.html に結びつけてくれる
- npm-scripts: npm のオプションを追加してくれるやつ。 package.json 内の scritps でエントリを設定しておけば、任意のスクリプトを npm のオプションとして実行可能にできる。

# 2 ナウでモダンな javascript (ecmascript 2015以降の js)
- 変数宣言: var はだめ。let, const を使おう。

関数宣言
``` typescript
// 従来の関数宣言
function plusOne(n) {
  return n + 1;
}

// アロー関数の宣言その 1
const plusOne = (n) => { return n + 1; };

// アロー関数の宣言その 2 (引数が一つの場合に以下のように書ける)
constplusOne = n => n + 1;
```

- function での関数宣言とアロー関数式での宣言 は this の挙動が変わる
- this とはオブジェクトであり、どのオブジェクトかどうかは関数の呼ばれ方によって変わる
- arrow function: 内部のthisは宣言時のスコープを持つオブジェクトになる
- function: 内部のthisは実行時のレシーバであるオブジェクトになる
cf. [アロー関数と関数の違いとthisの評価のされ方 - Qiita](https://qiita.com/shoichiimamura/items/aec874fc5cf55cde7fa1)

デフォルト引数

``` typescript
constplusOne = (n = 0) => n + 1;

console.log(plusOne(5)); // 6
console.log(plusOne());  // 1
```

class が書ける

``` typescript
class Bird {
  constructor(name) {
    this.name = name;
  }
  chirp() { console.log(`${this.name}が鳴きました`);
  }
  static explain(name) {
    console.log(`${name}は翼があって卵を生みます`); }
}


class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }

  fly() { console.log(`${this.name}が飛びました`);
  }
}


const bd1 = new Bird('ペンギン');
bd1.chirp(); // ペンギンが鳴きました
Bird.explain('カラス'); // カラスは翼があって卵を生みます

const bd2 = new FlyableBird('スズメ');
bd2.fly(); // スズメが飛びました
```

class vs function
cf. [React.js - Reactでのclassとfunctionの違い｜teratail](https://teratail.com/questions/118890)

配列、オブジェクト

``` typescript
const [n, m] = [1, 4];
console.log(n, m); // 1 4

const obj = { name: 'Kanae', age: 24 };
const { name, age } = obj;
console.log(name, age); // Kanae 24
```

コレクションの展開。スプレッド構文
スプレッド演算子: `...`
``` typescript
const arr1 = ['A', 'B', 'C'];
const arr2 = [...arr1, 'D', 'E'];
console.log(arr2); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]

constobj1 = {a: 1,b: 2,c: 3};
const obj2 = { ...obj1, d: 4, e: 5 };
console.log(obj2); // { a: 1, b: 2, c: 3, d: 4, e: 5 }
```

プロパティ名のショートハンド: ECMAScript 2018以降に導入された構文
``` typescript
const foo = 65536;
const obj = { foo, bar: 4096 }; // 変数 foo がオブジェクトの中でその変数名がオブジェクトキーに、変数値がその値になってる
console.log(obj); // { foo: 65536, bar: 4096 }
```

非同期処理
- js の場合コールバック関数は非同期で実行される

> React コンポーネントのレンダリングだってそうだよ。上の階層からとか関係なく、前処理が終わ ったものから他を待たずに表示されていくの」
> 「まず Controller でページ全体の処理を行って、そこからまとめて View に渡してレンダリングされ る Rails とは全然ちがいますね」
> 「いいところに気がついたねー。その話題は後にとっておくとして、非同期処理のプロセスを待って もらうやり方を見ていこう。まずは ES6 から導入された Promise 構文ね」

- promise: ES6から導入された非同期処理のプロセスを待つときに使う構文
- async/await: ES2017 から導入されたthen, catch でない非同期処理のプロセスを待つときに使う構文

promise + then, catch
``` typescript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const greet = () => {
  console.log('おやすみ');
  sleep(2000)
    .then(() => {
      console.log('起きた');
      console.log('おはよう!');
      })
    .catch(err => {
      console.error('睡眠例外です:', err);
  })
}

greet();
```

promise + async/await
> async で定義された Async 関数は、本文中に await を前置きすることで、他の Async 関数の実行結 果を待ってくれるようになる
> async/await は実のところ Promise 構文のシンタックスシュガーなの。Async 関数は隠されてるだけで暗黙のうちに Promise オブジェクトを返してる
``` typescript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const greet = async () => {
  console.log('おやすみ');

  try {
  await sleep(2000);
  console.log('起きた');
  console.log('おはよう!');
  } catch (err) {
    console.error('睡 眠 例 外 で す : ', err);
  }
}

greet();
```

# 3 関数型プログラミングでいこう
> React による開発ではオブジェクト指向の出番はあまりなくて、 関数型プログラミングの考え方を求められます
> 状態を内包してしまうクラスを用いた書き方は、どうしても使う必要があるところだけ に限定しておいたほうがいい
> 内部に状態を抱えず、副作用を極力排したプログラミングを行うことで、非同期な DOM の書き換 えという難問に対処してるのが React

コレクションの反復処理

``` typescript
constarr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr.map(n => n * 2)); // [ 2, 4, 6, 8, 10, 12, 14, 16 ]
console.log(arr.filter(n => n % 3 === 0)); // [ 3, 6 ]
console.log(arr.find(n => n > 4));// 5
console.log(arr.every(n => n !== 0)); // true
console.log(arr.some(n => n > 8));  // false
console.log(arr.includes(5)); // true
console.log(arr.reduce((n, m) => n + m)); // 36
console.log(arr.sort((n, m) => n < m)); // [ 8, 7, 6, 5, 4, 3, 2, 1 ]
```

高階関数(higher order function)

高階コンポーネント(higher order component)
- react で component に機能を付与するためによく使われるテクニック。 原理はいわゆる高階関数と同じ

クロージャでカウンターの実装
クロージャ: 親関数スコープの変数を参照する関数のこと

``` typescript
const counterMaker = (initialCount) => {
  let c = initialCount;
  const increment = () => c++;

  return increment;
};
const count = counterMaker(1);
console.log(count(), count(), count()); // 1 2 3
```

クラスを使ってカウンターの実装

``` typescript
class Counter {
  constructor(initialCount) {
    this.c = initialCount;
  }

  increment() {
  return this.c++;
  }
}

const counter = new Counter(1);
console.log(counter.increment(), counter.increment(), counter.increment()); // 1 2 3
```

ジェネレータ
`function*` `yield`
ジェネレータはあんまり使わない

``` typescript
function* rangeGenerator(end, start = 0) {
  let n = 0;
  for(let i = start; i < end; i++){
    n += 1;
    yield i;
  }
}

const gen = rangeGenerator(3);
console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

カリー化

``` typescript
constmulti = (n, m) => n * m;
console.log(multi(2, 4)); // 8

const curriedMulti = n => {
 return m => n*m;
}
console.log(curriedMulti(2)(4)); // 8

const simpleCurriedMulti = n => m => n * m;
console.log(simpleCurriedMulti(2)(4)); // 8
```

# 4 型のある typescript は強い味方
プリミティブ型

- number
- string
- boolean
- symbol
- null
- undefined

0, `''`, null, undefined は false として扱われ、それ以外は true として扱われる
