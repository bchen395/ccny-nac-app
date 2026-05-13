import { ChevronRightIcon } from './Icons.jsx';

export default function RoomPanel({ floor, selectedRoom, onSelectRoom }) {
  return (
    <aside className="roomPanel" aria-label={`${floor.name} rooms`}>
      {floor.rooms.map((room) => {
        const isSelected = selectedRoom?.id === room.id;

        return (
          <button
            className={`roomCard ${isSelected ? 'isSelected' : ''}`}
            key={room.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectRoom(room)}
          >
            <span>{room.name}</span>
            <ChevronRightIcon size={22} />
          </button>
        );
      })}
    </aside>
  );
}
