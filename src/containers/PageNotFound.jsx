// Third party
import React from "react";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router";
// Custom
import { AlignCenter } from "../components/general";

const PageNotFound = () => <Redirect to="/" />;

export default withTranslation("common")(PageNotFound);
