import React from "react";

const About = () => {
  return (
    <div>
    <h1 className="text-center">Bibliophile World</h1>
    <div className="card card-body">
      <p className="card card-body mb-4 p-4">
      "Books are the treasured wealth of the world and the fit inheritance of generations and nations.” Henry David</p>
      <p className="card card-body mb-4 p-4">
        Bibliophile World is a simple web app built with React and the Google Books
        API that lets you search for your favourite books and displays information based on the
        results of the search. You can search using anything related to the book like name, author or content
      </p>
    </div>
    </div>
  );
};

export default About;