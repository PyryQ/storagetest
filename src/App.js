import React from 'react';
import Fade from 'react-reveal/Fade';
import {useEffect, useState, useReducer, initialState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TulostaKysymykset1 from './TulostaKysymykset1';
import TulostaKysymyksetUusi from './TulostaKysymyksetUusi';
import uuid from 'react-uuid';
import MuokkaaKysymyksiä from './MuokkaaKysymyksiä';
import axios from 'axios';

// Kehitettävää: aktiivisen tentin buttonille eri väri
// Kysymyskomponentti?
// Muuttujien nimien selkeytys
// Kommentointia
// Hookit, onBlur
//tyhjää muisti - painike

function App() {

  const [data, setData]=useState([])
  const [data2, setData2]=useState([])//Serveriä varten
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [dataAlustettu2, setDataAlustettu2] = useState(false)//Serveriä varten

  const [palautettu, setPalautettu] = useState(false)
  const [tenttiValinta, settenttiValinta] = useState(0)
  const [näkymä, setNäkymä] = useState(1)

  const [state, dispatch] = useReducer(reducer, []);

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
  //dataa käsitellään kuitenkin kyselyt1 listan kautta
  const kyselyt2 = 
    [{nimi: "Numerovisa testi", kysely: [
      {kysymys: "Kuinka monta ihmistä on käynyt kuussa?", vastaukset: [
        {vastaus: "0", valittu: false, oikea: false}, 
        {vastaus: "12", valittu: false, oikea: true}, 
        {vastaus: "15", valittu: false, oikea: false}
        ]},
      {kysymys: "Kuinka monta sanaa Potter-kirjasarjan suomennoksissa on yhteensä?", vastaukset: [
        {vastaus: "857 911", valittu: false, oikea: true}, 
        {vastaus: "955 543", valittu: false, oikea: false}, 
        {vastaus: "1 100 438", valittu: false, oikea: false}, 
        {vastaus: "1 204 539", valittu: false, oikea: false}
        ]},
      {kysymys: "Mikä seuraavista luvuista on lähinnä Tanskan asukasmäärää?", vastaukset: [
        {vastaus: "5,2 miljoonaa", valittu: false, oikea: false}, 
        {vastaus: "5,6 miljoonaa", valittu: false, oikea: false}, 
        {vastaus: "5,8 miljoonaa", valittu: false, oikea: true}
        ]}
      ]
    },
      {nimi: "Kirjainvisa", kysely: [
        {kysymys: "Mikä YMCA on suomeksi?", vastaukset: [
          {vastaus: "YMKY", valittu: false, oikea: false}, 
          {vastaus: "NMKY", valittu: false, oikea: true}, 
          {vastaus: "MNKY", valittu: false, oikea: false}
        ]},
          {kysymys: "Mikä seuraavista on GIF?", vastaukset: [
          {vastaus: "graph iteration format", valittu: false, oikea: false}, 
          {vastaus: "graphics interchange format", valittu: false, oikea: true}, 
          {vastaus: "george iliott format ", valittu: false, oikea: false}
        ]},
          {kysymys: "Kuka on oikea Ben?", vastaukset: [
          {vastaus: "Ben Zysgowicz", valittu: false, oikea: false}, 
          {vastaus: "Ben Zyscowicz", valittu: false, oikea: true}, 
          {vastaus: "Ben Zyskowicz", valittu: false, oikea: false},
          {vastaus: "Ben Zysćowicz", valittu: false, oikea: false}
        ]}
      ]
    },
      {nimi: "Merkkivisa", kysely: [
        {
          kysymys: "Mikä seuraavista shakkipelin merkinnöistä tarkoittaa 'arveluttava siirto, mutta ei suoraan osoitettavissa virheeksi'?", vastaukset: [
            {vastaus: "?", valittu: false, oikea: false}, 
            {vastaus: "??", valittu: false, oikea: false}, 
            {vastaus: "?!", valittu: false, oikea: true},
            {vastaus: "!?", valittu: false, oikea: false}
          ]},
          {kysymys: "Mikä ‽ on englanninkieliseltä nimeltään?", vastaukset: [
            {vastaus: "Interrobang", valittu: false, oikea: true}, 
            {vastaus: "Sulivabang", valittu: false, oikea: false}, 
            {vastaus: "Guessbang", valittu: false, oikea: false}
          ]},
          {kysymys: "Mitä matemaattinen merkki ∂ tarkoittaa?", vastaukset: [
            {vastaus: "Tyhjä joukko", valittu: false, oikea: false}, 
            {vastaus: "Normaali aliryhmä", valittu: false, oikea: true}, 
            {vastaus: "Gradientti", valittu: false, oikea: false},
            {vastaus: "Osittaisderivaatta", valittu: false, oikea: false}
        ]}
      ]
    }
  ]
          

  useEffect(()=>{
    ////////////////////////////POST
    const createData = async () => {
      try{
        let result = await axios.post("http://localhost:3001/kyselyt", kyselyt2)
        dispatch({type: "INIT_DATA", data: kyselyt2})
        setData2(kyselyt2)
        setDataAlustettu2(true)
      }
      catch(exception){
        alert("Tietokannan alustaminen epäonnistui (Post)")
      }
    }
    /////////////////////////////GET
    const fetchData = async () => {
      try{
        let result = await axios.get("http://localhost:3001/kyselyt")
        if (result.data.lenght > 0){
          dispatch({type: "INIT_DATA", data: result.data})
          setData2(result.data);
          setDataAlustettu2(true)
        }else{
          throw("Tietokannan alustaminen epäonnistui (Get)") 
        }
      }
      catch(exception){
        createData();
        console.log(exception)
      }
    }
    fetchData();
  },[])

  ////////////////////////////////PUT
  useEffect(() => {
    const updateData = async () => {
      try{
        //Nyt state päivitetään staten mukaan
        let result = await axios.put("http://localhost:3001/kyselyt", state)
      }
      catch(exception){
        console.log("Dataa ei onnistuttu päivittämään.")
      }
    }
    if(dataAlustettu){
      updateData();
    }
  },[state])
    
 

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


  // Datan alustuksen tarkistus
  useEffect(() => {
    if (dataAlustettu) {
      window.localStorage.setItem("data", JSON.stringify(data))
    }
  }, [data])

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
    console.log(syväKopioR[tenttiValinta])
    switch (action.type) {
      case 'INIT_DATA':
        return action.data;
      case 'VASTAUS_VALITTU':
        console.log(action.data.indexKy)
        let syväKopioVV = JSON.parse(JSON.stringify(state))
        syväKopioVV[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].valittu = action.data.valittuV
        return syväKopioVV
      case 'MUUTA_VASTAUSTA':
        let syväKopioMV = JSON.parse(JSON.stringify(state))
        syväKopioMV[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].vastaus = action.data.valittuV
        return syväKopioMV
      case 'MUUTA_OIKEA_VASTAUS':
        let syväKopioMOV = JSON.parse(JSON.stringify(state))
        syväKopioMOV[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].oikea = action.data.valittuV
        return syväKopioMOV
      case 'POISTA_VASTAUS':
        let syväKopioPV = JSON.parse(JSON.stringify(state))
        syväKopioPV[tenttiValinta].kysely[action.data.indexKy].vastaukset.splice(action.data.indexVa, 1)
        return syväKopioPV
      case 'LISÄÄ_VASTAUS':
        let uusiVastaus = {vastaus: "", valittu: false, oikea: false}
        let syväKopioLV = JSON.parse(JSON.stringify(state))
        syväKopioLV[tenttiValinta].kysely[action.data.indexKy].vastaukset.push(uusiVastaus)
        return syväKopioLV
      case 'MUOKKAA_KYSYMYSTÄ':
        let syväKopioMK = JSON.parse(JSON.stringify(state))
        syväKopioMK[tenttiValinta].kysely[action.data.indexKy].kysymys = action.data.valittuK
        return syväKopioMK
      case 'LISÄÄ_KYSYMYS':
        let syväKopioLK = JSON.parse(JSON.stringify(state))
        let uusiKysymys =  {kysymys: "", vastaukset: []}
        syväKopioLK[tenttiValinta].kysely.push(uusiKysymys)
        return syväKopioLK
      case 'POISTA_KYSYMYS':
        let syväKopioPK = JSON.parse(JSON.stringify(state))
        syväKopioPK[tenttiValinta].kysely.splice(0, 1)
        return syväKopioPK
      case 'LISÄÄ_TENTTI':
        let tenttiNimi = prompt("Anna uudelle tentille nimi:", "");
        let syväKopioR = JSON.parse(JSON.stringify(data));
        let uusiKysely = {nimi: tenttiNimi, kysely: [
          {kysymys: "", vastaukset: [{vastaus: "", valittu: false, oikea: false}]}]
        }
        syväKopioR.push(uusiKysely)
        return syväKopioR
        case 'LISÄÄ_TENTTI':
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


  //////////////////////////Funktiot listan muokkaamista varten
  const muokkaaVastausta = (event, kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[tenttiValinta].kysely[kysymysI].vastaukset[vastausI].vastaus = event.target.value
    setData(syväKopio)
  }

  const muutaOikeaVastaus = (event, kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[tenttiValinta].kysely[kysymysI].vastaukset[vastausI].oikea = event.target.checked
    setData(syväKopio)
  }

  const poistaVastaus = (kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[tenttiValinta].kysely[kysymysI].vastaukset.splice(vastausI, 1)
    setData(syväKopio)
  }

  const lisääVastaus = (kysymysI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    let uusiVastaus = {vastaus: "", valittu: false, oikea: false}
    syväKopio[tenttiValinta].kysely[kysymysI].vastaukset.push(uusiVastaus)
    setData(syväKopio)
  }

  const muokkaaKysymystä = (event, kysymysI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[tenttiValinta].kysely[kysymysI].kysymys = event.target.value
    setData(syväKopio)
  }

  const lisääKysymys = () => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    let uusiKysymys =  {kysymys: "", vastaukset: []}
    syväKopio[tenttiValinta].kysely.push(uusiKysymys)
    setData(syväKopio)
  }

  const poistaKysymys = (kysymysI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[tenttiValinta].kysely.splice(kysymysI, 1)
    setData(syväKopio)
  }

  const lisääUusiTentti = () => {
    let tenttiNimi = prompt("Anna uudelle tentille nimi:", "");
    let syväKopio = JSON.parse(JSON.stringify(data))
    let uusiKysely = {nimi: tenttiNimi, kysely: [
      {kysymys: "", vastaukset: [{vastaus: "", valittu: false, oikea: false}]}]
    }
    syväKopio.push(uusiKysely)
    setData(syväKopio)
  }

  const poistaTentti = () => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    if(data.length > 1){
      syväKopio.splice(tenttiValinta, 1)
    setData(syväKopio)
    }
    else {
      alert("Tenttejä on oltava vähintään yksi.")
    }
    settenttiValinta(0)
  }
  console.log("state") 
  console.log(state)
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
        {state.map((arvo, index) => <Button variant={"contained"} onClick={() => {settenttiValinta(index); setPalautettu(false); nowLoading();}}>{arvo.nimi}</Button>)}
        <br/>
        <br/>
        {state[tenttiValinta] != undefined ? (
          näkymä == 1 ? <div>
            <Fade right><TulostaKysymykset1 
              dispatch={dispatch}
              muutaVastaus={vastausValittu} 
              kysymys={state[tenttiValinta]} 
              palautettu= {palautettu}
              kyselyIndex= {tenttiValinta}>
            </TulostaKysymykset1></Fade>
          <br/>
          <Button variant={"contained"} color="primary" onClick={() => {setPalautettu(true); nowLoading();}}>Näytä vastaukset</Button>
          </div> : 
            <Fade right><MuokkaaKysymyksiä 
              dispatch={dispatch}
              kysymys={state[tenttiValinta]} 
              kyselyIndex={tenttiValinta}
              muokkaaVastausta={muokkaaVastausta}
              muutaOikeaVastaus={muutaOikeaVastaus}
              muokkaaKysymystä={muokkaaKysymystä}
              poistaVastaus={poistaVastaus}
              poistaKysymys={poistaKysymys}
              lisääVastaus={lisääVastaus}
              lisääKysymys={lisääKysymys}
              lisääUusiTentti={lisääUusiTentti}
              poistaTentti={poistaTentti}>
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
