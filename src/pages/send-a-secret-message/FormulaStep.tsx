import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "./Page";
import css from "./FormulaStep.module.css";
import math from "./Math.module.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function FormulaStep({ onNext, onBack }: Props) {
  return (
    <Page
      title="One wrinkle"
      visual={
        <figure className={css.Figure}>
          <math className={math.Math}>
            <mrow>
              <mo>(</mo>
              <mo>(</mo>
              <mi>n</mi>
              <mo>−</mo>
              <mn>1</mn>
              <mo>+</mo>
              <mi>key</mi>
              <mo>)</mo>
              <mo>mod</mo>
              <mn>26</mn>
              <mo>)</mo>
              <mo>+</mo>
              <mn>1</mn>
            </mrow>
          </math>
        </figure>
      }
      actions={
        <>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            Back
          </Button>
          <Button variant="contained" onClick={onNext} endIcon={<ArrowForward />}>
            Let me write one
          </Button>
        </>
      }
    >
      <Typography variant="h6" component="p" gutterBottom>
        We count <strong>A</strong> as <strong>1</strong>, so our numbers run 1
        to 26. But modulo counts from 0,
        so <span className={math.Math}>26 mod 26</span> is{" "}
        <span className={math.Math}>0</span> — and there's no letter 0.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        So we step down into modulo's world, wrap, and step back out. Subtract
        1 first, add it back at the end.
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        That's the whole cipher. <strong>Z</strong> is <strong>26</strong>, key
        is 3: <span className={math.Math}>26 − 1 + 3</span> is{" "}
        <span className={math.Math}>28</span>, then{" "}
        <span className={math.Math}>28 mod 26</span> is{" "}
        <span className={math.Math}>2</span>, then{" "}
        <span className={math.Math}>2 + 1</span> is{" "}
        <span className={math.Math}>3</span>. <strong>C</strong> again.
      </Typography>
    </Page>
  );
}
