import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";
import css from "./IntroStep.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function IntroStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="How it all began..."
      visual={
        <div className={css.Split}>
          <div className={css.Column}>
            <Typography variant="h6" component="p" gutterBottom>
              Long ago in Ancient Greece, three brothers ruled the world:{" "}
              <strong>Zeus</strong>, <strong>Poseidon</strong>, and{" "}
              <strong>Hades</strong>. You've probably heard their names. But
              here's a part of the story that doesn't always get told.
            </Typography>
          </div>

          <div className={css.Column}>
            <Typography variant="h6" component="p" gutterBottom>
              After the great battle that toppled their father Kronos, the three
              brothers had one big question to settle:{" "}
              <em>Who gets to rule what?</em>
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              They decided to settle it by drawing straws. Three straws, three
              brothers, and the length of your straw decided your kingdom
              forever.
            </Typography>
          </div>
        </div>
      }
      back={
        <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
          Back
        </Button>
      }
      next={
        <Button
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForward />}
        >
          Continue
        </Button>
      }
    />
  );
}
