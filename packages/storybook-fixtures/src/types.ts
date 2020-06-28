export type FixtureParameters = {
  [key: string]: Fixture;
};

export type Fixture = {
  [key: string]: Variant;
};

export type Variant = {} | string;

export type PreviewQuery = {
  fixture: string;
  variant: number;
  fixtures: string;
};

export type KeyboardEvent = {
  key: string;
};

export type PreviewKeyDownEvent = {
  event: KeyboardEvent;
};
