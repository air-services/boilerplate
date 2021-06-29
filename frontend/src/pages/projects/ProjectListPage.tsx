import React from 'react';
import ProjectList from 'modules/projects/ProjectList/ProjectList';

const ProjectListPage = () => {
  return (
    <div className="user-list-page">
      <div className="lg:mx-20 sm:mx-5 mb-16">
        <h1 className="text-lg my-10">Проекты</h1>
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectListPage;
