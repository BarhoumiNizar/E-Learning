const express=require('express');
const mysql=require('mysql');
const fileUpload = require('express-fileupload');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static('assets'));
app.use(fileUpload());
const {PageAccueil,PageInscription,Modifiercertificat,deleteCertif,Modifiercertif,genererCertif,notesTest,deletetest,ModificationTest,ModifierCour,traiterTest,ModifierTest,creertest,repondreTest,passertest,ModifCour,deleteCour,ModifierFormation,editFormation,deleteFormation,DetailsFormation,deleteEvenement,demande,detailEvent,ajouterFormation,affichercours,notes,creetest,qstest,layout,testAP,notesAP,noteadmin,ajoutFormation,certifAdmin,listCertif,layoutapprnt,formationDetails,certificats,FormationSuivies,APevent,Detailsevent,chat2,TBapprenant,PlanningFormateur,formations,chat,cours,ajoutercour,test,ajoutcours,HomeFormateur,ApprenantList,evenementList,AjoutEvenements,ModificationEtat,deleteFormateur,Infosdetail,demandes,editFormateur,ModifierFormateurPage,InterfaceAdmin,ModifierApprenantPage,editApprenant,FormateurAjout,contct,PageLogin,PageEVformations,Pageforgotpassword,deleteApprenant,espaceformateur,listeF,inscriptions,ajoutformtr,getEvenements,listeApprenant,EDprofil,Planning,contact,connexion} = require('./routes/routes');
app.get('/',PageAccueil);
app.get('/inscription/:event',PageInscription);
app.get('/Login',PageLogin);
app.get('/layout',layout);
app.get('/testAP',testAP);
app.get('/notesAP',notesAP);
app.get('/noteadmin',noteadmin);
app.get('/notes',notes);
app.get('/passertest/:id',passertest);
app.get('/demande',demande);
app.get('/ModifierFormation/:id',ModifierFormation);
app.post('/ModifierFormation/:id', editFormation);
app.post('/passertest/:id', repondreTest);
app.get('/ajoutFormation',ajoutFormation);
app.post('/ajoutFormation',ajouterFormation);
app.get('/certifAdmin',certifAdmin);
app.get('/Modifiercertif/:id',Modifiercertif);
app.post('/Modifiercertif/:id',Modifiercertificat);
app.post('/certifAdmin',genererCertif);
app.get('/listCertif',listCertif);
app.get('/certificats',certificats);
app.get('/FormationSuivies',FormationSuivies);
app.get('/formationDetails',formationDetails);
app.get('/chat2',chat2);
app.get('/TBapprenant',TBapprenant);
app.get('/APevent',APevent);
app.get('/Detailsevent/:id',Detailsevent);
app.get('/DetailsFormation/:id',DetailsFormation);
app.get('/layoutapprnt',layoutapprnt);
//app.get('/connexion',PageConnexion);
app.get('/admin',InterfaceAdmin);
app.get('/AjoutFormateur',FormateurAjout);
app.get('/ListFormateur',listeF);
app.get('/contacter',contct);
app.get('/chat',chat);
app.get('/formations',formations);
app.get('/Ajoutcours',ajoutcours);
app.get('/Affichercours',affichercours);
app.post('/Ajoutcours',ajoutercour);
app.get('/Planningformation',Planning);
app.get('/PlanningFormateur',PlanningFormateur);
app.get('/contact',contact);
app.get('/EditProfil',EDprofil);
app.get('/cours',cours);
app.get('/deleteCertif/:id', deleteCertif);
app.get('/deleteCour/:id', deleteCour);
app.get('/ModifCour/:id', ModifCour);
app.post('/ModifCour/:id', ModifierCour);
app.get('/test',test);
app.get('/evenementList',evenementList);
app.get('/ApprenantList',ApprenantList);
app.get('/Forgotpassword',Pageforgotpassword);
app.get('/Apprenants',listeApprenant);
app.get('/Evenements',getEvenements);
app.post('/Evenements',AjoutEvenements);

app.get('/formateur',espaceformateur);
app.get('/formation', PageEVformations);
app.get('/creetest', creetest);
app.post('/creetest', creertest);
app.get('/deletetest/:id', deletetest);
app.get('/ModifierTest/:id', ModifierTest);
app.post('/ModifierTest/:id', ModificationTest);
app.get('/traiterTest/:id',traiterTest);
app.post('/traiterTest/:id',notesTest);
app.get('/qstest', qstest);
app.post('/Login',connexion);
app.post('/inscription/:event',inscriptions);
app.post('/AjoutFormateur',ajoutformtr);
app.get('/deleteApprenant/:id', deleteApprenant);
app.get('/editApprenant/:id', ModifierApprenantPage);
app.get('/deleteFormation/:id', deleteFormation);
app.post('/editApprenant/:id', editApprenant);
app.get('/deleteFormateur/:id', deleteFormateur);
app.get('/deleteEvenement/:id', deleteEvenement);
app.get('/editFormateur/:id', ModifierFormateurPage);
app.get('/demandes', demandes);
app.get('/detailEvent/:id', detailEvent);
app.get('/HomeFormateur', HomeFormateur);
app.get('/Infosdetail/:id', Infosdetail);
app.post('/Infosdetail/:id', ModificationEtat);
app.post('/editFormateur/:id', editFormateur);
const port=5000;
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Elearning',
    multipleStatements:true
});
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('connexion รงa va avec BD');
});
global.db = db;

app.set('views',__dirname+'/views');
app.set('view engine', 'ejs'); // configure template engine
app.listen(port,()=>{console.log(`Server running on port: ${port}`);
});
