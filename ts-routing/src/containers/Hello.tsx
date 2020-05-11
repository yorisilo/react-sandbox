import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Hello from 'components/Hello';

const HelloContainer: FC = () => {
  const history = useHistory();
  return <Hello history={() => history.push('/hello/react-router?message=hooks#test')}/>;
}

export default HelloContainer;
