import {
  CogIcon,
  InboxIcon,
  SearchIcon,
  StarIcon,
} from './Icons.jsx';
import FloorSelector from './FloorSelector.jsx';

export default function Header({
  floors,
  currentFloorId,
  selectedRoom,
  showFloorDropdown,
  showAlerts,
  showFavoritesOnly,
  onToggleFloors,
  onSelectFloor,
  onToggleAlerts,
  onToggleFavoritesOnly,
}) {
  return (
    <header className="appHeader">
      <div className="headerUtilities">
        <button
          className={`iconButton inboxButton ${showAlerts ? 'isActive' : ''}`}
          type="button"
          aria-label="Open inbox"
          aria-pressed={showAlerts}
          onClick={onToggleAlerts}
        >
          <InboxIcon size={23} />
        </button>
        <button className="iconButton" type="button" aria-label="Settings">
          <CogIcon size={22} />
        </button>
        <button
          className={`iconButton favoriteButton ${showFavoritesOnly ? 'isActive' : ''}`}
          type="button"
          aria-label="Show favorite rooms"
          aria-pressed={showFavoritesOnly}
          onClick={onToggleFavoritesOnly}
        >
          <StarIcon size={21} />
        </button>
      </div>

      <label className="searchField" aria-label="Search destination">
        <SearchIcon size={17} />
        <input
          readOnly
          value={selectedRoom?.name ?? ''}
          placeholder=""
          aria-label="Selected destination"
        />
      </label>

      <FloorSelector
        floors={floors}
        currentFloorId={currentFloorId}
        showDropdown={showFloorDropdown}
        trigger="menu"
        onToggle={onToggleFloors}
        onSelect={onSelectFloor}
      />
    </header>
  );
}
