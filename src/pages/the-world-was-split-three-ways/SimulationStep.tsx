import { Button, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import Page from "../../components/Page";
import cx from "../../components/cx";
import hadesImg from "./images/hades.svg";
import poseidonImg from "./images/poseidon.svg";
import zeusImg from "./images/zeus.svg";
import styles from "./SimulationStep.module.css";
import type { Character, SimulationStats, StrawLength } from "./types";
import { characters } from "./types";

const characterImages: Record<Character, string> = {
  hades: hadesImg,
  poseidon: poseidonImg,
  zeus: zeusImg,
};

interface Props {
  character: Character;
  initialRoundNumber?: number;
  onNext: (stats: SimulationStats) => void;
  onBack: () => void;
}

type RoundPhase =
  | "hades_drawing"
  | "poseidon_drawing"
  | "player_turn"
  | "poseidon_auto"
  | "zeus_auto"
  | "all_drawn"
  | "complete";

interface RoundState {
  positions: [StrawLength, StrawLength, StrawLength];
  drawn: { hades: number | null; poseidon: number | null; zeus: number | null };
  revealed: { hades: boolean; poseidon: boolean; zeus: boolean };
  phase: RoundPhase;
}

const STRAW_LABELS: Record<StrawLength, string> = {
  short: "Underworld",
  medium: "Sea",
  long: "Sky",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr: number[]): number {
  return arr[Math.floor(Math.random() * arr.length)];
}

function npcForPhase(phase: RoundPhase): Character | null {
  if (phase === "hades_drawing") return "hades";
  if (phase === "poseidon_drawing" || phase === "poseidon_auto")
    return "poseidon";
  if (phase === "zeus_auto") return "zeus";
  return null;
}

function makeRound(character: Character): RoundState {
  return {
    positions: shuffle(["short", "medium", "long"] as StrawLength[]) as [
      StrawLength,
      StrawLength,
      StrawLength,
    ],
    drawn: { hades: null, poseidon: null, zeus: null },
    revealed: { hades: false, poseidon: false, zeus: false },
    phase: character === "hades" ? "player_turn" : "hades_drawing",
  };
}

export default function SimulationStep({ character, initialRoundNumber = 1, onNext, onBack }: Props) {
  const [round, setRound] = useState<RoundState>(() => makeRound(character));
  const [roundNumber, setRoundNumber] = useState(initialRoundNumber);
  const [stats, setStats] = useState<SimulationStats>({
    rounds: 0,
    sky: { hades: 0, poseidon: 0, zeus: 0 },
  });
  const [consideringStraw, setConsideringStraw] = useState<number | null>(null);

  useEffect(() => {
    const npc = npcForPhase(round.phase);
    if (!npc) return;

    const available = [0, 1, 2].filter((i) => {
      if (npc === "hades") return true;
      if (npc === "poseidon") return round.drawn.hades !== i;
      const used = [round.drawn.hades, round.drawn.poseidon].filter(
        (v): v is number => v !== null,
      );
      return !used.includes(i);
    });

    let idx = 0;
    const interval = setInterval(() => {
      setConsideringStraw(available[idx]);
      idx = (idx + 1) % available.length;
    }, 250);
    return () => {
      clearInterval(interval);
      setConsideringStraw(null);
    };
  }, [round.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (round.phase === "hades_drawing") {
      timer = setTimeout(() => {
        setRound((r) => ({
          ...r,
          drawn: { ...r.drawn, hades: pickRandom([0, 1, 2]) },
          revealed: { ...r.revealed, hades: true },
          phase: character === "poseidon" ? "player_turn" : "poseidon_drawing",
        }));
      }, 900);
    }

    if (round.phase === "poseidon_drawing") {
      timer = setTimeout(() => {
        setRound((r) => {
          const remaining = [0, 1, 2].filter((i) => i !== r.drawn.hades);
          return {
            ...r,
            drawn: { ...r.drawn, poseidon: pickRandom(remaining) },
            revealed: { ...r.revealed, poseidon: true },
            phase: "player_turn",
          };
        });
      }, 900);
    }

    if (round.phase === "poseidon_auto") {
      timer = setTimeout(() => {
        setRound((r) => {
          const remaining = [0, 1, 2].filter((i) => i !== r.drawn.hades);
          return {
            ...r,
            drawn: { ...r.drawn, poseidon: pickRandom(remaining) },
            revealed: { ...r.revealed, poseidon: true },
            phase: "zeus_auto",
          };
        });
      }, 700);
    }

    if (round.phase === "zeus_auto") {
      timer = setTimeout(() => {
        setRound((r) => {
          const used = [r.drawn.hades, r.drawn.poseidon].filter(
            (v): v is number => v !== null,
          );
          const zeusPos = [0, 1, 2].find((i) => !used.includes(i))!;
          return {
            ...r,
            drawn: { ...r.drawn, zeus: zeusPos },
            revealed: { ...r.revealed, zeus: true },
            phase: "all_drawn",
          };
        });
      }, 700);
    }

    if (round.phase === "all_drawn") {
      const { hades, poseidon, zeus } = round.drawn;
      if (hades !== null && poseidon !== null && zeus !== null) {
        setStats((s) => ({
          rounds: s.rounds + 1,
          sky: {
            hades: s.sky.hades + (round.positions[hades] === "long" ? 1 : 0),
            poseidon:
              s.sky.poseidon + (round.positions[poseidon] === "long" ? 1 : 0),
            zeus: s.sky.zeus + (round.positions[zeus] === "long" ? 1 : 0),
          },
        }));
      }
      timer = setTimeout(() => {
        setRound((r) => ({ ...r, phase: "complete" }));
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [round, character]);

  function handlePlayerDraw(pos: number) {
    if (round.phase !== "player_turn") return;
    if (character === "hades") {
      setRound((r) => ({
        ...r,
        drawn: { ...r.drawn, hades: pos },
        revealed: { ...r.revealed, hades: true },
        phase: "poseidon_auto",
      }));
    } else if (character === "poseidon") {
      setRound((r) => ({
        ...r,
        drawn: { ...r.drawn, poseidon: pos },
        revealed: { ...r.revealed, poseidon: true },
        phase: "zeus_auto",
      }));
    } else {
      setRound((r) => ({
        ...r,
        drawn: { ...r.drawn, zeus: pos },
        revealed: { ...r.revealed, zeus: true },
        phase: "all_drawn",
      }));
    }
  }

  function handleDrawAgain() {
    setRound(makeRound(character));
    setRoundNumber((n) => n + 1);
  }

  function getInstruction(): {
    text: string;
    color: "primary" | "text.secondary" | "text.primary";
  } {
    switch (round.phase) {
      case "hades_drawing":
        return { text: "Hades is drawing…", color: "text.secondary" };
      case "poseidon_drawing":
        return { text: "Poseidon is drawing…", color: "text.secondary" };
      case "poseidon_auto":
        return { text: "Poseidon draws…", color: "text.secondary" };
      case "zeus_auto":
        return { text: "Zeus draws…", color: "text.secondary" };
      case "player_turn":
        if (character === "hades")
          return { text: "Pick your straw.", color: "primary" };
        if (character === "poseidon")
          return { text: "Your turn. Pick a straw.", color: "primary" };
        return { text: "Your turn.", color: "primary" };
      case "all_drawn":
      case "complete": {
        const pos = round.drawn[character];
        if (pos !== null)
          return {
            text: `You drew the ${STRAW_LABELS[round.positions[pos]]}.`,
            color: "text.primary",
          };
        return { text: "All straws drawn.", color: "text.secondary" };
      }
    }
  }

  const instruction = getInstruction();
  const isPlayerTurn = round.phase === "player_turn";
  const npcChar = npcForPhase(round.phase);

  return (
    <Page
      title={`Round ${roundNumber}`}
      visual={
        <div className={styles.Board}>
          <div className={styles.straws}>
            {([0, 1, 2] as const).map((i) => {
              const isRevealedByHades =
                round.revealed.hades && round.drawn.hades === i;
              const isRevealedByPoseidon =
                round.revealed.poseidon && round.drawn.poseidon === i;
              const isRevealedByZeus =
                round.revealed.zeus && round.drawn.zeus === i;
              const isRevealed =
                isRevealedByHades || isRevealedByPoseidon || isRevealedByZeus;

              const drawnById = isRevealedByHades
                ? "hades"
                : isRevealedByPoseidon
                  ? "poseidon"
                  : isRevealedByZeus
                    ? "zeus"
                    : null;
              const drawnByChar = drawnById
                ? characters.find((ch) => ch.id === drawnById)!
                : null;

              const length = round.positions[i];
              const isClickable = isPlayerTurn && !isRevealed;
              const isConsidering =
                !isRevealed && npcChar !== null && consideringStraw === i;
              const isPlayerStraw = isRevealed && drawnByChar?.id === character;
              const labelChar = isRevealed
                ? drawnByChar
                : isConsidering
                  ? characters.find((c) => c.id === npcChar)!
                  : null;

              return (
                <div key={i} className={styles.strawSlot}>
                  <div className={styles.strawColumn}>
                    <Typography
                      variant="caption"
                      className={cx(
                        styles.strawLabel,
                        isRevealed && styles.strawLabelVisible,
                        isRevealed &&
                          length === "short" &&
                          styles.strawLabelShort,
                        isRevealed &&
                          length === "medium" &&
                          styles.strawLabelMedium,
                        isRevealed &&
                          length === "long" &&
                          styles.strawLabelLong,
                      )}
                    >
                      {STRAW_LABELS[length]}
                    </Typography>

                    <div
                      className={cx(
                        styles.straw,
                        isClickable && styles.clickable,
                        isRevealed && isPlayerStraw && styles.player,
                        isRevealed && !isPlayerStraw && styles.other,
                        !isRevealed && isConsidering && styles.considering,
                        isRevealed && length === "short" && styles.strawShort,
                        isRevealed && length === "medium" && styles.strawMedium,
                      )}
                      onClick={
                        isClickable ? () => handlePlayerDraw(i) : undefined
                      }
                    >
                      {!isRevealed && <span className={styles.strawMark}>?</span>}
                    </div>
                  </div>

                  <div className={styles.strawInfo}>
                    <div
                      className={cx(
                        styles.avatar,
                        labelChar && styles.avatarVisible,
                        isConsidering && styles.avatarConsidering,
                      )}
                    >
                      {labelChar && (
                        <img
                          src={characterImages[labelChar.id]}
                          alt={labelChar.name}
                          className={styles.avatarImg}
                        />
                      )}
                    </div>
                    <Typography
                      variant="caption"
                      className={cx(
                        styles.strawCaption,
                        isClickable && styles.strawCaptionClickable,
                      )}
                      color={
                        isPlayerStraw
                          ? "primary.main"
                          : isRevealed && drawnByChar
                            ? "secondary.main"
                            : "text.disabled"
                      }
                      onClick={
                        isClickable ? () => handlePlayerDraw(i) : undefined
                      }
                    >
                      {isRevealed && drawnByChar
                        ? `${drawnByChar.name}${drawnByChar.id === character ? " (You)" : ""}`
                        : `straw ${i + 1}`}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>

          <Typography
            variant="h6"
            component="p"
            role="status"
            color={instruction.color}
            className={styles.instruction}
          >
            {instruction.text}
          </Typography>
        </div>
      }
      actions={
        <>
          <Button variant="outlined" onClick={onBack} startIcon={<ArrowBack />}>
            Back
          </Button>

          <Button
            variant="outlined"
            onClick={handleDrawAgain}
            disabled={round.phase !== "complete"}
          >
            Draw Again
          </Button>

          <Button
            variant="contained"
            onClick={() => onNext(stats)}
            endIcon={<ArrowForward />}
          >
            See results
          </Button>
        </>
      }
    />
  );
}
