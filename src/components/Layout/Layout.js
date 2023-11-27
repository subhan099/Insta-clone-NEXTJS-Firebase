import React from "react";
import Navigation from "../Navigation_bar/navigation";
import StoriesBar from "../StoriesBar/storiesBar";
import Suggestions from "../Suggestions/suggestions";

export default function Layout({ children }) {
  return (
    <div className="page-distribution">
      <div className="navigation-side">
        <Navigation />
      </div>
      <div className="content-side">
        <div className="stories_section">
          <div>
            <StoriesBar />
          </div>
        </div>
        <div className="upper-to-posts">{children}</div>
      </div>
      <div style={{ width: "700px" }}>
        <div className="third-portion">
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
