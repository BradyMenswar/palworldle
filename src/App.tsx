import React from "react";
import Classic from "./classic";
function App() {
  return (
    <div>
      <header className="flex items-center w-full h-12 px-4 text-white bg-indigo-900">
        Palworldle.org
      </header>
      <main className="p-4">
        <Classic />
      </main>
    </div>
  );
}

export default App;
