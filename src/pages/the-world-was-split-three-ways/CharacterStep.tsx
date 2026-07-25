import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import Page from "../../components/Page";
import cx from "../../components/cx";
import css from "./CharacterStep.module.css";
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
    <Page
      title="Choose your character"
      visual={
        <div className={css.cards}>
          {characters.map((c) => (
            <Card
              key={c.id}
              elevation={selected === c.id ? 8 : 2}
              className={cx(css.card, selected === c.id && css.cardSelected)}
            >
              <CardActionArea
                onClick={() => setSelected(c.id)}
                className={css.cardActionArea}
              >
                <CardContent className={css.cardInner}>
                  <img
                    src={characterImages[c.id]}
                    alt={c.name}
                    className={css.avatar}
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
      }
      actions={
        <>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            Back
          </Button>
          <Button
            variant="contained"
            disabled={selected === null}
            onClick={() => selected && onNext(selected)}
            endIcon={<ArrowForward />}
          >
            Continue
          </Button>
        </>
      }
    />
  );
}
