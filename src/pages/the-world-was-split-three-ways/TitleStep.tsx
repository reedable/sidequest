import { Button, Typography } from "@mui/material";
import Page from "../../components/Page";

interface Props {
  onNext: () => void;
}

export default function TitleStep({ onNext }: Props) {
  return (
    <Page
      center
      next={
        <Button variant="contained" size="large" onClick={onNext}>
          Begin
        </Button>
      }
    >
      <Typography variant="h3" component="h1">
        The World Was Split Three Ways
      </Typography>
    </Page>
  );
}
