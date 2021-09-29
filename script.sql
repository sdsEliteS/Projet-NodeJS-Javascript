/* Exemple : SCRIPT DE LA BASE DE DONNE SQL AVEC LES COMMANDES SQL QU'IL FAUDRA ECRIRE DANS LE TERMINAL DE COMMANDE */

insert into User (pseudo, email, password, isAdmin, isVerified, isBan, avatar, address, telephone, birthday)
values("steven", "dossantos.steven72190@gmail.com", "123456", 1, 1, 0, 'https://www.zupimages.net/up/21/36/o2ie.jpg', "327 route de beauchêne la bellangerie", "06.61.53.87.18", "1989-06-28");

insert into User (pseudo, email, password, isAdmin, isVerified, isBan, avatar, address, telephone, birthday)
values("steven1", "dossantos1.steven72190@gmail.com", "123456", 1, 1, 0, 'https://www.zupimages.net/up/21/36/o2ie.jpg', "327 route de beauchêne la bellangerie", "06.61.53.87.18", "1966-06-28");

/* Ne pas mentionner l'ID dans la commande SQL "insert into" car il s'auto-increment donc pas besoin de le mettre */ 

-- Script pour creer 2 article
INSERT INTO `Article`
VALUES 
(1,'Nantes','artciel 1','artticleerfpqgj 1','2021-09-27','2021-09-27','https://www.zupimages.net/up/21/36/o2ie.jpg','article 1',1),
(2,'Paris','atrerf 2','fzezedf 2','2021-09-27','2021-09-27','https://www.zupimages.net/up/21/36/o2ie.jpg','article 2',1),
(3,'Marseille','artciel 3','artticleerfpqgj 1','2021-09-27','2021-09-27','https://www.zupimages.net/up/21/36/o2ie.jpg','article 3',2),
(4,'Stade Rennais','atrerf 4','fzezedf 2','2021-09-27','2021-09-27','https://www.zupimages.net/up/21/36/o2ie.jpg','article 4',1);