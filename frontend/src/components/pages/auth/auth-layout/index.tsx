import React, { useState, useEffect } from "react";
import logo from "../../../../images/treeckle-title-bottom-transparent.png";
import { Grid, Image, Segment, Transition } from "semantic-ui-react";
import "./index.scss";

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Grid
      className="auth-layout-container"
      columns="1"
      textAlign="center"
      verticalAlign="middle"
    >
      <Grid.Column className="auth-layout-segment-container">
        <Transition
          onHide={() => console.log("hello")}
          visible={isVisible}
          animation="scale"
        >
          <Segment className="auth-layout-segment" placeholder raised>
            <Grid columns="2" relaxed stackable verticalAlign="middle">
              <Grid.Column>{children}</Grid.Column>
              <Grid.Column className="auth-layout-image-container">
                <Image
                  className="auth-layout-image"
                  src={logo}
                  alt="Treeckle"
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Transition>
      </Grid.Column>
    </Grid>
  );
}

export default AuthLayout;
