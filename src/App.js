
import React from 'react';
import {useEffect, useState} from 'react';
import './App.css';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import koira from './koira.png';
import TulostaKysymykset1 from './TulostaKysymykset1';

function App() {

  const [data, setData]=useState([])
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [palautettu, setPalautettu] = useState(false)
  const [kyselyValinta, setKyselyValinta] = useState(0)

  //Latausnäkymää varten muuttuja ja useEffect
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])


  //Ensimmäisen kyselyn kysymykset
  const kyselyt = [
    {kysely: [
        {kysymys: "Kuinka monta ihmistä on käynyt kuussa?", vastaukset: [
        {vastaus: "0", valittu: false, oikea: false}, 
        {vastaus: "12", valittu: false, oikea: true}, 
        {vastaus: "15", valittu: false, oikea: false}
        ]},
      {kysymys: "Kuinka monta sanaa on Potter-kirjasarjan suomennoksissa yhteensä?", vastaukset: [
        {vastaus: "857 911", valittu: false, oikea: true}, 
        {vastaus: "1 100 438", valittu: false, oikea: false}, 
        {vastaus: "1 204 539", valittu: false, oikea: false}
        ]},
      {kysymys: "Mikä seuraavista luvuista on lähinnä Tanskan asukasmäärää?", vastaukset: [
        {vastaus: "5,2 miljoonaa", valittu: false, oikea: false}, 
        {vastaus: "5,6 miljoonaa", valittu: false, oikea: false}, 
        {vastaus: "5,8 miljoonaa", valittu: false, oikea: true}
        ]}]},
    {kysely: [
      {
        kysymys: "testitesti?", vastaukset: [
          {vastaus: "0", valittu: false, oikea: false}, 
          {vastaus: "12", valittu: false, oikea: true}, 
          {vastaus: "15", valittu: false, oikea: false}
        ]},
        {kysymys: "Mikä on oikein?", vastaukset: [
          {vastaus: "857 911", valittu: false, oikea: true}, 
          {vastaus: "1 100 438", valittu: false, oikea: false}, 
          {vastaus: "1 204 539", valittu: false, oikea: false}
        ]},
        {kysymys: "Mikä seuraavista luvuista on lähinnä Tanskan asukasmäärää?", vastaukset: [
          {vastaus: "5,2 miljoonaa", valittu: false, oikea: false}, 
          {vastaus: "5,6 miljoonaa", valittu: false, oikea: false}, 
          {vastaus: "5,8 miljoonaa", valittu: false, oikea: true}
        ]}]}
      ]
    
  



  //Localstoragen data-avaimena on "data"

  // localSotragen data-avaimena on "data"
  useEffect(() => {
    let jemma = window.localStorage;
    let tempData = JSON.parse(jemma.getItem("data"))
    if (tempData === null) {
      jemma.setItem("data", JSON.stringify(kyselyt))
      tempData = kyselyt

    } 
    setData(tempData);
    setDataAlustettu(true)
  },
    [Button, setKyselyValinta])

  useEffect(() => {
    if (dataAlustettu) {
      window.localStorage.setItem("data", JSON.stringify(data))
    }
  }, [data])

  const testi = () =>{
    return null;
  }

  const näytäVaihtoehdot = (index) => {
    if (palautettu == false){
      return data.kysely[0][index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>

        <label><Checkbox className="kysymys" key={alkio}
        id={vastausIndex} checked={alkio.valittu} onChange={(e) => vastausValittu(e, index, vastausIndex)}/>
        {alkio.vastaus}</label>
      </div>)
    }
    return data.kysely[0][index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>
        <label><Checkbox disabled key={alkio} checked={alkio.valittu}
        id={vastausIndex} onChange={(e) => vastausValittu(e, index, vastausIndex)}/>

        <GreenCheckbox disabled className="vastaukset" checked={alkio.oikea}/>
        {alkio.vastaus}</label>
      </div>)
  }

  
  const vastausValittu = (event, kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))

    //syväKopio[vanhemmanIndex].jälkikasvu[lapsenIndex].lapsenNimi=event.target.value
    syväKopio[kyselyValinta].kysely[kysymysI].vastaukset[vastausI].valittu = event.target.checked
    setData(syväKopio)

    return null;
  }

  function TulostaKysymykset(props) {
    console.log(props.kysymykset)
    return props.kysymykset.map((item, index) => <Card className="kortti" elevation={3}>
          {item.kysymys} {näytäVaihtoehdot(index)}
        </Card>)
  }

  //Oikeita vastauksia varten oma vihreä painike
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

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

  
  const classes = useStyles();
  
  

  return (

    <div>

      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" edge="start" className={classes.menuButton}>TENTIT</Button>
          <Button color="inherit">TIETOA SOVELLUKSESTA</Button>
          <div className={classes.spacer}></div>
          <Button color="inherit">POISTU</Button>
        </Toolbar>
      </AppBar>
      </div>
      <br></br>


      <div className="kysymysosio">
        {/*Painikkeet kyselyn valintaa varten*/}
        <Button variant={"contained"} onChange={() => setKyselyValinta(0)}>Numerovisa</Button>
        <Button variant={"contained"} onChange={() => setKyselyValinta(1)}>Kirjainvisa</Button>
        <br/>
        <br/>
        {/*Tulostetaan ensin kysymys ja kutsutaan sitten näytäVaihtoehdot
         */}
         {/*
        {kysely1.map((item, index) => <Card className="kortti" elevation={3}>
          {item.kysymys} {näytäVaihtoehdot(index)}
        </Card>)}
        */}
        {loading === false ? (<div>
        <TulostaKysymykset1 muutaVastaus={vastausValittu} kysymykset={data} palautettu= {palautettu} kyselyN={kyselyValinta}></TulostaKysymykset1>
        <br/>
        <Button variant={"contained"} color="primary" onClick={setPalautettu}>Näytä vastaukset</Button>
        </div>) : (
          <img src={koira} className="App-logo" alt="logo" />
        )}
        </div>
    </div>
  );
}

export default App;
