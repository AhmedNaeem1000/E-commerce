import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FaMapMarkerAlt, FaSearch, FaCheckCircle, FaRedo } from "react-icons/fa";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: async (e) => {
      setPosition(e.latlng);
      // Reverse geocoding
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
        const data = await res.json();
        onSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          address: data.display_name || null,
        });
      } catch {
        onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function LocationPicker({ onLocationSelect }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // البحث عن مدينة أو عنوان باستخدام Nominatim
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!search) return;
    setLoading(true);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
    );
    const data = await res.json();
    setLoading(false);
    if (data && data.length > 0) {
      const loc = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        address: data[0].display_name,
      };
      setSearchResult({ lat: loc.lat, lng: loc.lng });
      setSelectedLocation(loc);
      setConfirmed(false);
      onLocationSelect && onLocationSelect(loc);
    }
  };

  // عند اختيار الموقع من الخريطة
  const handleMapSelect = (loc) => {
    setSelectedLocation(loc);
    setSearchResult({ lat: loc.lat, lng: loc.lng });
    setConfirmed(false);
    onLocationSelect && onLocationSelect(loc);
  };

  // إعادة اختيار الموقع
  const handleReset = () => {
    setSelectedLocation(null);
    setSearchResult(null);
    setConfirmed(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
        <div className={`flex items-center rounded-lg border transition-colors w-full ${inputFocused ? 'border-primary ring-2 ring-primary' : 'border-gray-300 dark:border-gray-600'}`}
          style={{ background: 'inherit' }}>
          <FaSearch className="mx-3 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="ابحث عن مدينة أو عنوان"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            className="w-full bg-transparent outline-none py-2 px-1 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <button type="submit" disabled={loading} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-white font-bold shadow hover:bg-primary-dark transition disabled:opacity-60">
          <FaSearch />
          {loading ? 'جاري البحث...' : 'بحث'}
        </button>
      </form>
      <div className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
        <FaMapMarkerAlt className="text-primary" />
        اختر موقعك على الخريطة أو ابحث عن مدينة/عنوان، ثم اضغط "تأكيد الموقع والمتابعة".
      </div>
      <div className="rounded-2xl overflow-hidden shadow-lg mb-6 border border-gray-200 dark:border-gray-700">
        <MapContainer
          center={searchResult || [30, 30]}
          zoom={searchResult ? 10 : 2}
          style={{ height: "420px", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onSelect={handleMapSelect} />
          {searchResult && (
            <Marker position={searchResult}></Marker>
          )}
        </MapContainer>
      </div>
      {/* ملخص الموقع المختار */}
      {selectedLocation && (
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl p-4 mb-4 shadow">
          <FaMapMarkerAlt className="text-green-600 dark:text-green-400 text-2xl" />
          <div className="flex-1">
            <div className="font-bold text-green-800 dark:text-green-200">تم اختيار الموقع:</div>
            <div className="text-green-700 dark:text-green-100 text-sm mt-1">
              {selectedLocation.address
                ? selectedLocation.address
                : `الإحداثيات: ${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}`}
            </div>
          </div>
          <button onClick={handleReset} className="ml-2 text-gray-400 hover:text-primary transition" title="إعادة اختيار الموقع">
            <FaRedo />
          </button>
        </div>
      )}
      {/* زر تأكيد الموقع */}
      {selectedLocation && !confirmed && (
        <button
          onClick={() => setConfirmed(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold shadow hover:bg-primary-dark transition mb-4 w-full justify-center text-lg"
        >
          <FaCheckCircle className="text-white text-xl" />
          تأكيد الموقع والمتابعة
        </button>
      )}
      {/* رسالة تأكيد نهائية */}
      {confirmed && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-lg mb-4 justify-center">
          <FaCheckCircle />
          تم تأكيد الموقع بنجاح! يمكنك المتابعة.
        </div>
      )}
    </div>
  );
} 