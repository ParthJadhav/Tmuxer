import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { SessionContext } from '../../contexts/session.context';
import { ISession } from '../../types/Session.types';

const onSearchInputChanged = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setFilteredSessions: React.Dispatch<React.SetStateAction<ISession[]>>,
  allSessions: ISession[],
) => {
  const searchText = event.target.value.toLowerCase();
  const filteredSessions = allSessions.filter(session =>
    session.session_name.toLowerCase().includes(searchText)
  );
  setFilteredSessions(filteredSessions);
};

function SearchInput() {
  const { sessions, setFilteredSessions } = React.useContext(SessionContext);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon
          boxSize="18px"
          color="#B6B6B6"
          style={{
            marginTop: '6px',
          }}
        />
      </InputLeftElement>
      <Input
        id="search-input"
        type="text"
        placeholder="Search for a session"
        _placeholder={{ color: '#B6B6B6' }}
        fontSize="18px"
        size="lg"
        variant="filled"
        border="none"
        background="transparent"
        color="white"
        _hover={{ bg: 'transparent' }}
        onChange={(event) => onSearchInputChanged(event, setFilteredSessions, sessions)}
      />
    </InputGroup>
  );
}

export default SearchInput;
