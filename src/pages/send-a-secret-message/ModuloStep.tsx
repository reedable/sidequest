import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";
import css from "./ModuloStep.module.css";
import math from "../../components/Math.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function ModuloStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="It's called modulo"
      visual={
        /* Figure first, text second. */
        <div className={css.Split}>
          <div className={css.Figures}>
            <figure className={css.Figure}>
              <math className={math.Math}>
                <mn>16</mn>
                <mo>mod</mo>
                <mn>12</mn>
                <mo>=</mo>
                <mn>4</mn>
              </math>
            </figure>

            <figure className={css.Figure}>
              <math className={math.Math}>
                <mn>29</mn>
                <mo>mod</mo>
                <mn>26</mn>
                <mo>=</mo>
                <mn>3</mn>
              </math>
            </figure>
          </div>

          <div className={css.Prose}>
            <Typography variant="h6" component="p" gutterBottom>
              <strong>Modulo</strong> means: divide, throw away the answer, keep
              the <strong>remainder</strong>.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              You do it with clocks. It's 11, you wait 5 hours, it's 4. Nobody
              says 16 o'clock.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              The alphabet has 26 letters, so we work <em>modulo 26</em>. 3
              positions after Z: <span className={math.Math}>29 mod 26</span> is{" "}
              <span className={math.Math}>3</span>, and <strong>3</strong> is{" "}
              <strong>C</strong>.
            </Typography>
          </div>
        </div>
      }
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
            Let me write one
          </Button>
        </>
      }
    />
  );
}
