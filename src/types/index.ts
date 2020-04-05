export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum InputType {
  CHECKBOX = "checkbox",
  TEXT = "text",
  URL = "url",
}

export interface InputConstraints {
  type: InputType;
  required: boolean;
  pattern?: RegExp;
}

export enum ErrorType {
  PARTY_VALIDATION = "party-validation",
  NOT_FOUND = "not-found",
  UNKNOWN = "unknown",
}

export interface Party {
  jitsiServerUrl: string;
  jitsiRoomName: string;
  streamUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConstraintsFor<T> {}

export interface PartyConstraints extends ConstraintsFor<Party> {
  jitsiServerUrl: InputConstraints;
  jitsiRoomName: InputConstraints;
  streamUrl: InputConstraints;
}

const URL_PATTERN = /^https?:\/\/.*/;

export const PARTY_CONSTRAINTS: PartyConstraints = {
  jitsiServerUrl: {
    type: InputType.URL,
    required: true,
    pattern: URL_PATTERN,
  },
  jitsiRoomName: {
    type: InputType.TEXT,
    required: true,
    pattern: /^[a-zA-Z0-9 ]+$/,
  },
  streamUrl: {
    type: InputType.URL,
    required: true,
    pattern: URL_PATTERN,
  },
};

export interface CreatePartyConstraints extends PartyConstraints {
  acceptTerms: InputConstraints;
}

export const CREATE_PARTY_CONSTRAINTS: CreatePartyConstraints = {
  ...PARTY_CONSTRAINTS,
  acceptTerms: {
    type: InputType.CHECKBOX,
    required: true,
  },
};
