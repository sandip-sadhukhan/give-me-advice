import "./bootstrap.min.css";
import "./App.css";
import { Container, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import Header from "./components/header";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [adviceText, setadviceText] = useState("");
  const [currAdvice, setCurrAdvice] = useState(1);

  const OPERATIONS = { NEXT_QUESTION: 1, PREV_QUESTION: -1 };

  // show current advice text
  const fetchCurrentAdviceNo = async (currAdvice) => {
    setCurrAdvice(currAdvice);
    // Fetch data
    // console.log(`https://api.adviceslip.com/advice/${currAdvice}`)

    try {
      console.log(`https://api.adviceslip.com/advice/${currAdvice}`);
      let res = await fetch(`https://api.adviceslip.com/advice/${currAdvice}`);
      let data = await res.text();
      let json = JSON.parse(data + "}");
      let adviceData = json["slip"]["advice"];
      console.log(adviceData);
      setadviceText(adviceData);
    } catch (e) {
      console.log(e);
    }
  };

  const loadInit = async () => {
    if (localStorage.getItem("curr_advice")) {
      await fetchCurrentAdviceNo(parseInt(localStorage.getItem("curr_advice")));
    } else {
      await fetchCurrentAdviceNo(currAdvice);
    }
    setLoading(false);
  };

  // Use effect
  useEffect(() => {
    loadInit();
  }, []); // eslint-disable-line no-use-before-define

  const nextOrPrevAdvice = async (operation) => {
    setLoading(true);
    let newCurrAdvice = currAdvice;
    // Inc or dec the order
    if (operation === OPERATIONS.NEXT_QUESTION) {
      newCurrAdvice = currAdvice + 1;
    } else if (operation === OPERATIONS.PREV_QUESTION) {
      newCurrAdvice = currAdvice - 1;
    }
    // Save localstorage
    localStorage.setItem("curr_advice", parseInt(newCurrAdvice));
    await fetchCurrentAdviceNo(newCurrAdvice);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Container className="mb-3 mt-5">
        <Row>
          <Col md="6" sm="12" className="mx-auto">
            <Card className="border-secondary text-center">
              <Card.Header>
                <h5>Advice For You</h5>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <p className="lead text-dark my-3">{adviceText}</p>
                )}
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between">
                  {currAdvice !== 1 ? (
                    <Button
                      className="mx-2"
                      disabled={loading}
                      onClick={() => nextOrPrevAdvice(OPERATIONS.PREV_QUESTION)}
                    >
                      <i className="fa fa-arrow-left"></i>
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  {currAdvice !== 217 ? (
                    <Button
                      className="mx-2"
                      disabled={loading}
                      onClick={() => nextOrPrevAdvice(OPERATIONS.NEXT_QUESTION)}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </Button>
                  ) : null}
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <div component="footer" className="my-4">
          <p className="m-0 text-muted text-center small">
            Developed by Sandip Sadhukhan.
          </p>
        </div>
      </Container>
    </>
  );
}

export default App;
