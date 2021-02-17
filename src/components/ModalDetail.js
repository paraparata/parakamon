import React from "react";

import Button from "./shared/Button";
import CardPokemon from "./shared/CardPokemon";
import Modal from "./shared/Modal";

function ModalDetail({
  show,
  data,
  isFirstTab,
  onClickMoves,
  onClickAbilities,
  onClose,
}) {
  return (
    <Modal show={show}>
      <div className="mx-auto flex justify-center">
        <div className="w-11/12 px-4 py-4 flex flex-col justify-center rounded-lg bg-white border-2 border-yellow-500">
          <span className="heading mb-2 text-xs text-center text-blue-500">
            Pokemon Detail
          </span>
          <hr className="mb-2 " />
          <CardPokemon
            name={data.name}
            types={data.types}
            img={data.sprites.front_default}
            imgWidth="w-20 ss:w-14"
            imgHeight="h-20 ss:h-14"
          />
          <div className="w-full mx-auto my-4">
            <div className="w-full flex">
              <Button
                title="Moves"
                color={isFirstTab ? "bg-yellow-400" : "bg-yellow-300"}
                optClass="flex-1"
                onClick={onClickMoves}
              />
              <Button
                title="Abilities"
                color={!isFirstTab ? "bg-yellow-400" : "bg-yellow-300"}
                optClass="flex-1"
                onClick={onClickAbilities}
              />
            </div>
            <div className="w-full h-56 ss:h-36 flex flex-col rounded border-2 border-yellow-300 overflow-y-scroll">
              {isFirstTab
                ? data.moves.map((move, index) => {
                    return (
                      <div key={index} className="text-center">
                        <span className="py-1 text-sm font-medium capitalize">
                          {move.move.name}
                        </span>
                        <hr />
                      </div>
                    );
                  })
                : data.abilities.map((ability, index) => {
                    return (
                      <div key={index} className="text-center">
                        <span className="py-1 text-sm font-medium capitalize">
                          {ability.ability.name}
                        </span>
                        <hr />
                      </div>
                    );
                  })}
            </div>
          </div>
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

export default ModalDetail;
