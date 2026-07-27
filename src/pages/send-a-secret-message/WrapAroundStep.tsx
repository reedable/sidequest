import { Button, Collapse, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import type { ReactNode } from "react";
import LetterCell from "./LetterCell";
import Page from "../../components/Page";
import css from "./WrapAroundStep.module.css";
import math from "../../components/Math.module.css";
import cx from "../../components/cx";
import { letterToNumber, numberToLetter, shiftedNumber } from "./cipher";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const WORD = "ZEBRA";
const KEY = 3;

/**
 * Deliberately the same four stages as CAT, in the same order, with the same
 * button labels. The repetition is the point: only the last stage behaves
 * differently, and that difference is the lesson.
 */
type Stage = 0 | 1 | 2 | 3;

const PROMPTS: Record<Stage, ReactNode> = {
  0: "Let's hide ZEBRA with a key of 3.",
  1: (
    <>
      Swap each letter for its place in the alphabet. <strong>Z</strong> is{" "}
      <strong>26</strong>, <strong>E</strong> is <strong>5</strong>,{" "}
      <strong>B</strong> is <strong>2</strong>, etc.
    </>
  ),
  2: "Add 3 to every number.",
  3: (
    <>
      Turn them back into letters. <strong>E</strong>, <strong>B</strong>,{" "}
      <strong>R</strong> and <strong>A</strong> come back fine.
    </>
  ),
};

const BUTTONS: Record<Stage, string> = {
  0: "Turn them into numbers",
  1: "Add the key",
  2: "Turn them back into letters",
  3: "",
};

export default function WrapAroundStep({ onNext, onBack }: Props) {
  const [stage, setStage] = useState<Stage>(0);

  return (
    <Page
      title="Now try ZEBRA"
      visual={
        /* Figure first, text second. */
        <div className={css.Split}>
        <div className={css.Board}>
          {WORD.split("").map((letter, i) => {
            const n = letterToNumber(letter)!;
            const sum = shiftedNumber(n, KEY);
            const overflows = sum > 26;

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
                  <div className={cx(stage >= 3 && overflows && css.Overflow)}>
                    <LetterCell compact tone="number">
                      {stage >= 2 ? sum : ""}
                    </LetterCell>
                  </div>
                </div>

                <span className={cx(css.Arrow, stage >= 3 && css.ArrowOn)}>
                  ↓
                </span>
                <div className={cx(css.Slot, stage >= 3 && css.SlotOn)}>
                  <LetterCell compact tone={overflows ? "number" : "cipher"}>
                    {stage < 3 ? "" : overflows ? "?" : numberToLetter(sum)}
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

              <Collapse in={stage >= 3} unmountOnExit>
                <Typography variant="h6" component="p" gutterBottom>
                  But <strong>Z</strong> is <strong>26</strong>, and{" "}
                  <span className={math.Math}>26 + 3</span> is{" "}
                  <span className={math.Math}>29</span>.{" "}
                  <em>What's the 29th letter?</em> There isn't one. We walked
                  off the end.
                </Typography>
              </Collapse>
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
          <Button
            variant="contained"
            onClick={onNext}
            endIcon={<ArrowForward />}
          >
            So what happens to Z?
          </Button>
        )
      }
    />
  );
}
