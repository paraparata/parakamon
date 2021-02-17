import React from "react";

import Button from "./shared/Button";
import Modal from "./shared/Modal";

function ModalNewPokemon({
  title,
  show,
  data,
  nicknameState,
  warning,
  onSave,
  onClose,
}) {
  return (
    <Modal show={show}>
      <div className="mx-auto flex justify-center">
        <div className="w-11/12 px-4 py-4 flex flex-col justify-center rounded-lg bg-white border-2 border-yellow-500">
          <span className="heading mb-2 text-center text-xs text-blue-500">
            {title}
          </span>
          <hr className="mb-5 " />
          <span className="heading mb-5 flex justify-center text-sm font-semibold text-gray-700 capitalize">
            {data.name}
          </span>
          <label
            htmlFor="nickname"
            className="mb-2 text-center font-medium text-gray-700"
          >
            Enter Pokemon's Nickname
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className=" w-full mb-4 px-2 py-2 border border-yellow-400 rounded focus:ring focus:ring-blue-100 text-lg"
            placeholder="My Pokemon"
            onChange={nicknameState}
          />
          {warning && (
            <span className="mb-3 text-red-500 text-sm">
              Nickname already in used
            </span>
          )}
          <Button title="Save" optClass="mb-2" onClick={onSave} />
          <Button
            title="Close"
            color="bg-white"
            textColor="text-red-500"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalNewPokemon;
