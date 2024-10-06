/* eslint-disable */
// this file is adopted from @nx/angular/module-federation
declare const __webpack_init_sharing__: (scope: 'default') => Promise<void>;
declare const __webpack_share_scopes__: {default: unknown};

let remoteUrlDefinitions: Record<string, string[]>;

export function setRemoteDefinitions(definitions: Record<string, string[]>) {
  remoteUrlDefinitions = definitions;
}

let initialSharingScopeCreated = false;
const remoteContainerMap = new Map<string, unknown>();
const remoteModuleMap = new Map<string, unknown>();

async function loadRemoteContainer(remoteName: string) {
  if (remoteContainerMap.has(remoteName)) {
    return remoteContainerMap.get(remoteName);
  }

  if (!initialSharingScopeCreated) {
    initialSharingScopeCreated = true;
    await __webpack_init_sharing__('default');
  }

  if (!remoteUrlDefinitions) {
    throw new Error('remoteUrlDefinitions not set.');
  }

  const remoteUrls = remoteUrlDefinitions[remoteName];

  const remoteContainer = await remoteUrls.reduce(
    (promise, remoteUrl) =>
      promise.catch(async () => {
        const containerUrl = `${remoteUrl}${remoteUrl.endsWith('/') ? '' : '/'}remoteEntry.js`;
        const container = await import(/* webpackIgnore:true */ containerUrl);
        await container.init(__webpack_share_scopes__.default);
        return container;
      }),
    Promise.reject<any>()
  );

  remoteContainerMap.set(remoteName, remoteContainer);
  return remoteContainer;
}

export async function loadRemoteModule<T = any>(containerName: string, moduleName = '.') {
  const remoteModuleKey = `${containerName}:${moduleName}`;
  if (remoteModuleMap.has(remoteModuleKey)) {
    return remoteModuleMap.get(remoteModuleKey) as T;
  }

  const container = await loadRemoteContainer(containerName);
  const factory = await container.get(moduleName);
  const Module = factory();

  remoteModuleMap.set(remoteModuleKey, Module);
  return Module as T;
}

