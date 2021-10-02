import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudShowersHeavy,
  faTint,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Card, ListGroup, Container, Row, Col, Toast } from "react-bootstrap";
import { Button } from "semantic-ui-react";
const axios = require("axios");
const moment = require("moment");

function Weather() {
  const [weatherState, setWeather] = useState({});
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const config = {
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}&units=metric&appid=${apiKey}`,
        headers: {},
      };
      axios(config)
        .then(function (response) {
          setWeather(response.data);
        })
        .catch(function (error) {
          console.log(error)
        });
    });
  }, []);
  return (
    <div>
      <Card
        bg={"primary"}
        style={{
          width: "18rem",
          minWidth: "35rem",
          minHeight: "18rem",
          maxHeight: "18rem",
        }}
      >
        <Card.Header>
          Previsão em {weatherState?.name || "??"}{" "}
          <Button
            className="button"
            inverted
            color="black"
            circular
            icon="refresh"
            onClick={() => {
              window.location.reload();
            }}
          />{" "}
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item action>
            <Container>
              <Row>
                <Col>
                  {<FontAwesomeIcon icon={faCloud} />}{" "}
                  {weatherState?.main?.temp || "??"} °C
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item action>
            <Container>
              <Row>
                <Col>
                  {
                    <FontAwesomeIcon
                      icon={
                        weatherState?.weather &&
                        weatherState?.weather[0].main == "Rain"
                          ? faCloudShowersHeavy
                          : faSun
                      }
                    />
                  }{" "}
                  {weatherState?.weather &&
                  weatherState?.weather[0].main == "Rain"
                    ? " Chuva"
                    : " Sol"}
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item action>
            <Container>
              <Row>
                <Col>
                  {<FontAwesomeIcon icon={faTint} />}{" "}
                  {weatherState?.main?.humidity || "??"} %
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default Weather;
