import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styles from "./CharacterStep.module.css";
import hadesImg from "./images/hades.svg";
import poseidonImg from "./images/poseidon.svg";
import zeusImg from "./images/zeus.svg";
import type { Character } from "./types";
import { characters } from "./types";

const characterImages: Record<Character, string> = {
  hades: hadesImg,
  poseidon: poseidonImg,
  zeus: zeusImg,
};

interface Props {
  onNext: (character: Character) => void;
  onBack: () => void;
}

export default function CharacterStep({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <Container maxWidth="sm">
      <h1>Choose your character</h1>

      <div className={styles.cards}>
        {characters.map((c) => (
          <Card
            key={c.id}
            elevation={selected === c.id ? 8 : 2}
            className={`${styles.card}${selected === c.id ? ` ${styles.cardSelected}` : ""}`}
          >
            <CardActionArea
              onClick={() => setSelected(c.id)}
              className={styles.cardActionArea}
            >
              <CardContent className={styles.cardInner}>
                <img
                  src={characterImages[c.id]}
                  alt={c.name}
                  className={styles.avatar}
                />
                <Typography component="h2" variant="h5" gutterBottom>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.drawPosition}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>

      <div className={styles.actions}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <Button
          variant="contained"
          disabled={selected === null}
          onClick={() => selected && onNext(selected)}
        >
          Continue
        </Button>
      </div>
    </Container>
  );
}
