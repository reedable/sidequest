import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function IntroStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="Wouldn't it be cool..."
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
          Show me the trick
        </Button>
      }
    >
      <Typography variant="h6" component="p" gutterBottom>
        ...to pass a note your friend can read, and nobody else can? Your
        teacher picks it up and sees <strong>nothing but gibberish</strong>.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        Two thousand years ago, a general called <strong>Julius Caesar</strong>{" "}
        had the same problem. If the wrong person read his letters, people died.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        So he worked something out.
      </Typography>
    </Page>
  );
}
