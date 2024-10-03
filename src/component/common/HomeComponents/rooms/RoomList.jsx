import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
