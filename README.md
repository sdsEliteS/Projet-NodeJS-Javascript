# Projet-Nodejs-Javascript

https://sdselites.github.io/Projet-Nodejs-Javascript/


# Requête HTTP (GET + POST)

https://www.ionos.fr/digitalguide/hebergement/aspects-techniques/requete-http/   ****

https://www.ionos.fr/digitalguide/sites-internet/developpement-web/get-vs-post/  ****

https://openclassrooms.com/fr/courses/918836-concevez-votre-site-web-avec-php-et-mysql/913099-transmettez-des-donnees-avec-les-formulaires        ****

# METHODE POST (Récupération de données en rapport avec le remplissage d'un formulaire de contact ou de création d'un article)
https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466326-creez-une-route-post

https://www.editions-eni.fr/open/mediabook.aspx?idR=71bf4ee27bee4b2bd5949accfe4f89e8


# Ecriture de middleware utilisable dans les applications Express
https://expressjs.com/fr/guide/writing-middleware.html#:~:text=Pr%C3%A9sentation,par%20une%20variable%20nomm%C3%A9e%20next%20.

# Type SUBMIT

https://www.w3schools.com/tags/att_input_type_submit.asp#:~:text=The%20%3Cinput%20type%3D%22submit,in%20the%20form's%20action%20attribute.

# Body-parser

https://openclassrooms.com/forum/sujet/cours-passez-au-full-stack-avec-node-js#94041970  ****


# METHODE PUT 

https://developer.mozilla.org/fr/docs/Web/HTTP/Methods/PUT


# METHODE OVERRIDE
https://www.npmjs.com/package/method-override


# req.body :

https://stackoverflow.com/questions/14008346/express-js-req-body

# req.params :

https://sailsjs.com/documentation/reference/request-req/req-params











1ER PARTIE DE LA MANIPULATION BACK END

# PROCEDURE REQUETE HTTP #

A)

--> CONFIGURER le module "BodyParser" dans le SERVER.JS puis enusuite faire la manipulation suivante (POST et PUT) : 

1) Créer formulaire dans la page Handlebars HTML (action,method,submit)
NE PAS OUBLIER LES "Name" dans les input

2) Créer les routes (router,methode,controller)

3) Créer le Controller

--------------------------------------------------------------------------------------------

B)

-->  Installer module Method Override :

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

-->  Configurer notre module "_method" :

app.use(methodOverride('_method'));

-->  Configuration du formulaire HTML avec la Methode Override en rapport avec l'Action (Mentionnant l'URL) + Method (POST, PUT, DELETE)

-->  Création de la route dans le ROUTER.JS (Attention mentionner /:id dans la route pour la method PUT)

--> Et pour finir Création du Controller et loger le params URL







# res.redirect :

res.redirect('http://google.com');

https://sailsjs.com/documentation/reference/response-res/res-redirect

ou

Peut également mettre une URL du projet de la sorte : res.redirect('/admin'); = http://localhost:3000/admin


# res.render :

res.render renvoi un fichier handlebars : res.render('admin');


# varchar(255) peut contenir des chiffres, des lettres jusqu'à 255 caractères.


# MySQL UPDATE :

https://www.w3schools.com/sql/sql_update.asp

https://www.w3schools.com/nodejs/nodejs_mysql_update.asp

https://www.mysqltutorial.org/mysql-nodejs/update/

https://github.com/hsukrd/api-node-mysql/blob/async/controllers/userController.js


# MySQL WORKBENCH : 

https://www.guru99.com/null.html


# Case Checkbox (isAdmin - isVerified - isBan) type booléen :

https://dev.socrata.com/docs/datatypes/checkbox.html#,





# Methode Asynchrone (async) : lancement de requête en même temps peu importe le nombre !

https://www.w3schools.com/js/js_async.asp

# await (Toujours utilisable avec une methode Asynchrone)

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await





# Methode Synchrone : Le lancement d'une requête va entrainer une autre requête !



// Exemple différence fonction synchrone et asynchrone
// app.get('/', async (req, res) => {

//     // 1 fonction synchrones déclenche 1 autre function synchrones
//     query(sql, (err, data) => {
//         if (err) console.log(err)
//         query(sql2, (errr, data) => {
//             if (errr) console.log(errr)

//         })
//     })

//     // fonction async en même temp
//     await query(sql)
//     await query(sql2)


// })







# Cours Jointure SQL :

https://aymeric-auberton.fr/academie/mysql/jointure

https://datascientest.com/tout-comprendre-des-jointures-sql

https://www.ionos.fr/digitalguide/hebergement/aspects-techniques/sql-outer-join/

https://sql.sh/ressources/cours-sql-sh-.pdf


# Vérification de la creation de commentaire en rapport avec l'auteur de l'article concerné grace au jointure : 

COMMANDE DANS LA BASE DE DONNE MYSQL 

mysql> select * from Article left outer join Comment on Article.id = Comment.ref_id where Article.id = 1;      
(EXEMPLE ATTENTION ID de l'article PEUT CHANGER)

mysql> select * from Article left outer join Comment on Article.id = Comment.ref_id where Article.id = 2;      
(EXEMPLE ATTENTION ID de l'article PEUT CHANGER)



Autre Manipulation : Par exemple : Dans mon projet comment récupérer que les Articles de l'Utilisateur 1 ou 2 :

mysql> select * from Article where author_id = 1;


mysql> select * from Article where author_id = 2;



Autre Manipulation : Par exemple : Dans mon projet requête SQL pour fusionner en liant les commentaires 1 de mes articles 1

mysql> SELECT * FROM Article LEFT JOIN Comment ON Article.id = Comment.ref_id WHERE Article.author_id = 1;



Autre Manipulation : Requête pour retrouver le pseudo dans la table User (1) + Un Utilisateur précis avec ses données

(1)
mysql> select pseudo from User;

+---------+
| pseudo  |
+---------+
| Steven  |
| steven1 |
+---------+

(2)
mysql> SELECT pseudo, email, password FROM User WHERE pseudo = 'Steven';

+--------+---------------------------------+----------+
| pseudo | email                           | password |
+--------+---------------------------------+----------+
| Steven | dossantos.steven72190@gmail.com | 123456   |
+--------+---------------------------------+----------+


# Manipulation pour la SESSION

https://www.npmjs.com/package/express-session

https://www.npmjs.com/package/express-mysql-session

https://github.com/hsukrd/architecture-nodejs-base/blob/session/server.js

https://github.com/hsukrd/architecture-nodejs-base/blob/session/api/controllers/authController.js

https://living-sun.com/fr/nodejs/588996-working-with-sessions-in-expressjs-nodejs-session-express.html

https://askcodez.com/noeud-express-comment-faire-pour-effacer-les-cookies-apres-la-deconnexion.html

https://fr.wikibooks.org/wiki/Les_bases_de_donn%C3%A9es/Les_requ%C3%AAtes_en_SQL

https://sql.sh/cours/where









Manipulation Base de donnée BACKUP (Voir PHOTO PORTABLE pour ne pas partir de 0) :

https://dev.mysql.com/doc/mysql-backup-excerpt/5.7/en/mysqldump-sql-format.html


# Mettre à la fin de la base de donnée afin d'autogénérer un Utilisateur :

insert into User (pseudo, email, password, address, telephone, birthday)
values ('Steven', 'dossantos.steven72190@gmail.com', '123456', '327 Route de Beauchêne La Bellangerie', '0661538718', '1989-06-28');





# MULTER : Ajouter une photo dans le modal de la création d'article et dans le dossier Images du Projet

https://www.youtube.com/watch?v=-rJOt4hoVak

https://www.youtube.com/watch?v=wIOpe8S2Mk8

https://github.com/hsukrd/architecture-nodejs-base/tree/image


# MULTER : Supprimer et Editer une photo d'un article crée et dans le dossier Images du projet

https://github.com/hsukrd/architecture-nodejs-base/blob/a0dd4d57b25a6c3a0d42c3c6594b7158c9e4435c/api/controllers/articleController.js#L93

https://practicalprogramming.fr/how-to-use-node-fs






# Commande de lancement du projet :

"veb": "nodemon server.js" = npm run veb

"sass": "sass --watch public/sass/index.sass:public/css/style.css" = npm run sass

"mocha":"nodemon --exec 'mocha ./test/mocha.js'" = npm run mocha




# TEST UNITAIRE 

https://nodejs.org/api/assert.html

https://latavernedutesteur.fr/2017/11/03/tdd-test-driven-development/#:~:text=TDD%20tests%20unitaires,afin%20de%20valider%20ces%20tests.

https://unitjs.com/guide/assert-node-js.html

https://github.com/hsukrd/api-node-mysql/tree/module-async/store-sql

https://github.com/hsukrd/api-node-mysql/blob/module-async/store-sql/delete.js