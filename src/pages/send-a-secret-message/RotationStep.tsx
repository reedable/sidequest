import { Button, Collapse, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import type { ReactNode } from "react";
import Page from "../../components/Page";
import css from "./RotationStep.module.css";
import cx from "../../components/cx";
import { ALPHABET_SIZE, numberToLetter } from "./cipher";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const KEY = 3;
const START = 26;
const RADIUS = 110;

/* Each line stays on screen as the next is added, matching the wheel beside it.
 * ReactNode rather than string so the numbers and letters can be marked up the
 * same way they are everywhere else in the lesson. */
const PROMPTS: ReactNode[] = [
  <>
    <strong>Z</strong> is <strong>26</strong>, and our key is 3. So walk it
    forward 3 places.
  </>,
  <>
    <strong>27</strong> is <strong>A</strong>
  </>,
  <>
    <strong>28</strong> is <strong>B</strong>
  </>,
  <>
    <strong>29</strong> is <strong>C</strong>
  </>,
];

export default function RotationStep({ onNext, onBack }: Props) {
  const [steps, setSteps] = useState(0);

  const counter = START + steps;
  const position = ((START - 1 + steps) % ALPHABET_SIZE) + 1;
  const done = steps === KEY;

  return (
    <Page
      title="The alphabet is a circle"
      visual={
        /* Wheel first, prose second. The diagram has to be read before the
         * sentence describing it, so this step composes its own row rather
         * than using the shell's prose column. */
        <div className={css.Split}>
          <div className={css.Wheel}>
            {Array.from({ length: ALPHABET_SIZE }, (_, i) => {
              const n = i + 1;
              const angle = (i * 360) / ALPHABET_SIZE - 90;
              const x = Math.cos((angle * Math.PI) / 180) * RADIUS;
              const y = Math.sin((angle * Math.PI) / 180) * RADIUS;

              return (
                <div
                  key={n}
                  className={cx(css.Slot, n === position && css.Current)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {numberToLetter(n)}
                </div>
              );
            })}

            <div className={css.Center}>
              <Typography variant="h3" component="span">
                {counter}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {counter > ALPHABET_SIZE
                  ? `lands on ${numberToLetter(position)}`
                  : "start"}
              </Typography>
            </div>
          </div>

          <div className={css.Prose}>
            <Typography variant="h6" component="p" gutterBottom>
              ZEBRA broke because <strong>Z</strong> ran off the end. But the
              alphabet only looks like a line. Bend it round so{" "}
              <strong>Z</strong> touches <strong>A</strong> again.
            </Typography>

            <div aria-live="polite">
              {PROMPTS.map((prompt, i) => (
                <Collapse key={i} in={i <= steps} unmountOnExit>
                  <Typography variant="h6" component="p" gutterBottom>
                    {prompt}
                  </Typography>
                </Collapse>
              ))}
            </div>
          </div>
        </div>
      }
      actions={
        <>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            Back
          </Button>
          {done ? (
            <Button variant="contained" onClick={onNext} endIcon={<ArrowForward />}>
              This has a name
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setSteps((s) => s + 1)}>
              {steps === 0 ? "Take a step" : "Keep going"}
            </Button>
          )}
        </>
      }
    />
  );
}
