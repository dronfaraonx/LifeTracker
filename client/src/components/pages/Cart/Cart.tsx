import React from 'react'

export default function Cart() {
  return (
     <div style={{ flex: 1, padding: '20px' }}>
        <h2>Список растений:</h2>
        <div className="plant-list">
          {filteredPlants.length === 0 ? (
            <p>Нет доступных растений.</p>
          ) : (
            filteredPlants.map((plant) => (
              <div key={plant.id}>
                <PlantCard plant={plant} />
              </div>
            ))
          )}
        </div>
      </div>
  )
}
