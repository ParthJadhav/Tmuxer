import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { Store } from 'tauri-plugin-store-api';
import { register, unregister } from '@tauri-apps/api/globalShortcut';
import { createDashboardWindow, getDashboardWindow, getSearchWindow } from './window';

export const store = new Store('.settings.dat');

export const listenForHotkey = async (shortcut: string) => {
  const searchWindow = getSearchWindow()!;
  await register(shortcut, async () => {
    if (await searchWindow.isFocused()) {
      await searchWindow.hide();
    } else {
      await searchWindow.show();
      await searchWindow.center();
      await searchWindow.setFocus();
    }
  });
};

const createSettings = async () => {
  if (!(await store.get('shortcut'))) {
    await store.set('shortcut', 'Command+Shift+G');
    await store.set('launch_terminal', "Default");
    await store.set('launch_on_login', true);
    await store.save();
  }
};

export const updateShortcut = async (shortcut: string) => {
  unregister(await store.get('shortcut') as string);
  await store.set('shortcut', shortcut);
  await store.save();
  await listenForHotkey(shortcut);
};

export const initialiseApp = async () => {
  await createSettings();
  await invoke('init_ns_panel', {
    appShortcut: await store.get('shortcut'),
  });
  createDashboardWindow();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      appWindow.hide();
    }
    if (event.metaKey && event.key === ',') {
      getDashboardWindow()?.show();
      getDashboardWindow()?.setFocus();
    }
  });

  document.onkeyup = (event) => {
    if (event.metaKey && event.key === 'n') {
      // TODO: HANDLE NEW SESSION
      getSearchWindow()?.emit("newSession");
    }
  };

  document.onblur = async () => {
    await appWindow.hide();
  };

  await listen('showDashboard', async () => {
    appWindow.show();
    appWindow.setFocus();
    getDashboardWindow()?.show();
  });

  await invoke('launch_on_login', {
    enable: await store.get('launch_on_login'),
  });
};

