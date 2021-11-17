# [Live Demo](https://daoudmerchant.github.io/battleships)

## Battleships

A Battleships game for mobile devices, with an AI opponent, two-player hot-seating, multiple grid sizes and all game mechanics unit tested.

Written in React (hook-based) using React Drag and Drop, styled with Styled Components, tested with Jest.

### Why doesn't this work on desktop?

I made the decision early on for this to be a mobile experience, as the 'pick-up-and-play' simplicity and 2-player hot-seating were much more geared towards mobile play. As such, this uses the React DnD **touch** backend (entirely different to the HTML5 backend which leverages the `drag` event missing from mobile browsers), and the [most popular hybrid backend](https://www.npmjs.com/package/react-dnd-html5-touch-backend) hasn't been updated in 5 years and is [missing documentation](https://react-dnd.github.io/react-dnd/docs-html5-backend.html).

### Functionality

- [x] AI opponent
- [x] Player vs player
- [x] Multiple grid sizes
- [x] Drag-and-drop ship placement
- [x] Visual feedback for validity of dragged ship position
- [x] Animations on state change
- [x] Jest unit testing

### Possible future improvement

- [ ] 'Hard' AI difficulty
  - I specifically wrote a 'pure' AI algorithm which assesses each board afresh; I could include a 'hard' AI which keeps count of which ship sizes were placed to avoid random turns on squares where the remaining ship(s) couldn't fit (i.e. trying one of two isolated blank squares when the remaining ship(s) are 3+ squares long).
- [ ] Drag-and-drop registering on dragged object edge rather than finger location
- [ ] Increase render efficiency
  - By exposing the all-important `gameboard` variable as a getter for increased immutability React was unable to enumerate the object to determine rerender necessity, obliging me to use [key manipulation](https://stackoverflow.com/questions/38892672/react-why-child-component-doesnt-update-when-prop-changes).
- [ ] Local storage of game state for pause / resume
- [ ] Improved visuals
- [ ] Sound(?)

### Concept

This challenge was set by the Odin Project, giving a main objective and various 'stretch goals'; as none of the student solutions implemented all of the stretch goals and not a single one included a drag-and-drop ship placement interface as suggested, I made the decision early on to include everything :).

I wanted this to be a relaxing game which I could return to on my phone for 2-5min sessions, hence including multiple board sizes. (Code is written so that the adjustment of one integer (`size`) can instantiate games of any size, 2x2 to 200x200, with only ship length and quantity logic needing adjustment (UX nightmare of a 200x200 grid on mobile notwithstanding)). Many Battleship games lean heavily stylistically on military chintz, so I attempted a soothing minimalist interface; this was also an opportunity to practise animated state changes fo a smoother experience.

### Challenges

- First implementation of the `useContext` hook
- Factory functions (inc. scoped variables)
- First project to use Styled Components
- React Drag and Drop and Touch Backend library documentation contained comparatively little hand-holding compared to more official projects
- Writing and passing Jest tests for all possible game mechanics

## Where's your commit history?

I deployed to gh-pages, tried to update, it refused (which apparently [happens](https://www.google.com/search?q=deploy+gh+pages+not+updating+stackoverflow+site:stackoverflow.com&sxsrf=AOaemvKgVgVx3NuUsC6nm0wghSt3oEWbRA:1631002949107&sa=X&ved=2ahUKEwivsaK7t-zyAhXbRPEDHacoCqwQrQIoBHoECAYQBQ&biw=1920&bih=976)), tried to force an update by deleting my gh-pages branch, somehow broke it so deploy worked perfectly in the terminal but the site never appeared on github.com, tried everything, had to give up. I'm sorry, I really tried! My original commit history shows 56 commits over approx. 3 weeks.

I really hope you find this version of Battleships unique and relaxing!
