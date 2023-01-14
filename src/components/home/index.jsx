import React, { useEffect } from "react";
import LandingSection from "./landing";
import DonateSection from "./donatesection";
import { getUsers } from "../../services/user";

const HomeComponent = () => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <LandingSection />
      {/* <DonateSection /> */}
    </div>
  );
};

export default HomeComponent;
