import React, { useEffect } from 'react';
import { Divider } from '@chakra-ui/react';
import SearchInput from '../../components/SearchInput';
import Actions from '../../components/Actions';
import Sessions from '../../components/Session';
import { SessionContext } from '../../contexts/session.context';
import { setWindowSizeToBody } from '../../utils/window';
import { listen } from '@tauri-apps/api/event';
import { ISession } from '../../types/Session.types';
import { invoke } from '@tauri-apps/api';

document.addEventListener('keydown', (e: KeyboardEvent) => {
  const searchInput = document.getElementById('search-input') as HTMLElement;
  const sessionButtons = Array.from(document.querySelectorAll('.session-button')) as HTMLElement[];

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (sessionButtons.length > 0) {
      e.preventDefault();
      const activeElement = document.activeElement as HTMLElement;

      if (activeElement === searchInput) {
        sessionButtons[0].focus();
      } else {
        const currentIndex = sessionButtons.findIndex((el) => el === activeElement);

        if (currentIndex !== -1) {
          if (e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % sessionButtons.length;
            sessionButtons[nextIndex].focus();
          } else if (e.key === 'ArrowUp') {
            const prevIndex = (currentIndex - 1 + sessionButtons.length) % sessionButtons.length;
            sessionButtons[prevIndex].focus();
          }
        }
      }
    }
  } else if (e.metaKey) {
    // Handle CMD + 1, CMD + 2
    const index = parseInt(e.key, 10);
    const targetElement = sessionButtons[index - 1];

    if (index >= 1 && index <= sessionButtons.length && targetElement) {
      targetElement.click();
    }
  } else if (e.type === 'keydown' && e.key !== 'Enter') {
    searchInput.focus();
  }
});

function Search() {
  const { filteredSessions, setSessions } = React.useContext(SessionContext);

  useEffect(() => {
    (async () => {
      await setWindowSizeToBody();
    })();
  }, [filteredSessions]);

  listen('newSessions', async (data) => {
    setSessions(data.payload as ISession[]);
  });

  const refreshSessions = async () => {
    const data = await invoke('get_tmux_sessions');
    setSessions(data as ISession[]);
  };

  return (
    <div className="searchWindow">
      <SearchInput />
      <Divider
        width="728px"
        borderColor="#393939"
        marginTop="5px"
        marginBottom="10px"
        marginLeft={0}
      />
      <Sessions sessions={filteredSessions} refreshSessions={refreshSessions} />
      <Divider
        width="728px"
        borderColor="#393939"
        marginTop="5px"
        marginBottom="15px"
        marginLeft={0}
      />
      <Actions />
    </div>
  );
}

export default Search;
