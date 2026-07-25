import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function BigQuestionStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="Who had the best chance of drawing the longest straw?"
      actions={
        <>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={onNext}
            endIcon={<ArrowForward />}
          >
            Pick your character
          </Button>
        </>
      }
    >
      <Typography variant="h6" component="p" gutterBottom>
        Was it Hades, who got first pick? Poseidon, who had a 50/50 shot with
        two left? Or Zeus, who had no choice at all?
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        Pick a character, draw straws as many times as you like, and find out
        for yourself.
      </Typography>
    </Page>
  );
}
