import React, { useEffect, useState } from "react";
import "./components/Card.css";
import "./styles.css";

// const API_BASE_URL = "https://api.acmucsd.com/api/v2";

export default function App() {
  const [pastEvents, setPastEvents] = useState([]);
  const [searchText, setSearchText] = useState(""); // searchText = input in the search bar

  const data = async () => {
    const response = await fetch("https://api.acmucsd.com/api/v2/event/past");
    const data = await response.json();
    setPastEvents(data.events); // Call setPastEvents to change the state 'pastEvents'
    console.log(data);
  };

  // useEffect will run only after an initial render and then an update on data occurs
  // Function will only run when the arr changes
  useEffect(() => {
    data();
  }, []);

  return (
    <div className="app">
      <div className="search">
        <h1>ACM's Past Events</h1>
        <input
          type="text"
          placeholder="Search an event"
          onChange={(events) => {
            setSearchText(events.target.value);
          }}
        />
      </div>
      {pastEvents.length > 0 && (
        <ul>
          {/* Map through every data that's filtered */}
          {pastEvents
            .filter((events) => {
              if (searchText === "") {
                return events;
              } else if (
                events.title.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return events;
              }
            })
            .map((events) => (
              // Map through each event in the array and return/ display the elements inside the arr
              <div className="container">
                <div
                  className="card-content"
                  onClick={() => {
                    // Format url: replace %20 w/ "-"
                    // encodeURIComponent(): encodes a URI by replacing each instance of certain chars by escape seq
                    window.open(
                      `https://acmucsd.com/events/` +
                        encodeURIComponent(
                          events.title.toLowerCase().trim().replace(/ /g, "-")
                        ) +
                        "-" +
                        `${events.uuid}`
                    );
                  }}
                >
                  <div className="event-title">{events.title}</div>
                  <div className="event-location">
                    Location: {events.location}
                  </div>
                  <div className="wrapper">
                    {/* Wrapped event date and points to align text on the same line in flexbox*/}
                    <div className="event-date">
                      {/* Convert events.start date to a string w/ format of abbreviated month & numeric date */}
                      Date:{" "}
                      {new Date(events.start).toLocaleString("en-us", {
                        month: "short",
                        day: "numeric"
                      })}
                    </div>
                    <div className="event-points">
                      Points: {events.pointValue}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      )}
    </div>
  );
}
