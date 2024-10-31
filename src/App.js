import React from 'react';
import './App.css';
import Circle from './Circle';

export default function App() {
  const [showTime, setShowTime] = React.useState(3); 
  const [nextTime, setNextTime] = React.useState(3); 
  const [started, setStarted] = React.useState(false);
  const [randomVal, setRandomVal] = React.useState(null); 
  const [isShowTime, setIsShowTime] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(showTime);
  const [overallTimer, setOverallTimer] = React.useState(0);

  function toggleStarted() {
    setStarted((prev) => !prev);
    if (!started) {
      if (showTime <= 0 || nextTime <= 0) {
        window.alert("Times cannot be set to 0 or less. Setting to 1" );
        setShowTime(1);
        setNextTime(1);
        setCurrentTime(1);
      } else {
        setCurrentTime(showTime);
      }
      setIsShowTime(true);
      setRandomVal(Math.floor(Math.random() * 3));
      setOverallTimer(0);
    } else {
      setRandomVal(null);
      setCurrentTime(showTime);
    }
  }

  React.useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setOverallTimer((prev) => prev + 1);
        setCurrentTime((prevTime) => {
          if (prevTime === 1) {
            if (isShowTime) {
              setIsShowTime(false);
              setCurrentTime(nextTime);
              setRandomVal(null);
            } else {
              setIsShowTime(true);
              setCurrentTime(showTime);
              setRandomVal(Math.floor(Math.random() * 3));
            }
          }
          
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started, isShowTime, showTime, nextTime]);

  function onInputChange(e) {
    if (e.target.name === 'show-time') {
      setShowTime(Number(e.target.value));
    } else if (e.target.name === 'next-time') {
      setNextTime(Number(e.target.value));
    }
  }

  return (
    <div>
      <div className='container top-timer'>
        <h1>{started ? (isShowTime ? 'Showing ' : 'Next in ') + currentTime + 's': 'Be Ready!'}</h1>
      </div>
      <div className='circle-container'>
        <Circle color={randomVal === 0 ? 'green-circle' : 'red-circle'} />
        <Circle color={randomVal === 1 ? 'green-circle' : 'red-circle'} />
        <Circle color={randomVal === 2 ? 'green-circle' : 'red-circle'} />
      </div>
      <div className='inputs-container'>
        <table>
          <tbody>
            <tr>
              <td className='input-title'>Show Time</td>
              <td>
                <input
                  className={(started ? 'disabled-inputs ' : '') + 'inputs'}
                  type='number'
                  name='show-time'
                  onChange={onInputChange}
                  value={showTime}
                  min={1}
                  disabled={started}
                />
              </td>
            </tr>
            <tr>
              <td className='input-title'>Next Time</td>
              <td>
                <input
                  className={(started ? 'disabled-inputs ' : '') + 'inputs'}
                  type='number'
                  name='next-time'
                  onChange={onInputChange}
                  value={nextTime}
                  min={1}
                  disabled={started}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='btns-container'>
        <button
          className={started ? 'disabled-btn' : 'start-btn btns'}
          onClick={!started ? toggleStarted : null}
        >
          Start
        </button>
        <button
          className={started ? 'stop-btn btns' : 'disabled-btn'}
          onClick={started ? toggleStarted : null}
        >
          Stop
        </button>
      </div>
      <div className='container bottom-timer'>
        <h1>{overallTimer}s</h1>
      </div>
    </div>
  );
}
