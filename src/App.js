import React from 'react';
import Fade from 'react-reveal/Fade';
import {useEffect, useState, useReducer} from 'react';
import './App.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TulostaKysymykset1 from './TulostaKysymykset1';
import uuid from 'react-uuid';
import MuokkaaKysymyksiä from './MuokkaaKysymyksiä';
import axios from 'axios'; //serverin käyttöä varten
import TulostaKysymyksetUusi from './TulostaKysymyksetUusi'; //aiempi testauskopio

// Kehitettävää: aktiivisen tentin buttonille eri väri
// Kysymyskomponentti?
// reducer omaan tiedostoon?
// Muuttujien nimien selkeytys
// Kommentointia
// Hookit, onBlur
// tyhjää muisti - painike
// Tentin lisäys (propmtti pois reducerista)

function App() {

  const [data, setData]=useState([])
  const [data2, setData2]=useState([])//Serveriä varten
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [dataAlustettu2, setDataAlustettu2] = useState(false)//Serveriä varten

  const [palautettu, setPalautettu] = useState(false)
  const [tenttiValinta, settenttiValinta] = useState(0)
  const [näkymä, setNäkymä] = useState(1)

  //Alkuperäinen taulukko kyselyistä ja niiden vastauksista
  const kyselyt = [
    {uid: uuid(), nimi: "Numerovisa", kysely: [
      {uid: uuid(), kysymys: "Kuinka monta ihmistä on käynyt kuussa?", vastaukset: [
        {uid: uuid(), vastaus: "0", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "12", valittu: false, oikea: true}, 
        {uid: uuid(), vastaus: "15", valittu: false, oikea: false}
        ]},
      {uid: uuid(), kysymys: "Kuinka monta sanaa Potter-kirjasarjan suomennoksissa on yhteensä?", vastaukset: [
        {uid: uuid(), vastaus: "857 911", valittu: false, oikea: true}, 
        {uid: uuid(), vastaus: "955 543", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "1 100 438", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "1 204 539", valittu: false, oikea: false}
        ]},
      {uid: uuid(), kysymys: "Mikä seuraavista luvuista on lähinnä Tanskan asukasmäärää?", vastaukset: [
        {uid: uuid(), vastaus: "5,2 miljoonaa", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "5,6 miljoonaa", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "5,8 miljoonaa", valittu: false, oikea: true}
        ]}]
    },
    {uid: uuid(), nimi: "Kirjainvisa", kysely: [
      {uid: uuid(), kysymys: "Mikä YMCA on suomeksi?", vastaukset: [
          {uid: uuid(), vastaus: "YMKY", valittu: false, oikea: false}, 
          {uid: uuid(), vastaus: "NMKY", valittu: false, oikea: true}, 
          {uid: uuid(), vastaus: "MNKY", valittu: false, oikea: false}
        ]},
        {uid: uuid(), kysymys: "Mikä seuraavista on GIF?", vastaukset: [
          {uid: uuid(), vastaus: "graph iteration format", valittu: false, oikea: false}, 
          {uid: uuid(), vastaus: "graphics interchange format", valittu: false, oikea: true}, 
          {uid: uuid(), vastaus: "george iliott format ", valittu: false, oikea: false}
        ]},
        {uid: uuid(), kysymys: "Kuka on oikea Ben?", vastaukset: [
          {uid: uuid(), vastaus: "Ben Zysgowicz", valittu: false, oikea: false}, 
          {uid: uuid(), vastaus: "Ben Zyscowicz", valittu: false, oikea: true}, 
          {uid: uuid(), vastaus: "Ben Zyskowicz", valittu: false, oikea: false},
          {uid: uuid(), vastaus: "Ben Zysćowicz", valittu: false, oikea: false}
        ]}]
      },
      {uid: uuid(), nimi: "Merkkivisa", kysely: [
        {uid: uuid(), kysymys: "Mikä seuraavista shakkipelin merkinnöistä tarkoittaa 'arveluttava siirto, mutta ei suoraan osoitettavissa virheeksi'?", vastaukset: [
            {uid: uuid(), vastaus: "?", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "??", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "?!", valittu: false, oikea: true},
            {uid: uuid(), vastaus: "!?", valittu: false, oikea: false}
           ]},
          {uid: uuid(), kysymys: "Mikä ‽ on englanninkieliseltä nimeltään?", vastaukset: [
            {uid: uuid(), vastaus: "Interrobang", valittu: false, oikea: true}, 
            {uid: uuid(), vastaus: "Sulivabang", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "Guessbang", valittu: false, oikea: false}
          ]},
          {uid: uuid(), kysymys: "Mitä matemaattinen merkki ∂ tarkoittaa?", vastaukset: [
            {uid: uuid(), vastaus: "Tyhjä joukko", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "Normaali aliryhmä", valittu: false, oikea: true}, 
            {uid: uuid(), vastaus: "Gradientti", valittu: false, oikea: false},
            {uid: uuid(), vastaus: "Osittaisderivaatta", valittu: false, oikea: false}
          ]}
        ]
      }
    ]

  //data serverin datan muodostamista/testaamista varten
  //dataa käsitellään kuitenkin kyselyt listan kautta
  const kyselyt2 = 
    [{uid: uuid(), nimi: "Numerovisa testi", kysely: [
      {uid: uuid(), kysymys: "Kuinka monta ihmistä on käynyt kuussa?", vastaukset: [
        {uid: uuid(), vastaus: "0", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "12", valittu: false, oikea: true}, 
        {uid: uuid(), vastaus: "15", valittu: false, oikea: false}
        ]},
      {uid: uuid(), kysymys: "Kuinka monta sanaa Potter-kirjasarjan suomennoksissa on yhteensä?", vastaukset: [
        {uid: uuid(), vastaus: "857 911", valittu: false, oikea: true}, 
        {uid: uuid(), vastaus: "955 543", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "1 100 438", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "1 204 539", valittu: false, oikea: false}
        ]},
      {uid: uuid(), kysymys: "Mikä seuraavista luvuista on lähinnä Tanskan asukasmäärää?", vastaukset: [
        {uid: uuid(), vastaus: "5,2 miljoonaa", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "5,6 miljoonaa", valittu: false, oikea: false}, 
        {uid: uuid(), vastaus: "5,8 miljoonaa", valittu: false, oikea: true}
        ]}
      ]
    },
      {uid: uuid(), nimi: "Kirjainvisa", kysely: [
        {uid: uuid(), kysymys: "Mikä YMCA on suomeksi?", vastaukset: [
          {uid: uuid(), vastaus: "YMKY", valittu: false, oikea: false}, 
          {uid: uuid(), vastaus: "NMKY", valittu: false, oikea: true}, 
          {uid: uuid(), vastaus: "MNKY", valittu: false, oikea: false}
        ]},
        {uid: uuid(), kysymys: "Mikä seuraavista on GIF?", vastaukset: [
          {uid: uuid(), vastaus: "graph iteration format", valittu: false, oikea: false}, 
          {uid: uuid(), vastaus: "graphics interchange format", valittu: false, oikea: true}, 
          {uid: uuid(), vastaus: "george iliott format ", valittu: false, oikea: false}
        ]},
        {uid: uuid(), kysymys: "Kuka on oikea Ben?", vastaukset: [
          {uid: uuid(), vastaus: "Ben Zysgowicz", valittu: false, oikea: false}, 
          {uid: uuid(), vastaus: "Ben Zyscowicz", valittu: false, oikea: true}, 
          {uid: uuid(), vastaus: "Ben Zyskowicz", valittu: false, oikea: false},
          {uid: uuid(), vastaus: "Ben Zysćowicz", valittu: false, oikea: false}
        ]}
      ]
    },
      {uid: uuid(), nimi: "Merkkivisa", kysely: [
        {uid: uuid(), kysymys: "Mikä seuraavista shakkipelin merkinnöistä tarkoittaa 'arveluttava siirto, mutta ei suoraan osoitettavissa virheeksi'?", vastaukset: [
            {uid: uuid(), vastaus: "?", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "??", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "?!", valittu: false, oikea: true},
            {uid: uuid(), vastaus: "!?", valittu: false, oikea: false}
          ]},
          {uid: uuid(), kysymys: "Mikä ‽ on englanninkieliseltä nimeltään?", vastaukset: [
            {uid: uuid(), vastaus: "Interrobang", valittu: false, oikea: true}, 
            {uid: uuid(), vastaus: "Sulivabang", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "Guessbang", valittu: false, oikea: false}
          ]},
          {uid: uuid(), kysymys: "Mitä matemaattinen merkki ∂ tarkoittaa?", vastaukset: [
            {uid: uuid(), vastaus: "Tyhjä joukko", valittu: false, oikea: false}, 
            {uid: uuid(), vastaus: "Normaali aliryhmä", valittu: false, oikea: true}, 
            {uid: uuid(), vastaus: "Gradientti", valittu: false, oikea: false},
            {uid: uuid(), vastaus: "Osittaisderivaatta", valittu: false, oikea: false}
        ]}
      ]
    }
  ]

  // Alustetaan state kyselyn avulla
  const [state, dispatch] = useReducer(reducer, kyselyt);
          
  // useEffect(()=>{
  //   ////////////////////////////POST
  //   const createData = async () => {
  //     try{
  //       let result = await axios.post("http://localhost:3001/kyselyt", kyselyt2)
  //       dispatch({type: "INIT_DATA", data: kyselyt2})
  //       setData2(kyselyt2)
  //       setDataAlustettu2(true)
  //     }
  //     catch(exception){
  //       alert("Tietokannan alustaminen epäonnistui (Post)")
  //     }
  //   }
  //   /////////////////////////////GET
  //   const fetchData = async () => {
  //     try{
  //       let result = await axios.get("http://localhost:3001/kyselyt")
  //       if (result.data.lenght > 0){
  //         dispatch({type: "INIT_DATA", data: result.data})
  //         setData2(result.data);
  //         setDataAlustettu2(true)
  //       }else{
  //         throw("Tietokannan alustaminen epäonnistui (Get)") 
  //       }
  //     }
  //     catch(exception){
  //       createData();
  //       console.log(exception)
  //     }
  //   }
  //   fetchData();
  // },[])

  ////////////////////////////////PUT
  // useEffect(() => {
  //   const updateData = async () => {
  //     try{
  //       //Nyt state päivitetään staten mukaan
  //       //setData(state)
  //       let result = await axios.put("http://localhost:3001/kyselyt", state)
  //     }
  //     catch(exception){
  //       console.log("Dataa ei onnistuttu päivittämään.")
  //     }
  //   }
  //   if(dataAlustettu){
  //     updateData();
  //   }
  // },[state])
    

  // localSotragen data-avaimena on "data"
  useEffect(() => {
    let jemma = window.localStorage;
    let tempData = JSON.parse(jemma.getItem("data"))
    if (tempData == null) {
      jemma.setItem("data", JSON.stringify(kyselyt))
      tempData = kyselyt
    } 
    setData(tempData);
    setDataAlustettu(true)
  },[])


  // Staten alustuksen tarkistus
  useEffect(() => {
    if (dataAlustettu) {
      window.localStorage.setItem("data", JSON.stringify(state))
    }
  }, [state])

  //Asetetaan valitun checkboxin tilan (event) mukaan käyttäjän vastaus indeksien avulla
  const vastausValittu = (event, kysymysI, vastausI) => {
    try{
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[tenttiValinta].kysely[kysymysI].vastaukset[vastausI].valittu = event.target.checked
    setData(syväKopio)
    return null;
    }catch{
      alert("Vastausta ei onnistuttu valitsemaan.")
    }
  }

  //useStyles yläpalkin muotoilua varten
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    spacer: {
      flexGrow: 1,
    }
  }));
  const classes1 = useStyles();


  //Valmis painike fokuksen testaamiseksi
  const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      fontFamily: [
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      } 
    },
  })(Button);
  const classesButton = useStyles();

  
  ////////////Latausnäkymätestailua
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  const nowLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }


  ///////////////////////////REDUCER
  
  function reducer(state, action) { //data tai state
    //ReferenceError: Cannot access 'syväKopio' before initialization
    //^^Mikäli syväkopiota kutsutaan caseissa
    //Siksi toistaiseksi oma syväkopio kaikille caseille
    let syväKopioR = JSON.parse(JSON.stringify(state)) //data vai state?
    switch (action.type) {
      case 'INIT_DATA':
        return action.data;
      case 'VASTAUS_VALITTU':
        syväKopioR[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].valittu = action.data.valittuV
        return syväKopioR
      case 'MUUTA_VASTAUSTA':
        syväKopioR[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].vastaus = action.data.valittuV
        return syväKopioR
      case 'MUUTA_OIKEA_VASTAUS':
        syväKopioR[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].oikea = action.data.valittuV
        return syväKopioR
      case 'POISTA_VASTAUS':
        syväKopioR[tenttiValinta].kysely[action.data.indexKy].vastaukset.splice(action.data.indexVa, 1)
        return syväKopioR
      case 'LISÄÄ_VASTAUS':
        let uusiVastaus = {vastaus: "", valittu: false, oikea: false}
        syväKopioR[tenttiValinta].kysely[action.data.indexKy].vastaukset.push(uusiVastaus)
        return syväKopioR
      case 'MUOKKAA_KYSYMYSTÄ':
        syväKopioR[tenttiValinta].kysely[action.data.indexKy].kysymys = action.data.valittuK
        return syväKopioR
      case 'LISÄÄ_KYSYMYS':
        let uusiKysymys =  {uid: uuid(), kysymys: "", vastaukset: []}
        syväKopioR[tenttiValinta].kysely.push(uusiKysymys)
        return syväKopioR
      case 'POISTA_KYSYMYS':
        syväKopioR[tenttiValinta].kysely.splice(action.data.indexKy, 1)
        return syväKopioR
      case 'MUOKKAA_TENTTI':
        syväKopioR[tenttiValinta].nimi = action.data.tentinNimi
        return syväKopioR
      case 'LISÄÄ_TENTTI':
        //https://github.com/facebook/react/issues/16295
        let tenttiNimi = "Uusi tentti"
        //prompt("Anna uudelle tentille nimi:", "");
        let uusiTentti = {uid: uuid(), nimi: tenttiNimi, kysely: [
          {uid: uuid(), kysymys: "", vastaukset: [{vastaus: "", valittu: false, oikea: false}]}]
        }
        syväKopioR.push(uusiTentti)
        return syväKopioR
      case 'POISTA_TENTTI':
        console.log(tenttiValinta)
        if(state.length > 1){
          syväKopioR.splice(tenttiValinta, 1)
        }
        console.log(tenttiValinta)
        return syväKopioR
      default:
        throw new Error();
    }
  }

  ////////////////////////////Muiden hookkien muistiinpanoja - useMemo - useRef
  //Dom puusta tietoa, useRef
  //Toinen hook, useMemo, jottei renderöidä turhuuksia
  //Laitetaan funktion vastaus muistiin, poimitaan vastausarvo
  //<Kysymys> const Kysymys </Kysymys>
  //const KysymysMemo = Read.memo(Kysymys)
  //compare(previousProps, nextProps){
  // a = previousProps.index == nextProps.index
  // b = previousProps.teksti == nextProps.teksti
  // return a&&b
  //const KysymysMemo = React.memo(Kysymys, compare)
  //useCallback, mikäli propseissa välitetään funktioita
  //}
  //onBlur, event, kun solusta poistutaan
  //codepen reactMemo
  //useRef, focuksen saamiseksi, esimerkiksi scroll-listan alimpaan elementtiin päästään käsiksi
  //const refContainer = useRef(initialValue)

  return (
    <div>
      <div className={classes1.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" edge="start" className={classes1.menuButton}>TENTIT</Button>
          <Button color="inherit">TIETOA SOVELLUKSESTA</Button>
          <Button variant="contained" color="secondary" onClick={() => setNäkymä(1)}>Näytä kysely</Button>
          <Button variant="contained" color="secondary" onClick={() => setNäkymä(2)}>Näytä kyselyn muokkaus</Button>
          <div className={classes1.spacer}></div>
          <Button color="inherit">POISTU</Button>
        </Toolbar>
      </AppBar>
      </div>
      <br></br>


      <div className="kysymysosio">
        {/*Painikkeet kyselyn valintaa varten*/}
        {state.map((arvo, index) => <BootstrapButton variant="contained" color="primary" 
          disableRipple className={classesButton.margin} 
          onClick={() => {settenttiValinta(index); setPalautettu(false);}}>{arvo.nimi}
        </BootstrapButton>) }
        <br/>
        
        <br/>
        {state[tenttiValinta] != undefined ? (
          näkymä == 1 ? <div>
            <Fade right><TulostaKysymykset1 
              dispatch={dispatch}
              muutaVastaus={vastausValittu} 
              kysymys={state[tenttiValinta]} 
              palautettu= {palautettu}>
            </TulostaKysymykset1></Fade>
          <br/>
          <Button variant={"contained"} color="primary" onClick={() => {setPalautettu(true); nowLoading();}}>Näytä vastaukset</Button>
          </div> : 
            <Fade right><MuokkaaKysymyksiä 
              dispatch={dispatch}
              kysymys={state[tenttiValinta]}>
            </MuokkaaKysymyksiä></Fade>
          ) : null
          }

          
          {/* <Fade right><TulostaKysymyksetUusi 
              muutaVastaus={vastausValittu} 
              vainKysymys={data} 
              palautettu= {palautettu}
              kyselyIndex= {tenttiValinta}>
            </TulostaKysymyksetUusi></Fade> */}
            <br></br>
            <Button variant={"contained"} color="primary">Tyhjää muisti</Button>
          </div>
          
      </div>
  );
}

export default App;
