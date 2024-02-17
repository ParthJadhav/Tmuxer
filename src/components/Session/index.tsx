import React from 'react';
import { Text } from '@chakra-ui/react';
import { ISession } from '../../types/Session.types';
import SessionButton from '../SessionButton';

const Sessions: React.FC<{ sessions: ISession[]; refreshSessions: () => void }> = ({
  sessions,
  refreshSessions,
}) => {
  const renderSessions = () => {
    if (sessions?.length === 0 || 0) {
      return (
        <p
          style={{
            color: '#7D7A75',
            fontSize: '18px',
            fontWeight: 500,
            textAlign: 'center',
            marginBottom: "16px"
          }}
        >
          No sessions found
        </p>
      );
    }

    return sessions
      .slice(0, 9)
      .map((session, index) => <SessionButton key={session.session_name} Index={index + 1} {...session} />);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: '30px',
          marginLeft: '24px',
          marginTop: '20px',
        }}
      >
        <Text fontSize="14px" color="#B6B6B6">
          Sessions
        </Text>
        <Text fontSize="14px" color="#B6B6B6" cursor="pointer" onClick={refreshSessions}>
          Refresh
        </Text>
      </div>
      <div style={{ padding: '5px 10px 10px 10px' }}>{renderSessions()}</div>
    </div>
  );
};

export default Sessions;
