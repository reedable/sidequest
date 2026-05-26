import { Button, Container } from "@mui/material";
import css from "./QuestionStep.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function QuestionStep({ onNext, onBack }: Props) {
  return (
    <Container className={css.QuestionStep} maxWidth="sm">
      <h1>Wait a second...</h1>

      <p>Let's think about what just happened.</p>

      <p>
        <strong>Hades</strong> drew first. He had <strong>three straws</strong>{" "}
        to choose from.
      </p>

      <p>
        <strong>Poseidon</strong> drew second. Only <strong>two straws</strong>{" "}
        were left.
      </p>

      <p>
        <strong>Zeus</strong> drew last. He didn't even get to choose. He just
        took <strong>whatever remained</strong>.
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
