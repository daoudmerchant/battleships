# Live demo

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

## Were time infinite

### Improve drag and drop

When I understand drag and drop better, I'll try to have the input register correctly in respect to the edges of the dragged object rather than the cursor. This was beyond me this time!

### Show gameboards at end

I couldn't decide whether to render both boards very small or to allow alternation between both boards (swipe or toggle?), not knowing whether it would look good or even be necessary. For this reason, I just declare a winner for now.

### Render efficiency

I think I caused a problem by having my most important variable (`gameboard` in the `Gameboard` function) exposed only as a getter; as it's so crucial, I wanted it exposed in an immutable fashion, but as React can't actually enumerate the object, it wasn't rerendering objects passed `gameboard` as a prop. As such, I had to resort to key manipulation, which was less than ideal but seemed to be a [genuine answer](https://stackoverflow.com/questions/38892672/react-why-child-component-doesnt-update-when-prop-changes), so there you go. I'm sure there's some unnecessary rerendering going on.

### Click and drag HTML5 fallback

For now this isn't playable on computers, but I really wanted touch drag-and-drop and knew this would get much more play on a mobile than a desktop so didn't consider it worth the trouble. However, this could be added with more work.

### Save game state

After each move I could save the game state to local memory, then have a `useEffect` on `App`'s first render checking if there's a saved game state, asking the user if they wish to continue and if so, setting state accordingly.

### Improved visuals

I wanted this to be a very simple app; so many online versions are either ugly or lean heavily on military kitsch, so the idea of this was to be 'leap-in, leap-out, no-frills'. As such, I just used colour and nothing else.

### Sound?

I guess I could add some sound effects, with a sound toggle in the header, but again the key here was simplicity of experience.
