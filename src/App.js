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



function App() {
  require('react-dom');
  window.React2 = require('react');
  console.log(window.React1 === window.React2);

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

  //data serverin datan muodostamista varten
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
    console.log(state)
    let syväKopio = JSON.parse(JSON.stringify(state)) //data vai state?
    console.log(syväKopio[0])
    switch (action.type) {
      case 'INIT_DATA':
        return action.data;
      case 'VASTAUS_VALITTU':
        //syväKopio[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].valittu = action.data.valittuV
        syväKopio[tenttiValinta].kysely[0].vastaukset[0].valittu = action.data.valittuV
        return syväKopio
      case 'MUUTA_VASTAUSTA':
        //(event) => dispatch({type: "MUUTA_VASTAUSTA", data:{vastausT:event.target.value, indexK: index, indexV: index}})
        
        //syväKopio[tenttiValinta].kysely[action.data.IndexK].vastaukset[action.data.indexV].vastaus = action.data.vastaus
        syväKopio[tenttiValinta].kysely[action.data.indexKy].vastaukset[action.data.indexVa].vastaus = action.data.value
        return syväKopio
      case 'MUUTA_OIKEA_VASTAUS':
        syväKopio[tenttiValinta].kysely[0].vastaukset[0].oikea = "event.target.checked"
        return syväKopio
      case 'POISTA_VASTAUS':
        syväKopio[tenttiValinta].kysely[0].vastaukset.splice(0, 1)
        return syväKopio
      case 'LISÄÄ_VASTAUS':
        let uusiVastaus = {vastaus: "", valittu: false, oikea: false}
        syväKopio[tenttiValinta].kysely[0].vastaukset.push(uusiVastaus)
        return syväKopio
      case 'MUOKKAA_KYSYMYSTÄ':
        syväKopio[tenttiValinta].kysely[0].kysymys = "event.target.value"
        return syväKopio
      case 'LISÄÄ_KYSYMYS':
        let uusiKysymys =  {kysymys: "", vastaukset: []}
        syväKopio[tenttiValinta].kysely.push(uusiKysymys)
        return syväKopio
      case 'POISTA_KYSYMYS':
        syväKopio[tenttiValinta].kysely.splice(0, 1)
        return syväKopio
      case 'LISÄÄ_TENTTI':
        let tenttiNimi = prompt("Anna uudelle tentille nimi:", "");
        let syväKopio = JSON.parse(JSON.stringify(data));
        let uusiKysely = {nimi: tenttiNimi, kysely: [
          {kysymys: "", vastaukset: [{vastaus: "", valittu: false, oikea: false}]}]
        }
        syväKopio.push(uusiKysely)
        return syväKopio
        case 'LISÄÄ_TENTTI':
          return syväKopio
      default:
        throw new Error();
    }
  }


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
  console.log("data") 
  console.log(data) 
  console.log("serverin data") 
  console.log(data2) 
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
        {data.map((arvo, index) => <Button variant={"contained"} onClick={() => {settenttiValinta(index); setPalautettu(false); nowLoading();}}>{arvo.nimi}</Button>)}
        <br/>
        <br/>
        {näkymä == 1 ? <div>
          <Fade right><TulostaKysymykset1 
            dispatch={dispatch}
            muutaVastaus={vastausValittu} 
            kysymys={data} 
            palautettu= {palautettu}
            kyselyIndex= {tenttiValinta}>
          </TulostaKysymykset1></Fade>
        <br/>
        <Button variant={"contained"} color="primary" onClick={() => {setPalautettu(true); nowLoading();}}>Näytä vastaukset</Button>
        </div> : 
          <Fade right><MuokkaaKysymyksiä 
            dispatch={dispatch}
            kysymykset={data} 
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
