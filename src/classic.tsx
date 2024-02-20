import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import palData from "./pals.json";

interface Pal {
  name: string;
  number: number;
  types: string[];
  title: string;
  work_suitability: string[];
  colors: string[];
  mount_type: "Not ridable" | "Ground" | "Water" | "Flying" | "Glider";
  entry: string;
  emojis: string[];
  icon: string;
}

const pals: Pal[] = palData as Pal[];
let answer: Pal;

const Classic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [remainingPals, setRemainingPals] = useState<Pal[]>(pals);
  const [filteredPals, setFilteredPals] = useState<Pal[]>([]);
  const [guessedPals, setGuessedPals] = useState<Pal[]>([]);

  useEffect(() => {
    const results = remainingPals.filter((pal) => {
      if (searchTerm === "") return false;
      return pal.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    setFilteredPals(results);
  }, [searchTerm]);

  function guess(guessedPal: Pal) {
    setGuessedPals([guessedPal, ...guessedPals]);
    const removeGuessedPal = remainingPals.filter((pal) => {
      return pal.number !== guessedPal.number;
    });
    setRemainingPals(removeGuessedPal);
    setSearchTerm("");
  }

  return (
    <div>
      <div className="p-2">
        {guessedPals.map((pal: Pal) => (
          <div key={pal.name} className="flex items-center w-full gap-4 p-4">
            <img
              src={`${process.env.PUBLIC_URL}/pal-icons/${pal.icon}`}
              alt={pal.name}
              className="object-cover h-16 border-2 border-indigo-600 rounded-full aspect-square"
            />
            <h2 className="text-2xl">{pal.name}</h2>
            <div>
              <h4>
                {pal.types.map((type: string) => {
                  return type + " ";
                })}
              </h4>
              <h4>
                {pal.colors.map((color: string) => {
                  return color + " ";
                })}
              </h4>
              <h4>{pal.number}</h4>
              <h4>{pal.mount_type}</h4>
              <h4>
                {pal.work_suitability.map((work: string) => {
                  return work + " ";
                })}
              </h4>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            <AiOutlineSearch />
          </span>
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search pals by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="p-2">
        {filteredPals.map((pal: Pal) => (
          <button
            key={pal.name}
            onClick={() => guess(pal)}
            className="flex items-center w-full gap-4 p-4 bg-indigo-200 hover:bg-indigo-300"
          >
            <img
              src={`${process.env.PUBLIC_URL}/pal-icons/${pal.icon}`}
              alt={pal.name}
              className="object-cover h-16 border-2 border-indigo-600 rounded-full aspect-square"
            />
            <h2 className="text-2xl">{pal.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Classic;
