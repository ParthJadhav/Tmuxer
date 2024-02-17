import { useState, useEffect, ReactNode } from 'react';
import {
  Text, Switch, Button, Box, Select, Flex,
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api';
import { store, updateShortcut } from '../../../../utils/utils';
import { TerminalEmulator } from '../../../../types/Session.types';
import TmuxerLogo from '../../../../components/Icons/TmuxerLogo';

const Settings = () => {
  const [shortcut, setShortcut] = useState('');
  const [launchOnLogin, setLaunchOnLogin] = useState(false);
  const [launchTerminal, setLaunchTerminal] = useState<TerminalEmulator>("Default");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setShortcut(await store.get('shortcut') || '');
      setLaunchOnLogin(await store.get('launch_on_login') || false);
      setLaunchTerminal(await store.get('launch_terminal') as TerminalEmulator);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (isListening) {
        event.preventDefault();
        const {
          key, ctrlKey, altKey, shiftKey, metaKey,
        } = event;

        if (key !== 'Control' && key !== 'Alt' && key !== 'Shift' && key !== 'Meta') {
          let shortcutString = '';

          if (ctrlKey) shortcutString += 'Ctrl+';
          if (altKey) shortcutString += 'Alt+';
          if (shiftKey) shortcutString += 'Shift+';
          if (metaKey) shortcutString += 'Command+';

          shortcutString += key;
          setShortcut(shortcutString);
          setIsListening(false);
          updateShortcut(shortcutString);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening]);

  const handleShortcutChange = () => {
    setShortcut('');
    setIsListening(true);
  };

  const handleLaunchOnLoginChange = async (event: any) => {
    const { checked } = event.target;
    setLaunchOnLogin(checked);
    await store.set('launch_on_login', checked);
    await invoke('launch_on_login', {
      enable: checked,
    });
    store.save();
  };

  const handleTerminalChange = async (event: any) => {
    const value = event.target.value;
    setLaunchTerminal(value);
    await store.set('launch_terminal', value);
  }

  const SettingRow = ({ label, children }: {
    label: string,
    children: ReactNode
  }) => (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width={"100%"}
    >
      <Text textAlign="left" marginRight="10px" fontFamily={"ClashDisplay-Medium"} fontSize={"18px"}>
        {label}:
      </Text>
      {children}
    </Box>
  );

  return (
    <div style={{
      width: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
    >
      <Flex style={{
        position: "absolute",
        top: "18px",
        gap: "8px"
      }}>
        <TmuxerLogo />
        <Text textAlign="left" marginRight="10px" fontFamily={"ClashDisplay-Medium"} fontSize={"18px"}>tmuxer</Text>
      </Flex>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt={"16px"}
        gap={"24px"}
        style={{
          width: "100%"
        }}
      >
        <SettingRow label="Default Terminal">
          <Select
            defaultValue={"Default"}
            value={launchTerminal}
            onChange={handleTerminalChange}
            width={"40%"}
            fontFamily={"ClashDisplay-Medium"}
            border={'none'}
            background={"#323232"}
            _hover={{
              background: "#626262"
            }}
          >
            <option value={"Default"}>Default</option>
            <option value={"iTerm"}>iTerm</option>
            <option value={"Kitty"}>Kitty</option>
            <option value={"Alacritty"}>Alacritty</option>
          </Select>
        </SettingRow>

        <SettingRow label="Default Shortcut">
          <Button
            borderWidth="0px"
            borderRadius="4px"
            background={"#323232"}
            _hover={{
              background: "#626262"
            }}
            textColor={"white"}
            p="4"
            onClick={handleShortcutChange}
          >
            {isListening ? 'Listening...' : shortcut
              .replace('Meta', '⌘')
              .replace('Command', '⌘')
              .replace('Control', '⌃')
              .replace('Alt', '⌥')
              .replace('Shift', '⇧')
              .toUpperCase() || 'Press a key...'}
          </Button>
        </SettingRow>


        <SettingRow label="Launch at Login">
          <Switch
            isChecked={launchOnLogin}
            onChange={handleLaunchOnLoginChange}
          />
        </SettingRow>
      </Box>
    </div>
  );
};

export default Settings;
