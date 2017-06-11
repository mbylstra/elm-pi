mkdir -p build
cp src/main.js build
elm make src/App.elm --output build/elm.js
