import React from 'react';
import './PropertyCalendar.css';

const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

const PropertyCalendar = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Simple deterministic "busy" pattern for demo purposes (no random)
  const isBusy = (year, month, day) => {
    return (day + month * 3 + year) % 7 < 2;
  };

  const renderMonth = (monthOffset) => {
    const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Monday-first weekday of first day
    let startDay = d.getDay(); // 0=Sun
    startDay = startDay === 0 ? 6 : startDay - 1; // convert to Mon=0

    const cells = [];
    // empty cells before first day
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`e${i}`} className="pc-cell pc-empty" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const isPast = cellDate < today;
      const isToday = cellDate.getTime() === today.getTime();
      const reserved = !isPast && isBusy(year, month, day);

      let cls = 'pc-cell';
      if (isPast) cls += ' pc-past';
      else if (reserved) cls += ' pc-reserved';
      else cls += ' pc-available';
      if (isToday) cls += ' pc-today';

      cells.push(
        <div key={day} className={cls}>
          {day}
        </div>
      );
    }

    return (
      <div className="pc-month" key={`${year}-${month}`}>
        <div className="pc-month-header">
          <span>{MONTH_NAMES[month]}, {year}</span>
        </div>
        <div className="pc-weekdays">
          {['LU','MA','MI','JU','VI','SA','DO'].map(d => (
            <div key={d} className="pc-weekday">{d}</div>
          ))}
        </div>
        <div className="pc-grid">{cells}</div>
      </div>
    );
  };

  return (
    <div className="pc-wrapper">
      <h2 className="pd-section-title">Disponibilidad de la Propiedad</h2>
      <div className="pc-months-row">
        {renderMonth(0)}
        {renderMonth(1)}
      </div>
      <div className="pc-legend">
        <div className="pc-legend-item">
          <span className="pc-legend-dot pc-available"></span>
          <span>Disponible</span>
        </div>
        <div className="pc-legend-item">
          <span className="pc-legend-dot pc-reserved"></span>
          <span>Reservado</span>
        </div>
        <div className="pc-legend-item">
          <span className="pc-legend-dot pc-past"></span>
          <span>Pasado</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCalendar;
