import { Button, Slider, TextField, Typography } from "@mui/material";
import RestartAlt from "@mui/icons-material/RestartAlt";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import Page from "../../components/Page";
import css from "./YourMessageStep.module.css";
import { encrypt } from "./cipher";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function YourMessageStep({ onNext, onBack }: Props) {
  const [message, setMessage] = useState("MEET ME BY THE SWINGS");
  const [key, setKey] = useState(3);

  return (
    <Page
      title="Your turn"
      visual={
        <div className={css.Panel}>
          <TextField
            label="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value.toUpperCase())}
            fullWidth
            multiline
            minRows={2}
            maxRows={2}
          />

          <div className={css.KeyRow}>
            <Typography id="key-label" variant="body2">
              Key
            </Typography>
            <Slider
              aria-labelledby="key-label"
              value={key}
              onChange={(_, v) => setKey(v as number)}
              min={1}
              max={25}
              valueLabelDisplay="auto"
            />
            <Typography variant="h6" component="p" gutterBottom className={css.KeyValue}>
              {key}
            </Typography>
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              what your friend receives
            </Typography>
            <Typography variant="h5" component="p" className={css.Secret}>
              {encrypt(message, key) || " "}
            </Typography>
          </div>
        </div>
      }
      actions={
        <>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            Back
          </Button>
          <Button variant="contained" onClick={onNext} endIcon={<RestartAlt />}>
            Done
          </Button>
        </>
      }
    >
      <Typography variant="h6" component="p" gutterBottom>
        Write your message and pick your key. Whatever comes out the bottom is
        what you hand to your friend.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        Notice the spaces stay where they are. Only letters get shifted, which
        is worth remembering for later.
      </Typography>
    </Page>
  );
}
