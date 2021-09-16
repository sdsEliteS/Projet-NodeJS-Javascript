/*
 * Controller administration Page ADMIN
 * ************************************ */

// (READ/Lire = Method GET HTTP = MySQL: SELECT) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports) //
// Export de la routes du router.js (getPageAdmin) avec => une Function opérant un retour d'information en rapport avec une methode GET sur l'aspect FRONT-END (SELECT = READ = LIRE) - req = requete utilisateur faite au server et res = response du server //
exports.getPageAdmin = async (req, res) => {

    // Les Requêtes SQL "SELECT * FROM" sont misent dans des constantes permettant de visionner nos différentes tables de la base de donnée MySQL = Fichier db.sql) //
    // ( "await" mot-clé peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone) ) //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    // res.render revoi à l'Utilisateur vers le fichier 'admin' HTML Handlebars dans le DOSSIER views //
    // Ensuite dans l'objet {} articles - messages - users sont des tableaux = EXEMPLE: {{#each articles }} {{/each}} + this (Exemple: this.name colonne de la Table) qu'on intègre dans Les fichiers Handlebars tableauArticle - tableauMessage - tableauUser se situant dans le DOSSIER Admin qui est dans le dossier Partial qui est dans le dossier views  //
    // Cette manipulation permet de faire fonctionner le FRONT-END exportant les données du tableau concerner dans les fichiers Handlebars concernés ( VOIR MySQL WORKBENCH ) //
     
    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true,
        openArticle: 'show'
    });

}
// "openArticle: 'show'" permettant de rester sur la page Admin Section Liste Article Principal en mettant un "openArticle" dans la div <div id="collapseOne" class="accordion-collapse collapse {{ openArticle }}" aria-labelledby="headingOne" du fichier Handlebars tableauArticle //






// Edition du formulaire (modal) en rapport avec l'enregistrement de l'Utilisateur (Manipulation pouvant également être effectué ultérieurement (Exemple: isBan = Bannir Utilisateur) //

// (UPDATE/Modification = Method PUT HTTP = MySQL: UPDATE) //
// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports) //
// Export de la routes du router.js (editUser) avec => une Function opérant un retour d'information en rapport avec une methode PUT (UPDATE = EDITER/Modification) - req = requete utilisateur au server et res = response du server à l'utilisateur //
exports.editUser = async (req, res) => {
    console.log('Edition User Page ID', req.body, req.params)

    // Bannir (isBan) l'utilisateur, Vérification (isVerified) de l'inscription de l'Utilisateur // 
    // (Pour récupérer les valeurs rentrer dans la base de donnée avec le terminal de commande afin de valider du bon fonctionnement de l'applis en rapport avec les colonnes names (par exemple: voir Diagramme de Classe MySQL Workbench = isAdmin - isVerified - isBan) qui sont dans une Table User faire "req.body.isAdmin" par exemple //
    // Condition: Si (if) req.body.isAdmin est strictement égal (===) à 'on' alors req.body mentionnera "1" dans la base de donnée de la table User de "mydb" = base de donnée" sinon (else) s'il est pas coché cela mentionnera "0" dans la table User de mydb (mydb = base de donnée).
    if(req.body.isAdmin === 'on') req.body.isAdmin = 1
    else req.body.isAdmin = 0 

    if(req.body.isVerified === 'on') req.body.isVerified = 1
    else req.body.isVerified = 0 

    if (req.body.isBan === 'on') req.body.isBan = 1
    else req.body.isBan = 0

    console.log('Mes data du formulaire', req.body)

    // Stockage de la Requete SQL "UPDATE permettant de modifier si besoin l'enregistrement de l'Utilisateur effectuer dans une Table (Exemple: Table User) //
    let sql = `UPDATE User
            SET isAdmin = '${req.body.isAdmin}',
                isVerified = '${req.body.isVerified}',
                isBan = '${req.body.isBan}'
            WHERE id = '${req.params.id}';`;

    
    // Execution de la Requête SQL UPDATE ( "await" mot-clé peut être utilisé qu'à l'intérieur d'une methode async (Asynchrone) ) //
    await query(sql)

    // Les Requêtes SQL "SELECT * FROM" sont mise dans des constantes permettant de visionner nos différentes tables de la base de donnée MySQL = Fichier db.sql) //
    // *** RAPPEL IMPORTANT: Effectuer les modifs de part la requête UPDATE pour ensuite recharger les contantes avec les nouvelles données mise à jour *** //
    // 1 -> Effectuer la mise a jour (SQL UPDATE) - 2 -> Charger les constantes après la mise jour à permet d'avoir les données à jour - 3 -> Renvoyer la réponse avec les data misa a jour avec le res.render //

    // 1 + 2 //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    console.log('dbUsers[0]', dbUsers[0]) // Index [0] est égal à l'UTILISATEUR 1
    console.log('dbUsers[0]', dbUsers[1]) // Index [1] est égal à l'UTILISATEUR 2
    console.log('dbUsers[0]', dbUsers[2]) // Index [2] est égal à l'UTILISATEUR 3

    // res.render est le Server qui renvoi à l'Utilisateur le fichier 'admin' HTML Handlebars se situant dans le DOSSIER views //
    // Ensuite dans l'objet {} users est un tableau est {{#each users }} {{/each}} + this (this.name colonne de la Table) 
    // Les fichiers Handlebars tableauArticle - tableauMessage - tableauUser sont dans le DOSSIER Admin qui est dans le DOSSIER Partial qui est dans le views. 
    // Cette manipulation permet de faire fonctionner le FRONT-END exportant les données du tableau concerner dans les fichiers Handlebars ( VOIR My SQL WORKBENCH ) //

    // 3 //
    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true,
        openUser: 'show'
    })
}
 // "openUser: 'show'" permettant lors de l'édition de rester sur la page Admin Section Liste User en mettant un "openUser" dans la div div id="collapseTwo" class="accordion-collapse collapse {{ openUser }}" aria-labelledby="headingTwo" du fichier Handlebars tableauUser //




// Suppression d'Utilisateur de la Page Admin //

// Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports) //
// export de la routes du router.js (deleteUser) avec => une Function opérant un retour d'information en rapport avec une methode DELETE (DELETE = SUPPRESSION UTILISATEUR) - req = requete utilisateur au server et res = response du server à l'utilisateur //
exports.deleteUser = async (req, res) => {
    console.log('Suppression Utilisateur', req.body, req.params)

    // Exécution de la Requête SQL "DELETE FROM" permettant de supprimer un utilisateur de la Page Admin Section Liste d'Utilisateur (User) //
    // req.params est l'id donner en parametre de l'URL (/user/:id exemple: /user/1)
    await query(`DELETE FROM User WHERE id = ${ req.params.id }`)

    // Les Requêtes SQL "SELECT * FROM" sont mise dans des constantes permettant de visionner nos différentes tables de la base de donnée MySQL = Fichier db.sql) //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')

    // res.render est le Server qui renvoi à l'Utilisateur le fichier 'admin' HTML Handlebars se situant dans le DOSSIER views //
    // Ensuite dans l'objet {} on y ajoute les constantes (const) convertit en tableaux avec les tables User, Article et Message qu'ont exploitent sous la forme d'un {{#each users }} {{/each}} + this (this + name colonne de la Table concernée)
    // dans les fichiers Handlebars tableauArticle - tableauMessage - tableauUser étant dans le DOSSIER Admin. Cette manipulation permet de faire fonctionner le FRONT-END exportant les données du tableau concerner ( VOIR MySQL WORKBENCH ) //
    // Le render renvoit une page handlebars ('admin') et un Object JSON au format { KEY (articles): VALUE (dbArticle) } = (Exemple: { article: dbArticle } )
    // MEMO: la clef (key) sera utiliser dans notre front-end (view - partials handlebars (exemple: {{#each VALUE }} {{/each}} ))
    // RAPPEL: EN JAVASCRIPT une value peu s'auto-assigner sa propre clef (key)  (exemple: { dbArticle: dbArticle } aura la même valeur que { dbArticle } ) 
    res.render('admin', {
        articles: dbArticle,
        messages: dbMessage,
        users: dbUsers,
        noFooter: true,
        openUser: 'show'
    })
     // "openUser: 'show'" permettant lors de la Suppression des utilisateurs de rester sur la page Admin Section Liste User en mettant un "openUser" dans la div div id="collapseTwo" class="accordion-collapse collapse {{ openUser }}" aria-labelledby="headingTwo" du fichier Handlebars tableauUser //

     
    // res.redirect('/admin') redirige vers des URL du projet ou URL internet (HTTP) et afin qu'on nous renvoi la Page Admin Section Liste Utilisateur au moment de la Suppression de l'Utilisateur,
    // il faut renvoyer un ficher handlebars et donc la res.render permet une issue positif (res.redirect peut être remplacé par un res.render) //

    // res.redirect et res.render font partie de la méthode GET (FRONT-END) //
}
