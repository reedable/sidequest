import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import LetterCell from "./LetterCell";
import Page from "./Page";
import css from "./TitleStep.module.css";
import { ALPHABET_SIZE, encryptLetter, numberToLetter } from "./cipher";

interface Props {
  onNext: () => void;
}

const WORD = "SECRET";
const KEY = 3;

const FRAME_MS = 70;
const CYCLE = 130;
const SETTLE_START = 22;
const SETTLE_STAGGER = 9;
const HOLD_UNTIL = 112;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** A letter that is neither the plain one nor the ciphered one, so the cell looks live. */
function scrambled(frame: number, index: number): string {
  return numberToLetter(((frame * 7 + index * 11) % ALPHABET_SIZE) + 1);
}

export default function TitleStep({ onNext }: Props) {
  const still = prefersReducedMotion();
  const [frame, setFrame] = useState(still ? HOLD_UNTIL : 0);

  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % CYCLE), FRAME_MS);
    return () => clearInterval(id);
  }, [still]);

  const letters = WORD.split("").map((letter, i) => {
    const settleAt = SETTLE_START + i * SETTLE_STAGGER;

    if (frame >= HOLD_UNTIL) return { text: letter, ciphered: false };
    if (frame >= settleAt)
      return { text: encryptLetter(letter, KEY), ciphered: true };
    if (frame >= SETTLE_START - SETTLE_STAGGER)
      return { text: scrambled(frame, i), ciphered: false };
    return { text: letter, ciphered: false };
  });

  return (
    <Page
      center
      actions={
        <Button variant="contained" size="large" onClick={onNext} endIcon={<ArrowForward />}>
          Begin
        </Button>
      }
    >
      <div className={css.Word} aria-label={WORD}>
        {letters.map((cell, i) => (
          <div key={i} aria-hidden="true">
            <LetterCell tone={cell.ciphered ? "cipher" : "plain"}>
              {cell.text}
            </LetterCell>
          </div>
        ))}
      </div>

      <Typography variant="h3" component="h1" className={css.Title}>
        Send a Secret Message
      </Typography>

      <Typography variant="h6" component="p" gutterBottom color="text.secondary">
        Write a note that only your friend can read.
      </Typography>
    </Page>
  );
}
