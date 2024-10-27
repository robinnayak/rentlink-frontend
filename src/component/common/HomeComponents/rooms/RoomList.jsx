import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms,token }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} token={token} />
      ))}
    </div>
  );
};

export default RoomList;
