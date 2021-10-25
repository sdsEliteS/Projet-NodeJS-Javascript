/* Exemple : SCRIPT DE LA BASE DE DONNE SQL AVEC LES COMMANDES SQL QU'IL FAUDRA ECRIRE DANS LE TERMINAL DE COMMANDE */

insert into User (pseudo, email, password, isAdmin, isVerified, isBan, avatar, address, telephone, birthday)
values("steven", "dossantos.steven72190@gmail.com", "$2b$10$/rnslB/l8JC01uGtEuCc5.9LpLxzaru.68nB2z84ilvF4OqDJCpBu", 1, 1, 0, 'https://www.zupimages.net/up/21/36/o2ie.jpg', "327 route de beauchêne la bellangerie", "06.61.53.87.18", "1989-06-28");

insert into User (pseudo, email, password, isAdmin, isVerified, isBan, avatar, address, telephone, birthday)
values("steven1", "dossantos1.steven72190@gmail.com", "$2b$10$/rnslB/l8JC01uGtEuCc5.9LpLxzaru.68nB2z84ilvF4OqDJCpBu", 1, 1, 0, 'https://www.zupimages.net/up/21/36/o2ie.jpg', "327 route de beauchêne la bellangerie", "06.61.53.87.18", "1966-06-28");
-- $2b$10$/rnslB/l8JC01uGtEuCc5.9LpLxzaru.68nB2z84ilvF4OqDJCpBu === 123456
/* Ne pas mentionner l'id dans la commande SQL "insert into" car il s'auto-increment comme mentionné sur MySQL Workbench donc pas besoin de le mettre */