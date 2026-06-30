import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEffect, useReducer, useRef } from "react";

type Phase = "typing" | "pausing" | "deleting";

type TypewriterState = {
  roleIndex: number;
  displayText: string;
  phase: Phase;
};

type TypewriterAction =
  { type: "TYPE_CHAR" } | { type: "START_DELETING" } | { type: "DELETE_CHAR" };

export type UseTypewriterOptions = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

const initialState: TypewriterState = {
  roleIndex: 0,
  displayText: "",
  phase: "typing",
};

const typewriterReducer = (
  state: TypewriterState,
  action: TypewriterAction,
  roles: readonly string[],
): TypewriterState => {
  const target = roles[state.roleIndex] ?? "";

  switch (action.type) {
    case "TYPE_CHAR": {
      if (state.phase !== "typing") return state;
      const nextText = target.slice(0, state.displayText.length + 1);
      const isComplete = nextText.length === target.length;
      return {
        ...state,
        displayText: nextText,
        phase: isComplete ? "pausing" : "typing",
      };
    }
    case "START_DELETING":
      if (state.phase !== "pausing") return state;
      return { ...state, phase: "deleting" };
    case "DELETE_CHAR": {
      if (state.phase !== "deleting") return state;
      if (state.displayText.length > 0) {
        return { ...state, displayText: state.displayText.slice(0, -1) };
      }
      return {
        roleIndex: roles.length > 0 ? (state.roleIndex + 1) % roles.length : 0,
        displayText: "",
        phase: "typing",
      };
    }
    default:
      return state;
  }
};

const getDelay = (
  phase: Phase,
  speeds: Required<UseTypewriterOptions>,
): number => {
  switch (phase) {
    case "typing":
      return speeds.typingSpeed;
    case "pausing":
      return speeds.pauseDuration;
    case "deleting":
      return speeds.deletingSpeed;
  }
};

const getAction = (phase: Phase): TypewriterAction => {
  switch (phase) {
    case "typing":
      return { type: "TYPE_CHAR" };
    case "pausing":
      return { type: "START_DELETING" };
    case "deleting":
      return { type: "DELETE_CHAR" };
  }
};

export const useTypewriter = (
  roles: readonly string[],
  options: UseTypewriterOptions = {},
) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const typingSpeed = options.typingSpeed ?? 100;
  const deletingSpeed = options.deletingSpeed ?? 50;
  const pauseDuration = options.pauseDuration ?? 2000;

  const [state, dispatch] = useReducer(
    (currentState: TypewriterState, action: TypewriterAction) =>
      typewriterReducer(currentState, action, roles),
    initialState,
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || roles.length === 0) return;

    const clearTimer = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    clearTimer();

    timeoutRef.current = setTimeout(
      () => {
        timeoutRef.current = null;
        dispatch(getAction(state.phase));
      },
      getDelay(state.phase, { typingSpeed, deletingSpeed, pauseDuration }),
    );

    return clearTimer;
  }, [
    prefersReducedMotion,
    roles,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    state.phase,
    state.displayText,
    state.roleIndex,
  ]);

  if (prefersReducedMotion) {
    return getLongestText(roles);
  }

  return state.displayText;
};

export const getLongestText = (texts: readonly string[]): string => {
  if (texts.length === 0) return "";
  return texts.reduce((longest, current) =>
    current.length >= longest.length ? current : longest,
  );
};
