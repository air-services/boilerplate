import React from 'react';
import UserList from 'modules/users/UserList';

const UserListPage = () => {
  return (
    <div className="user-list-page">
      <div className="lg:mx-20 sm:mx-5 mb-16">
        <h1 className="text-lg my-10">Пользователи</h1>
        <UserList />
      </div>
    </div>
  );
};

export default UserListPage;
