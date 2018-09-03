FROM myapp-dep

WORKDIR /usr/src/app
COPY server.js .
COPY initdb.js .

EXPOSE 8080

CMD node server.js
