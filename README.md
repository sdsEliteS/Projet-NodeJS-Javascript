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






# Methode Asynchrone (async) : lancement de requête en même temps peu importe le nombre !

https://www.w3schools.com/js/js_async.asp

# await (Toujours utilisable avec une methode Asynchrone)

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await





# Methode Synchrone : Le lancement d'une requête va entrainer une autre requête !



# Cours Jointure SQL :

https://aymeric-auberton.fr/academie/mysql/jointure

https://datascientest.com/tout-comprendre-des-jointures-sql


# Case Checkbox (isAdmin - isVerified - isBan) type booléen :

https://dev.socrata.com/docs/datatypes/checkbox.html#,




Base de donnée BACKUP :

https://dev.mysql.com/doc/mysql-backup-excerpt/5.7/en/mysqldump-sql-format.html


# Mettre à la fin de la base de donnée afin d'autogénérer un Utilisateur :

insert into User (pseudo, email, password, address, telephone, birthday)
values ('Steven', 'dossantos.steven72190@gmail.com', '123456', '327 Route de Beauchêne La Bellangerie', '0661538718', '1989-06-28')