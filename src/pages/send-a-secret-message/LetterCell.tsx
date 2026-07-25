import type { ReactNode } from "react";
import css from "./LetterCell.module.css";
import cx from "./cx";

/**
 * The one letter/number tile used across the lesson. The fill is the only
 * thing carrying meaning: outlined is plaintext, solid is enciphered.
 */
export type CellTone = "plain" | "number" | "cipher";

interface Props {
  tone?: CellTone;
  /** Smaller tile, for the multi-row pipelines that have to fit 540px. */
  compact?: boolean;
  children: ReactNode;
}

const toneClass: Record<CellTone, string> = {
  plain: css.Plain,
  number: css.Number,
  cipher: css.Cipher,
};

export default function LetterCell({
  tone = "plain",
  compact,
  children,
}: Props) {
  return (
    <div className={cx(css.Cell, toneClass[tone], compact && css.Compact)}>
      {children}
    </div>
  );
}
