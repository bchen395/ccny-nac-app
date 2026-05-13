import RouteOverlay from './RouteOverlay.jsx';

export default function MapView({ floor, selectedRoom, onSelectRoom }) {
  return (
    <div className="mapView" aria-label={`${floor.name} map`}>
      <svg viewBox="0 0 900 570" role="img">
        <title>{`${floor.name} placeholder map`}</title>
        <rect className="mapBoundary" x="18" y="18" width="864" height="534" rx="8" />

        {floor.hallway.map((segment) => (
          <rect
            className="hallway"
            key={`${segment.x}-${segment.y}`}
            x={segment.x}
            y={segment.y}
            width={segment.width}
            height={segment.height}
            rx="8"
          />
        ))}

        {floor.rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;

          return (
            <g
              className={`mapRoom ${isSelected ? 'isSelected' : ''}`}
              key={room.id}
              role="button"
              aria-pressed={isSelected}
              aria-label={room.name}
              tabIndex={0}
              onClick={() => onSelectRoom(room)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectRoom(room); }}
            >
              <rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                rx="8"
              />
              <text x={room.x + room.width / 2} y={room.y + room.height / 2 + 5}>
                {room.name}
              </text>
            </g>
          );
        })}

        {floor.landmarks.map((landmark) => (
          <text className="landmarkLabel" key={landmark.label} x={landmark.x} y={landmark.y}>
            {landmark.label}
          </text>
        ))}

        <RouteOverlay selectedRoom={selectedRoom} youAreHere={floor.youAreHere} />

        <g className="youAreHere">
          <circle cx={floor.youAreHere.x} cy={floor.youAreHere.y} r="16" />
          <circle cx={floor.youAreHere.x} cy={floor.youAreHere.y} r="6" />
          <text x={floor.youAreHere.x + 24} y={floor.youAreHere.y + 5}>
            YOU ARE HERE
          </text>
        </g>
      </svg>
    </div>
  );
}
