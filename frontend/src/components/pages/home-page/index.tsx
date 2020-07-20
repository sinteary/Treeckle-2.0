import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Responsive,
  Container,
  Button,
  Transition,
  Grid,
  Icon,
  Segment,
  Divider,
} from "semantic-ui-react";
import "./index.scss";
import { LOGIN_PATH } from "../../../utils/route-path-constants";

function HomePage() {
  const history = useHistory();
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    console.log(window.pageYOffset, showScroll);
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll, setShowScroll]);

  const scrollToTop = (behavior: "auto" | "smooth") =>
    window.scrollTo({ top: 0, left: 0, behavior });

  useEffect(() => scrollToTop("auto"), []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  return (
    <div className="home-page">
      <div className="home-banner">
        <Transition animation="scale" transitionOnMount>
          <div className="header-container">
            <picture className="image-container">
              <source
                src={require("../../../assets/treeckle-outline-min.webp")}
                type="image/webp"
              />
              <img
                className="image"
                alt="Treeckle"
                src={require("../../../assets/treeckle-outline-min.png")}
              />
            </picture>
            <h1 className="main-title">TREECKLE</h1>
            <p className="subtitle">Residential life. Simplified.</p>
            <Button
              onClick={() => history.push(LOGIN_PATH)}
              className="sign-in-button"
              content="Sign In"
            />
          </div>
        </Transition>
        <Responsive
          className="home-video-container"
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src={require("../../../assets/utown-video.mp4")}
          />
        </Responsive>
      </div>

      <Segment className="home-highlights" vertical>
        <Container>
          <h1 className="title">
            THE INTEGRATED PLATFORM THAT SERVES YOUR NEEDS
          </h1>
          <Grid columns="3" centered stackable relaxed padded="vertically">
            <Grid.Column textAlign="center">
              <Icon className="icon" name="home" />
              <h3>FACILITIES BOOKING</h3>
              <p>
                Redefined by Treeckle, booking facilities and approvals can now
                be done seamlessly
              </p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Icon className="icon" name="calendar alternate outline" />
              <h3>COLLEGE EVENTS</h3>
              <p>
                Digitized events are easier than ever to find, and simplifies
                creation for event organisers
              </p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Icon className="icon" name="plus" />
              <h3>THE SKY'S THE LIMIT</h3>
              <p>You get to decide what we build next</p>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>

      <Segment className="home-mission" vertical>
        <Container className="mission">
          <h1>MISSION</h1>
          <p>
            At Treeckle, we believe in creating scalable digital experiences to
            enhance the Residential College experience at NUS.
          </p>
        </Container>
      </Segment>

      <Segment vertical>
        <Container>
          <div className="title">
            <h1>VISION</h1>
            <p>
              To empower each and every resident with technology to be able to
              achieve their goals with greater efficiency.
            </p>
          </div>

          <Grid columns="3" centered stackable relaxed padded="vertically">
            <Grid.Column textAlign="center">
              <h1>2000+</h1>
              <p>Room bookings facilitated at CAPT</p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <h1>User-Specific</h1>
              <p>Events recommendation system</p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <h1>Deployable</h1>
              <p>across all five Residential Colleges</p>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>

      <Segment inverted vertical className="home-footer">
        <Container>
          <Grid columns="2" centered stackable padded="vertically">
            <Grid.Column textAlign="center">
              <h2>ABOUT TREECKLE</h2>
              <p>
                Treeckle is the product of a CS3216 final project, built with
                the aim of making a difference through a web application.
              </p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <h2>CONTACT US</h2>
              <p>
                <a href="mailto:jeremytan97@u.nus.edu">
                  <Icon name="mail" /> Email
                </a>
              </p>
            </Grid.Column>
          </Grid>
          <Divider section />
          <p>© Treeckle 2020</p>
        </Container>
      </Segment>

      <Transition visible={showScroll} animation="scale" duration="300">
        <Button
          className="scroll-to-top-button"
          color="teal"
          onClick={() => scrollToTop("smooth")}
          icon="arrow up"
          circular
          size="massive"
        />
      </Transition>
    </div>
  );
}

export default HomePage;
