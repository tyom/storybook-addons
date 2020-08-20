interface ActionsOptions {
  addDecorator?: boolean;
}

export function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve('../register')];
}

export function config(entry: any[] = [], { addDecorator = true }: ActionsOptions = {}) {
  const actionConfig: string[] = [];
  if (addDecorator) {
    actionConfig.push(require.resolve('./addDecorator'));
  }

  return [...entry, ...actionConfig];
}
