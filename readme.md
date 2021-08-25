## Tuto de base avec node JS

Installation NodeJS :

https://github.com/nodesource/distributions/blob/master/README.md

https://pub.phyks.me/sdz/sdz/des-applications-ultra-rapides-avec-node-js.html


Pour initaliser un dossier ou repo avec npm il faut creer un dossier et l'ouvrir dans un terminal de commande.
Ensuite lancer la commande d'initialisation
```
npm init
```

completer les champs au besoin
(ne pas mettre de majuscule ou de caractère spéciaux dans le nom du projet)

info:
```
└──╼  $ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (base-nodejs) basenodejs
version: (1.0.0) 
description: tuto base node js
entry point: (index.js) server.js
test command: 
git repository: 
keywords: 
author: hsuk
license: (ISC) 
About to write to /home/arinfo3/Bureau/base-nodejs/package.json:

{
  "name": "basenodejs",
  "version": "1.0.0",
  "description": "tuto base node js",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "hsuk",
  "license": "ISC"
}

```

Pour creer nos scripts de démarrage allez dans le package.json ouvrant notre projet avec VSC et configurer la partie script
```
  ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  ...
```

Ensuite nous pouvons utilisé les commandes suivante pour démarrer notre projet:
```
npm start
```
ou:
```
npm run dev
```

Node ne rafraichira pas notre application lancer contrairement à nodemon !

Afin d'importer des module (librairy = lib) dans notre applications nous auront besoin de NPM (node package manager = https://www.npmjs.com/ )

Le premier module dont nous avons besoin pour creer une application web et pouvoir gerer les routes facilement est le module express ( https://expressjs.com/fr/ ) que nous pouvons retrouver sur le site de npm ( https://www.npmjs.com/package/express )

comme la documentation nous l'indique pour installer le module dans notre application il nous suffit de lancer la commande suivante à la racine de notre dossier:

```
cd ./notreDossier
npm i express
```

et ensuite il faudra l'importe dans notre application ( server.js ) et le configurer !
























C'est quoi un dossier Json ? :

Il est à envoyer des informations, depuis un serveur vers un utilisateur, afin de les afficher sur une page web, ou inversement. Ces caractéristiques en font un langage d’échange de données idéal et universel

https://www.journaldunet.fr/web-tech/dictionnaire-du-webmastering/1445308-json-definition-et-presentation-de-ce-format-de-donnees/#:~:text=JSON%20(JavaScript%20Objet%20Notation)%20est,g%C3%A9n%C3%A8re%20et%20s'analyse%20facilement.&text=JSON%20permet%20de%20repr%C3%A9senter%20des,(comme%20XML%20par%20exemple).


C'est quoi Node JS ? : 

https://fr.wikipedia.org/wiki/Node.js


C'est quoi Handlebars ? : 

https://fr.wikipedia.org/wiki/Handlebars_(moteur_de_template)



Méthode Each (Boucle) : La méthode Each permet d'exécuter une fonction donnée sur chaque élément du tableau (exemple: ballon.json etc.... ).

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach









LIEN INTERNET 

Photo Slider Json Javascript :

https://jsfiddle.net/apougher/4hGP9/


CHECKBOX

https://www.w3schools.com/tags/att_input_type_checkbox.asp


THEME BOOTSTRAP

https://startbootstrap.com/themes