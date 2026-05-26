import { Button, Container } from "@mui/material";
import styles from "./BigQuestionStep.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function BigQuestionStep({ onNext, onBack }: Props) {
  return (
    <Container className={styles.BigQuestionStep} maxWidth="sm">
      <h1>Who had the best chance of drawing the longest straw?</h1>

      <p>
        Was it Hades, who got first pick? Poseidon, who had a 50/50 shot with
        two left? Or Zeus, who had no choice at all?
      </p>

      <p>
        Pick a character, draw straws as many times as you like, and find out
        for yourself.
      </p>

      <div className={styles.Actions}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <Button variant="contained" onClick={onNext}>
          Pick your character
        </Button>
      </div>
    </Container>
  );
}
