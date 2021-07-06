# Übersicht

Diese Repository bildet das Frontend des Recommender Projektes aus WIDS-18B. 

# Codestruktur

Die relvanten Dateien dieser React App sind einerseits [index.js](/src/index.js) und [style.css](/src/style.css). Bei der Entwicklung des React-Frontends wurde auf die Unterteilung in einzelnen Componenten-Dateien verzichtet, da ein Rahmen von 500 Zeilen Code nicht überschritten wurde und die index.js übersichtlich blieb.

# Deployment 

Die Branch Master dient als Deployment für Heroku. Sie kann auch als Lokales Deployment verwendet werden.

Für das Deployment auf Heroku bitte diesem [Tutorial](https://github.com/nhutphuongit/create-react-app-buildpack#quick-start) folgen.

Für das lokale Deployment muss folgendes ausgeführt werden:

```
git clone https://github.com/StephanPythonGod/recommender-frontend.git
npm install
npm start
```

Jetzt sollte sich das Frontend im Default Browser öffnen.
