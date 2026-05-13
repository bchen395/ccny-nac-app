import { useEffect, useRef, useState } from 'react';
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
  onSearchSelect,
}) {
  const [inputValue, setInputValue] = useState(selectedRoom?.name ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  // Keep input in sync with externally-driven room selections (panel / map)
  useEffect(() => {
    if (!isOpen) {
      setInputValue(selectedRoom?.name ?? '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  const query = isOpen ? inputValue.trim().toLowerCase() : '';
  const results = query.length > 0
    ? floors.flatMap((floor) =>
        floor.rooms
          .filter((r) => r.name.toLowerCase().includes(query))
          .map((r) => ({ ...r, floorId: floor.id, floorName: floor.name }))
      )
    : [];

  function handleFocus() {
    setIsOpen(true);
    inputRef.current?.select();
  }

  function handleBlur() {
    setIsOpen(false);
    setInputValue(selectedRoom?.name ?? '');
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setInputValue(selectedRoom?.name ?? '');
      inputRef.current?.blur();
    }
  }

  function handleResultClick(floorId, room) {
    onSearchSelect(floorId, room);
    setInputValue(room.name);
    setIsOpen(false);
  }

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

      <div
        className={`searchField ${isOpen ? 'isSearching' : ''}`}
        role="search"
        aria-label="Search destination"
      >
        <SearchIcon size={17} />
        <input
          ref={inputRef}
          value={inputValue}
          placeholder="Search rooms…"
          aria-label="Search destination"
          aria-autocomplete="list"
          aria-expanded={isOpen && results.length > 0}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {isOpen && results.length > 0 && (
          <ul
            className="searchDropdown"
            role="listbox"
            aria-label="Search results"
            onMouseDown={(e) => e.preventDefault()}
          >
            {results.map((room) => (
              <li
                key={`${room.floorId}-${room.id}`}
                role="option"
                className="searchResult"
                onClick={() => handleResultClick(room.floorId, room)}
              >
                <span className="searchResultName">{room.name}</span>
                <span className="searchResultFloor">{room.floorName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

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
