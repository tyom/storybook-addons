export type FixtureParameters = {
  [key: string]: Fixture;
};

export type Fixture = {
  [key: string]: Variant;
};

export type Variant = any;

export type StateQuery = {
  query?: string;
  fixtures?: string;
};

export type KeyboardEvent = {
  key: string;
  altKey: boolean;
  keyCode: number;
};

export type PreviewKeyDownEvent = {
  event: KeyboardEvent;
};
