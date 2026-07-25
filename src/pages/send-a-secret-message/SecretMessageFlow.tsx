import { useState } from "react";
import TitleStep from "./TitleStep";
import IntroStep from "./IntroStep";
import HowItWorksStep from "./HowItWorksStep";
import WalkthroughStep from "./WalkthroughStep";
import WrapAroundStep from "./WrapAroundStep";
import RotationStep from "./RotationStep";
import ModuloStep from "./ModuloStep";
import YourMessageStep from "./YourMessageStep";

type Step =
  | "title"
  | "intro"
  | "how-it-works"
  | "walkthrough"
  | "wrap-around"
  | "rotation"
  | "modulo"
  | "your-message";

export default function SecretMessageFlow() {
  const [step, setStep] = useState<Step>("title");

  function goTo(next: Step) {
    setStep(next);
  }

  return (
    <>
      {step === "title" && <TitleStep onNext={() => goTo("intro")} />}

      {step === "intro" && (
        <IntroStep
          onNext={() => goTo("how-it-works")}
          onBack={() => goTo("title")}
        />
      )}

      {step === "how-it-works" && (
        <HowItWorksStep
          onNext={() => goTo("walkthrough")}
          onBack={() => goTo("intro")}
        />
      )}

      {step === "walkthrough" && (
        <WalkthroughStep
          onNext={() => goTo("wrap-around")}
          onBack={() => goTo("how-it-works")}
        />
      )}

      {step === "wrap-around" && (
        <WrapAroundStep
          onNext={() => goTo("rotation")}
          onBack={() => goTo("walkthrough")}
        />
      )}

      {step === "rotation" && (
        <RotationStep
          onNext={() => goTo("modulo")}
          onBack={() => goTo("wrap-around")}
        />
      )}

      {step === "modulo" && (
        <ModuloStep
          onNext={() => goTo("your-message")}
          onBack={() => goTo("rotation")}
        />
      )}

      {step === "your-message" && (
        <YourMessageStep
          onNext={() => goTo("title")}
          onBack={() => goTo("modulo")}
        />
      )}
    </>
  );
}
