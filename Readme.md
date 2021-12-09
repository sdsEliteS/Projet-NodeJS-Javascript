GIT BRANCH DEV pour nouveau travail sur mon projet !

MySQL (Base de donnée tutorial)
https://www.w3schools.com/sql/default.asp

# Mettre du commentaire dans son fichier SQL :

http://dbaoraclesql.canalblog.com/archives/2017/01/19/34822571.html#:~:text=Les%20commentaires%20doivent%20%C3%AAtre%20mis,imbriquer%20les%20commentaires%20%2F*%20*%2F.


# Commande SQL Source son projet workbench base de donnée dans notre structure de Projet-NodeJS-Javascript :
https://www.journaldunet.fr/web-tech/developpement/1202663-comment-importer-un-fichier-sql-dans-mysql-en-ligne-de-commande/


# Commande SQL INSERT INTO pour rentrer les valeurs de la base de données :
https://www.w3schools.com/sql/sql_insert.asp

# Commande SQL DROP DATABSES dans le cas ou on voudrait supprimer sa base de données : 
https://docs.microsoft.com/fr-fr/sql/t-sql/statements/drop-database-transact-sql?view=sql-server-ver15

# Supprimer une ligne dans une table :

https://www.w3schools.com/sql/sql_delete.asp





PROCEDURE MySQL workbench afin de générer un script de la base de donnée sous la forme d'un fichier SQL qui est fait au commencement sous la forme d'un shéma dans workbench : 

File --> Export --> (Menu Contextuel) Foreward Engineer SQL CREATE Script --> clic sur le rectangle ... (Outup) --> Enregistrer le fichier en lui donnant un nom puis en le mettant dans le Projet (Message Remplacer si le fichier est déjà crée) --> NEXT (Replace ou Cancel = Prendre Replace) --> NEXT *Export MySQL Table Object (Afin de voir le script le fichier) --> Finish.


**** Pour simplement sauvegarder un projet My SQL Workbench existant faire File --> Save Model ****


# Installation de "npm install mysql" à chaque début de projet :

https://roytuts.com/nodejs-express-mysql-rest-api-crud-example/







**************************************
*     ATTENTION DB.SQL SCRIPT        *
*                                    *
**************************************

*
* Heure et Date dans le Commentaire d'un Article
************************************************

Vérifier le TIMESTAMP en tapant la commande suivante:  DESCRIBE Comment;

+-----------+--------------+------+-----+-------------------+-------------------+
| Field     | Type         | Null | Key | Default           | Extra             |
+-----------+--------------+------+-----+-------------------+-------------------+
| id        | int          | NO   | PRI | NULL              | auto_increment    |
| author_id | int          | NO   | MUL | NULL              |                   |
| content   | varchar(255) | NO   |     | NULL              |                   |
| date      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| ref_id    | int          | NO   | MUL | NULL              |                   |
+-----------+--------------+------+-----+-------------------+-------------------+


+

Procédure : Dans le cas ou mon modifie le script "db.sql" manuellement à la main sans passer par MySQL Workbench et afin d'avoir les modifications dans la db (Base de donnée) il faut faire un "DROP DATABASE mydb;" et "SOURCE db.sql;"

+

Écrire un Commentaire dans un Article et ensuite afin de vérifier que le TIMESTAMP (heure précise) est dans la table Comment et surtout la colonne Date du projet !, taper la commande suivante : SELECT * FROM Comment;

mysql> select * from Comment;
+----+-----------+-----------+---------------------+--------+
| id | author_id | content   | date                | ref_id |
+----+-----------+-----------+---------------------+--------+
|  1 |         1 | FFDSFDFSD | 2021-11-10 09:41:09 |      1 |
+----+-----------+-----------+---------------------+--------+

*
* Module de téléchargement pour les dates et heure (Penser au TIMESTAMP avec l'heure)
*********************************************************************************************************
https://www.npmjs.com/package/moment

https://www.npmjs.com/package/handlebars.moment

https://momentjs.com/


Raccourci Projet Collègue en rapport avec la date :

https://github.com/Tauruxhasgood/site-exam/blob/dev/views/partials/blog/cardId.hbs

https://github.com/Tauruxhasgood/site-exam/blob/dev/database/backupEmb2.sql







# Lien PHOTO pour générer une adresse :

https://www.zupimages.net/index.php?goto-form