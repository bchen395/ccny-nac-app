import { AlertIcon, ChevronRightIcon, CloseIcon } from './Icons.jsx';

export default function AlertsPanel({ alerts, onClose }) {
  return (
    <aside className="alertsPanel" aria-label="Building alerts">
      <div className="alertsHeader">
        <h2>Alerts</h2>
        <button className="iconButton closeButton" type="button" aria-label="Close alerts" onClick={onClose}>
          <CloseIcon size={20} />
        </button>
      </div>

      <div className="alertsList">
        {alerts.map((alert) => (
          <button className="alertRow" key={alert} type="button">
            <AlertIcon size={20} />
            <span>{alert}</span>
            <ChevronRightIcon size={20} />
          </button>
        ))}
      </div>
    </aside>
  );
}
