import { Button, Collapse, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import type { ReactNode } from "react";
import LetterCell from "./LetterCell";
import Page from "../../components/Page";
import css from "./WalkthroughStep.module.css";
import cx from "../../components/cx";
import { letterToNumber, numberToLetter, shiftedNumber } from "./cipher";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const WORD = "CAT";
const KEY = 3;

/** How far down the pipeline we've revealed: letters, numbers, sums, results. */
type Stage = 0 | 1 | 2 | 3;

/* Each line stays on screen as the next is added, so the prose builds up
 * alongside the diagram instead of replacing itself. */
const PROMPTS: Record<Stage, ReactNode> = {
  0: "Let's hide CAT with a key of 3.",
  1: (
    <>
      Swap each letter for its place in the alphabet. <strong>C</strong> is{" "}
      <strong>3</strong>, <strong>A</strong> is <strong>1</strong>,{" "}
      <strong>T</strong> is <strong>20</strong>.
    </>
  ),
  2: "Add 3 to every number.",
  3: "Turn them back into letters. CAT went in, FDW came out.",
};

const BUTTONS: Record<Stage, string> = {
  0: "Turn them into numbers",
  1: "Add the key",
  2: "Turn them back into letters",
  3: "",
};

export default function WalkthroughStep({ onNext, onBack }: Props) {
  const [stage, setStage] = useState<Stage>(0);

  return (
    <Page
      title="Let's hide a word"
      visual={
        /* Figure first, text second. */
        <div className={css.Split}>
        <div className={css.Board}>
          {WORD.split("").map((letter, i) => {
            const n = letterToNumber(letter)!;
            const sum = shiftedNumber(n, KEY);

            return (
              <div key={i} className={css.Column}>
                <LetterCell compact>{letter}</LetterCell>

                <span className={cx(css.Arrow, stage >= 1 && css.ArrowOn)}>
                  ↓
                </span>
                <div className={cx(css.Slot, stage >= 1 && css.SlotOn)}>
                  <LetterCell compact tone="number">
                    {stage >= 1 ? n : ""}
                  </LetterCell>
                </div>

                <span className={cx(css.Arrow, stage >= 2 && css.ArrowOn)}>
                  ↓
                </span>
                <div className={cx(css.Slot, stage >= 2 && css.SlotOn)}>
                  <LetterCell compact tone="number">
                    {stage >= 2 ? sum : ""}
                  </LetterCell>
                </div>

                <span className={cx(css.Arrow, stage >= 3 && css.ArrowOn)}>
                  ↓
                </span>
                <div className={cx(css.Slot, stage >= 3 && css.SlotOn)}>
                  <LetterCell compact tone="cipher">
                    {stage >= 3 ? numberToLetter(sum) : ""}
                  </LetterCell>
                </div>
              </div>
            );
          })}
        </div>

          <div className={css.Prose}>
            <div aria-live="polite">
              {([0, 1, 2, 3] as Stage[]).map((s) => (
                <Collapse key={s} in={s <= stage} unmountOnExit>
                  <Typography variant="h6" component="p" gutterBottom>
                    {PROMPTS[s]}
                  </Typography>
                </Collapse>
              ))}
            </div>
          </div>
        </div>
      }
      back={
        <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
          Back
        </Button>
      }
      next={
        stage < 3 ? (
          <Button
            variant="contained"
            onClick={() => setStage((s) => (s + 1) as Stage)}
          >
            {BUTTONS[stage]}
          </Button>
        ) : (
          <Button variant="contained" onClick={onNext} endIcon={<ArrowForward />}>
            Try a harder word
          </Button>
        )
      }
    />
  );
}
