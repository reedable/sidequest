import { Button, Typography } from "@mui/material";
import RestartAlt from "@mui/icons-material/RestartAlt";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";
import css from "./LargeNumbersStep.module.css";

interface Props {
  onBack: () => void;
  onDone: () => void;
}

export default function LargeNumbersStep({ onBack, onDone }: Props) {
  return (
    <Page
      title="Why wasn't it exactly 33%?"
      visual={
        <div className={css.Split}>
          <div className={css.Column}>
            <Typography variant="h6" component="p" gutterBottom>
              Flip a fair coin 10 times. You'd expect 5 heads, but you might get
              3, 7, or even 9. The coin isn't broken. You just need more flips.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              The same thing happens here. With a small number of rounds, chance
              is lumpy. Run enough trials and the numbers smooth out toward the
              true odds.
            </Typography>
          </div>

          <div className={css.Column}>
            <Typography variant="h6" component="p" gutterBottom>
              Mathematicians call this the <strong>Law of Large Numbers</strong>
              . That's why 1,000 rounds gets you closer to 33% than 10 rounds.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              Think of it this way: drawing one at a time is the same as all
              three drawing at once and revealing together. The order is just
              ceremony.
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
        <Button variant="contained" onClick={onDone} endIcon={<RestartAlt />}>
          Done
        </Button>
      }
    />
  );
}
