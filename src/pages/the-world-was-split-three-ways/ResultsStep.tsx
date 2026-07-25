import { Button, LinearProgress, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import Page from "../../components/Page";
import css from "./ResultsStep.module.css";
import hadesImg from "./images/hades.svg";
import poseidonImg from "./images/poseidon.svg";
import zeusImg from "./images/zeus.svg";
import type { Character, SimulationStats, StrawLength } from "./types";
import { characters } from "./types";

const characterImages: Record<Character, string> = {
  hades: hadesImg,
  poseidon: poseidonImg,
  zeus: zeusImg,
};

interface Props {
  character: Character | null;
  onBack: (currentStats: SimulationStats) => void;
  onNext: () => void;
  stats: SimulationStats | null;
}

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

function runRounds(count: number, base: SimulationStats): SimulationStats {
  const result = { rounds: base.rounds, sky: { ...base.sky } };
  for (let i = 0; i < count; i++) {
    const positions = shuffle(["short", "medium", "long"] as StrawLength[]) as [
      StrawLength,
      StrawLength,
      StrawLength,
    ];
    const hadesPos = pickRandom([0, 1, 2]);
    const remaining = [0, 1, 2].filter((j) => j !== hadesPos);
    const poseidonPos = pickRandom(remaining);
    const zeusPos = [0, 1, 2].find((j) => j !== hadesPos && j !== poseidonPos)!;
    result.rounds++;
    if (positions[hadesPos] === "long") result.sky.hades++;
    if (positions[poseidonPos] === "long") result.sky.poseidon++;
    if (positions[zeusPos] === "long") result.sky.zeus++;
  }
  return result;
}

export default function ResultsStep({
  character,
  onBack,
  onNext,
  stats,
}: Props) {
  const [displayStats, setDisplayStats] = useState<SimulationStats>(
    () => stats ?? { rounds: 0, sky: { hades: 0, poseidon: 0, zeus: 0 } },
  );
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  function addRounds(total: number, interval: number) {
    if (running) return;
    setRunning(true);
    let remaining = total;

    function tick() {
      remaining--;
      setDisplayStats((s) => runRounds(1, s));
      if (remaining > 0) {
        timerRef.current = setTimeout(tick, interval);
      } else {
        setRunning(false);
      }
    }

    timerRef.current = setTimeout(tick, interval);
  }

  return (
    <Page
      title="The draw was fair"
      visual={
        /* One column: the sentence sits with the bars rather than beside them,
         * and the round controls sit with the bars they change. */
        <div className={css.Stats}>
          <Typography variant="h6" component="p" className={css.Heading}>
            No matter the order, every brother had the same chance.
          </Typography>

          {(["hades", "poseidon", "zeus"] as Character[]).map((charId) => {
            const skyCount = displayStats.sky[charId];
            const pct =
              displayStats.rounds > 0
                ? Math.round((skyCount / displayStats.rounds) * 100)
                : 0;
            const charInfo = characters.find((ch) => ch.id === charId)!;
            const isPlayer = charId === character;

            return (
              <div key={charId} className={css.StatRow}>
                <div className={css.StatLabel}>
                  <div className={css.StatName}>
                    <img
                      src={characterImages[charId]}
                      alt=""
                      className={css.Avatar}
                    />
                    <Typography component="span" variant="h6">
                      {charInfo.name}
                      {isPlayer ? " (you)" : ""}
                    </Typography>
                  </div>
                  <Typography component="span" variant="h6">
                    {displayStats.rounds === 0
                      ? "-"
                      : `${skyCount} / ${displayStats.rounds} (${pct}%)`}
                  </Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{ height: 14, borderRadius: 1 }}
                />
              </div>
            );
          })}
        </div>
      }
      actions={
        <>
          <Button
            variant="outlined"
            onClick={() => onBack(displayStats)}
            startIcon={<ArrowBack />}
          >
            Play again
          </Button>

          {/* The round controls live in the footer, beside the count they change. */}
          <div className={css.AddRounds}>
            <Button
              variant="outlined"
              disabled={running}
              onClick={() => addRounds(100, 100)}
            >
              Add 100 rounds
            </Button>

            <Button
              variant="outlined"
              disabled={running}
              onClick={() => addRounds(1000, 20)}
            >
              Add 1,000 rounds
            </Button>

            <Typography variant="h6" component="p" color="text.secondary">
              {displayStats.rounds} round{displayStats.rounds !== 1 ? "s" : ""}
            </Typography>
          </div>

          <Button
            variant="contained"
            onClick={onNext}
            endIcon={<ArrowForward />}
          >
            Explain
          </Button>
        </>
      }
    />
  );
}
