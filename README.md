# Music Helper Frontend
Displays data pulled from the Music Helper API

## Running it locally
Pretty basic Vite-scaffolded Vue app. The first time you run it, do an `npm install`. From there, make sure your Music Helper API is running, and then do an `npm run dev` to get this thing fired up. Assuming you haven't changed any of the config, you can acces sit by going to `localhost:5173` or whatever your console tells you.

## Actually using the thing
Just pick a key, and a scale. The API will then return all of the notes in that scale, along with all of the Diatonic Chords for that scale. By default, it'll return every (relatively) common chord. If you turn off "Show Extensive Chords" it'll just return the Major and Minor Chords diatonic to your scale.

You can then use this information to help you with your songwriting and soloing.