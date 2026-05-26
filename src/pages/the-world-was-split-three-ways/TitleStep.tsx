import { Button, Container } from "@mui/material";
import css from "./TitleStep.module.css";

interface Props {
  onNext: () => void;
}

export default function TitleStep({ onNext }: Props) {
  return (
    <Container className={css.TitleStep} maxWidth="sm">
      <h1>The World Was Split Three Ways</h1>

      <div className={css.Actions}>
        <Button variant="contained" onClick={onNext}>
          Begin
        </Button>
      </div>
    </Container>
  );
}
