import { useState } from "react";

export function Button() {
  // let number = 0;
  const [counter, setCounter] = useState(0)

  function increment() {
    // number++;
    setCounter(counter + 1)
    console.log(counter);
    
  }

  


  return (
    <div>
      <button onClick={increment}>
        {counter}
      </button>
    </div>    
  );
}


