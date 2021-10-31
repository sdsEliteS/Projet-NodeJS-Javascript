Liens Javascript :

# setTimeout (Le temps en seconde = Pratique pour les bannières temporaire (Validation ou Error après le remplissage du formulaire register))

https://www.w3schools.com/jsref/met_win_settimeout.asp


# toLowerCase (convertit une chaine de caractère en miniscule)

https://www.w3schools.com/jsref/jsref_tolowercase.asp#:~:text=Definition%20and%20Usage,method%20to%20convert%20to%20uppercase.




   console.log('Controller Create New Mot de Passe', req.body, req.params)

      const newPassword = await query(`SELECT id, pseudo, password FROM User WHERE id = ${ req.params.id }`)

      if (!newPassword[0]) res.render('profil')
      else {
        const hash = await bcrypt.hash(newPassword[0].password === req.body.nouveau_password, 10)

        // Requête SQL UPDATE Modification Mot de Passe //
        let sql = `UPDATE User
    SET password = '${ hash }'
    WHERE id = ${ req.params.id };`
        // invocation de la constante hash dans la let sql à la place de nouveau_password afin de protéger le mot de passe lors de l'edit du nouveau mot de passe de l'Utilisateur //


        // Valeur des colonnes de la Table User qui sont écrit dans les input du formulaire d'inscription register - Method Asynchrone  //
        query(sql, [values], function (err, data, fields) {
          if (err) throw err;
          // res.render renvoi l'Utilisateur vers le fichier Handlebars/HTML 'register' au moment de la validation du formulaire d'inscription mentionnant sur le compte à bien été crée //
          res.render('profil', {
            success: 'Votre mot de passe à bien été modifié !'
          })

        })

      }