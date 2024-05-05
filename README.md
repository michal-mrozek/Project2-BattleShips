# Battleship Game Readme

## Introduction
Welcome to the Battleship game! This is a JavaScript implementation of the classic single-player game where player try to sink computer's ships by guessing their coordinates on a grid. The website is designed to be simple, informative, and user-friendly.

![Site view across devices](/assets/media/images-readme/responsiveness.png)
The website is live, can be found [Click](https://michal-mrozek.github.io/Project2-BattleShips/)

## User Story Battleship Challenge

**As a** game enthusiast,

**I want to** play Battleship against an AI opponent,

**So that** I can test my strategic skills and enjoy the game even when I'm alone.

**Acceptance Criteria:**

1. **Game Setup:**
   - As a player, I want to be able to start a single-player game easily so that I can begin playing without any hassle.
   - The game should automatically generate ship placements for both me and the AI opponent.
   - I should have a clear view of my own grid and the AI opponent's grid, but not their ship placements.

2. **Gameplay:**
   - As a player, I want to take turns guessing coordinates to attack the AI opponent's ships.
   - I should receive immediate feedback on whether my guess was a hit or a miss.
   - The AI opponent should take turns making guesses to attack my ships.
   - The game should continue until either all my ships or the AI opponent's ships are sunk.

3. **User Experience (UX):**
   - The game interface should be user-friendly and visually appealing.
   - Visual cues should clearly indicate hits, misses, and sunken ships on both grids.
   - Controls should be intuitive and responsive, allowing for easy interaction with the game.

## Features
- **Single-player mode:** Play against a computer.
- **Randomly generated ship placement:** Each game starts with the ships being randomly placed on the grid.
- **Turn-based gameplay:** Player takes turns guessing coordinates to attack the opponent's ships.
- **Visual feedback:** The grid updates to show hits, misses, and sunken ships.

## User Experience (UX)
- **Intuitive Interface:** The game features a clean and intuitive interface designed for ease of use.
- **Responsive Design:** The game adapts to different screen sizes, ensuring a consistent experience across devices.
   The Battleship game may not be designed for the smallest devices due to several reasons:

   1. Limited Screen Size: Smaller devices such as smartphones or small tablets have limited screen real estate. The Battleship game typically requires a grid-based interface, which may become cramped and difficult to navigate on smaller screens. Players may have difficulty accurately tapping or selecting grid coordinates, leading to a poor user experience.
   2. Complexity of Grids: Battleship games often feature grids with multiple rows and columns to represent the playing field. On smaller screens, displaying these grids with sufficient clarity and space for interaction can be challenging. Shrinking the grid to fit smaller screens may result in reduced visibility and difficulty distinguishing between grid cells.
   3. Touchscreen Controls: Many smaller devices rely on touchscreen controls for user interaction. While touchscreen controls are intuitive for certain types of games, they may not be well-suited for precise interactions required in Battleship, such as selecting individual grid coordinates or dragging ships into position. This can lead to frustration and inaccuracies during gameplay.
- **Clear Feedback:** Visual cues provide clear feedback on the game state, helping players understand their progress and next steps.
- **Accessible Controls:** Simple controls make it easy for players of all skill levels to enjoy the game without any barriers.

## Manual Testing

**Objective:**  
The objective of this manual testing is to ensure that all features of the Battleship game are working correctly and that the user experience is smooth and intuitive.

**Preconditions:**  
- The game is loaded in a web browser that supports JavaScript.
- The game interface is displayed correctly without any visual glitches.

### Test Cases

1. **Game Initialization:**
   - **Description:** Verify that the game starts correctly when the user opens the `index.html` file.
   - **Steps:**
     1. Open the `index.html` file in a web browser.
     2. Check that the game interface is displayed.
     3. Verify that the grids are ready to play.

2. **Ship Placement:**
   - **Description:** Ensure that ships are placed randomly on the grid without overlapping.
   - **Steps:**
     1. Start a new game.
     2. Inspect player's grid to confirm that ships are randomly distributed.
     3. Verify that no ships overlap with each other.

3. **Turn-Based Gameplay:**
   - **Description:** Confirm that player can take turn guessing coordinates to attack opponent's ships.
   - **Steps:**
     1. Start a new game.
     2. Player makes a guess by clicking on a coordinate on the opponent's grid.
     3. Verify that the result (hit or miss) is displayed on the grid.
     4. Weit and confirm the computer did his turn.

4. **Hit or Miss Feedback:**
   - **Description:** Ensure that players receive clear feedback on whether their guess was a hit or a miss.
   - **Steps:**
     1. Start a new game.
     2. Player makes a guess on an empty coordinate.
     3. Verify that the grid updates to display a miss or hit.

5. **Winning the Game:**
   - **Description:** Confirm that the game ends when one player sinks all opponent's ships.
   - **Steps:**
     1. Start a new game.
     2. Sink all opponent's ships by correctly guessing their coordinates.
     3. Verify that a victory message is displayed, indicating the winning player.

6. **Other types of testing**
   1. Checking if computer do not missing targets. Sum of shot and available targets should be always 100.
   ![Testing1](/assets/media/images-readme/testing2.png)
   2. Checking if model recognise correctly hits and miss.
   ![Testing1](/assets/media/images-readme/testing1.png)
    

## How to Play
1. **Setup:** Nothing, game is ready for you just from start!
2. **Taking Turns:** Player take turns presing the coordinates to "attack" the opponent's grid.
3. **Hit or Miss:** If the guess corresponds to a ship's location, it's a hit! Otherwise, it's a miss.
4. **Winning the Game:** The game continues until one player sinks all of the opponent's ships. The first player to sink all the opponent's ships wins.

## Getting Started
1. Clone the repository or download the ZIP file.
2. Open the `index.html` file in a web browser that supports JavaScript and enjoy the game.

## File Structure
- `index.html`: Main HTML file containing the game interface.
- `style.css`: CSS file for styling the game interface.
- `script.js`: JavaScript file containing the game logic and functionality.
- `README.md`: This file providing information about the game.

## Contributing
- If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request on GitHub.

## Credits
- This Battleship game was created by [Majkel].
- Inspired by the classic board game Battleship.

## License
- This project is licensed under the [MIT License].

## Contact
- For any inquiries or feedback, you can reach out to [m.mrozek@hotmail.com].

Enjoy playing Battleship! May the best strategist win! 🚢💥