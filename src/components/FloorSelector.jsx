import { ChevronDownIcon, MenuIcon, MapPinIcon } from './Icons.jsx';

export default function FloorSelector({
  floors,
  currentFloorId,
  showDropdown,
  trigger = 'floor',
  onToggle,
  onSelect,
}) {
  const currentFloor = floors.find((floor) => floor.id === currentFloorId);
  const isMenuTrigger = trigger === 'menu';

  return (
    <div className={`floorSelector ${isMenuTrigger ? 'floorSelectorMenu' : ''}`}>
      {showDropdown ? (
        <div className="floorMenu" role="menu" aria-label="Select floor">
          {floors.map((floor) => (
            <button
              className={floor.id === currentFloorId ? 'isSelected' : ''}
              key={floor.id}
              type="button"
              role="menuitemradio"
              aria-checked={floor.id === currentFloorId}
              onClick={() => onSelect(floor.id)}
            >
              {floor.name}
            </button>
          ))}
        </div>
      ) : null}

      <button
        className={`floorButton ${isMenuTrigger ? 'floorMenuTrigger' : ''}`}
        type="button"
        aria-label={isMenuTrigger ? 'Open floor menu' : undefined}
        aria-expanded={showDropdown}
        aria-haspopup="menu"
        onClick={onToggle}
      >
        {isMenuTrigger ? (
          <MenuIcon size={34} />
        ) : (
          <>
            <span className="floorIcon" aria-hidden="true">
              <MapPinIcon size={18} />
            </span>
            <span>{currentFloor.name}</span>
            <ChevronDownIcon size={18} />
          </>
        )}
      </button>
    </div>
  );
}
