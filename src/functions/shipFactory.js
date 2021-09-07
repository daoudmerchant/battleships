const Ship = (length) => {
  let ship = {
    length,
    isHit: new Array(length).fill(false),
    sunk: false,
  };
  const isSunk = () => {
    if (!ship.sunk) {
      const shipIsSunk = ship.isHit.every((square) => square);
      if (shipIsSunk) {
        ship.sunk = true;
      }
    }
    return ship.sunk;
  };
  const hit = (i) => {
    if (i > ship.length - 1) {
      throw new Error("Index longer than ship");
    }
    ship.isHit[i] = true;
    return isSunk();
  };

  return {
    length,
    hit,
    get hits() {
      return ship.isHit;
    },
    get isSunk() {
      return isSunk();
    },
  };
};

export default Ship;
