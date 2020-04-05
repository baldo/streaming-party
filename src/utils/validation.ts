import { ConstraintsFor, InputConstraints } from "@/types";

function eqSets<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const entry of a) {
    if (!b.has(entry)) {
      return false;
    }
  }

  return true;
}

function isValidStringField(
  value: string,
  constraints: InputConstraints
): boolean {
  const input = document.createElement("input");
  input.value = value;

  for (const key of Object.keys(constraints)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    let constraint = constraints[key];
    if (constraint instanceof RegExp) {
      constraint = constraint.source;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    input[key] = constraint;
  }

  return input.checkValidity();
}

export function isValid<T>(obj: T, objConstraints: ConstraintsFor<T>): boolean {
  const fields = new Set<string>(Object.keys(obj));
  if (!eqSets(fields, new Set<string>(Object.keys(objConstraints)))) {
    throw new Error(
      "Unexpected validation error: Fields of object and constraints mismatch!"
    );
  }

  for (const field of fields) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const value = obj[field];
    if (typeof value !== "string") {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!isValidStringField(value, objConstraints[field])) {
      return false;
    }
  }

  return true;
}
