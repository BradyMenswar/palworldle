import React from "react";
import Classic from "./classic";
function App() {
  return (
    <div>
      <header className="flex items-center w-full h-12 px-4 text-white bg-indigo-900">
        Palworldle.org
      </header>
      <main className="flex justify-center p-4">
        <div className="w-1/2">
        <Classic />
        </div>
      </main>
    </div>
  );
}

export default App;
