import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useState } from 'react';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/pt-br';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);
const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function YearMonthForm({ date, localeUtils, onChange, handleOnBlur }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select
        style={{ color: 'withe', backgroundColor: '#181B23' }}
        name="month"
        onChange={handleChange}
        onBlur={handleOnBlur}
        value={date.getMonth()}
      >
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        style={{ color: 'withe', backgroundColor: '#181B23' }}
        name="year"
        onChange={handleChange}
        onBlur={handleOnBlur}
        value={date.getFullYear()}
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

export function DatePicker(props) {
  const [month, setMonth] = useState(new Date());
  const [day, setDay] = useState(null);
  function setDaySelect(dayParam) {
    setDay(dayParam);
  }
  return (
    <div className="YearNavigation">
      <DayPicker
        month={month}
        fromMonth={fromMonth}
        toMonth={toMonth}
        selectedDays={day}
        onDayClick={value => setDaySelect(value)}
        localeUtils={MomentLocaleUtils}
        locale="pt-br"
        months={MONTHS}
        weekdaysShort={WEEKDAYS_SHORT}
        captionElement={({ date, localeUtils }) => (
          <YearMonthForm
            date={date}
            localeUtils={localeUtils}
            onChange={value => setMonth(value)}
            handleOnBlur={() => {}}
          />
        )}
      />
    </div>
  );
}
