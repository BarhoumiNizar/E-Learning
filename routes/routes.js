module.exports = {
    //Fonction d'affichage
   
    //Fonction pour retourner la page de conx
    PageAccueil: (req, res) => {
        let query = "SELECT * FROM `evenement`  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('index.ejs', {
                events: result,
            message: ''
        });
    });
    },

    detailEvent: (req, res) => {
        let id=req.params.id;
        let query="select * from evenement where IDevent="+id;
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('detailEvent.ejs', {
                events: result[0],
            message: ''
        });
    });
    },

    deleteEvenement: (req, res) => {
        let id=req.params.id;
        let query="delete from evenement where IDevent="+id;
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.redirect('/Evenements');
    });
    },

    PageInscription: (req, res) => {
        let evenement = req.params.event;
        res.render('inscription.ejs', {
            event:evenement,
            message: ''
        });
    },
    passertest: (req, res) => {


       let id=req.params.id;
        let query="select * from test where IDtest="+id;
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('passerTest.ejs', {
                test:result[0],
                message: ''
            });
    });
    },

    deletetest: (req , res) => {
        let id_test=req.params.id;
        let requete_suppression="delete from test where IDtest="+id_test;
        db.query(requete_suppression,(err,result)=>{
         if (err) {
             return res.status(500).send(err);
         }
         res.redirect('/test');
             
        });
     },
    repondreTest: (req,res)=>{
        //Initialisation des valeurs de Formulaire
       let id= req.params.id;
       let apprenant = req.body.apprenant;
       let rep = req.body.rep;
       let rep2 = req.body.rep2;
       let rep3 = req.body.rep3;
       

        let requete="UPDATE `test` SET `r1`='"+rep+"',`r2`='"+rep2+"',`r3`='"+rep3+"',`apprenant`='"+apprenant+"'  WHERE `IDtest`='"+id+"'";
        
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/testAP');
        });
          
    },

    notesTest: (req,res)=>{
        //Initialisation des valeurs de Formulaire
       let id= req.params.id;
       let note = req.body.note;
       let resultat = req.body.resultat;
     
       

        let requete="UPDATE `test` SET `Note`='"+note+"',`resultat`='"+resultat+"'  WHERE `IDtest`='"+id+"'";
        
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/notes');
        });
          
    },

    demande: (req, res) => {
        res.render('demande.ejs', {
            
            message: ''
        });
    },
    PageLogin: (req, res) => {
        res.render('login.ejs', {
            
            message: ''
        });
    },
    Pageforgotpassword: (req, res) => {
        res.render('forgotpassword.ejs', {
            
            message: ''
        });
    },
    PageEVformations: (req, res) => {
        let requete="select * from formation ";
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.render('EVformations.ejs',{
           // title : "Modifier Personne",
            formations : result
            });
        });
    },
    InterfaceAdmin: (req, res) => {
        res.render('admin.ejs', {
            
            message: ''
        });
    },
    PageConnexion: (req, res) => {
        res.render('connexion.ejs', {
            
            message: ''
        });
    },
    HomeFormateur: (req, res) => {
        res.render('HomeFormateur.ejs', {
            
            message: ''
        });
    },
    connexion: (req, res)=>{
        let dt=new Date();
        let date=dt.getMonth()+"/"+dt.getDate()+"/"+dt.getFullYear();
        let Login = req.body.login;
        let mdp = req.body.mdp;
       console.log("login est "+Login);
       console.log("Mdp est "+mdp);
            if(Login=="abir" && mdp=='abir')
            {
             res.redirect('/admin');
            }
            else{

                let query = "SELECT * FROM `utilisateur` where Role='formateur' and Login='"+Login+"' and Password='"+mdp+"'"; // query database to get all the players
                // execute query
                db.query(query, (err, result) => {
                    var num=result.length;
                    if (num==0) {
                      //Traitement si Apprenant
                            
                      let queryApprenant  = "SELECT * FROM `utilisateur` where Role='apprenant' and Login='"+Login+"' and Password='"+mdp+"'"; // query database to get all the players
                // execute query
                db.query(queryApprenant, (err, resultApprenant) => {
                    var numap=resultApprenant.length;
                    
                    if (numap==0) {
                    console.log('Errreur');
                    }
                    else{
                        
                        Object.keys(resultApprenant).forEach(function(key) {
                            var rowApprennat = resultApprenant[key];
                            var statutCnt=rowApprennat.statut;
                            var idA=rowApprennat.IDutilisateur;
                            let queryApp2 = "update `utilisateur` set statut='En ligne',DateDernierConx='"+date+"' where IDutilisateur='"+idA+"'";
                            db.query(queryApp2);
                          });
                        res.redirect('/APevent');
                    }

            });
                     
                      


                      //Fin traitement Apprenant
  
                    }
                    else{
                        
                        Object.keys(result).forEach(function(key) {
                            var row = result[key];
                            var statutCnt=row.statut;
                            var idF=row.IDutilisateur;
                            let query2 = "update `utilisateur` set statut='En ligne',DateDernierConx='"+date+"'  where IDutilisateur='"+idF+"'";
                            db.query(query2);
                          });
                        res.render('HomeFormateur.ejs', {
                            users: result,
                            
                            message: ''
                        });
                    }

            });
        }

           
    },
    PageConnexion: (req, res) => {
        res.render('connexion.ejs', {
            
            message: ''
        });
    },

    FormateurAjout: (req, res) => {
        res.render('AjoutFormateur.ejs', {
            
            message: ''
        });
    },

    contact: (req, res) => {
        res.render('contactUS.ejs', {
            
            message: ''
        });
    },
    contct: (req, res) => {
        res.render('contact.ejs', {
            
            message: ''
        });
    },
    listeF: (req, res) => {
        let query = "SELECT * FROM `utilisateur` where Role='formateur' "; // query database to get all the players
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
        res.render('listeformateur.ejs', {
            users: result,
            message: ''
        });
    });
    },
        Planning: (req, res) => {
            res.render('PlanningFormation.ejs', {
                
                message: ''
            });
        },
        layout: (req, res) => {
            res.render('layout.ejs', {
                
                message: ''
            });
        },
        layoutapprnt: (req, res) => {
            res.render('layoutapprnt.ejs', {
                
                message: ''
            });
        },
        TBapprenant: (req, res) => {
            res.render('TBapprenant.ejs', {
                
                message: ''
            });
        },
        APevent: (req, res) => {
            let query = "SELECT * FROM `evenement`  "; // query database to get all the players
            let requete="select * from formation ";
        // execute query
        db.query('SELECT * FROM `evenement`; select * from formation', [1, 2], function(err, results) {
            if (err) throw err;
          
            // `results` is an array with one element for every statement in the query:
            console.log(results[0]); // [{1: 1}]
            console.log(results[1]); // [{2: 2}]
           res.render('APevent.ejs', {
                events: results[0],
                formations: results[1],
                message: ''
            });
    });
     
        },
        chat2: (req, res) => {
            res.render('chat2.ejs', {
                
                message: ''
            });
        },
        Detailsevent: (req, res) => {
            let id=req.params.id;
            let query="select * from evenement where IDevent="+id;
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
            res.render('Detailsevent.ejs', {
                events: result[0],
                message: ''
            });
                message: ''
            });
        },
        DetailsFormation: (req, res) => {
            let id=req.params.id;
           // let query="select * from formation where IDformation="+id;
            // execute query
            db.query('select * from formation where IDformation='+id+';select * from formation', [0,1], function(err, results) {
                if (err) throw err;
           
            res.render('DetailsFormation.ejs', {
                id: id,
                formations: results[1],
                message: ''
            });
                
            });
        },
        FormationSuivies: (req, res) => {
            let event='DATA';
            let query="select * from cours where evenement='"+event+"'";

            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
            res.render('FormationSuivies.ejs', {
                events: result,
                message: ''
            });
             
        
            });
        },
      
        notesAP: (req, res) => {
            let query = "SELECT * FROM `test` where apprenant='azza'  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('notesAP.ejs', {
                tests: result,
            message: ''
        });
    });
},
        certifAdmin: (req, res) => {
            res.render('certifAdmin.ejs', {
                
                message: ''
            });
        },

        Modifiercertif: (req, res) => {
            let id=req.params.id;
            let query="select * from certificat where IDcertificat="+id;
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
            res.render('Modifiercertif.ejs', {
                certif: result[0],
                message: ''
            });
                message: ''
            });
        },

        genererCertif: (req, res)=>{
     
          
          
            //Recupération des valeurs de formulaire
            let message = '';
            let apprenant = req.body.apprenant;
            let desapprenant = req.body.desapprenant;
            let formation = req.body.formation;
            let numcertif = req.body.numcertif;
            let datecertif = req.body.datecertif;
          
         //Requete insertion
            let sql="INSERT INTO `certificat`(`NumCertificat`, `apprenant`, `NomFormation`, `DateCertificat`,  `date_naissance_apprenant`) VALUES ('" +numcertif + "', '" + apprenant + "', '" + formation + "', '" + datecertif + "', '" + desapprenant + "')";
            //Exécution de requete
            db.query(sql,(err,result) =>{
                if(err)
                {
                    message='Erreur ajout';
                    return message;
                }
               res.redirect('/listCertif');
              });//Fin exécution requete
            
    
        }, //Fin Fonction inscriptions apprenants

        Modifiercertificat: (req, res)=>{
     
          
          
            //Recupération des valeurs de formulaire
            let message = '';
            let id=req.params.id;
            let apprenant = req.body.apprenant;
            let desapprenant = req.body.desapprenant;
            let formation = req.body.formation;
            let numcertif = req.body.numcertif;
            let datecertif = req.body.datecertif;
          
         //Requete insertion
            let sql="update `certificat` set `NumCertificat`='" +numcertif + "', `apprenant`= '" + apprenant + "', `NomFormation`= '" + formation + "', `DateCertificat`= '" + datecertif + "',  `date_naissance_apprenant`= '" + desapprenant + "' where IDcertificat='"+id+"'";
            //Exécution de requete
            db.query(sql,(err,result) =>{
                if(err)
                {
                    message='Erreur ajout';
                    return message;
                }
               res.redirect('/listCertif');
              });//Fin exécution requete
            
    
        }, //Fin Fonction inscriptions apprenants

        listCertif: (req, res) => {
            let query = "SELECT * FROM `certificat`  "; // query database to get all the players

            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
               
                res.render('listCertif.ejs', {
                    certifs: result,
                message: ''
            });
        });
        },
         
        certificats: (req, res) => {
            res.render('certificats.ejs', {
                
                message: ''
            });
        },
        ajoutFormation: (req, res) => {
           res.render('ajoutFormation.ejs', {
                
                message: ''
            });
        },
        ModifierFormation: (req,res)=>{
            let id=req.params.id;
            let requete="select * from formation where IDformation="+id;
            //Exécution de requete
            db.query(requete,(err,result)=>{
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('modifierFormation.ejs',{
               // title : "Modifier Personne",
                formation : result[0]
                });
            });
              
        },
        ajouterFormation: (req, res)=>{
     
          
          
            //Recupération des valeurs de formulaire
            let message = '';
            let libellet = req.body.libellet;
            let description = req.body.description;
          
         //Requete insertion
            let sql="INSERT INTO `formation`(`LibelleForm`, `DescriptionForm`) VALUES ('" +libellet + "', '" + description + "')";
            //Exécution de requete
            db.query(sql,(err,result) =>{
                if(err)
                {
                    message='Erreur ajout';
                    return message;
                }
               res.redirect('/formation');
              });//Fin exécution requete
            
    
        }, //Fin Fonction inscriptions apprenants
        
        
        noteadmin: (req, res) => {
            let query = "SELECT * FROM `test`  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('noteadmin.ejs', {
                tests: result,
            message: ''
        });
    });
        },

        formationDetails: (req, res) => {
            res.render('FormationSuivies.ejs', {
                
                message: ''
            });
        },
        ApprenantList: (req, res) => {
      
            let query = "SELECT * FROM `utilisateur` where Role='apprenant'  "; // query database to get all the players
    
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
          
                res.render('ApprenantList.ejs', {
                    users: result,
                message: ''
            });
        });
        },
        cours:  (req, res) => {
            let query = "SELECT * FROM `cours`  "; // query database to get all the players
        
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
          
                res.render('cours.ejs', {
                    cours: result,
                message: ''
            });
        });
              
        },

        ModifCour:  (req, res) => {
            let id=req.params.id;
            let query = "SELECT * FROM `cours` where IDcours="+id; // query database to get all the players
        
            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
          
                res.render('modifiercours.ejs', {
                    cours: result[0],
                message: ''
            });
        });
              
        },

    


        creetest: (req, res) => {
            let query = "SELECT * FROM `evenement` ";
            db.query(query, (err, result) => {
               
            res.render('creetest.ejs', {
                events:result,
                
                message: ''
            });
        });
        },

        ModifierTest: (req,res)=>{
            let id=req.params.id;
            let requete="select * from test where IDtest="+id;
            //Exécution de requete
            db.query(requete,(err,result)=>{
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('modifiertest.ejs',{
               // title : "Modifier Personne",
                test : result[0]
                });
            });
              
        },
        creertest: (req, res)=>{
     
          
          
            //Recupération des valeurs de formulaire
            let message = '';
            let q1 = req.body.q1;
            let q2 = req.body.q2;
            let q3 = req.body.q3;
            let event = req.body.events;
         //Requete insertion
            let sql="INSERT INTO `test`(`q1`, `q2`, `q3`,  `NomEvent`) VALUES ('" +q1 + "', '" + q2 + "', '" + q3 + "', '" + event+ "')";
            //Exécution de requete
            db.query(sql,(err,result) =>{
                if(err)
                {
                    message='Erreur ajout';
                    return message;
                }
               res.redirect('/test');
              });//Fin exécution requete
            
    
        }, //Fin Fonction inscriptions apprenants


        ModificationTest: (req, res)=>{
     
          
          
            //Recupération des valeurs de formulaire
            let message = '';
            let id=req.params.id;
            let q1 = req.body.q1;
            let q2 = req.body.q2;
            let q3 = req.body.q3;
            let event = req.body.events;
         //Requete insertion
            let sql="update `test`set `q1`='" +q1 + "', `q2`='" + q2 + "',`q3`= '" + q3 + "', `NomEvent`='" + event+ "' where IDtest='"+id+"'";
            //Exécution de requete
            db.query(sql,(err,result) =>{
                if(err)
                {
                    message='Erreur ajout';
                    return message;
                }
               res.redirect('/test');
              });//Fin exécution requete
            
    
        }, //Fin Fonction inscriptions apprenants


        testAP: (req, res) => {
            let query = "SELECT * FROM `test`  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('testAP.ejs', {
                tests: result,
            message: ''
        });
    });
        },

        notes: (req, res) => {
            let query = "SELECT * FROM `test`  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('notes.ejs', {
                tests: result,
            message: ''
        });
    });
        },
       

        traiterTest: (req,res)=>{
            let id=req.params.id;
            let requete="select * from test where IDtest="+id;
            //Exécution de requete
            db.query(requete,(err,result)=>{
                if (err) {
                    res.redirect('/');
                }
                res.render('traiterTest.ejs',{
               // title : "Modifier Personne",
                test : result[0]
                });
            });
              
        },

        qstest: (req, res) => {
            res.render('qstest.ejs', {
                
                message: ''
            });
        },
        test: (req, res) => {

            let query = "SELECT * FROM `test`  "; // query database to get all the players

            // execute query
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
               
                res.render('test.ejs', {
                    tests: result,
                message: ''
            });
        });
            },
        chat: (req, res) => {
            res.render('chat.ejs', {
                
                message: ''
            });
        },
        formations: (req, res) => {
            res.render('formations.ejs', {
                
                message: ''
            });
        },
        ajoutcours: (req, res) => {
            let query = "SELECT * FROM `evenement` where formateur='sabrine'  "
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
               
                res.render('ajoutcours.ejs', {
                    events: result,
                message: ''
            });
        });
        },
        evenementList: (req, res) => {
            let query = "SELECT * FROM `evenement` where formateur='sabrine'  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
           
            res.render('evenementList.ejs', {
                events: result,
            message: ''
        });
    });
        },
        PlanningFormateur: (req, res) => {
            res.render('PlanningFormateur.ejs', {
                
                message: ''
            });
        },
        EDprofil: (req, res) => {
                res.render('editProfil.ejs', {
                    
                    message: ''
                });
    },  
    listeApprenant: (req, res) => {
      
        let query = "SELECT * FROM `utilisateur` where Role='apprenant'  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
      
            res.render('listeApprenant.ejs', {
                users: result,
            message: ''
        });
    });
    },
     //Fonction Suppression
     deleteApprenant: (req , res) => {
        let id_user=req.params.id;
        let requete_suppression="delete from utilisateur where IDutilisateur="+id_user;
        db.query(requete_suppression,(err,result)=>{
         if (err) {
             return res.status(500).send(err);
         }
         res.redirect('/Apprenants');
             
        });
     },


     //Fonction Suppression
     deleteCertif: (req , res) => {
        let id_certif=req.params.id;
        let requete_suppression="delete from certificat where IDcertificat="+id_certif;
        db.query(requete_suppression,(err,result)=>{
         if (err) {
             return res.status(500).send(err);
         }
         res.redirect('/listCertif');
             
        });
     },

     deleteCour: (req , res) => {
        let id_user=req.params.id;
        let requete_suppression="delete from cours where IDcours="+id_user;
        db.query(requete_suppression,(err,result)=>{
         if (err) {
             return res.status(500).send(err);
         }
         res.redirect('/cours');
             
        });
     },

       //Fonction Suppression
       deleteFormation: (req , res) => {
        let id_formation=req.params.id;
        let requete_suppression="delete from formation where IDformation="+id_formation;
        db.query(requete_suppression,(err,result)=>{
         if (err) {
             return res.status(500).send(err);
         }
         res.redirect('/formation');
             
        });
     },
      //Fonction Suppression
      deleteFormateur: (req , res) => {
        let id_user=req.params.id;
        let requete_suppression="delete from utilisateur where IDutilisateur="+id_user;
        db.query(requete_suppression,(err,result)=>{
         if (err) {
             return res.status(500).send(err);
         }
         res.redirect('/ListFormateur');
             
        });
     },

     getEvenements: (req, res) => {
      
        let query = "SELECT * FROM `evenement` "; // query database to get all the players
     let role="formateur";
        // execute query
        db.query("SELECT * FROM `evenement`; select * from utilisateur where `Role`='formateur'", [0, 1], function(err, results) {
            if (err) throw err;
          
            // `results` is an array with one element for every statement in the query:
           console.log(results[1]);
           console.log(results[2]);
            res.render('evenements.ejs', {
                events: results[0],
                formateurs: results[1],
            message: ''
        });
    });
    },
    espaceformateur: (req, res) => {
        res.render('formateur.ejs', {
            
            message: ''
        });
    },
    //Fonction pour Envoyer les valeurs de formulaire vers table utilisateurs
    
    inscriptions: (req, res)=>{
     
        let dt=new Date();
        let date=dt.getMonth()+"/"+dt.getDate()+"/"+dt.getFullYear();
      
      
        //Recupération des valeurs de formulaire
        let message = '';
        let evenement = req.params.event;
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let login = req.body.login;
        let mdp = req.body.mdp;
        let ville = req.body.ville;
        let pays = req.body.pays;
        let numtel = req.body.numtel;
        let email = req.body.email;
        let sexe = req.body.sexe;
        let statut = req.body.statut;
        let dateNaiss = req.body.dateNaiss;
     //Requete insertion
        let sql="INSERT INTO `utilisateur`(`Nom`, `Prenom`, `Login`, `Password`, `DateNaiss`, `Pays`, `Ville`, `Email`, `DateCreation`, `DateDernierConx`, `EtatCompte`, `Role`, `NumTel`,`statut`, `evenement`) VALUES ('" +nom + "', '" + prenom + "', '" + login + "', '" + mdp + "', '" + dateNaiss + "', '" + pays + "', '" + ville + "', '" + email + "', '"+date+"',  '','hor ligne', 'apprenant','" + numtel + "','" + statut + "','" + evenement + "')";
        //Exécution de requete
        db.query(sql,(err,result) =>{
            if(err)
            {
                message='Erreur ajout';
                return message;
            }
           res.redirect('/');
          });//Fin exécution requete
        

    }, //Fin Fonction inscriptions apprenants
//Fonction pour Envoyer les valeurs de formulaire vers table utilisateurs
    
    ajoutformtr: (req, res)=>{
        let dt=new Date();
        let date=dt.getMonth()+"/"+dt.getDate()+"/"+dt.getFullYear();
            //Recupération des valeurs de formulaire
            let message = '';
            let nom = req.body.nom;
            let prenom = req.body.prenom;
            let login = req.body.login;
            let mdp = req.body.mdp;
            let ville = req.body.ville;
            let dateNaiss = req.body.dateNaiss;
            let numtel = req.body.numtel;
            let email = req.body.email;
            let matiere = req.body.matiere;
            let grade = req.body.grade;
            let specialite = req.body.specialite;
        //Requete insertion
        let sql="INSERT INTO `utilisateur`(`Nom`, `Prenom`, `Login`, `Password`, `DateNaiss`,`Ville`, `Email`, `DateCreation`, `DateDernierConx`,  `Role`, `NumTel`, `statut`, `Specialite`) VALUES ('" +nom + "', '" + prenom + "', '" + login + "', '" + mdp + "', '" + dateNaiss + "',  '" + ville + "', '" + email + "', '"+date+"','', 'formateur','" + numtel + "','hors ligne','" + specialite + "')";
       // let sql1="INSERT INTO `f.formateur`(`Specialite`, `grade`, `Matiere` ) VALUES ('" +specialite + "', '" + grade+ "', '" + matiere + "' ) "; 
        //Exécution de requete
            db.query(sql,(err,result) =>{
                if(err)
                {
                    message='Erreur ajout';
                    return message;
                }
            res.redirect('/ListFormateur');
            });
           
    

    }, //Fin Fonction AjoutFormateur

    ModifierApprenantPage: (req,res)=>{
        let id=req.params.id;
        let requete="select * from utilisateur where IDutilisateur="+id;
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.render('Modifier_Apprenant.ejs',{
           // title : "Modifier Personne",
            personne : result[0]
            });
        });
          
    },
    ModifierFormateurPage: (req,res)=>{
        let id=req.params.id;
        let requete="select * from utilisateur where IDutilisateur="+id;
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.render('Modifier_formateur.ejs',{
           // title : "Modifier Personne",
            personne : result[0]
            });
        });
          
    },
    Infosdetail: (req,res)=>{
        let id=req.params.id;
        let requete="select * from utilisateur where IDutilisateur="+id;
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.render('Infosdetail.ejs',{
           // title : "Modifier Personne",
            personne : result[0]
            });
        });
          
    },
    demandes:  (req, res) => {
        let query = "SELECT * FROM `utilisateur` where Role='apprenant'  "; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
      
            res.render('Demandes.ejs', {
                users: result,
            message: ''
        });
    });
          
    },
    editApprenant: (req,res)=>{
        //Initialisation des valeurs de Formulaire
       let id= req.params.id;
       let nom = req.body.nom;
       let prenom = req.body.prenom;
       let login = req.body.login;
       let mdp = req.body.mdp;
       let ville = req.body.ville;
       let pays = req.body.pays;
       let numtel = req.body.numtel;
       let email = req.body.email;
       let sexe = req.body.sexe;
       let dateNaiss = req.body.dateNaiss;

        let requete="UPDATE `utilisateur` SET `Nom`='"+nom+"',`Prenom`='"+prenom+"',`Login`='"+login+"',`Password`='"+mdp+"',`DateNaiss`='"+dateNaiss+"',`Pays`='"+pays+"',`Ville`='"+ville+"',`Email`='"+email+"',`NumTel`='"+numtel+"' WHERE IDutilisateur='"+id+"'";
        
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/Apprenants');
        });
          
    },

    editFormation: (req,res)=>{
        //Initialisation des valeurs de Formulaire
       let id= req.params.id;
       let libelle = req.body.libellet;
       let description = req.body.description;
       

        let requete="UPDATE `formation` SET `LibelleForm`='"+libelle+"',`DescriptionForm`='"+description+"'  WHERE `IDformation`='"+id+"'";
        
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/formation');
        });
          
    },


    ModificationEtat: (req,res)=>{
        //Initialisation des valeurs de Formulaire
       let id= req.params.id;
       let etat = req.body.etat;
     

        let requete="UPDATE `utilisateur` SET `EtatCompte`='"+etat+"' WHERE IDutilisateur='"+id+"'";
        
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/demandes');
        });
          
    },

    editFormateur: (req,res)=>{
        //Initialisation des valeurs de Formulaire
       let id= req.params.id;
       let nom = req.body.nom;
       let prenom = req.body.prenom;
       let login = req.body.login;
       let mdp = req.body.mdp;
       let ville = req.body.ville;
       let pays = req.body.pays;
       let numtel = req.body.numtel;
       let email = req.body.email;
       let sexe = req.body.sexe;
       let dateNaiss = req.body.dateNaiss;

        let requete="UPDATE `utilisateur` SET `Nom`='"+nom+"',`Prenom`='"+prenom+"',`Login`='"+login+"',`Password`='"+mdp+"',`DateNaiss`='"+dateNaiss+"',`Pays`='"+pays+"',`Ville`='"+ville+"',`Email`='"+email+"',`NumTel`='"+numtel+"' WHERE IDutilisateur='"+id+"'";
        
        //Exécution de requete
        db.query(requete,(err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/ListFormateur');
        });
          
    },
    AjoutEvenements: (req, res)=>{
     
        let dt=new Date();
        let date=dt.getMonth()+"/"+dt.getDate()+"/"+dt.getFullYear();
      
      
        //Recupération des valeurs de formulaire
        let message = '';
        let idevent = req.body.idevent;
        let nom = req.body.nom;
        let date_debut = req.body.date_debut;
        let date_fin = req.body.date_fin;
        let dure = req.body.dure;
        let prix = req.body.prix;
        let objet = req.body.objet;
        let formateur = req.body.formateur;
        let information = req.body.information;
        console.log(idevent);
      if(idevent!=null)
      {
        let sql="UPDATE `evenement` SET `NomEvent`='" +nom + "',`DateDebut`='" +date_debut + "',`DateFin`='" +date_fin + "',`Duree`='" +dure + "',`Prix_Event`='" +prix + "',`objet`='" +objet + "',`informations`='" +information + "',`formateur`='" +formateur + "' WHERE `IDevent`='" +idevent + "'";
        db.query(sql,(err,result) =>{
            if(err)
            {
                message='Erreur ajout';
                return message;
            }
           res.redirect('/Evenements');
          });//Fin exécution requete
      }
      else{
     //Requete insertion
        let sql="INSERT INTO `evenement`(`NomEvent`, `DateDebut`, `DateFin`, `Duree`, `Prix_Event`, `objet`, `informations`, `formateur`) VALUES ('" +nom + "', '" + date_debut + "', '" + date_fin + "', '" + dure + "', '" + prix + "', '" + objet + "', '" + information + "', '" + formateur + "')";
        //Exécution de requete
        db.query(sql,(err,result) =>{
            if(err)
            {
                message='Erreur ajout';
                return message;
            }
           res.redirect('/Evenements');
          });//Fin exécution requete
         }
     
        

    },

    ajoutercour: (req, res)=>{
     
       
        let message = '';
          let fichier = req.files.cours;
        
        let name_cour=fichier.name;
      // upload the file to the /public/assets/img directory
      fichier.mv(`./assets/uploads/${name_cour}`, (err ) => {
        if (err) {
            return res.status(500).send(err);
        }
        let evenement = req.body.evenement;
        let titre = req.body.titre;
        let description = req.body.files;
      
     //Requete insertion
        let sql="INSERT INTO `cours`( `NomCours`, `evenement`, `TelechargementCours`) VALUES ('" +titre + "','" +evenement + "','" + name_cour + "')";
        //Exécution de requete
        db.query(sql,(err,result) =>{
            if(err)
            {
                message='Erreur ajout';
                return message;
            }
           res.redirect('/cours');
          });
        
    });
    
},

ModifierCour: (req, res)=>{
     
       
    let message = '';
    let id= req.params.id;
      let fichier = req.files.cours;
    let name_cour=fichier.name;
  // upload the file to the /public/assets/img directory
  fichier.mv(`./assets/uploads/${name_cour}`, (err ) => {
    if (err) {
        return res.status(500).send(err);
    }
    let titre = req.body.titre;
    let description = req.body.files;
  
 //Requete insertion
    let sql="update  `cours` set `NomCours`='" +titre + "', `TelechargementCours`='" + name_cour + "' where IDcours='"+id+"'";
    //Exécution de requete
    db.query(sql,(err,result) =>{
        if(err)
        {
            message='Erreur ajout';
            return message;
        }
       res.redirect('/cours');
      });
    
});

},

 
//Afficher cours
affichercours:  (req, res) => {
    let query = "SELECT * FROM `cours`  "; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
  
        res.render('cours.ejs', {
            cours: result,
        message: ''
    });
});
      
},

};
