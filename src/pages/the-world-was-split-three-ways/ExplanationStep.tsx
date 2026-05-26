import { Button, Container } from "@mui/material";
import styles from "./ExplanationStep.module.css";

interface Props {
  onBack: () => void;
  onDone: () => void;
}

export default function ExplanationStep({ onBack, onDone }: Props) {
  return (
    <Container className={styles.ExplanationStep} maxWidth="sm">
      <h1>How is this possible?</h1>

      <p>
        Drawing order doesn't change the odds. Here's why each brother's chance
        works out to 1 in 3.
      </p>

      <p>
        <strong>Hades drew first.</strong> Three straws, one of them the
        longest. His chance of drawing it is
      </p>

      <figure>
        <math>
          <mfrac>
            <mn>1</mn>
            <mn>3</mn>
          </mfrac>
        </math>
      </figure>

      <p>
        <strong>Poseidon drew second.</strong> Two straws were left, but the
        longest was only still there if Hades had missed it. Hades missed it 2
        times in 3. When it was still there, Poseidon had a 1 in 2 shot.
      </p>

      <figure>
        <math>
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

      <p>
        <strong>Zeus drew last.</strong> He got whatever remained. The longest
        straw survived only when both brothers had missed it. That probability,
        worked through the same way, is also <strong>1 in 3</strong>.
      </p>

      <figure>
        <math>
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

      <p>
        Think of it this way: drawing one at a time is the same as all three
        drawing at once and revealing together. The order is just ceremony.
      </p>

      <hr />

      <h3>...then why wasn't it exactly 33%?</h3>

      <p>
        Flip a fair coin 10 times. You'd expect 5 heads, but you might get 3, 7,
        or even 9. The coin isn't broken. You just need more flips.
      </p>

      <p>
        The same thing happens here. With a small number of rounds, chance is
        lumpy. Run enough trials and the numbers smooth out toward the true
        odds. Mathematicians call this the <strong>Law of Large Numbers</strong>
        . That's why 1,000 rounds gets you closer to 33% than 10 rounds.
      </p>

      <div className={styles.Actions}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <Button variant="contained" onClick={onDone}>
          Done
        </Button>
      </div>
    </Container>
  );
}
