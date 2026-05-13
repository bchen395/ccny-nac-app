import { StarIcon } from './Icons.jsx';

export default function RoomPanel({
  floor,
  favoriteRoomIds,
  selectedRoom,
  showFavoritesOnly,
  onSelectRoom,
  onToggleFavorite,
}) {
  const visibleRooms = showFavoritesOnly
    ? floor.rooms.filter((room) => favoriteRoomIds.has(room.id))
    : floor.rooms;

  return (
    <aside className="roomPanel" aria-label={`${floor.name} rooms`}>
      {visibleRooms.map((room) => {
        const isSelected = selectedRoom?.id === room.id;
        const isFavorite = favoriteRoomIds.has(room.id);

        return (
          <div
            className={`roomCard ${isSelected ? 'isSelected' : ''}`}
            key={room.id}
          >
            <button
              className="roomSelectButton"
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectRoom(room)}
            >
              <span className="roomPill">{room.name}</span>
            </button>
            <button
              className={`roomFavorite ${isFavorite ? 'isFavorite' : ''}`}
              type="button"
              aria-label={`${isFavorite ? 'Remove' : 'Add'} ${room.name} favorite`}
              aria-pressed={isFavorite}
              onClick={() => onToggleFavorite(room.id)}
            >
              <StarIcon size={17} />
            </button>
          </div>
        );
      })}
    </aside>
  );
}
