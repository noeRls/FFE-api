import { ChessEvent } from '../types/types';
import { fetchDayEvents, fetchEventDetails, fetchMonthEvents } from './events';

it('fetchDayEvents', async () => {
    let events = await fetchDayEvents(3, 10, 2020);
    events = events.sort((e, b) => e.detailLink.localeCompare(b.detailLink))
    expect(events).toMatchSnapshot();
});

describe('fetchEventDetails', () => {
    it('Correctly fetch past event details', async () => {
        const item = await fetchEventDetails({ detailLink: 'FicheTournoi.aspx?Ref=52033'} as ChessEvent);
        expect(item).toMatchSnapshot();
    });

    it('Fetch only participants if results are not available', async () => {
        const item = await fetchEventDetails({ detailLink: 'FicheTournoi.aspx?Ref=53336'} as ChessEvent);
        expect(item).toMatchSnapshot();
    });
});


it('fetchMonthEvents', async () => {
    let events = await fetchMonthEvents(10, 2020);
    events = events.sort((e, b) => e.detailLink.localeCompare(b.detailLink))
    expect(events).toMatchSnapshot();
});

const HTML_RESPONSE_RESULTS_NOT_AVAILABLE_BUT_PLAYER_LIST = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="ctl00_MasterHeader"><meta http-equiv="content-type" content="application/xhtml+xml; charset=utf-8" /><meta name="keywords" /><meta name="description" /><title>
	F&eacute;d&eacute;ration Fran&ccedil;aise des &Eacute;checs
</title><link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600" /><link href="http://fonts.googleapis.com/css?family=Oswald:300,400,700" rel="stylesheet" type="text/css" /><link type="text/css" rel="stylesheet" href="ffe.css?version=6" /><link type="text/css" rel="stylesheet" href="old.css?version=1" /><link rel="shortcut icon" type="image/x-icon" href="images/ffe16.ico" />
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-71022811-1', 'auto');
    ga('send', 'pageview');

  </script>
<script type="text/javascript">
window.$crisp=[];window.CRISP_WEBSITE_ID="47d40bfc-b081-40e5-87cd-d652c585f3c8";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
</script>
</head>
<body>
<div id="menu-haut">
  <a href="Plan.aspx">Plan du site</a> &nbsp;|&nbsp;
  <a href="Default.aspx?Cat=50">Contact</a> &nbsp;|&nbsp;
  <a href="Revues.aspx">Publications</a> &nbsp;|&nbsp;
  <a href="Connect.aspx">Mon Compte</a> &nbsp;|&nbsp;
  <a href="http://clubs.echecs.asso.fr">Gérer son Club</a> &nbsp;|&nbsp;
  <a href="http://admin.echecs.asso.fr">Directeurs de Groupes</a> &nbsp;|&nbsp;
  <a href="Print.aspx" id="ctl00_LinkPrint">Imprimer</a>
</div>  
<div id="ctl00_divheader">
  <div id="header-search">
    <form class="form-search" method=post name=FormJoueur action="ListeJoueurs.aspx?Action=FFE">
      <label class="label-search">Rechercher un joueur</label>
      <input class=input-search type="text" size="12" name="JoueurNom" value="" />
      <input class=input-search type="submit" value="OK" />
    </form>
    <form class="form-search" method=post name=FormClub action="ListeClubs.aspx?Action=CLUB">
      <label class=label-search>Rechercher un club</label>
      <input class=input-search type="text" name="ClubNom" size="12" value="" />
      <input class=input-search type="submit" value="OK" />&nbsp;&nbsp;
    </form>
    <form class="form-search" method=post name=FormActu action="Default.aspx">
      <label class=label-search>Rechercher dans le site</label>
      <input class=input-search type="text" name="ActuFiltre" size="12" value="" />
      <input class=input-search type="submit" value="OK" />&nbsp;&nbsp;
    </form>
      <a href="https://www.facebook.com/ffechecs?fref=ts" target=_blank><img src=images/facebook.png /></a>&nbsp;&nbsp;
      <a href="https://twitter.com/ffechecs" target=_blank><img src=images/twitter.png /></a>
  </div>
  <div id="bandeau">
    <img src="images/bandeau-ffe.png" alt="ffe" title="ffe" />
  </div>
<!-- end #bandeau -->
  <ul id="nav"><li class="current"><a href="Default.aspx">Accueil</a></li><li><a href="#">Découvrir</a><ul><li><a target=_blank href="http://www.echecs.asso.fr/Actu.aspx?Ref=11983">Règles du Jeu</a></li><li><a href="Revues.aspx">Publications</a></li><li><a href="Default.aspx?Cat=41">Histoire des échecs</a></li><li><a target=_blank href="https://photos.ffechecs.org/">Albums photos</a></li><li><a target=_blank href="https://www.youtube.com/channel/UCn6wdVs-gSmZBJXSAWPzf7Q/videos">Vidéos</a></li><li><a target=_blank href="http://echecs.asso.fr/Default.aspx?Cat=60">Grands évènements</a></li><li><a target=_blank href="http://echecs.asso.fr/Actu.aspx?Ref=12995">Streaming</a></li></ul></li><li><a href="#">FFE</a><ul><li><a href="Default.aspx?Cat=12">FFE - Présentation</a></li><li><a href="Ligues.aspx">Ligues</a></li><li><a href="Comites.aspx">Comités</a></li><li><a href="Clubs.aspx">Clubs</a></li><li><a href="Default.aspx?Cat=14">Licences</a></li><li><a href="Joueurs.aspx">Licenciés</a></li><li><a href="Default.aspx?Cat=55">Les effectifs de la F.F.E.</a></li><li><a href="Default.aspx?Cat=13">Siège fédéral</a></li><li><a href="Default.aspx?Cat=35">Commissions-Directions</a></li><li><a href="Default.aspx?Cat=42">Infos fédérales</a></li><li><a href="Default.aspx?Cat=49">Appel à projets</a></li><li><a href="Default.aspx?Cat=54">Centenaire de la FFE</a></li><li><a href="Default.aspx?Cat=50">Contacts</a></li><li><a href="Default.aspx?Cat=48">Elections</a></li></ul></li><li><a href="#">Compétitions</a><ul><li><a href="Calendrier.aspx">Calendrier</a></li><li><a href="Equipes.aspx">Par équipes</a></li><li><a href="Tournois.aspx">Tournois homologués</a></li><li><a href="Default.aspx?Cat=21">Vos opens</a></li><li><a href="Default.aspx?Cat=16">Ch. France Jeunes</a></li><li><a href="Default.aspx?Cat=15">Ch. France</a></li><li><a href="Default.aspx?Cat=28">Challenge BLitz FFE</a></li><li><a href="Default.aspx?Cat=58">Elo Rapide FFE </a></li><li><a target=_blank href="http://ffechecs.org">Portail des événements</a></li></ul></li><li><a href="#">Secteurs</a><ul><li><a href="Default.aspx?Cat=8">Haut niveau et titrés</a></li><li><a href="Default.aspx?Cat=7">Secteur féminin</a></li><li><a target=_blank href="http://scolaires.ffechecs.fr">Scolaires</a></li><li><a target=_blank href="http://handi.ffechecs.fr">Handicap</a></li><li><a target=_blank href="https://dna.ffechecs.fr/">Arbitrage</a></li><li><a href="Default.aspx?Cat=9">Discipline</a></li><li><a href="Default.aspx?Cat=23">Vos Stages</a></li></ul></li><li><a href="#">Documents</a><ul><li><a href="Default.aspx?Cat=17">Règlements</a></li><li><a href="Default.aspx?Cat=20">Comptes rendus</a></li><li><a href="Default.aspx?Cat=26">Documents Clubs</a></li><li><a href="Default.aspx?Cat=46">Ressources pédagogiques</a></li><li><a target=_blank href="http://echecs.asso.fr/Actu.aspx?Ref=12999">Abonnement Echec & Mat Junior</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Default.aspx?Cat=61">Masterclasses en replay</a></li><li><a target=_blank href="http://echecs.asso.fr/Default.aspx?Cat=63">Prévention des violences</a></li></ul></li><li><a href="#">Développement</a><ul><li><a href="Default.aspx?Cat=6">Formation</a></li><li><a href="Default.aspx?Cat=39">Nouveaux Publics</a></li><li><a href="Default.aspx?Cat=40">Semaines Thématiques</a></li><li><a href="Default.aspx?Cat=2">Annonces Emploi</a></li><li><a href="Default.aspx?Cat=24">Annonces Clubs</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Default.aspx?Cat=57">Protection judiciaire de la Jeunesse</a></li><li><a href="Default.aspx?Cat=49">Appel à projets</a></li><li><a href="Default.aspx?Cat=59">Semaine au féminin</a></li></ul></li><li><a href="Default.aspx?Cat=36">Partenaires</a><ul><li><a target=_blank href="http://www.profession-sport-loisirs.fr">Profession Sports & Loisirs</a></li><li><a target=_blank href="http://www.echiquierdelareussite.org">L'échiquier de la réussite</a></li><li><a target=_blank href="http://www.olibris.fr">Olibris</a></li><li><a target=_blank href="http://www.ccas.fr">C.C.A.S.</a></li><li><a target=_blank href="http://www.ucpa-vacances.com">U.C.P.A.</a></li><li><a target=_blank href="http://www.univ-lyon1.fr">U.C.B. Lyon I</a></li><li><a target=_blank href="http://www.chateauvillandry.fr">Le Château de Villandry</a></li><li><a target=_blank href="https://www.apf.asso.fr/">A.P.F.</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Actu.aspx?Ref=10975">D.P.J.J.</a></li><li><a target=_blank href="https://unss.org/">U.N.S.S.</a></li><li><a target=_blank href="https://usep.org/">U.S.E.P.</a></li><li><a target=_blank href="http://www.aefe.fr/">A.E.F.E.</a></li><li><a target=_blank href="http://www.ffse.fr/">F.F.S.E.</a></li><li><a target=_blank href="https://www.sportetcitoyennete.com/">Sport et Citoyenneté</a></li><li><a target=_blank href="http://www.femixsports.fr/">Femix'Sports</a></li><li><a target=_blank href="https://plateforme.yatus.org/">YATUS</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Actu.aspx?Ref=13000">VARIANTES</a></li><li><a target=_blank href="https://www.amf.asso.fr/">A.M.F.</a></li></ul></li><li><a href="http://echecs.asso.fr/Actu.aspx?Ref=10771">Boutique</a></li></ul>
<!-- end #menu -->
  
<!-- end #pub -->
</div>
<!-- end #header -->
<div id="page">
  <div id="page-bgtop">
    <div id="page-bgbtm">
      
<div id="page-titre">
  <span id="ctl00_ContentPlaceHolderMain_LabelTitre" class="actu-titre">Tournois de la Ligue de FFE</span>
  <hr class=rubrique />
</div>
<div class="page-mid">
  <table id="ctl00_ContentPlaceHolderMain_TableTournoi" cellspacing="1" cellpadding="4" class="page">
	<tr class="tableau_violet_f">
		<td colspan="2"><span id="ctl00_ContentPlaceHolderMain_LabelNom">5ème Toutes Rondes de Chevigny St Sauveur (-2200 Elo)</span></td>
	</tr>
	<tr class="tableau_magenta">
		<td colspan="2" align="center"><span id="ctl00_ContentPlaceHolderMain_LabelLieu">21 - CHEVIGNY SAINT SAUVEUR</span></td>
	</tr>
	<tr class="tableau_violet_c" valign="top">
		<td align="right" width="30%">Dates : </td>
		<td width="70%"><span id="ctl00_ContentPlaceHolderMain_LabelDates">samedi 02 octobre 2021 - dimanche 03 octobre 2021</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowEloFide" valign="top" Class="tableau_blanc">
		<td align="right">Prise en compte Elo FIDE : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelEloFide">FIDE Novembre 2021</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowHomologuePar" valign="top" Class="tableau_violet_c">
		<td align="right">Homologué par : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelHomologuePar">FFE</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowNbrRondes" valign="top" Class="tableau_blanc">
		<td align="right">Nombre de rondes : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelNbrRondes">5</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowCadence" valign="top" Class="tableau_violet_c">
		<td align="right">Cadence : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelCadence">60' + [30'']</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowAppariements" valign="top" Class="tableau_blanc">
		<td align="right">Appariements : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelAppariements">Toutes Rondes</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowOrganisateur" valign="top" Class="tableau_violet_c">
		<td align="right">Organisateur : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelOrganisateur">Esbarres Bonnencontre Echecs</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowArbitre" valign="top" Class="tableau_blanc">
		<td align="right">Arbitre : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelArbitre">BOILEAU Mickael</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowAdresse" valign="top" Class="tableau_violet_c">
		<td align="right">Adresse : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelAdresse">Centre Social et Culturel Pierre Perret 26 route de Bressey 21800 Chevigny St Sauveur</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowContact" valign="top" Class="tableau_blanc">
		<td align="right">Contact : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelContact">esbarresbonnencoontreechecs@gmail.com ou Tanguy Ghirotto 06.16.43.39.17.</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowPrixTotal" valign="top" Class="tableau_violet_c">
		<td align="right">Total des prix : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelPrixTotal">400 &euro;</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowPrix1" valign="top" Class="tableau_blanc">
		<td align="right">1<sup>er</sup> Prix : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelPrix1">200 &euro;</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowPrix2" valign="top" Class="tableau_violet_c">
		<td align="right">2<sup>ème</sup> Prix : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelPrix2">100 &euro;</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowPrix3" valign="top" Class="tableau_blanc">
		<td align="right" width="200">3<sup>ème</sup> Prix : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelPrix3">50 &euro;</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowInscriptionSenior" valign="top" Class="tableau_violet_c">
		<td align="right">Inscription Senior : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelInscriptionSenior">20 &euro; (30 &euro; à partir du 29/09/2021)</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowInscriptionJeune" valign="top" Class="tableau_blanc">
		<td align="right">Inscription Jeunes : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelInscriptionJeune">10 &euro; (15 &euro; à partir du 29/09/2021)</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowAnnonce" valign="top" Class="tableau_violet_c">
		<td align="right">Annonce : </td>
		<td><span id="ctl00_ContentPlaceHolderMain_LabelAnnonce">Tournoi d'échecs de Chevigny St Sauveur (21) dans l'agglomération dijonnaise.<br>* Un Open de 5 rondes associé à un toutes rondes pour les 6 plus forts Elo de la liste d'inscription.<br>* Les deux tournois sont réservés aux Elo inférieurs à 2200.<br><br>CE TOURNOI RÉUNIT LES 6 PLUS FORTS ELO DE L'OPEN.<br><br>Buvette et restauration sur place.<br>Salle d'analyse. Parking privé.<br>PASS SANITAIRE OBLIGATOIRE, tournoi limité aux 40 premiers inscrits, ne tardez pas !<br><br>Programme :<br>Samedi 2 octobre. Pointages et dernières inscriptions 12h00-12h50.<br>Ronde 1 à 13h00. Ronde 2 à 16h30.<br>Dimanche 3 octobre. Ronde 3 à 9h30. Ronde 4 à 13h00 et Ronde 5 à 16h30 suivi de la remise des prix.<br><br>Prix au général. Invitation gratuite à l'édition 2022 du vainqueur en plus de son prix de 250€.</span></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowPdf" valign="top" Class="tableau_blanc">
		<td align="right">Document complémentaire : </td>
		<td><a id="ctl00_ContentPlaceHolderMain_LinkPdf" class="lien_texte" href="Tournois/Id/53336/53336.pdf" target="_blank">Annonce de l'Organisateur (pdf)</a></td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowGames" Class="tableau_magenta">
		<td align="center" colspan="2">
        
        <span id="ctl00_ContentPlaceHolderMain_LabelSeparator1">&nbsp;</span>
        
        <span id="ctl00_ContentPlaceHolderMain_Labelseparator">&nbsp;</span>
        
      </td>
	</tr>
	<tr id="ctl00_ContentPlaceHolderMain_RowResultats" Class="tableau_violet_f">
		<td align="center" colspan="2">&nbsp;
        
          <a id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl00_LinkResultats" class="lien_titre" href="Resultats.aspx?URL=Tournois/Id/53336/53336&amp;Action=Ls">Participants</a>
        &nbsp;|&nbsp;
          <a id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl02_LinkResultats" class="lien_titre" href="Resultats.aspx?URL=Tournois/Id/53336/53336&amp;Action=Pairing">Appariements</a>
        &nbsp;|&nbsp;
          <a id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl04_LinkResultats" class="lien_titre" href="Resultats.aspx?URL=Tournois/Id/53336/53336&amp;Action=Berger">Grille Berger</a>
        &nbsp;|&nbsp;
          <a id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl06_LinkResultats" class="lien_titre" href="Resultats.aspx?URL=Tournois/Id/53336/53336&amp;Action=Fide">Fide</a>
        &nbsp;|&nbsp;
          <a id="ctl00_ContentPlaceHolderMain_RepeaterResultats_ctl08_LinkResultats" class="lien_titre" href="Resultats.aspx?URL=Tournois/Id/53336/53336&amp;Action=Stats">Stats</a>
        
      </td>
	</tr>
</table>

</div>

    </div>
  </div>
</div>
<!-- end #page -->
<div id="ctl00_divfooter">
<div id="footer">
  <p>
    <strong>Copyright  © 2015 FFE | 
    <a href="http://www.echecs.asso.fr/Ag/Mentions_legales_FFE.pdf">Mentions légales</a> |
    <a href="http://www.echecs.asso.fr/Ag/RGPD.pdf">Protection des données</a></strong><br>
    Fédération Française des Echecs | <span id="ctl00_LabelAdresse">6 rue de l'Eglise | 92600 ASNIERES SUR SEINE</span> <br>
    tél : <span id="ctl00_LabelTel">01 39 44 65 80</span> | contact : 
    <a href="mailto:contact@ffechecs.fr">contact@ffechecs.fr</a> | webmestre : 
    <a href="mailto:erick.mouret@echecs.asso.fr">erick.mouret@echecs.asso.fr</a>
  </p><br>
  <p id="logo-ffe"><img src="images/logo-ffe.png" /></p>
</div>
</div>
</body>
</html>
`

const HTML_RESPONSE_PLAYERS = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="ctl00_MasterHeader"><meta http-equiv="content-type" content="application/xhtml+xml; charset=utf-8" /><meta name="keywords" /><meta name="description" /><title>
	F&eacute;d&eacute;ration Fran&ccedil;aise des &Eacute;checs
</title><link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600" /><link href="http://fonts.googleapis.com/css?family=Oswald:300,400,700" rel="stylesheet" type="text/css" /><link type="text/css" rel="stylesheet" href="ffe.css?version=6" /><link type="text/css" rel="stylesheet" href="old.css?version=1" /><link rel="shortcut icon" type="image/x-icon" href="images/ffe16.ico" />
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-71022811-1', 'auto');
    ga('send', 'pageview');

  </script>
<script type="text/javascript">
window.$crisp=[];window.CRISP_WEBSITE_ID="47d40bfc-b081-40e5-87cd-d652c585f3c8";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
</script>
</head>
<body>
<div id="menu-haut">
  <a href="Plan.aspx">Plan du site</a> &nbsp;|&nbsp;
  <a href="Default.aspx?Cat=50">Contact</a> &nbsp;|&nbsp;
  <a href="Revues.aspx">Publications</a> &nbsp;|&nbsp;
  <a href="Connect.aspx">Mon Compte</a> &nbsp;|&nbsp;
  <a href="http://clubs.echecs.asso.fr">Gérer son Club</a> &nbsp;|&nbsp;
  <a href="http://admin.echecs.asso.fr">Directeurs de Groupes</a> &nbsp;|&nbsp;
  <a href="Print.aspx" id="ctl00_LinkPrint">Imprimer</a>
</div>  
<div id="ctl00_divheader">
  <div id="header-search">
    <form class="form-search" method=post name=FormJoueur action="ListeJoueurs.aspx?Action=FFE">
      <label class="label-search">Rechercher un joueur</label>
      <input class=input-search type="text" size="12" name="JoueurNom" value="" />
      <input class=input-search type="submit" value="OK" />
    </form>
    <form class="form-search" method=post name=FormClub action="ListeClubs.aspx?Action=CLUB">
      <label class=label-search>Rechercher un club</label>
      <input class=input-search type="text" name="ClubNom" size="12" value="" />
      <input class=input-search type="submit" value="OK" />&nbsp;&nbsp;
    </form>
    <form class="form-search" method=post name=FormActu action="Default.aspx">
      <label class=label-search>Rechercher dans le site</label>
      <input class=input-search type="text" name="ActuFiltre" size="12" value="" />
      <input class=input-search type="submit" value="OK" />&nbsp;&nbsp;
    </form>
      <a href="https://www.facebook.com/ffechecs?fref=ts" target=_blank><img src=images/facebook.png /></a>&nbsp;&nbsp;
      <a href="https://twitter.com/ffechecs" target=_blank><img src=images/twitter.png /></a>
  </div>
  <div id="bandeau">
    <img src="images/bandeau-ffe.png" alt="ffe" title="ffe" />
  </div>
<!-- end #bandeau -->
  <ul id="nav"><li class="current"><a href="Default.aspx">Accueil</a></li><li><a href="#">Découvrir</a><ul><li><a target=_blank href="http://www.echecs.asso.fr/Actu.aspx?Ref=11983">Règles du Jeu</a></li><li><a href="Revues.aspx">Publications</a></li><li><a href="Default.aspx?Cat=41">Histoire des échecs</a></li><li><a target=_blank href="https://photos.ffechecs.org/">Albums photos</a></li><li><a target=_blank href="https://www.youtube.com/channel/UCn6wdVs-gSmZBJXSAWPzf7Q/videos">Vidéos</a></li><li><a target=_blank href="http://echecs.asso.fr/Default.aspx?Cat=60">Grands évènements</a></li><li><a target=_blank href="http://echecs.asso.fr/Actu.aspx?Ref=12995">Streaming</a></li></ul></li><li><a href="#">FFE</a><ul><li><a href="Default.aspx?Cat=12">FFE - Présentation</a></li><li><a href="Ligues.aspx">Ligues</a></li><li><a href="Comites.aspx">Comités</a></li><li><a href="Clubs.aspx">Clubs</a></li><li><a href="Default.aspx?Cat=14">Licences</a></li><li><a href="Joueurs.aspx">Licenciés</a></li><li><a href="Default.aspx?Cat=55">Les effectifs de la F.F.E.</a></li><li><a href="Default.aspx?Cat=13">Siège fédéral</a></li><li><a href="Default.aspx?Cat=35">Commissions-Directions</a></li><li><a href="Default.aspx?Cat=42">Infos fédérales</a></li><li><a href="Default.aspx?Cat=49">Appel à projets</a></li><li><a href="Default.aspx?Cat=54">Centenaire de la FFE</a></li><li><a href="Default.aspx?Cat=50">Contacts</a></li><li><a href="Default.aspx?Cat=48">Elections</a></li></ul></li><li><a href="#">Compétitions</a><ul><li><a href="Calendrier.aspx">Calendrier</a></li><li><a href="Equipes.aspx">Par équipes</a></li><li><a href="Tournois.aspx">Tournois homologués</a></li><li><a href="Default.aspx?Cat=21">Vos opens</a></li><li><a href="Default.aspx?Cat=16">Ch. France Jeunes</a></li><li><a href="Default.aspx?Cat=15">Ch. France</a></li><li><a href="Default.aspx?Cat=28">Challenge BLitz FFE</a></li><li><a href="Default.aspx?Cat=58">Elo Rapide FFE </a></li><li><a target=_blank href="http://ffechecs.org">Portail des événements</a></li></ul></li><li><a href="#">Secteurs</a><ul><li><a href="Default.aspx?Cat=8">Haut niveau et titrés</a></li><li><a href="Default.aspx?Cat=7">Secteur féminin</a></li><li><a target=_blank href="http://scolaires.ffechecs.fr">Scolaires</a></li><li><a target=_blank href="http://handi.ffechecs.fr">Handicap</a></li><li><a target=_blank href="https://dna.ffechecs.fr/">Arbitrage</a></li><li><a href="Default.aspx?Cat=9">Discipline</a></li><li><a href="Default.aspx?Cat=23">Vos Stages</a></li></ul></li><li><a href="#">Documents</a><ul><li><a href="Default.aspx?Cat=17">Règlements</a></li><li><a href="Default.aspx?Cat=20">Comptes rendus</a></li><li><a href="Default.aspx?Cat=26">Documents Clubs</a></li><li><a href="Default.aspx?Cat=46">Ressources pédagogiques</a></li><li><a target=_blank href="http://echecs.asso.fr/Actu.aspx?Ref=12999">Abonnement Echec & Mat Junior</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Default.aspx?Cat=61">Masterclasses en replay</a></li><li><a target=_blank href="http://echecs.asso.fr/Default.aspx?Cat=63">Prévention des violences</a></li></ul></li><li><a href="#">Développement</a><ul><li><a href="Default.aspx?Cat=6">Formation</a></li><li><a href="Default.aspx?Cat=39">Nouveaux Publics</a></li><li><a href="Default.aspx?Cat=40">Semaines Thématiques</a></li><li><a href="Default.aspx?Cat=2">Annonces Emploi</a></li><li><a href="Default.aspx?Cat=24">Annonces Clubs</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Default.aspx?Cat=57">Protection judiciaire de la Jeunesse</a></li><li><a href="Default.aspx?Cat=49">Appel à projets</a></li><li><a href="Default.aspx?Cat=59">Semaine au féminin</a></li></ul></li><li><a href="Default.aspx?Cat=36">Partenaires</a><ul><li><a target=_blank href="http://www.profession-sport-loisirs.fr">Profession Sports & Loisirs</a></li><li><a target=_blank href="http://www.echiquierdelareussite.org">L'échiquier de la réussite</a></li><li><a target=_blank href="http://www.olibris.fr">Olibris</a></li><li><a target=_blank href="http://www.ccas.fr">C.C.A.S.</a></li><li><a target=_blank href="http://www.ucpa-vacances.com">U.C.P.A.</a></li><li><a target=_blank href="http://www.univ-lyon1.fr">U.C.B. Lyon I</a></li><li><a target=_blank href="http://www.chateauvillandry.fr">Le Château de Villandry</a></li><li><a target=_blank href="https://www.apf.asso.fr/">A.P.F.</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Actu.aspx?Ref=10975">D.P.J.J.</a></li><li><a target=_blank href="https://unss.org/">U.N.S.S.</a></li><li><a target=_blank href="https://usep.org/">U.S.E.P.</a></li><li><a target=_blank href="http://www.aefe.fr/">A.E.F.E.</a></li><li><a target=_blank href="http://www.ffse.fr/">F.F.S.E.</a></li><li><a target=_blank href="https://www.sportetcitoyennete.com/">Sport et Citoyenneté</a></li><li><a target=_blank href="http://www.femixsports.fr/">Femix'Sports</a></li><li><a target=_blank href="https://plateforme.yatus.org/">YATUS</a></li><li><a target=_blank href="http://www.echecs.asso.fr/Actu.aspx?Ref=13000">VARIANTES</a></li><li><a target=_blank href="https://www.amf.asso.fr/">A.M.F.</a></li></ul></li><li><a href="http://echecs.asso.fr/Actu.aspx?Ref=10771">Boutique</a></li></ul>
<!-- end #menu -->
  
<!-- end #pub -->
</div>
<!-- end #header -->
<div id="page">
  <div id="page-bgtop">
    <div id="page-bgbtm">
      

<table id=TablePage cellSpacing=6 cellPadding=2 Class=page >
  <tr>
    <td>
<div align=center><div align=center>
<table width=800 cellpadding=2 cellspacing=0 style=border-collapse:collapse;>
 <tr class=papi_titre>
  <td colspan=8 align=center>5ème Toutes Rondes de Chevigny St Sauveur (-2200 <br />Liste des participants</td>
 </tr>
 <tr class=papi_liste_t>
  <td class=papi_r>Nr</td>
  <td class=papi_r>&nbsp;</td>
  <td class=papi_l>Nom</td>
  <td class=papi_c>Elo</td>
  <td class=papi_c>Cat.</td>
  <td class=papi_c>Fede</td>
  <td class=papi_c>Ligue</td>
  <td class=papi_l>Club</td>
 </tr>
 <tr class=papi_liste_f>
  <td class=papi_r>1</td>
  <td class=papi_r>&nbsp;</td>
  <td class=papi_l>BERNARD Olivier</td>
  <td class=papi_r>1781&nbsp;F</td>
  <td class=papi_c>SepM</td>
  <td class=papi_c><img border=0 src=flags/FRA.GIF height=15px /></td>
  <td class=papi_c>BFC</td>
  <td class=papi_l>Macon Echecs</td>
 </tr>
 <tr class=papi_liste_c>
  <td class=papi_r>2</td>
  <td class=papi_r>&nbsp;</td>
  <td class=papi_l>CHIFFOT Nicolas</td>
  <td class=papi_r>1941&nbsp;F</td>
  <td class=papi_c>SenM</td>
  <td class=papi_c><img border=0 src=flags/CAN.GIF height=15px /></td>
  <td class=papi_c>BFC</td>
  <td class=papi_l>Esbarres Bonnencontre Echecs</td>
 </tr>
 <tr class=papi_liste_f>
  <td class=papi_r>3</td>
  <td class=papi_r>&nbsp;</td>
  <td class=papi_l>GHIROTTO Tanguy</td>
  <td class=papi_r>1822&nbsp;F</td>
  <td class=papi_c>SenM</td>
  <td class=papi_c><img border=0 src=flags/FRA.GIF height=15px /></td>
  <td class=papi_c>BFC</td>
  <td class=papi_l>Esbarres Bonnencontre Echecs</td>
 </tr>
 <tr class=papi_liste_c>
  <td class=papi_r>4</td>
  <td class=papi_r>&nbsp;</td>
  <td class=papi_l>MATHEZ Florian</td>
  <td class=papi_r>1938&nbsp;F</td>
  <td class=papi_c>CadM</td>
  <td class=papi_c><img border=0 src=flags/FRA.GIF height=15px /></td>
  <td class=papi_c>EST</td>
  <td class=papi_l>Mulhouse Philidor</td>
 </tr>
 <tr class=papi_liste_f>
  <td class=papi_r>5</td>
  <td class=papi_r>&nbsp;</td>
  <td class=papi_l>RACLE Valentin</td>
  <td class=papi_r>2148&nbsp;F</td>
  <td class=papi_c>SenM</td>
  <td class=papi_c><img border=0 src=flags/FRA.GIF height=15px /></td>
  <td class=papi_c>BFC</td>
  <td class=papi_l>Charolais Brionnais Echec et Mat</td>
 </tr>
 <tr class=papi_liste_c>
  <td class=papi_r>6</td>
  <td class=papi_r>&nbsp;</td>
  <td class=papi_l>RAHI William</td>
  <td class=papi_r>1773&nbsp;F</td>
  <td class=papi_c>SenM</td>
  <td class=papi_c><img border=0 src=flags/FRA.GIF height=15px /></td>
  <td class=papi_c>BFC</td>
  <td class=papi_l>Club Universitaire Bourgogne Echecs - CUBE</td>
 </tr>
</table>
</div>
</div>
<div align=center>
  <p>
    
  </p>
</div>
    </td>
  </tr>
</table>


    </div>
  </div>
</div>
<!-- end #page -->
<div id="ctl00_divfooter">
<div id="footer">
  <p>
    <strong>Copyright  © 2015 FFE | 
    <a href="http://www.echecs.asso.fr/Ag/Mentions_legales_FFE.pdf">Mentions légales</a> |
    <a href="http://www.echecs.asso.fr/Ag/RGPD.pdf">Protection des données</a></strong><br>
    Fédération Française des Echecs | <span id="ctl00_LabelAdresse">6 rue de l'Eglise | 92600 ASNIERES SUR SEINE</span> <br>
    tél : <span id="ctl00_LabelTel">01 39 44 65 80</span> | contact : 
    <a href="mailto:contact@ffechecs.fr">contact@ffechecs.fr</a> | webmestre : 
    <a href="mailto:erick.mouret@echecs.asso.fr">erick.mouret@echecs.asso.fr</a>
  </p><br>
  <p id="logo-ffe"><img src="images/logo-ffe.png" /></p>
</div>
</div>
</body>
</html>
`