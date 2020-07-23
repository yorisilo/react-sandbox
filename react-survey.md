2020-05-03 14:08:07

# りあクト！読んでみた

- [りあクト！ TypeScript で始めるつらくない React 開発 第 2 版 - くるみ割り書房 - BOOTH](https://booth.pm/ja/items/1312652)

# 1 こんにちは React

- react で作られるアプリケーションはコンポーネントの組み合わせで構成される
- コンポーネント: イメージは任意の HTML タグでくくられる単位の内容物
- jsx: js の中に html タグがほぼそのまま書ける拡張
  - tsx: 上記の typescript バージョン
- create react app: react のボイラーテンプレートを生成してくれるやつ。
  - react-scripts: エントリーファイルとして、 src/index.tsx を public/index.html に結びつけてくれる
- npm-scripts: npm のオプションを追加してくれるやつ。 package.json 内の scritps でエントリを設定しておけば、任意のスクリプトを npm のオプションとして実行可能にできる。

# 2 ナウでモダンな javascript (ecmascript 2015 以降の js)

- 変数宣言: var はだめ。let, const を使おう。

関数宣言

```typescript
// 従来の関数宣言
function plusOne(n) {
  return n + 1;
}

// アロー関数の宣言その 1
const plusOne = (n) => {
  return n + 1;
};

// アロー関数の宣言その 2 (引数が一つの場合に以下のように書ける)
constplusOne = (n) => n + 1;
```

- function での関数宣言とアロー関数式での宣言 は this の挙動が変わる
- this とはオブジェクトであり、どのオブジェクトかどうかは関数の呼ばれ方によって変わる
- arrow function: 内部の this は宣言時のスコープを持つオブジェクトになる
- function: 内部の this は実行時のレシーバであるオブジェクトになる
  cf. [アロー関数と関数の違いと this の評価のされ方 - Qiita](https://qiita.com/shoichiimamura/items/aec874fc5cf55cde7fa1)

デフォルト引数

```typescript
constplusOne = (n = 0) => n + 1;

console.log(plusOne(5)); // 6
console.log(plusOne()); // 1
```

class が書ける

```typescript
class Bird {
  constructor(name) {
    this.name = name;
  }
  chirp() {
    console.log(`${this.name}が鳴きました`);
  }
  static explain(name) {
    console.log(`${name}は翼があって卵を生みます`);
  }
}

class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }

  fly() {
    console.log(`${this.name}が飛びました`);
  }
}

const bd1 = new Bird("ペンギン");
bd1.chirp(); // ペンギンが鳴きました
Bird.explain("カラス"); // カラスは翼があって卵を生みます

const bd2 = new FlyableBird("スズメ");
bd2.fly(); // スズメが飛びました
```

> テンプレートリテラルをさらっと 差し込んでおいたんだけど、わかった?」
> 「文字列を通常のシングルやダブルのクォートじゃなくバッククォートで囲んだ上で、変数名を ${} で囲うと値が展開されるやつですよね。Ruby でも #{} という書き方があったんでだいじょうぶです

class vs function
cf. [React.js - React での class と function の違い｜ teratail](https://teratail.com/questions/118890)

配列、オブジェクト

```typescript
const [n, m] = [1, 4];
console.log(n, m); // 1 4

const obj = { name: "Kanae", age: 24 };
const { name, age } = obj;
console.log(name, age); // Kanae 24
```

コレクションの展開。スプレッド構文
スプレッド演算子: `...`

```typescript
const arr1 = ["A", "B", "C"];
const arr2 = [...arr1, "D", "E"];
console.log(arr2); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]

constobj1 = { a: 1, b: 2, c: 3 };
const obj2 = { ...obj1, d: 4, e: 5 };
console.log(obj2); // { a: 1, b: 2, c: 3, d: 4, e: 5 }
```

プロパティ名のショートハンド: ECMAScript 2018 以降に導入された構文

```typescript
const foo = 65536;
const obj = { foo, bar: 4096 }; // 変数 foo がオブジェクトの中でその変数名がオブジェクトキーに、変数値がその値になってる
console.log(obj); // { foo: 65536, bar: 4096 }
```

非同期処理

- js の場合コールバック関数は非同期で実行される

> React コンポーネントのレンダリングだってそうだよ。上の階層からとか関係なく、前処理が終わ ったものから他を待たずに表示されていくの」
> 「まず Controller でページ全体の処理を行って、そこからまとめて View に渡してレンダリングされ る Rails とは全然ちがいますね」
> 「いいところに気がついたねー。その話題は後にとっておくとして、非同期処理のプロセスを待って もらうやり方を見ていこう。まずは ES6 から導入された Promise 構文ね」

- promise: ES6 から導入された非同期処理のプロセスを待つときに使う構文
- async/await: ES2017 から導入された then, catch でない非同期処理のプロセスを待つときに使う構文

promise + then, catch

```typescript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const greet = () => {
  console.log("おやすみ");
  sleep(2000)
    .then(() => {
      console.log("起きた");
      console.log("おはよう!");
    })
    .catch((err) => {
      console.error("睡眠例外です:", err);
    });
};

greet();
```

promise + async/await

> async で定義された Async 関数は、本文中に await を前置きすることで、他の Async 関数の実行結 果を待ってくれるようになる
> async/await は実のところ Promise 構文のシンタックスシュガーなの。Async 関数は隠されてるだけで暗黙のうちに Promise オブジェクトを返してる

```typescript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const greet = async () => {
  console.log("おやすみ");

  try {
    await sleep(2000);
    console.log("起きた");
    console.log("おはよう!");
  } catch (err) {
    console.error("睡 眠 例 外 で す : ", err);
  }
};

greet();
```

# 3 関数型プログラミングでいこう

> React による開発ではオブジェクト指向の出番はあまりなくて、 関数型プログラミングの考え方を求められます
> 状態を内包してしまうクラスを用いた書き方は、どうしても使う必要があるところだけ に限定しておいたほうがいい
> 内部に状態を抱えず、副作用を極力排したプログラミングを行うことで、非同期な DOM の書き換 えという難問に対処してるのが React

コレクションの反復処理

```typescript
constarr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr.map((n) => n * 2)); // [ 2, 4, 6, 8, 10, 12, 14, 16 ]
console.log(arr.filter((n) => n % 3 === 0)); // [ 3, 6 ]
console.log(arr.find((n) => n > 4)); // 5
console.log(arr.every((n) => n !== 0)); // true
console.log(arr.some((n) => n > 8)); // false
console.log(arr.includes(5)); // true
console.log(arr.reduce((n, m) => n + m)); // 36
console.log(arr.sort((n, m) => n < m)); // [ 8, 7, 6, 5, 4, 3, 2, 1 ]
```

高階関数(higher order function)

高階コンポーネント(higher order component)

- react で component に機能を付与するためによく使われるテクニック。 原理はいわゆる高階関数と同じ

クロージャでカウンターの実装
クロージャ: 親関数スコープの変数を参照する関数のこと

```typescript
const counterMaker = (initialCount) => {
  let c = initialCount;
  const increment = () => c++;

  return increment;
};
const count = counterMaker(1);
console.log(count(), count(), count()); // 1 2 3
```

クラスを使ってカウンターの実装

```typescript
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

```typescript
function* rangeGenerator(end, start = 0) {
  let n = 0;
  for (let i = start; i < end; i++) {
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

```typescript
constmulti = (n, m) => n * m;
console.log(multi(2, 4)); // 8

const curriedMulti = (n) => {
  return (m) => n * m;
};
console.log(curriedMulti(2)(4)); // 8

const simpleCurriedMulti = (n) => (m) => n * m;
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

> tsconfig.json のファイルの中を見てみて。strict オプションが true にな ってるでしょう? これは strictNullChecks を始めとする strict 系のオプションをまとめて設定する もので、今の Create React App ではデフォルトで true になってるの。だから Null 代入で怒られる

共用型(union type)

```typescript
let i: number | null = 1

# ストリングリテラル型と共用型を組み合わせた例
let pet: 'cat' | 'dog' | 'rabbit' = 'dog'; // enum みたいなことができる。> TypeScript にも enum 型はあって文字列 enum でも同じようなこと はできるんだけど、こっちのほうが React 開発ではよく使われてる
```

any: どんな型でも受け付ける

never: 何も代入できない型

```typescript
const greet = (friend: "serval" | "caracal" | "cheetah") => {
  switch (friend) {
    case "serval":
      return "Hello, Serval!";
    case "caracal":
      return "Hello, Caracal!";
    case "cheetah":
      return "Hello, Cheetah!";
    default:
      const check: never = friend;
  }
};
console.log(greet("serval")); // Hello, Serval!
```

never 型を使って case 文の漏れをコンパイル時にチェックすることができる

配列型

```typescript
const arr1: number[] = [1, 2, 3]; // [1,2,3] <- こっちのスタイルのほうがよく使用されてる
const arr2: Array<number> = [1, 2, 3]; // [1,2,3]
```

オブジェクト型

```typescript
const john: { name: string; age: number } = { name: "John", age: 25 };

interface User {
  name: string;
  age?: number;
} // オブジェクトの型は最初の例のように、変数宣言時に直に書くことができるけど、interface 文で定義することもできる

const jane: User = { name: "Jane", age: 27 };
const Jack: User = { name: "Jack" };

type Person = User; // type は type alias と呼び、型に別の名前を付けられるもの
const rick: Person = { name: "Rick", age: 31 };

interface Foo {
  hoge?: number;
  fuga: string;
} // プロパティ名の suffix に ? を付けると省略可能なプロパティになる。
interface Bar {
  hoge: number;
}
interface Buz {
  piyo: string;
}

type FooBar1 = Foo & Bar; // { hoge: number, fuga: string }
type FooBar2 = Foo | Bar; // { hoge?: number, fuga: string } or { hoge: number }
type FooBuz1 = Foo & Buz; // { hoge?: number, fuga: string, piyo: string }
type FooBuz2 = Foo | Buz; // { hoge?: number, fuga: string } or { piyo: string }
type BarFooBuz = Bar & (Foo | Buz); // { hoge: number, fuga: string } or { hoge: number, piyo: string }

interface User {
  name: string;
}
interface User {
  age: number;
}
interface User {
  gender: "m" | "f";
}
const user: User = { name: "jane", age: 27, gender: "f" }; // interface 文は上書きじゃなくて継承されるので注意。既存のオブジェクト型を拡張したい場合は type alias を使って別名にするべし。まっさらの状態では interface でオブジェクト型を定義、既存の オブジェクト型の拡張や合成が必要なときは type を使う
```

- 交差型(Intersection Type): 複数の型をひとつにまとめたもの。`&` を使う。合成し た型のすべてのプロパティを備えるが、同じ名前のプロパティが省略可能と必須だと、必須 が優先される。
- 共用体型(Union Type): 渡された複数の型のいずれかが適応される型。 `|` を使う

const の挙動

```typescript
> constarr = [1, 2, 3];
> arr[0] = 7;
7
> arr
[7,2,3]

>const obj ={a: 1, b: 2};
> obj.b = 5;
5
> obj
{a: 1, b: 5}
```

変数自体に再代入はできないが、各要素の上書きや追加はできてしまう。。

readonly 型を使えば、各要素の上書きや追加もできなくなる

```typescript
> const arr1: ReadonlyArray<string> = ['foo', 'bar'];
> const arr2: readonlystring[] = ['foo', 'bar']; // 上記と同じ

> arr1[0] = 'buz'; // error TS2542
> arr2[2] = 'buz'; // error TS2542

> const obj1: Readonly<{ foo: number }> = { foo: 2 };

> obj1.foo = 8; // error TS2540
```

> readonly 型は使用実績がないのでしばらくは様子見しておいて、書く側が気をつけるようにする。
> たとえばオブジェクトの任意の部分を変更したオブジェクトが必要な場 合、そのプロパティを直に書き換えるんじゃなくて、こんなふうに書くといい

```typescript
> const obj = { red: 'ff0000', green: '00ff00' };
> const newObj = { ...obj, green: '00ee00', blue: '0000ff' };
> newObj
{ red: 'ff0000', green: '00ee00', blue: '0000ff' }
```

関数型

- 引数の型は必ず指定する必要がある
- 戻り値の型は型推論が効くので書かなくても良い

```typescript
> const add = (n: number, m: number): number => n + m;
> add(1, 3);
4
> function subtr(n: number, m: number): number { return n - m; }
> subtr(5, 4);
1
> const hello = (): void => { console.log('Hello!') };
> hello();
Hello!
```

ReturnType: 関数の戻り値の型を推論する関数

```typescript
> const aloha = () => 'Aloha!';
> type Greeting = ReturnType<typeof aloha>;
> const chao = (): Greeting => 'Chao!'
```

コンパイル設定

tsconfig.json

- cf. [TypeScript: Handbook - Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

ts だけじゃなく js もコンパイルする
compilerOptions.allowJs: true

絶対パスインポート(src をベースにして絶対パスで import を記述できる)
compilerOptions.baseUrl: "src"

```typescript
import { MyAwesomeComponent } from "./components/MyAwesomeComponent"; // 相対パス
import { MyAwesomeComponent } from "components/MyAwesomeComponent"; // 絶対パス
```

モジュールの型定義

js で書かれたライブラリを ts にインポートして使う方法: .d.ts という型定義ファイルを用意すればおｋ

自前で .d.ts が用意されてない場合 [DefinitelyTyped](http://definitelytyped.org/) にて有志の方が作ってくれてることがあるのでそちらを使うと良い。

> たとえば React 用ルーティングライブラリの React Router は自前で型定義ファ イルが用意されていないので、npm のサイトで @types/react-router で探してみる。または yarn info @types/react-router を実行してみる」
> 自前で用意されてるのか DefinitlyTyped にあるのかわからないときは、yarn info @types/... で探 すといいよ。自前で用意されてる場合は『非推奨:このパッケージはフェイクで、オリジナルのライ ブラリが型定義ファイルを提供しているので、これをインストールする必要はありません』と表示さ れるから

# 5 jsx(tsx)

> JSX はテンプレート言語じゃない。JSX とは『JavaScript eXtension』 の略で、JavaScript に HTML ライクな構文を拡張したもの。あくまで JavaScript がベースであって、 HTML の DOM 構文にロジックを埋め込むテンプレート言語とはアプローチが逆になってるの

> 2015 年、私たちの考え方に一大革新が起こりました。それは、慣れ親しんできた MVC のパターンから、Redux や RxJS のようなツールがサポートする、Flux と Functional Reactive Programming に基づいた一方向アーキテクチャとデータフローへのシフトです。
> cf. [フロントエンドにおいて Model-View-Controller は死んだのか？ | POSTD](https://postd.cc/is-mvc-dead-for-the-frontend/)

Flux: facebook が提唱しているアーキテクチャ。MVC, MVVM とかああいうアーキテクチャの一種

> MVC と MVVM, Flux で大きく異なるのは, View 側にサーバ(Model, Controller)とは独立したアプリケーションがあり, View で独立したデータ状態を持つ/制御することであろう.
> cf. [Flux とは何か MVC, MVVM との違いも含めて - See the Elephant](https://namu-r21.hatenablog.com/entry/2018/03/21/232726)

```typescript
<h1>Hello, world!</h1>; // 以下と同値(jsxは以下の構文のシンタックスシュガー)
React.createElement("h1", "Hello, world");
```

jsx の変数の埋め込み
`{}` で変数を囲むと値が展開される
```typescript
...
<p>{title}</p>
...
```

if 文に相当: title が true 相当なら、 `<...>` を評価する

```typescript
{title && <...>}
```

if-else 文に相当: 三項演算子が使える

```typescript
{
  value ? <foo /> : <bar />;
}
```

spread attributes: オブジェクトに格納されたタグ属性値をまとめて渡すことができる

```typescript
<img {...logoOptions} />
```

```typescript
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    const logoOptions = { alt: "logo", className: "App-logo", src: logo };
    const title = "こんにちは React";
    const targets = ["World", "Kanae", "Yukina"];
    return (
      <div className="App">
        <header className="App-header">
          {
            // コメントはこう書く
          }
          <img {...logoOptions} />
          {title && <p>{title}</p>}
          {targets.map(target => (
            <p>Hello, {target}!</p>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
```

# 6 lint と prettier でコードをクリーンに

- eslint: js の linter, `eslint --fix` でフォーマットもできる
- prettier: js の formatter, `eslint --fix` よりも強い感じでフォーマットできる
- stylelint: css の linter

```shell
$ npm install -D eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

> Create React App で生成されたプロジェクトには便利なスクリプト群がまとまったパッケージの react-scripts というものが最初から入ってるんだけど、その中にすでに ESLint が含まれてるんだよ。 react-scripts の ESLint と二重インストールになる上、バージョン不整合の問題もあるので、別途 ESLint をインストールするのはやめたほうがいい

eslint の設定は `$ eslint --init` で対話的に作ることもできるがあまり使える設定が出力されないらしいので、秘伝のタレを使う

eslint と prettier はここが詳しい
cf. [ESLint - Prettier 連携のやり方と仕組み - Qiita](https://qiita.com/ikngtty/items/4df2e13d2fa1c4c47528)

# 7 何はなくとも component

react の特徴

- 仮想 DOM
- component 思考
- 単方向データフロー(Flux)

Props: 関数に対する引数のようなもの。component に渡す引数みたいな感じ。親 component から受け取る値のこと。
component: `<hoge ... />` みたいに使えるやつ

## import, export

export default: デフォルトエクスポートされたら好きな名前で import できる
export: 普通にエクスポートされたら、export した名前で import する。 `{ Character }` みたいに読み込む必要あり

export

```typescript
export interface Character {
  id: number;
  name: string;
  age: number;
  height?: number;
}

...
export default CharacterList;
```

import

```typescript
import CharacterList, { Character } from "./CharacterList";
```

閑話休題: 見た目をリッチに

> 「Semantic UI React って React 向けの UI フレームワークを入れたからね。インストール方法や使い 方は公式サイト 2 を見てもらえばいいけど、yarn add semantic-ui-react semantic-ui-css を実行して、 src/index.tsx で semantic.min.css を読み込むようにしただけ。簡単でしょ?」
> 「Twitter Bootstrap みたいのは知ってましたけど、これは UI 要素を React のコンポーネントで提供し てくれてるんですね」
> 「他にも Material-UI とかいろいろあるので、デザインや使い勝手を考えて好きに選ぶといいよ。

コンポーネントの重要な 3 要素

- Props: 親コンポーネントから受け取る値

```typescript
<Button text="click me" onClick={this.clickHandler} />
```

という jsx を例に取ると、 text と onClick が Button コンポーネントに渡される Props

- Local State: コンポーネント自身が内部に持つ状態のこと
  https://github.com/oukayuka/ReactBeginnersBook-2.0/blob/master/07-component/03-state/src/App.tsx

this.state は参照はできるが、直接値を入れることができない。
setState() メソッドを使って値を代入する
引数は

- 設定したい state オブジェクト
- `(prevState, props) => newState` 形式の state と props を引数とし、新しい state を返す関数。
  - `prevState => newState` props を省略可

ユーザーのフォーム操作によって、親コンポーネントの中身を書き換えるときはどうするか
つまり、親コンポーネントの中身を子コンポーネントがどうやって操作するのか
=> 親コンポーネントが自身の状態を変更する関数を子コンポーネントに渡して、フォーム入力時に発火されるイベントにその関数を仕込む

- ライフサイクル
  > コンポーネントが初期化されてマウントされレンダリングされ、何らかの処理が行われて再レンダリングさ れたりして、最後にアンマウントされるまでの過程

1. Mounting ...... コンポーネントが生成され DOM ノードに挿入されるフェーズ
2. Updating ...... 変更を検知してコンポーネントが再レンダリングされるフェーズ
3. Unmounting ...... コンポーネントが DOM ノードから削除されるフェーズ
4. Error Handling ...... そのコンポーネント自身および子コンポーネントのエラーを捕捉するフェーズ

> コンポーネントが再レンダリングされるのは、基本的に 2 つの場合のみなの。 そのコンポーネントに渡されている Props か、または自身の Local State の値に変更があったときがそ のタイミング。ただしそこに介入して、任意の条件で再レンダリングを阻止することはできるけどね

- クラスコンポーネント
クラスコンポーネント例:
 https://github.com/oukayuka/ReactBeginnersBook-2.0/blob/master/07-component/04-lifecycle/src/App.tsx

  cf. [Typescript で React を学ぶ(コンポーネントと Props について) - Qiita](https://qiita.com/wdkkou/items/9738639ebe83c6d7d0b7)
  cf. [関数コンポーネントはクラスとどう違うのか? — Overreacted](https://overreacted.io/ja/how-are-function-components-different-from-classes/)

- 関数コンポーネント <= こっちで作ることが推奨されてる。クラスはあんまり使わないほうが良さそう。
理由:
  > クラスコンポーネントのデメリット
  > - クラス内の this の挙動が難解
  > - 記述が冗長になりがちで、時系列が複雑なライフサイクルメソッドの挙動
  > - 今後導入予定の各種最適化がクラスだと難しい

Hooks が出る前は、Local State もライフサイクルメソッドも持てなかったので、それらが必要なときは、クラスコンポーネントを使う事が多かった。(あるいは Recompose というライブラリを使うか)
Recompose の作者が Facebook にスカウトされて作ったのが Hooks
Recompose は今はメンテされておらず、 Hooks への移行が勧められてる。

関数コンポーネント例:
https://github.com/oukayuka/ReactBeginnersBook-2.0/blob/master/07-component/05-functional/src/CharacterList.tsx

コンポーネントを別の側面から2種類に分類する
- Presentational Component (省略してこれをコンポーネントと呼ぶことが多い)
- Container Component (省略してこれをコンテナと呼ぶことが多い)

## Presentational Component
- 見た目をつかさどる
- DOM マークアップをふんだんに持つ
- データやふるまいを Props として一方的に受け取る
- Flux の Store などに依存しない
- 自身の状態を持たない(UI の状態を除く)
- データの変更に介入しない
- 関数コンポーネントで表現されることが多い
- Examples: Page, Sidebar, Story, UserInfo, List.

## Container Component
- 機能をつかさどる
- DOM マークアップは可能な限り持たない
- データや振る舞いを他のコンポーネントに受け渡す
- Flux の Action を実行したり、 Store に依存する
- データの状態を持つことが多い
- データの変更に介入して、任意の処理を行うことが多い
- HOC, Render Props, Hooks が使われることが多い
- Examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList.

cf.
- [Presentational and Container Components - Dan Abramov - Medium](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

# 8 Hooks で関数コンポーネントを強化する
- [フックの導入 – React](https://ja.reactjs.org/docs/hooks-intro.html)
- [When to use React Suspense vs React Hooks](https://www.freecodecamp.org/news/when-to-use-react-suspense-vs-react-hooks-f66ef94cb54f/)
- [我々向けの Algebraic Effects 入門 — Overreacted](https://overreacted.io/ja/algebraic-effects-for-the-rest-of-us/)
- [React Custom Hooksのサンプル集 - Qiita](https://qiita.com/takeyuichi/items/41776005061f1697d67d)

- HOC: コンポーネントをもらってコンポーネントを返す関数
- RenderProps: 公式が推していたが、分かりづらいためあんまり使われてない
- Hooks: これからはコンポーネントは関数コンポーネント + Hooks で作ることが推奨されてる。 useState, useEffect, useContext とかのこと
> HOCやRender Propsの弱点とされたもの、たとえばWrapper Hellになりやすい、可読性が低いといった点がほぼクリアされていて、コードが読みやすくシンプルになるところだね。さらに state やライフサイクルを使うといったコンポーネントに付与したい機能をそこだけ切り出すことも簡単な ので、再利用しやすくテストしやすいといったメリットもある

## 関数コンポーネント

``` typescript
const App: FC = () => {
...
};
```

> props は React.FC<Props> のようにジェネリックで書くことができます。children は React.FC でコンポーネント定義すると暗黙的に使えるようになります。つまり FC<React.ReactNode> = ({ children }) => ... みたいに書かなくて FC = ({ children }) => ... とするだけで良い。
> React.FC で定義される children はオプショナルであり、型は React.ReactNode です。
cf.
- [TypeScript で書く React コンポーネントを基礎から理解する - Qiita](https://qiita.com/sangotaro/items/3ea63110517a1b66745b)


## state hook
useState: クラスコンポーネント の local state に相当

``` typescript
const [count, setCount] = useState(0); // state 変数と、その state 変数の setter を定義している。 useState の引数は state変数の初期値
```

=>

useState のイメージ
``` typescript
let currentIndex = 0;
const states = [];

const useState = (initialState) => {
  const index = currentIndex;
  currentIndex++;

  return [
    states[index] || initialState,
    newState => { states[index] = newState; }
  ];
}
```

> 「ふおお、グローバルな配列に state 値を突っ込んでる......」
> 「だから useState() を使って複数の Local State を設定するとき、条件文とかでくるんでしまうと配 列の順番がおかしくなるので、それはタブーになってるの。関数定義の最初のほうにこんなふうに useState() をプレーンに連ねて書くこと

``` typescript
const [foo, setFoo] = useState(100);
const [bar, setBar] = useState('Inital Bar');
const [buz, setBuz] = useState(true);
```

## effect hook
useEffect: 副作用を扱うhook. クラスコンポーネントのライフサイクルメソッド componentDidMount(), componentDidUpdate(), componentWillUnmount() に相当する
> 副作用とは具体的には、データの取得、手動での DOM の改変、ログの記録といったも のになる。

``` typescript
useEffect(() => {
  doSomething(); // コンポーネントのレンダリング直前に実行される処理。 componentDidMount, componentDidUpdate 内に書くイメージ
  return clearSomething(); // コンポーネントのアンマウント直前に実行される処理。 componentWillUnmount 内に書くイメージ
}, [watchVar]); // 第2引数は配列内に変数を入れておいて、その変数が前回のレンダリング時と変わらなければ、第一引数で渡された doSomething が実行されない。
```

第2引数を
- 省略すると、常に doSomething が実行される
- 空の配列にすると、初回のレンダリングのときのみ doSomething が実行される

## その他の hooks
- useRef: 本来は DOM への参照のための ref オブジェクトを取得するためのものなんだけど、そ のcurrent プロパティの値は変更可能でどんな値でも保持することができるので、インスタンス変数 のように使える

> たとえば任意のLocal Stateの前回レンダリング時の値を保持しておきたい場合と かは、こんなふうに書ける
``` typescript
const Counter: FC = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0); // useRef() の引数の中身で current プロパティの初期化を行う
  const prevCount = prevCountRef.current;
  useEffect(() => {
    prevCountRef.current = count;
  });

  return <div>Now: {count}, before: {prevCount}</div>;
};
```

- useMemo: パフォーマンス最適化のためによく使われる。 例えば特定の Props が変更されたときだけ任意の子コンポーネントの再レンダリングを行ったりとかに使う。 shouldComponentUpdate に相当

``` typescript
const memoValue = useMemo(() =>
  calculateSomething(),
  [watchVar] // 第2引数は配列内に変数を入れておいて、その変数が前回のレンダリング時と差分があれば、第一引数で渡された calculateSomething が戻り値として返される
);
```

``` typescript
const Parent: FC<{ a: string, b: string }> = ({ a, b }) => {
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  const child2 = useMemo(() => <Child2 b={b} />, [b]);

  return (
    <>
      {child1}
      {child2}
    </>
  )
};
```

react ではルートが一つのASTしかリターンできないので、複数の dom node を返したい場合は、何かでくくる必要がある。
この場合役に立つのが、 React.Fragment である。(`<>...</>` は React.Fragment のシンタックスシュガー)
> class 指定のない `<div>` でくくっても表示は同じなんだけど、それだと HTML ソースに不要な `<div>` 階層ができちゃうので、 こう記述しておくとそれが避けられるの。ただ、 `<div>` とちがって必ず中身のノードが必要なので、 処理の結果、中身がなくなる可能性のあるときは使っちゃダメ

## custom hook
useHoge: hook を組み合わせて hook を自分で作る。命名は useHoge のように use を prefix とすること。

- ex. presentatinal component https://github.com/oukayuka/ReactBeginnersBook-2.0/blob/master/08-hooks/05-custom/src/components/App.tsx
- ex. container component https://github.com/oukayuka/ReactBeginnersBook-2.0/blob/master/08-hooks/05-custom/src/containers/App.tsx

## hook の使い方
> - Hooks を呼べるのは関数コンポーネントか Custom や React モジュール管轄外での使用は不可。Hook の中のみ。クラスコンポーネント
> - Hooks 文を記述するのはその関数のトップレベルで行う。条件分岐やループ、ネストした関 数内に記述するのは不可。
> - Custom Hook の関数名は、useXxx のように必ず「use」で始める。

# 9 ルーティングで URL を制御する
- ルーティング: ある URL に対してなんらかの処理を行う
- サーバーサイド web アプリケーションのルーティング: アプリケーションサーバがリクエストされた URL に対して、それに紐付けられたページを生成し、レスポンスとして返すこと。
- 典型的な SPA のルーティング: サーバを介すること無くフロントエンドだけで ある URL に対して処理を行う。
  - アプリケーションサーバが API サーバと統合されてたり、サーバーサイドレンダリングを行ってい たりする場合はその限りではない

> 典型的な SPA ではアプリケー ションサーバの役割は最初のリクエストに対してアプリ全体が記述された JavaScript のコードのかた まりを返すだけで終わる。アプリ内のページ遷移でブラウザのアドレスバーの URL が書き換わるこ とがあっても、サーバにリクエストが飛ぶことは原則的にない

- History API(back, forward, pushState, replaceState...) によって、 js で URL が完全に制御可能になった。
  - そのおかげで URL が変わっているのに、 web サーバにリクエストが飛ぶことなく、 js で制御可能になっている。

- サーバーにリクエストがいかないので、アクセス解析は専用のライブラリを使って行う
> サーバにリクエストが行かないということは、サーバ側からはクライアントがどんなページを見て るかとか、ページをどう移動したかとかがわからないわけだよね。これはアクセス解析を行う上でネ ックになる。でも Google Analytics 用に react-ga というモジュールがあるので、それを組み込むこと で対処できる

- サーバーにリクエストがいかないので、サーバのステータスコードでは制御できない
> サーバが HTTP ステータスコードを返せないことも注意すべき点かな。既存のページを削除 したときにサーバが 404 を返すようにすれば、検索エンジンがそれを検知してインデックスから削除 してくれるけど、SPA だとそうはいかない。サイトマップや Google Analytics の管理機能を使うこと でフォローする必要がある

- react ではルーティングの適用単位がコンポーネント
> ルーティングの適用単位がコンポーネントだというのも前提知識として知っておく必要が あるね。Rails だと URL に対応するのは HTML のページ全体なわけだけど、React に組み込むルー ターは個々のコンポーネントが URL に紐付く形になる。Rails の Controller でも URL から判断して パーツテンプレートの出し分けはできるけど、React に対応したルーターでは親コンポーネントのあ ずかり知らぬところで子コンポーネントが自分で URL を見て振る舞いを変えたりできる

## React Router
- cf. https://reacttraining.com/react-router/web/guides/quick-start

react router 5.1 系から、 withRouter という HOC 用の API を使わなくて良くなり、useHistory, useLocation, useParamas などの hooks が導入されたのでそっちを使うこと
- cf. [React RouterがHooks対応したので使い方を整理する - Qiita](https://qiita.com/ozaki25/items/bb0eb273611eebc603dd)

- useHistory: ページ遷移させるときに使うhistoryを取得できます
  - const history = useHistory()
  - history.push('/')やhistory.goBack()といった具合で使います
- useLocation: 現在のページのURLのpathやqueryなどの情報を取得できます
  - const location = useLocation()
  - location.pathやlocation.searchといった具合で使います
- useParams
  - URLのパスの中で動的に変化する部分の値を取得できます
  - `<Route path="/hello/:name">` と定義したページにアクセスした際に const { name } = useParams();とすると:nameの部分の値を取得できます


`<App />` に `<BrowserRouter>` というコンポーネント でラップされてる。こうすると下の階層のコンポーネントで HTML5 の History API を利用した各種 の機能が使えるようになる

``` typescript
...
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
...
```

[React RouterがHooks対応したので使い方を整理する - Qiita](https://qiita.com/ozaki25/items/bb0eb273611eebc603dd) を typescript を使って書き換えてみる
