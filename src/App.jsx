import { useMemo, useState } from 'react';
import AlertsPanel from './components/AlertsPanel.jsx';
import Header from './components/Header.jsx';
import { MapPinIcon } from './components/Icons.jsx';
import MapView from './components/MapView.jsx';
import NavArrows from './components/NavArrows.jsx';
import RoomPanel from './components/RoomPanel.jsx';
import { alerts, floorIds, floors } from './data/floors.js';

export default function App() {
  const [currentFloorId, setCurrentFloorId] = useState(floorIds[0]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showFloorDropdown, setShowFloorDropdown] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [favoriteRoomIds, setFavoriteRoomIds] = useState(() => new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

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

  function toggleFavorite(roomId) {
    setFavoriteRoomIds((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);

      if (nextFavorites.has(roomId)) {
        nextFavorites.delete(roomId);
      } else {
        nextFavorites.add(roomId);
      }

      return nextFavorites;
    });
  }

  return (
    <div className="appViewport">
      <main className="tabletShell" aria-label="CCNY NAC navigation mockup">
        <section className="contentRow">
          <div className="mapShell">
            <Header
              floors={floors}
              currentFloorId={currentFloorId}
              selectedRoom={selectedRoom}
              showFloorDropdown={showFloorDropdown}
              showAlerts={showAlerts}
              showFavoritesOnly={showFavoritesOnly}
              onToggleFloors={() => {
                setShowFloorDropdown((isOpen) => !isOpen);
                setShowAlerts(false);
              }}
              onSelectFloor={selectFloor}
              onToggleAlerts={() => {
                setShowAlerts((isOpen) => !isOpen);
                setShowFloorDropdown(false);
              }}
              onToggleFavoritesOnly={() => setShowFavoritesOnly((isShowing) => !isShowing)}
            />

            <div className="mapStage">
              <MapView floor={currentFloor} selectedRoom={selectedRoom} />
              <NavArrows onPrevious={() => moveFloor(-1)} onNext={() => moveFloor(1)} />
              {showAlerts ? <AlertsPanel alerts={alerts} onClose={() => setShowAlerts(false)} /> : null}
            </div>

            <footer className="appFooter" aria-label="Current floor">
              <div className="floorStatus">
                <span className="floorIcon" aria-hidden="true">
                  <MapPinIcon size={18} />
                </span>
                <span>{currentFloor.name}</span>
              </div>
            </footer>
          </div>

          <RoomPanel
            floor={currentFloor}
            favoriteRoomIds={favoriteRoomIds}
            selectedRoom={selectedRoom}
            showFavoritesOnly={showFavoritesOnly}
            onSelectRoom={(room) => {
              setSelectedRoom(room);
              setShowFloorDropdown(false);
            }}
            onToggleFavorite={toggleFavorite}
          />
        </section>
      </main>
    </div>
  );
}
