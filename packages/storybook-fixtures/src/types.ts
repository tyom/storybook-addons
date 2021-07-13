export type FixtureSections = {
  [key: string]: FixtureVariants;
};

export type FixtureVariants = {
  [key: string]: Variant;
};

export type Variant = any;

export type SelectionQuery = string | undefined;

export type KeyboardEvent = {
  key: string;
  altKey: boolean;
  keyCode: number;
};

export type PreviewKeyDownEvent = {
  event: KeyboardEvent;
};
