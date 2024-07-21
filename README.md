# fullStackOpen

0.4: Nuevo diagrama de nota
```mermaid

sequenceDiagram

participant browser
participant user
participant input
participant button
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

activate server
server-->>browser: HTML document
deactivate server

user->>input: Add the new value
user->>button: Click in the save button

activate button
button-->>browser: Use the submit action to send the new input to the server
deactivate button

browser->>server: Send the new value in json format

server->>browser: Give the order to reload the page

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

activate server
server-->>browser: HTML document with the new value
deactivate server

```

0.5: Diagrama de aplicación de una sola página
```mermaid

sequenceDiagram

participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa

activate server
server-->>browser: HTML document with all the javascript listener
deactivate server

```


0.6: Nueva nota en diagrama de aplicación de una sola pagina
```mermaid

sequenceDiagram

participant browser
participant user
participant input
participant button
participant event handler(javaScript)
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa

activate server
server-->>browser: HTML document with all the javascript listener
deactivate server

user->>input: Add the new value
user->>button: Click in the save button
button->>event handler(javaScript): Active the event
event handler(javaScript)->>server: Send the new value

activate server
server-->>event handler(javaScript): reponse OK
deactivate server

event handler(javaScript)->>browser: Update the list with the new value

```

