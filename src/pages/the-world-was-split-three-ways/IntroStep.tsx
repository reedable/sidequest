import { Button, Container } from "@mui/material";
import css from "./IntroStep.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function IntroStep({ onNext, onBack }: Props) {
  return (
    <Container className={css.IntroStep} maxWidth="sm">
      <h1>How it all began...</h1>

      <p>
        Long ago in Ancient Greece, three brothers ruled the world:{" "}
        <strong>Zeus</strong>, <strong>Poseidon</strong>, and{" "}
        <strong>Hades</strong>. You've probably heard their names. But here's a
        part of the story that doesn't always get told.
      </p>

      <p>
        After the great battle that toppled their father Kronos, the three
        brothers had one big question to settle: <em>Who gets to rule what?</em>
      </p>

      <p>
        They decided to settle it by drawing straws. Three straws, three
        brothers, and the length of your straw decided your kingdom forever.
      </p>

      <div className={css.Actions}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <Button variant="contained" onClick={onNext}>
          Continue
        </Button>
      </div>
    </Container>
  );
}
