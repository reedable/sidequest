import { Button, Container } from "@mui/material";
import css from "./StrawDrawStep.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StrawDrawStep({ onNext, onBack }: Props) {
  return (
    <Container className={css.StrawDrawStep} maxWidth="sm">
      <h1>Here's how it went</h1>

      <p>
        <strong>Hades</strong> drew first and pulled the{" "}
        <strong>shortest straw</strong>. He got the <strong>Underworld</strong>,
        the dark realm beneath the earth.
      </p>

      <p>
        <strong>Poseidon</strong> drew second and pulled the{" "}
        <strong>middle straw</strong>. He got the <strong>Sea</strong>, the vast
        and stormy oceans.
      </p>

      <p>
        <strong>Zeus</strong> drew last and got whatever was left, the{" "}
        <strong>longest straw</strong>. He got the <strong>Sky</strong> and
        became ruler of all the Olympian gods.
      </p>

      <div className={css.Actions}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <Button variant="contained" onClick={onNext}>
          Wait a second…
        </Button>
      </div>
    </Container>
  );
}
