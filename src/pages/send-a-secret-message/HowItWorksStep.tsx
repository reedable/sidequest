import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import LetterCell from "./LetterCell";
import Page from "./Page";
import css from "./HowItWorksStep.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const PLAIN = ["A", "B", "C", "D", "E"];
const CIPHER = ["D", "E", "F", "G", "H"];

export default function HowItWorksStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="Here's the trick"
      visual={
        /* Figure first, text second. */
        <div className={css.Split}>
          <div className={css.Strip}>
            <div className={css.Row}>
              {PLAIN.map((letter) => (
                <LetterCell key={letter}>{letter}</LetterCell>
              ))}
            </div>

            <Typography variant="body2" color="text.secondary">
              move each one forward 3
            </Typography>

            <div className={css.Row}>
              {CIPHER.map((letter) => (
                <LetterCell key={letter} tone="cipher">
                  {letter}
                </LetterCell>
              ))}
            </div>
          </div>

          <div className={css.Prose}>
            <Typography variant="h6" component="p" gutterBottom>
              Pick a number. That's your <strong>key</strong>, and it's the{" "}
              <strong>secret</strong> you share with your friend and nobody
              else.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              Now move <em>every letter</em> of your message forward in the
              alphabet by that many places.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              Your friend knows the key, so they move each letter back again and
              read it. Anyone else is staring at nonsense.
            </Typography>
          </div>
        </div>
      }
      actions={
        <>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            Back
          </Button>
          <Button variant="contained" onClick={onNext} endIcon={<ArrowForward />}>
            Let's do a real word
          </Button>
        </>
      }
    />
  );
}
