import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import CustomIconButton from '../CustomIconButton';
import { ISession } from '../../types/Session.types';
import { invoke } from '@tauri-apps/api';
import { store } from '../../utils/utils';
import { appWindow } from '@tauri-apps/api/window';
import WindowIcon from '../Icons/WindowIcon';
import CommandIcon from '../Icons/CommandIcon';

interface extendedSessionButtonProps {
  Index: number
}

const SessionButton: React.FC<ISession & extendedSessionButtonProps> = ({
  session_name: sessionName, windows, Index
}) => {
  const handleButtonClick = async () => {
    await invoke("open_terminal", {
      terminal: await store.get("launch_terminal"),
      command: `tmux attach -t ${sessionName}`
    })
    appWindow.hide();
  };

  return (
    <Button
      className="session-button"
      width="100%"
      height="42px"
      px={3}
      py={5}
      justifyContent="space-between"
      alignItems="center"
      borderRadius="10px"
      bg="transparent"
      color="white"
      onClick={handleButtonClick}
      margin="5px 0"
      _hover={{ bg: '#1B1A1D' }}
      _focus={{ bg: '#1B1A1D', outline: 'none', boxShadow: 'none' }}
      id={sessionName}
    >
      <Flex align="center">
        <WindowIcon color='gray' style={{
          marginLeft: "3px"
        }} />
        <Text ml={2}>{sessionName}</Text>
      </Flex>
      <Flex alignItems={"center"} gap={"16px"}>
        <Flex gap={"4px"}>
          <Text color={"gray"}>windows: </Text>
          <Text color={'gray'}>{windows}</Text>
        </Flex>
        <Flex gap={"6px"}>
          <CustomIconButton icon={<CommandIcon width={"14px"} color="lightgrey" />} dark />
          {/* @ts-ignore */}
          <CustomIconButton dark iconText={Index} />
        </Flex>
      </Flex>
    </Button>
  );
};

export default SessionButton;
