import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import css from "./Page.module.css";
import cx from "./cx";

interface PageProps {
  /** Rendered as the step heading. Omitted on the title screen. */
  title?: string;
  /** The prose. One column of it, whether or not there's a diagram beside it. */
  children?: ReactNode;
  /** The diagram or interactive element. Sits beside the prose when there's room. */
  visual?: ReactNode;
  /** The Back / Continue row, pinned to the bottom of the viewport. */
  actions?: ReactNode;
  /** Centres everything vertically. Used by the title screen. */
  center?: boolean;
}

export default function Page({
  title,
  children,
  visual,
  actions,
  center,
}: PageProps) {
  return (
    <div className={css.Page}>
      <div className={cx(css.Frame, center && css.FrameCenter)}>
        {title && (
          <Typography variant="h3" component="h1" className={css.Title}>
            {title}
          </Typography>
        )}

        <div className={css.Body}>
          {children && <div className={css.Prose}>{children}</div>}
          {visual && <div className={css.Visual}>{visual}</div>}
        </div>

        {actions && <div className={css.Actions}>{actions}</div>}
      </div>
    </div>
  );
}
