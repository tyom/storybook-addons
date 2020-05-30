export type FixtureParameters = {
  [key: string]: Fixture;
};

export type Fixture = {
  [key: string]: Variant;
};

export type Variant = {} | string;
