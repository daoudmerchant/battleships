# [Live Demo](https://daoudmerchant.github.io/battleships)

## Brief

To create a battleship game using gameboard, player and ship factories, tested with Jest.

I also tried to meet all of the 'extra' parameters:

- 2 player hot seating
- Drag and drop
- AI

While also setting myself:

- Multiple sized game boards
- Touch drag and drop (2 player hot seating far more likely on touch devices)

## Thoughts after completion

Well, I'm proud of having achieved everything I set out to do, even though I know there are more efficient ways of doing certain things. I implemented `useContext` for the first time, although didn't completely refactor the prop drilling as my application is only max 4 levels deep.

## Where's your commit history?

I deployed to gh-pages, tried to update, it refused (which apparently [happens](https://www.google.com/search?q=deploy+gh+pages+not+updating+stackoverflow+site:stackoverflow.com&sxsrf=AOaemvKgVgVx3NuUsC6nm0wghSt3oEWbRA:1631002949107&sa=X&ved=2ahUKEwivsaK7t-zyAhXbRPEDHacoCqwQrQIoBHoECAYQBQ&biw=1920&bih=976)), tried to force an update by deleting my gh-pages branch, somehow broke it so deploy worked perfectly in the terminal but never appeared on github.com, tried everything, had to give up. My original commit history shows 56 commits over approx. 3 weeks.

## Possible future improvements

### Click-and-drag HTML5 fallback

I made the decision early on for this to be a mobile experience, as the 'pick-up-and-play' simplicity and 2-player hot-seating were much more geared towards mobile play. As such, this uses the React DnD touch backend (entirely different to the HTML5 backend, which leverages the `drag` event missing from mobile browsers), and the [most popular hybrid backend](https://www.npmjs.com/package/react-dnd-html5-touch-backend) hasn't been updated in 5 years and is [missing documentation](https://react-dnd.github.io/react-dnd/docs-html5-backend.html). I appreciate that ideally this would work on both mobile and desktop.

### Improve drag and drop

When I understand drag and drop better, I'll try to have the input register correctly in respect to the edges of the dragged object rather than the cursor. This was beyond me this time!

### Show gameboards at end

I couldn't decide whether to render both boards very small or to allow alternation between both boards (swipe or toggle?), not knowing whether it would look good or even be necessary. For this reason, I just declare a winner for now.

### Render efficiency

I think I caused a problem by having my most important variable (`gameboard` in the `Gameboard` function) exposed only as a getter; as it's so crucial, I wanted it exposed in an immutable fashion, but as React can't actually enumerate the object, it wasn't rerendering objects passed `gameboard` as a prop. As such, I had to resort to key manipulation, which was less than ideal but seemed to be a [genuine answer](https://stackoverflow.com/questions/38892672/react-why-child-component-doesnt-update-when-prop-changes) to the problem. I'm sure there's much to be done to improve effifiency.

### Save game state

After each move I could save the game state to local memory, then have a `useEffect` on `App`'s first render checking if there's a saved game state, asking the user if they wish to continue and if so, setting state accordingly. However, this game intended for quick play, this feature wasn't considered essential.

### Improved visuals

I wanted this to be a very simple app; so many online versions are either ugly or lean heavily on military kitsch, so the idea of this was to be 'leap-in, leap-out, no-frills'. As such, I just used colour and nothing else.

### 'Hard' AI

The concept of the AI algorithm was to assess *any* board and find the next best move, but a human can outsmart it by keeping track of the sunk ships (if only a 3x3 ship remains, for example, there's no point trying squares in spaces which can only accommodate 2x2 ships). This could be added later.

### Sound?

I guess I could add some sound effects, with a sound toggle in the header, but again the key here was simplicity of experience.
