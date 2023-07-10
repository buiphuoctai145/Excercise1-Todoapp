import React, { useState } from "react";
import { ModalContainer } from "./ModalContainer";
import { login } from "../../pages/Login";

const users = [
  {

  }
]

export const ModalLogin = ({
  isVisible,
  onLogin,
  onClose,
}: {
  isVisible: boolean;
  onLogin: (userID: string) => void;
  onClose: () => void;
}) => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const _onLogin = () => {
    const loggedInUserId = login(inputUsername, inputPassword);
    if (loggedInUserId) {
      console.log('Login successful');
      onLogin(loggedInUserId);
    } else {
      console.log('Login failed');
    }
  };

  if (!isVisible) {
    return null;
  }

  const _onSubmit = () => {
    _onLogin();
  };

  return (
    <ModalContainer
      isVisible={isVisible}
      onSubmit={_onSubmit}
      onClose={onClose}
      title="Log in"
      submitButtonText="Log in"
    >
      <div className="mb-4">
        <label className="bg-blue block font-bold mb-2">Username</label>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="bg-blue block font-bold mb-2">Password</label>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </ModalContainer>
  );
};
