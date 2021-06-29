import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import ProjectEdit from 'modules/projects/ProjectEdit/ProjectEdit';


const ProjectEditPage = () => {
  const match: { params: { id: string } } = useRouteMatch();
  return <ProjectEdit id={match.params.id} />;
};

export default ProjectEditPage;
