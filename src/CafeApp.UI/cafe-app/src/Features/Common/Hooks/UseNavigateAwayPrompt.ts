import * as React from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

export const useNavigateAwayPrompt = (
  condition: boolean,
  message: string | null | undefined | false,
  { beforeUnload }: { beforeUnload?: boolean } = {}
) => {
  const blocker = useBlocker(
    React.useCallback(
      () =>
        typeof message === "string" && condition
          ? !window.confirm(message)
          : false,
      [message, condition]
    )
  );
  const prevState = React.useRef(blocker.state);
  React.useEffect(() => {
    if (blocker.state === "blocked") {
      blocker.reset();
    }
    prevState.current = blocker.state;
  }, [blocker]);

  useBeforeUnload(
    React.useCallback(
      (event) => {
        if (beforeUnload && condition && typeof message === "string") {
          event.preventDefault();
          event.returnValue = message;
        }
      },
      [condition, beforeUnload, message]
    ),
    { capture: true }
  );
};
