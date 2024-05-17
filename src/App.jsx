import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [valueUpdated, setValueUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (value != "" && valueUpdated == true) {
      setLoading(true);
      let res = await fetch(
        `https://jsonmock.hackerrank.com/api/stocks?date=${value}`
      );
      let resJson = await res.json();

      if (resJson.data[0] == undefined) {
        resJson.data[0] = [];
      }

      setData(resJson.data[0]);
      setValueUpdated(false);
      setLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <div className="searchSection">
        <input
          type="text"
          onChange={(e) => {
            setValueUpdated(true);
            setValue(e.target.value);
          }}
          placeholder="5-January-2000"
          onKeyDown={(k) => {
            if (k.key == "Enter") fetchData();
          }}
          data-testid="app-input"
        />
        <button onClick={() => fetchData()} data-testid="submit-button">
          Search
        </button>
      </div>
      <div className="dataSection">
        {loading == true ? (
          <div>Loading..</div>
        ) : data == null ? (
          <div></div>
        ) : (
          <div>
            {data.length == 0 ? (
              <div data-testid="no-result">No Results Found</div>
            ) : (
              <div>
                <ul data-testid="stock-data">
                  <li>Open: {data.open}</li>
                  <li>Close: {data.close}</li>
                  <li>High: {data.high}</li>
                  <li>Low: {data.low}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
