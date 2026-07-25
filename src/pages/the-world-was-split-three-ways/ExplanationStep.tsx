import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Page from "../../components/Page";
import math from "../../components/Math.module.css";
import css from "./ExplanationStep.module.css";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function ExplanationStep({ onBack, onNext }: Props) {
  return (
    <Page
      title="How is this possible?"
      visual={
        /* Figure first, text second. */
        <div className={css.Split}>
          <div className={css.Figures}>
            <figure className={css.Figure}>
              <math className={math.Math}>
                <mfrac>
                  <mn>1</mn>
                  <mn>3</mn>
                </mfrac>
              </math>
            </figure>

            <figure className={css.Figure}>
              <math className={math.Math}>
                <mfrac>
                  <mn>2</mn>
                  <mn>3</mn>
                </mfrac>
                <mo>×</mo>
                <mfrac>
                  <mn>1</mn>
                  <mn>2</mn>
                </mfrac>
                <mo>=</mo>
                <mfrac>
                  <mn>1</mn>
                  <mn>3</mn>
                </mfrac>
              </math>
            </figure>

            <figure className={css.Figure}>
              <math className={math.Math}>
                <mfrac>
                  <mn>3</mn>
                  <mn>3</mn>
                </mfrac>
                <mo>−</mo>
                <mfrac>
                  <mn>1</mn>
                  <mn>3</mn>
                </mfrac>
                <mo>−</mo>
                <mfrac>
                  <mn>1</mn>
                  <mn>3</mn>
                </mfrac>
                <mo>=</mo>
                <mfrac>
                  <mn>1</mn>
                  <mn>3</mn>
                </mfrac>
              </math>
            </figure>
          </div>

          <div className={css.Prose}>
            <Typography variant="h6" component="p" gutterBottom>
              Drawing order doesn't change the odds. Here's why.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              <strong>Hades drew first.</strong> Three straws, one of them the
              longest.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              <strong>Poseidon drew second.</strong> The longest was only still
              there if Hades had missed it — 2 times in 3 — and then Poseidon
              had a 1 in 2 shot.
            </Typography>

            <Typography variant="h6" component="p" gutterBottom>
              <strong>Zeus drew last.</strong> He got whatever remained, which
              works out to <strong>1 in 3</strong> the same way.
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
            Then why not exactly 33%?
          </Button>
        </>
      }
    />
  );
}
