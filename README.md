## Eight Tile Game

#### Description:

A web application based on sliding tile games, built using JavaScript, React, and CSS. Utilizes Jest and Enzyme for unit testing.

Implementation of automatic deployment to AWS Elastic Beanstalk. Travis CI used for continuous integration.

#### How to Play:

Simply click on the tiles to move them around. Only tiles adjacent to the blank space may move. A tile will be considered complete when all the numbers are in order, left to right, up and down, with the blank space at the bottom left corner.

Three buttons are available at the bottom: restart, reshuffle, next.
	<br />- Restart: Wanna start over? Completely restart from the smallest size puzzle and bring the completed puzzle count back to zero.
	<br />- Reshuffle: Having trouble or completed the current puzzle? Reshuffle for a new one and keep going!
	<br />- Next: Completed the puzzle but want a little more challenge? Increase the size of the puzzle and increase the difficulty!

#### Project Status:

This project is complete. Additional minor tweaks to CSS and JavaScript may be added in the future. A demo link will be available on GitHub if currently live.

#### Reflection

This was a personal project created when I was learning React. The project goals were teach myself new skills, creating the project using Docker, writing tests for development, setting up continuous integration, and implementing automatic deployment to a web service.

I started by using `create-react-app` as the base, then switching from JS to JSX. I had already written some of the JavaScript and CSS for a tile game, converting it for this version of the project. I performed testing using Jest and Enzyme to ensure the components and functions worked as intended.

Overall, this project was a good exercise to help me learn new technologies.

The technologies used in this project are Docker, React, Jest, Enzyme, Travis CI, AWS Elastic Beanstalk, as well as JSX and CSS.
