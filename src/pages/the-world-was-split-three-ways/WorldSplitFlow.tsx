import { useState } from "react";
import TitleStep from "./TitleStep";
import IntroStep from "./IntroStep";
import StrawDrawStep from "./StrawDrawStep";
import QuestionStep from "./QuestionStep";
import BigQuestionStep from "./BigQuestionStep";
import CharacterStep from "./CharacterStep";
import SimulationStep from "./SimulationStep";
import ResultsStep from "./ResultsStep";
import ExplanationStep from "./ExplanationStep";
import LargeNumbersStep from "./LargeNumbersStep";
import type { Character, SimulationStats } from "./types";

type Step =
  | "title"
  | "intro"
  | "straw-draw"
  | "question"
  | "big-question"
  | "character"
  | "simulation"
  | "results"
  | "explanation"
  | "large-numbers"
  | "info";

export default function WorldSplitFlow() {
  const [step, setStep] = useState<Step>("title");
  const [character, setCharacter] = useState<Character | null>(null);
  const [stats, setStats] = useState<SimulationStats | null>(null);
  const [completedDraws, setCompletedDraws] = useState(0);

  function goTo(next: Step) {
    setStep(next);
  }

  return (
    <>
      {step === "title" && <TitleStep onNext={() => goTo("intro")} />}

      {step === "intro" && (
        <IntroStep
          onNext={() => goTo("straw-draw")}
          onBack={() => goTo("title")}
        />
      )}

      {step === "straw-draw" && (
        <StrawDrawStep
          onNext={() => goTo("question")}
          onBack={() => goTo("intro")}
        />
      )}

      {step === "question" && (
        <QuestionStep
          onNext={() => goTo("big-question")}
          onBack={() => goTo("straw-draw")}
        />
      )}

      {step === "big-question" && (
        <BigQuestionStep
          onNext={() => goTo("character")}
          onBack={() => goTo("question")}
        />
      )}

      {step === "character" && (
        <CharacterStep
          onNext={(c) => {
            setCharacter(c);
            goTo("simulation");
          }}
          onBack={() => goTo("question")}
        />
      )}

      {step === "simulation" && character && (
        <SimulationStep
          character={character}
          initialRoundNumber={completedDraws + 1}
          onNext={(s) => {
            setCompletedDraws((d) => d + s.rounds);
            setStats((prev) =>
              prev
                ? {
                    rounds: prev.rounds + s.rounds,
                    sky: {
                      hades: prev.sky.hades + s.sky.hades,
                      poseidon: prev.sky.poseidon + s.sky.poseidon,
                      zeus: prev.sky.zeus + s.sky.zeus,
                    },
                  }
                : s,
            );
            goTo("results");
          }}
          onBack={() => goTo("character")}
        />
      )}

      {step === "results" && (
        <ResultsStep
          character={character}
          onBack={(currentStats) => {
            setStats(currentStats);
            goTo("simulation");
          }}
          onNext={() => goTo("explanation")}
          stats={stats}
        />
      )}

      {step === "explanation" && (
        <ExplanationStep
          onBack={() => goTo("results")}
          onNext={() => goTo("large-numbers")}
        />
      )}

      {step === "large-numbers" && (
        <LargeNumbersStep
          onBack={() => goTo("explanation")}
          onDone={() => goTo("title")}
        />
      )}
    </>
  );
}
