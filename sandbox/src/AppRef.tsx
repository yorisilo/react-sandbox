import React, {useState, useRef} from 'react';

const list: {}[] = [];

const App = () => {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount(c => c + 1);
  };

  /* const obj = {}; // objは、`Ref`ではない一般的なオブジェクト */
  const obj = useRef({});
  list.push(obj);
  console.log(list.length);
  if (list.length >= 2) {
    console.log(list[list.length - 2] === list[list.length - 1]); // X
  }
  console.log("call App");
  return (
    <div>
      <button type="button" onClick={onClick}>
        count up
      </button>
      {count}
    </div>
  );
};

export default App;
