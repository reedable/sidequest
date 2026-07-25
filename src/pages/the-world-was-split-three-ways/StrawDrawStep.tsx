import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StrawDrawStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="Here's how it went"
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
            Wait a second…
          </Button>
        </>
      }
    >
      <Typography variant="h6" component="p" gutterBottom>
        <strong>Hades</strong> drew first and pulled the{" "}
        <strong>shortest straw</strong>. He got the <strong>Underworld</strong>,
        the dark realm beneath the earth.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        <strong>Poseidon</strong> drew second and pulled the{" "}
        <strong>middle straw</strong>. He got the <strong>Sea</strong>, the vast
        and stormy oceans.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        <strong>Zeus</strong> drew last and got whatever was left, the{" "}
        <strong>longest straw</strong>. He got the <strong>Sky</strong> and
        became ruler of all the Olympian gods.
      </Typography>
    </Page>
  );
}
