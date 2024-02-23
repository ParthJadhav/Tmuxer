import { invoke } from '@tauri-apps/api';
import { appWindow, LogicalSize, WebviewWindow } from '@tauri-apps/api/window';

const configureWindow = async () => {
  await appWindow.center();
  await appWindow.show();
  await appWindow.setFocus();
};

export const setWindowSize = async (width: number, height: number) => {
  await appWindow.setSize(new LogicalSize(width, height));
};

export const switchToApp = async () => {
  await setWindowSize(728, 646);
  await configureWindow();
};

export const setWindowSizeToBody = async () => {
  const { body } = document;
  await appWindow.setSize(new LogicalSize(body.clientWidth, body.clientHeight));
};

export const createDashboardWindow = async () => {
  const DashboardWindow = new WebviewWindow('dashboard', {
    url: '/dashboard',
    title: 'Tmuxer',
    resizable: false,
    minHeight: 280,
    minWidth: 427,
    maximizable: false,
    transparent: true,
    decorations: false,
  });
  await invoke('apply_vibrancy_to_dashboard', {
    window: DashboardWindow,
  });
  DashboardWindow.setSize(new LogicalSize(427, 280));
  DashboardWindow.center();
  DashboardWindow.onCloseRequested((event) => {
    event.preventDefault();
    DashboardWindow.hide();
  });
};

export const getDashboardWindow = () => WebviewWindow.getByLabel('dashboard');
export const getSearchWindow = () => WebviewWindow.getByLabel('search');
