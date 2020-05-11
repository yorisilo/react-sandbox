import React, { FC } from 'react'
import {
  useParams,
  useHistory,
  useLocation
} from 'react-router-dom';
import HelloSomeone from 'components/HelloSomeone';

const HelloSomeoneContainer: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { name } = useParams();

  return <HelloSomeone name={name} path={location.pathname} search={location.search} hash={location.hash} history={history.goBack}/>;
};

export default HelloSomeoneContainer;
