/*
 * Controller Formulaire Contact (Page Home + Page Présentation)
 * ************************************************************* */

exports.getPageContact = (req, res) => {

    // Par default intégration layout main => {{{ body }}} - (Page View)
    
    res.render();
}


/*
 * Remplissage des formulaires de contacts à L'INTERIEUR de la Page Home + Presentation 
 ********************************************************************************************* */

// ( CREATE/Création = Method POST HTTP = MySQL: INSERT INTO ) //
// Exportation de la routes du router.js (formContact) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode POST (Création) - req = requête faite par l'Utilisateur interrogant le Server et res = response du Server //
exports.formContact = (req, res) => {
    console.log('Controller Form Contact', req.body)

    // La Requête SQL insert into permet la création de plusieurs colonnes dans la Table Message pouvant accueillir des données lors du remplissage des formulaires de contacts // ID s'auto_increment donc pas besoin de le mentionner dans la Requête SQL //
    // req.body permet de nous ressortir les données des colonnes dans un terminal de commande afin de constater du bon fonctionnement de l'applis lors du remplissage des formulaires de contact visionnant les données au moment de la validation //
    let sql = `insert into Message (nom, email, sujet, message, date) values (?)`;
    let values = [
        req.body.nom,
        req.body.email,
        req.body.sujet,
        req.body.message,
        req.body.date
    ];
    // Valeur des colonnes de la Table Message qui sont écrit dans les input //
    query(sql, [values], function (err, data, fields) {
        if (err) throw err;

        // Server permet de rediriger (redirect) l'Utilisateur vers l'URL / (Page Home) //
        res.redirect('/')
    })
}

/* 
 * Suppression Message du formulaire de contact de la Page Home + Presensation dans la Page Admin Section Liste Message
 ********************************************************************************************************************** */

// ( DELETE/Suppression = Method DELETE HTTP = MySQL: DELETE ) //
//Code ERREUR = SyntaxError: await is only valid in async function (ATTENTION NE PAS OUBLIER "async" sur la ligne de code exports (Méthode Asynchrone)) //
// Exportation de la routes du router.js (deleteMessage) dans le Controller avec => une Function opérant un retour d'information en rapport avec la methode DELETE (Suppression) - req = requête faite par l'Utilisateur interrogant le Server et res = response du Server //
exports.deleteMessage = async (req, res) => {
    console.log('Controller delete Message', req.body, req.params)

    // Execution de la Requête SQL UPDATE ("await" est toujours utilisé dans le cadre d'une méthode asynchrome = async ) //
    await query(`DELETE FROM Message WHERE id = ${ req.params.id }`)

    // Les Requêtes SQL "SELECT * FROM" sont mise dans des constantes permettant de visionner nos différentes tables dans la base de donnée MySQL = Fichier db.sql grâce à MySQL WORKBENCH)) //
    const dbUsers = await query('select * from User')
    const dbArticle = await query('select * from Article')
    const dbMessage = await query('select * from Message')


    // Server renvoi à l'Utilisateur le fichier handlebars 'admin' HTML Handlebars se situant dans le DOSSIER views //
    // Ensuite dans l'objet {} on y ajoute les constantes (const) convertit en tableau en rapport avec la Table Message qu'ont exploite sous la forme d'un {{#each Message }} {{/each}} + this (Exemple this.name colonne de la Table Message) 
    // dans le fichier Handlebars tableauMessage étant dans le DOSSIER Admin. Cette manipulation permet de faire fonctionner le FRONT-END en exportant également les données du tableau dans le terminal de commande afin de constater du bon fonctionnement de l'applis grâce à MySQL WORKBENCH //
    // + BOOLEAN pouvant être mis dans le cadre d'une condition VOIR PAGE MAIN DANS LE LAYOUT (Un boolean c'est soit TRUE OU FALSE) //
    // Faisant partie de l'Objet "openMessage: show" permettant la Suppression du message en restant sur la page Admin Section Liste Message en mettant dans la div <div id="collapseMessage" class="accordion-collapse collapse {{ openMessage }}" aria-labelledby="headingThree" du fichier Handlebars tableauMessage //
    res.render('admin', {
        users: dbUsers,
        article: dbArticle,
        messages: dbMessage,
        noFooter: true,
        openMessage: 'show'
    });
}