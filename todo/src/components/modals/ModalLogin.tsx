import React, { useState } from "react";
import { CancelButton } from "../buttons/CancelButton";
import { ModalContainer } from "./ModalContainer";

export const ModalLogin = ({
  isVisible,
  onLogin,
  onClose,
}: {
  isVisible: boolean;
  onLogin: (username: string, password: string) => void;
  onClose: () => void;
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const _onLogin = () => {
    // onLogin(userName, password);
  };

  if (!isVisible) {
    return null;
  }
  return (
    <ModalContainer
      isVisible={isVisible}
      onSubmit={_onLogin}
      onClose={onClose}
      title="Log in"
      submitButtonText="Log in"
    >
      <div className="mb-4">
        <label className="bg-blue block font-bold mb-2">Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="bg-blue block font-bold mb-2">Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </ModalContainer>
  );
};
