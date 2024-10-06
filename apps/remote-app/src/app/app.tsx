// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useState} from "react";

export function App() {
  const [state, setState] = useState(1);


  return (
    <div>
      <h5>This is Remote App</h5>
      <button onClick={() => setState(state => state + 1)}>{state}</button>
    </div>
  );
}

export default App;
