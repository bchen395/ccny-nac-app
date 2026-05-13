import { useMemo, useState } from 'react';
import AlertsPanel from './components/AlertsPanel.jsx';
import FloorSelector from './components/FloorSelector.jsx';
import Header from './components/Header.jsx';
import MapView from './components/MapView.jsx';
import { MapIcon } from './components/Icons.jsx';
import NavArrows from './components/NavArrows.jsx';
import RoomPanel from './components/RoomPanel.jsx';
import { alerts, floorIds, floors } from './data/floors.js';

export default function App() {
  const [currentFloorId, setCurrentFloorId] = useState(floorIds[0]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showFloorDropdown, setShowFloorDropdown] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const currentFloor = useMemo(
    () => floors.find((floor) => floor.id === currentFloorId) ?? floors[0],
    [currentFloorId],
  );

  function selectFloor(floorId) {
    setCurrentFloorId(floorId);
    setSelectedRoom(null);
    setShowFloorDropdown(false);
  }

  function moveFloor(direction) {
    const currentIndex = floorIds.indexOf(currentFloorId);
    const nextIndex = (currentIndex + direction + floorIds.length) % floorIds.length;
    selectFloor(floorIds[nextIndex]);
  }

  return (
    <div className="appViewport">
      <main className="tabletShell" aria-label="CCNY NAC navigation mockup">
        <Header
          selectedRoom={selectedRoom}
          showAlerts={showAlerts}
          onOpenAlerts={() => setShowAlerts(true)}
        />

        <section className="contentRow">
          <div className="mapStage">
            <MapView floor={currentFloor} selectedRoom={selectedRoom} />
            <NavArrows onPrevious={() => moveFloor(-1)} onNext={() => moveFloor(1)} />
            {showAlerts ? <AlertsPanel alerts={alerts} onClose={() => setShowAlerts(false)} /> : null}
          </div>

          <RoomPanel
            floor={currentFloor}
            selectedRoom={selectedRoom}
            onSelectRoom={(room) => {
              setSelectedRoom(room);
              setShowFloorDropdown(false);
            }}
          />
        </section>

        <footer className="appFooter">
          <FloorSelector
            floors={floors}
            currentFloorId={currentFloorId}
            showDropdown={showFloorDropdown}
            onToggle={() => setShowFloorDropdown((isOpen) => !isOpen)}
            onSelect={selectFloor}
          />

          <button className="mapBadge" type="button" aria-label="Map view">
            <MapIcon size={26} />
          </button>
        </footer>
      </main>
    </div>
  );
}
