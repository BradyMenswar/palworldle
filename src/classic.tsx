import { FormEvent, useEffect, useState } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiOutlineCheck,
  AiOutlineSearch,
} from "react-icons/ai";
import palData from "./pals.json";
import { Tooltip } from "react-tooltip";

import Cooling from "./work-icons/Cooling";

interface Pal {
  name: string;
  number: number;
  elements: string[];
  title: string;
  work_suitability: string[];
  colors: string[];
  mount_type: "Not ridable" | "Ground" | "Water" | "Flying" | "Glider";
  entry: string;
  emojis: string[];
  icon: string;
}

const pals: Pal[] = palData as Pal[];

const answer: Pal = pals[0];

const Classic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [remainingPals, setRemainingPals] = useState<Pal[]>(pals);
  const [filteredPals, setFilteredPals] = useState<Pal[]>([]);
  const [guessedPals, setGuessedPals] = useState<Pal[]>([]);

  const correctColor = "bg-green-400";
  const wrongColor = "bg-red-400";
  const partialColor = "bg-yellow-400";

  useEffect(() => {
    const results = remainingPals.filter((pal) => {
      if (searchTerm === "") return false;
      return pal.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    setFilteredPals(results);
  }, [searchTerm]);

  function areArraysIdentical(array1: string[], array2: string[]): boolean {
    return (
      array1.length === array2.length &&
      array1.every((value, index) => value === array2[index])
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (filteredPals.length !== 0) guess(filteredPals[0]);
  }

  function guess(guessedPal: Pal) {
    setGuessedPals([guessedPal, ...guessedPals]);
    const removeGuessedPal = remainingPals.filter((pal) => {
      return pal.number !== guessedPal.number;
    });
    setRemainingPals(removeGuessedPal);
    setSearchTerm("");

    if (guessedPals.includes(answer)) {
      console.log("Correct!");
    }
  }

  function checkValue(palValue: string | number, answerValue: string | number) {
    if (palValue === answerValue) {
      return correctColor;
    }
    return wrongColor;
  }

  function checkArray(palArray: string[], answerArray: string[]) {
    if (areArraysIdentical(palArray, answerArray)) return correctColor;
    if (palArray.some((element) => answerArray.includes(element)))
      return partialColor;
    return wrongColor;
  }

  function checkValueInArray(palValue: string, answerArray: string[]) {
    if (answerArray.includes(palValue)) return correctColor;
    return wrongColor;
  }

  function checkArrowDirection(palValue: number, answerValue: number) {
    if (palValue === answerValue)
      return <AiOutlineCheck id={"numberArrow" + palValue} />;
    if (palValue < answerValue)
      return <AiOutlineCaretUp id={"numberArrow" + palValue} />;
    return <AiOutlineCaretDown id={"numberArrow" + palValue} />;
  }

  return (
    <div className="w-full">
      <form
        className="relative w-full mt-2 rounded-md shadow-sm"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
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
      </form>
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

      {guessedPals.length !== 0 && (
        <div className="grid grid-cols-6 gap-4 p-2 text-center">
          <h4>Pal</h4>
          <h4>Element</h4>
          <h4>Color</h4>
          <h4>Ridable</h4>
          <h4>Work Suitability</h4>
          <h4>Paldeck #</h4>
          {guessedPals.map((guessedPal: Pal) => {
            return (
              <>
                <div
                  className={
                    "flex items-center justify-center p-3 aspect-square " +
                    checkValue(guessedPal.name, answer.name)
                  }
                >
                  <img
                    id={guessedPal.name}
                    src={`${process.env.PUBLIC_URL}/pal-icons/${guessedPal.icon}`}
                    alt=""
                    className="object-cover w-full"
                  />
                  <Tooltip
                    anchorSelect={"#" + guessedPal.name}
                    content={guessedPal.name}
                  />
                </div>
                <div
                  className={
                    "flex items-center justify-center p-3 aspect-square " +
                    checkArray(guessedPal.elements, answer.elements)
                  }
                >
                  {guessedPal.elements.map((element) => {
                    return (
                      <>
                        <img
                          id={element}
                          className="object-cover"
                          src={`${process.env.PUBLIC_URL}/element-icons/${element}.png`}
                          alt={element}
                        />
                        <Tooltip
                          anchorSelect={"#" + element}
                          content={element}
                        />
                      </>
                    );
                  })}
                </div>
                <div
                  className={
                    "flex items-center justify-center p-3 aspect-square " +
                    checkArray(guessedPal.colors, answer.colors)
                  }
                >
                  <h4>
                    {guessedPal.colors.map((color) => {
                      return color + " ";
                    })}
                  </h4>
                </div>
                <div
                  className={
                    "flex items-center justify-center p-3 aspect-square " +
                    checkValue(guessedPal.mount_type, answer.mount_type)
                  }
                >
                  <h4>{guessedPal.mount_type}</h4>
                </div>
                <div
                  className={
                    "flex flex-wrap gap-1 items-center justify-center p-2 aspect-square " +
                    checkArray(
                      guessedPal.work_suitability,
                      answer.work_suitability
                    )
                  }
                >
                  {guessedPal.work_suitability.map((work) => {
                    return (
                      <>
                        {/* <img
                          id={work.replace(" ", "-")}
                          className={"object-cover h-8"}
                          src={`${process.env.PUBLIC_URL}/work-icons/${work}.svg`}
                          alt={work}
                        /> */}
                        <Cooling color={checkValueInArray(work, answer.work_suitability)}/>
                        <Tooltip
                          anchorSelect={"#" + work.replace(" ", "-")}
                          content={work}
                        />
                      </>
                    );
                  })}
                </div>
                <div
                  className={
                    "flex items-center justify-center p-3 aspect-square " +
                    checkValue(guessedPal.number, answer.number)
                  }
                >
                  {guessedPal.number}
                  {checkArrowDirection(guessedPal.number, answer.number)}
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Classic;
