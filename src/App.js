import React from 'react';
import Fade from 'react-reveal/Fade';
import {useEffect, useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TulostaKysymykset1 from './TulostaKysymykset1';
import TulostaKysymyksetUusi from './TulostaKysymyksetUusi';
import MuokkaaKysymyksiä from './MuokkaaKysymyksiä';
import axios from 'axios';



function App() {
  require('react-dom');
  window.React2 = require('react');
  console.log(window.React1 === window.React2);

  const [data, setData]=useState([])
  const [testiData, setTestiData]=useState([])
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [palautettu, setPalautettu] = useState(false)
  const [kyselyValinta, setKyselyValinta] = useState(0)
  const [näkymä, setNäkymä] = useState(1)

  //Latausnäkymää varten muuttuja ja useEffect



  //Alkuperäinen taulukko kyselyistä ja niiden vastauksista
  const kyselyt = [
    {nimi: "Numerovisa", kysely: [
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
        ]}]},
    {nimi: "Kirjainvisa", kysely: [
      {
        kysymys: "Mikä YMCA on suomeksi?", vastaukset: [
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
        ]}]},
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
          ]}]}
      ]

      //data serverin datan muodostamista varten
      const kyselytKopio = 
        {nimi: "Numerovisa", kysely: [
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
            ]}],
        nimi: "Kirjainvisa", kysely: [
          {
            kysymys: "Mikä YMCA on suomeksi?", vastaukset: [
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
            ]}],
          nimi: "Merkkivisa", kysely: [
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
              ]}]
            }
          

  useEffect(()=>{
    ////////////////////////////POST
    const createData = async () => {
      try{
      kyselytKopio.forEach(async item=>{
        let result = await axios.post("http://localhost:3003/kyselyt", item)
      })
        setData(kyselytKopio)
        setDataAlustettu(true)
      }
      catch(exception){
        alert("Tietokannan alustaminen epäonnistui")
      }
      // finally{
      //   setData(kyselytKopio)
      //   setDataAlustettu(true)
      // }
    }
    /////////////////////////////GET
    const fetchData = async () => {
      try{
        let result = await axios.get("http://localhost:3003/kyselyt")
        if (result.data.lenght > 0){
          setData(result.data)
          setDataAlustettu(true)
        }else{
          throw("Data tulee alustaa") 
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
        let result = await axios.put("http://localhost:3003/kyselyt", data)
      }
      catch(exception){
        console.log("Dataa ei onnistuttu päivittämään.")
      }
    }
    if(dataAlustettu){
      updateData();
    }
  },[data])
    
 

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
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[kyselyValinta].kysely[kysymysI].vastaukset[vastausI].valittu = event.target.checked
    setData(syväKopio)
    return null;
  }

  //Oikeita vastauksia varten oma vihreä painike


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

  //////////////////////////Funktiot listan muokkaamista varten
  const muokkaaVastausta = (event, kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[kyselyValinta].kysely[kysymysI].vastaukset[vastausI].vastaus = event.target.value
    setData(syväKopio)
  }

  const muutaOikeaVastaus = (event, kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[kyselyValinta].kysely[kysymysI].vastaukset[vastausI].oikea = event.target.checked
    setData(syväKopio)
  }

  const poistaVastaus = (kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[kyselyValinta].kysely[kysymysI].vastaukset.splice(vastausI, 1)
    setData(syväKopio)
  }

  const lisääVastaus = (kysymysI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    let uusiVastaus = {vastaus: "", valittu: false, oikea: false}
    syväKopio[kyselyValinta].kysely[kysymysI].vastaukset.push(uusiVastaus)
    setData(syväKopio)
  }

  const muokkaaKysymystä = (event, kysymysI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[kyselyValinta].kysely[kysymysI].kysymys = event.target.value
    setData(syväKopio)
  }

  const lisääKysymys = () => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    let uusiKysymys =  {kysymys: "", vastaukset: []}
    syväKopio[kyselyValinta].kysely.push(uusiKysymys)
    setData(syväKopio)
  }

  const poistaKysymys = (kysymysI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio[kyselyValinta].kysely.splice(kysymysI, 1)
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
      syväKopio.splice(kyselyValinta, 1)
    setData(syväKopio)
    }
    else {
      alert("Tenttejä on oltava vähintään yksi.")
    }
    setKyselyValinta(0)
  }


  //muistiinpanoja: dev.huuto.net, postman rest client

  //FORM DIALOGE

  // npm cache clean --force
  // delete node_modules folder
  // delete package-lock.json file
  // npm install
  
  console.log(data)
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
        {data.map((arvo, index) => <Button variant={"contained"} onClick={() => {setKyselyValinta(index); setPalautettu(false); nowLoading();}}>{arvo.nimi}</Button>)}
        <br/>
        <br/>
        {console.log(data[0])}
        {näkymä == 1 ? <div>
          <Fade right><TulostaKysymykset1 
            muutaVastaus={vastausValittu} 
            kysymys={data} 
            palautettu= {palautettu}
            kyselyIndex= {kyselyValinta}>
          </TulostaKysymykset1></Fade>
        <br/>
        <Button variant={"contained"} color="primary" onClick={() => {setPalautettu(true); nowLoading();}}>Näytä vastaukset</Button>
        </div> : 
          <Fade right><MuokkaaKysymyksiä 
            kysymykset={data} 
            kyselyIndex={kyselyValinta}
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
            vainKysymys={data[kyselyValinta]} 
            palautettu= {palautettu}
            kyselyIndex= {kyselyValinta}>
          </TulostaKysymyksetUusi></Fade> */}
          <br></br>
          <Button variant={"contained"} color="primary">Tyhjää muisti</Button>
        </div>
        
    </div>
  );
}

export default App;
