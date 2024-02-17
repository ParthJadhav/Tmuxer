import React, { ReactElement } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import CustomIconButton from '../CustomIconButton';
import ReturnIcon from '../Icons/ReturnIcon';
import TmuxerLogo from '../Icons/TmuxerLogo';

type ActionOptionProps = {
  text: string;
  iconText?: string;
  icon?: ReactElement;
  dark?: boolean;
  marginTop?: string;
  marginBottom?: string;
};

const ActionOption: React.FC<ActionOptionProps> = ({
  text, iconText, dark = false, marginTop, marginBottom, icon
}) => {
  const renderIcon = () => {
    return <CustomIconButton iconText={iconText} icon={icon} dark={dark} />;
  };

  return (
    <Flex width="fit-content" justifyContent="space-between" alignItems="center">
      <Text
        color="#B6B6B6"
        fontSize="12px"
        fontWeight="normal"
        marginRight="2"
        marginTop={marginTop}
        marginBottom={marginBottom}
      >
        {text}
      </Text>
      {renderIcon()}
    </Flex>
  );
};

const Actions: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10px',
    }}
  >
    <Flex width="680px" justifyContent="space-between" alignItems="center">
      <Flex style={{
        gap: "8px"
      }}>
        <TmuxerLogo width={"18px"} color='#B6B6B6' />
        <Text textAlign="left" marginRight="10px" fontFamily={"ClashDisplay-Medium"} fontSize={"18px"} color={"#B6B6B6"}>tmuxer</Text>
      </Flex>

      <div
        style={{
          display: 'flex',
          gap: '20px',
        }}
      >
        <ActionOption text="Settings:" iconText="," dark />
        <ActionOption text="Open Session" icon={<ReturnIcon width={"14px"} />} dark />
      </div>
    </Flex>
  </div>
);

export default Actions;
