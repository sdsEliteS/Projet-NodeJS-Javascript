var assert = require("assert");
const { db } = require("../server"); // import du server.js

// Describe prend en compte l'ensemble du CRUD //
describe("MOCHA_ASYNC // CRUD // Article", async () => {


    // METHODE POST //
    // it prend en compte une méthode !! //
    // Req.body regroupant toute les données que je veux dans mon article (TEST) //
    it("POST // Article", async() => {
        const now = new Date(Date.now())
        const body = {
            title: "Steven",
            description: "Ma super description",
            recommandation: "je recommande",
            date: now,
            dateEdit: now,
            image: "/path/to/image.png",
            subdescription: "ma sous description",
            address: "11 rue de olivette",
            phone: '0632353634',
            author_id: 1,
        }
        // console.log('simulate req.body', body)

        // J'utilise un systême de tableau key value //
        const key = [], val = []
        Object.entries(body).forEach(kv => {
            // console.log('kv', kv)
            key.push(kv[0]) // L'index du tableau commence par 0 et surtout découpant chaque key value dans un nouveau tableau donc 0 restera 0 //
            val.push(kv[1]) // Pareillement pour le 1 de la valeur //
        })

        // console.log('key', key, val)
        // Permet la récupération des tableaux key value dans la requête SQL //
        let sql = `INSERT INTO Article ( ${key.toString() } ) values(?)`;

        // Récupération des données de la requête SQL permettant la création du nouvel article //
        const newArticle = await query(sql, [val])
        // console.log('newArticle', newArticle);

        // Découpage de chaque donnée point par point : VALIDATION //
        const ArticleID = await query(`SELECT * FROM Article WHERE id = ${ newArticle.insertId }`)
        // console.log('ArticleID', ArticleID[0])

        // Assertion
        assert.deepStrictEqual(ArticleID[0].title, body.title)
        assert.deepStrictEqual(ArticleID[0].description, body.description)
        assert.deepStrictEqual(ArticleID[0].recommandation, body.recommandation)
        // assert.strictEqual(ArticleID[0].date, body.date)
        // assert.strictEqual(ArticleID[0].date, body.dateEdit)
        assert.deepStrictEqual(ArticleID[0].image, body.image)
        assert.deepStrictEqual(ArticleID[0].subdescription, body.subdescription)
        assert.deepStrictEqual(ArticleID[0].address, body.address)
        assert.deepStrictEqual(ArticleID[0].phone, body.phone)
        assert.deepStrictEqual(ArticleID[0].author_id, body.author_id)

    });

    // METHODE DELETE //
    it("DELETE ALL // Article", async () => {

        // Suppresssion
        let sql = `DELETE FROM Article`;
        await query(sql)

        // Check que la suppression c'est bien passer
        const NewTableau = await query (`SELECT * FROM Article`)
        console.log('check articles', NewTableau)
        assert.deepStrictEqual(0, NewTableau.length)
        // assert.deepStrictEqual([], NewTableau)
    })


});