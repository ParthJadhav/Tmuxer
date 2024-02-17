import { IconButton, Text } from '@chakra-ui/react';
import {
  darkBackground, darkBackgroundBorder, lightBackground, lightBackgroundBorder,
} from '../../utils/colors';
import { ReactElement } from 'react';

interface CustomIconButtonProps {
  iconText?: ReactElement | string;
  icon?: ReactElement
  size?: 'xs' | 'sm' | 'md' | 'lg';
  dark?: boolean;
  flat?: boolean;
  backgroundColour?: string;
  [key: string]: any;
  onClick?: () => void;
}
function CustomIconButton({
  onClick, dark, iconText, icon, size = 'sm', flat, backgroundColour, ...rest
}: CustomIconButtonProps) {
  return (
    <IconButton
      icon={iconText ? <Text fontWeight="regular" color="lightgray" {...rest}>{iconText}</Text> : icon}
      aria-label="icon-button"
      onClick={onClick}
      size={size}
      border={flat ? 'none' : '2px'}
      textColor="lightgray"
      _hover={{}}
      _focus={{}}
      borderColor={dark ? darkBackgroundBorder : lightBackgroundBorder}
      background={backgroundColour || (dark ? darkBackground : lightBackground)}
      disabled
    />
  );
}

export default CustomIconButton;
