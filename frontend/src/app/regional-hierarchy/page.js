"use client";
import React, { useState, useMemo } from "react";
import rawData from "./master_ner_hierarchy.json";

export default function CompleteRegionalExplorer() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const resetToStates = () => {
    setSelectedState(null);
    setSelectedDivision(null);
    setSelectedDistrict(null);
    setSelectedCircle(null);
    setSelectedVillage(null);
  };

  const handleLocateWard = (ward) => {
    const lat = ward.lat || 26.1445;
    const lon = ward.lon || 91.7362;
    const wardName = ward.name;
    const vilName = selectedVillage ? selectedVillage.name : "";
    const distName = selectedDistrict ? selectedDistrict.name : "";
    const stateName = selectedState ? selectedState.name : "";

    if (typeof window !== "undefined" && window.parent && window.parent.locateWardOnMap) {
      window.parent.locateWardOnMap(lat, lon, wardName, vilName, distName, stateName);
    } else if (typeof window !== "undefined") {
      window.location.href = `/?lat=${lat}&lon=${lon}&ward=${encodeURIComponent(wardName)}&village=${encodeURIComponent(vilName)}&dist=${encodeURIComponent(distName)}&state=${encodeURIComponent(stateName)}`;
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const results = [];
    const q = searchQuery.toLowerCase();

    rawData.states.forEach(st => {
      st.divisions.forEach(div => {
        if (div.name.toLowerCase().includes(q)) {
          results.push({
            type: "Division",
            name: div.name,
            path: `${st.name}`,
            action: () => {
              setSelectedState(st);
              setSelectedDivision(div);
              setSelectedDistrict(null);
              setSelectedCircle(null);
              setSelectedVillage(null);
              setSearchQuery("");
            }
          });
        }
        div.districts.forEach(dist => {
          if (dist.name.toLowerCase().includes(q)) {
            results.push({
              type: "District",
              name: dist.name,
              path: `${st.name} > ${div.name}`,
              action: () => {
                setSelectedState(st);
                setSelectedDivision(div);
                setSelectedDistrict(dist);
                setSelectedCircle(null);
                setSelectedVillage(null);
                setSearchQuery("");
              }
            });
          }
          dist.circles.forEach(cir => {
            if (cir.name.toLowerCase().includes(q)) {
              results.push({
                type: "Circle",
                name: cir.name,
                path: `${st.name} > ${dist.name} District`,
                action: () => {
                  setSelectedState(st);
                  setSelectedDivision(div);
                  setSelectedDistrict(dist);
                  setSelectedCircle(cir);
                  setSelectedVillage(null);
                  setSearchQuery("");
                }
              });
            }
            cir.villages.forEach(v => {
              if (v.name.toLowerCase().includes(q)) {
                results.push({
                  type: "Village",
                  name: v.name,
                  path: `${dist.name} > ${cir.name} Circle`,
                  action: () => {
                    setSelectedState(st);
                    setSelectedDivision(div);
                    setSelectedDistrict(dist);
                    setSelectedCircle(cir);
                    setSelectedVillage(v);
                    setSearchQuery("");
                  }
                });
              }
            });
          });
        });
      });
    });
    return results.slice(0, 15);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Top Navigation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>🏰</span> NER Regional Workspace Hierarchy Explorer
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Official 8 North Eastern States • Divisions • Districts • Circles • Villages • Micro Wards
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 transition whitespace-nowrap"
          >
            <span>🏠 Return to Main GIS Map</span>
          </a>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search State, District, Circle or Village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto">
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={res.action}
                    className="p-3 hover:bg-slate-800 border-b border-slate-800/50 text-xs cursor-pointer"
                  >
                    <div className="font-semibold text-cyan-400">
                      {res.name} <span className="text-slate-500">({res.type})</span>
                    </div>
                    <div className="text-slate-400 mt-0.5">{res.path}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Breadcrumbs Bar */}
      <div className="flex items-center flex-wrap gap-2 text-xs md:text-sm bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 mb-8 shadow-inner">
        <a href="/" className="font-extrabold text-blue-400 hover:underline flex items-center gap-1">
          🏠 Main GIS Map
        </a>
        <span className="text-slate-600">/</span>
        <button onClick={resetToStates} className="font-bold text-cyan-400 hover:underline">
          NER Region ({rawData.totalStates} States)
        </button>
        {selectedState && (
          <>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => {
                setSelectedDivision(null);
                setSelectedDistrict(null);
                setSelectedCircle(null);
                setSelectedVillage(null);
              }}
              className="font-bold text-cyan-400 hover:underline"
            >
              {selectedState.name}
            </button>
          </>
        )}
        {selectedDivision && (
          <>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => {
                setSelectedDistrict(null);
                setSelectedCircle(null);
                setSelectedVillage(null);
              }}
              className="text-cyan-400 hover:underline"
            >
              {selectedDivision.name}
            </button>
          </>
        )}
        {selectedDistrict && (
          <>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => {
                setSelectedCircle(null);
                setSelectedVillage(null);
              }}
              className="text-cyan-400 hover:underline"
            >
              {selectedDistrict.name} District
            </button>
          </>
        )}
        {selectedCircle && (
          <>
            <span className="text-slate-600">/</span>
            <button onClick={() => setSelectedVillage(null)} className="text-cyan-400 hover:underline">
              {selectedCircle.name} Circle
            </button>
          </>
        )}
        {selectedVillage && (
          <>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400 font-semibold">{selectedVillage.name} (Wards List)</span>
          </>
        )}
      </div>

      {/* LEVEL 1: 8 NER STATES VIEW */}
      {!selectedState && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🌐</span> Select North Eastern Region (NER) State
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rawData.states.map((st) => (
              <div
                key={st.id}
                onClick={() => setSelectedState(st)}
                className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl hover:border-cyan-500 cursor-pointer transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2.5 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-lg font-mono font-bold">
                      {st.code}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-medium">
                      Capital: {st.capital}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{st.name}</h3>
                  <div className="text-xs text-slate-400 mb-3">
                    {st.totalDivisions} Divisions • {st.totalDistricts} Districts
                  </div>
                  <div className="text-xs font-semibold text-amber-400/90 mb-4">{st.riskProfile}</div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-cyan-400 text-xs font-semibold flex items-center justify-between">
                  <span>Explore Divisions & Districts</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 2: DIVISIONS VIEW */}
      {selectedState && !selectedDivision && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📍</span> {selectedState.name}: Administrative Divisions
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Capital: {selectedState.capital} • {selectedState.riskProfile}</p>
            </div>
            <button
              onClick={() => setSelectedState(null)}
              className="text-xs px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-semibold transition"
            >
              ⬅ Back to All States
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedState.divisions.map((div) => (
              <div
                key={div.id}
                onClick={() => setSelectedDivision(div)}
                className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl hover:border-cyan-500 cursor-pointer transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2">Administrative Division</div>
                  <h3 className="text-xl font-bold text-white mb-2">{div.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{div.districts.length} Integrated Districts</p>
                  <div className="text-xs text-slate-500 line-clamp-2">
                    Includes: {div.districts.map(d => d.name).join(", ")}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-cyan-400 text-xs font-semibold flex items-center justify-between">
                  <span>Explore Districts & Circles</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 3: DISTRICTS VIEW */}
      {selectedDivision && !selectedDistrict && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedDivision.name}: Districts</h2>
              <p className="text-xs text-slate-400 mt-0.5">State: {selectedState.name}</p>
            </div>
            <button
              onClick={() => setSelectedDivision(null)}
              className="text-xs px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-semibold transition"
            >
              ⬅ Back to Divisions
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedDivision.districts.map((dist) => (
              <div
                key={dist.name}
                onClick={() => setSelectedDistrict(dist)}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500 cursor-pointer transition shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-emerald-400 mb-1">District</div>
                  <h3 className="text-lg font-bold text-white mb-2">{dist.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{dist.circles.length} Administrative Circles / Sub-Divisions</p>
                </div>
                <div className="text-xs text-emerald-400 font-semibold flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <span>View Circles & Towns</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 4: CIRCLES VIEW */}
      {selectedDistrict && !selectedCircle && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedDistrict.name} District: Circles / Sub-Divisions</h2>
              <p className="text-xs text-slate-400 mt-0.5">Division: {selectedDivision.name} • State: {selectedState.name}</p>
            </div>
            <button
              onClick={() => setSelectedDistrict(null)}
              className="text-xs px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-semibold transition"
            >
              ⬅ Back to Districts
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedDistrict.circles.map((cir) => (
              <div
                key={cir.name}
                onClick={() => setSelectedCircle(cir)}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 cursor-pointer transition shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-cyan-400 mb-1">Administrative Circle</div>
                  <h3 className="text-lg font-bold text-white mb-2">{cir.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{cir.villages.length} Registered Villages / Basti</p>
                </div>
                <div className="text-xs text-cyan-400 font-semibold flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <span>View Villages & Wards</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 5: VILLAGES VIEW */}
      {selectedCircle && !selectedVillage && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedCircle.name} Circle: Villages & Townships</h2>
              <p className="text-xs text-slate-400 mt-0.5">District: {selectedDistrict.name} • State: {selectedState.name}</p>
            </div>
            <button
              onClick={() => setSelectedCircle(null)}
              className="text-xs px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-semibold transition"
            >
              ⬅ Back to Circles
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedCircle.villages.map((vil) => (
              <div
                key={vil.id}
                onClick={() => setSelectedVillage(vil)}
                className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500 cursor-pointer transition shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-amber-400 mb-1">Revenue Village / Basti</div>
                  <h4 className="text-base font-bold text-white mb-1">{vil.name}</h4>
                  <div className="text-xs text-slate-400 mb-3">{vil.wards.length} Gram Wards Constituted</div>
                </div>
                <div className="text-xs text-amber-400 font-medium flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <span>Inspect Wards Breakdown</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 6: GRAM WARDS VIEW */}
      {selectedVillage && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Micro-Level Gram Wards</div>
              <h2 className="text-2xl font-black text-white">{selectedVillage.name}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Circle: {selectedCircle.name} • District: {selectedDistrict.name} • Division: {selectedDivision.name} • State: {selectedState.name}
              </p>
            </div>
            <button
              onClick={() => setSelectedVillage(null)}
              className="text-xs px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition"
            >
              ⬅ Back to Villages
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedVillage.wards.map((ward) => (
              <div
                key={ward.ward_no}
                onClick={() => handleLocateWard(ward)}
                className="p-4 bg-slate-950 border border-slate-800/80 hover:border-cyan-500 rounded-xl flex items-center justify-between transition cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-slate-800 text-cyan-400 rounded font-mono font-bold">
                      Ward {ward.ward_no}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ({ward.lat}, {ward.lon})
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white">{ward.name}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleLocateWard(ward); }}
                  className="px-3.5 py-1.5 bg-cyan-600/30 hover:bg-cyan-600 border border-cyan-500/50 text-cyan-300 hover:text-white text-xs rounded-lg transition inline-flex items-center gap-1 font-semibold whitespace-nowrap"
                >
                  📍 Locate Spot on Map
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
