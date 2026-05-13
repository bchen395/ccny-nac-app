import {
  BellIcon,
  CogIcon,
  MenuIcon,
  SearchIcon,
} from './Icons.jsx';

export default function Header({ selectedRoom, showAlerts, onOpenAlerts }) {
  return (
    <header className="appHeader">
      <label className="searchField" aria-label="Search destination">
        <SearchIcon size={22} />
        <input
          readOnly
          value={selectedRoom?.name ?? ''}
          placeholder="Search..."
          aria-label="Selected destination"
        />
      </label>

      <div className="headerActions">
        <button className="iconButton" type="button" aria-label="Settings">
          <CogIcon />
        </button>
        <button className="iconButton" type="button" aria-label="Menu">
          <MenuIcon />
        </button>
        <button
          className={`iconButton alertButton ${showAlerts ? 'isActive' : ''}`}
          type="button"
          aria-label="Open building alerts"
          aria-pressed={showAlerts}
          onClick={onOpenAlerts}
        >
          <BellIcon />
          <span className="alertDot" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
