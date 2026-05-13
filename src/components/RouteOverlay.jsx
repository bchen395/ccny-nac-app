export default function RouteOverlay({ selectedRoom, youAreHere }) {
  if (!selectedRoom) {
    return null;
  }

  const targetX = selectedRoom.x + selectedRoom.width / 2;
  const targetY = selectedRoom.y + selectedRoom.height / 2;
  const elbowY = Math.max(Math.min(targetY + 86, youAreHere.y - 54), 284);
  const points = [
    `${youAreHere.x},${youAreHere.y}`,
    `${youAreHere.x},${elbowY}`,
    `${targetX},${elbowY}`,
    `${targetX},${targetY}`,
  ].join(' ');

  return (
    <g className="routeOverlay" aria-label={`Route to ${selectedRoom.name}`}>
      <polyline points={points} />
      <circle cx={targetX} cy={targetY} r="10" />
    </g>
  );
}
