# Projet-Nodejs-Javascript

https://sdselites.github.io/Projet-Nodejs-Javascript/


# Requête HTTP (GET + POST)
https://www.ionos.fr/digitalguide/hebergement/aspects-techniques/requete-http/   ****

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