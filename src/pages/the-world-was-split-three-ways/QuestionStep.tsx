import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function QuestionStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="Wait a second..."
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
            Continue
          </Button>
        </>
      }
    >
      <Typography variant="h6" component="p" gutterBottom>
        Let's think about what just happened.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        <strong>Hades</strong> drew first. He had <strong>three straws</strong>{" "}
        to choose from.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        <strong>Poseidon</strong> drew second. Only <strong>two straws</strong>{" "}
        were left.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        <strong>Zeus</strong> drew last. He didn't even get to choose. He just
        took <strong>whatever remained</strong>.
      </Typography>
    </Page>
  );
}
