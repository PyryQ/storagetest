import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import {useEffect, setState, useState} from 'react';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import koira from './koira.png';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);



export default function TulostaKysymykset1(props) {
  //Alustetaan data
  let data = props.kysymykset;
  //Valitaan datasta oikea kysely käsiteltäväksi
  data = data[props.kyselyN]

  let palautettu = props.palautettu;
  let vastauksenVaihto = props.muutaVastaus;
  console.log(vastauksenVaihto)

  //Tulostetaan vaihtoehdot sen mukaan, onko vastaukset palautettu
  const näytäVaihtoehdot = (index) => {

    if (palautettu === false){
      return data.kysely[index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>
        <label><Checkbox className="kysymys" key={alkio}
        id={vastausIndex} checked={alkio.valittu} onChange={(e) => props.muutaVastaus(e, index, vastausIndex)}/>
        {alkio.vastaus}</label>

      </div>)
    }
    return data.kysely[index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>
        <label><Checkbox disabled key={alkio} checked={alkio.valittu}
        id={vastausIndex} onChange={(e) => props.muutaVastaus(e, index, vastausIndex)}/>

        <GreenCheckbox disabled className="vastaukset" checked={alkio.oikea}/>
        {alkio.vastaus}</label>
      </div>)
      
  }
  const vastausValittu = (event, kysymysI, vastausI) => {
    let syväKopio = JSON.parse(JSON.stringify(data))
    syväKopio = syväKopio.kysymykset[0];
    //syväKopio[vanhemmanIndex].jälkikasvu[lapsenIndex].lapsenNimi=event.target.value
    syväKopio.ensimmäinenKysely[kysymysI].vastaukset[vastausI].valittu = !syväKopio.ensimmäinenKysely[kysymysI].vastaukset[vastausI].valittu
    data = (syväKopio)

    return null;
  }
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <div>
    {loading === false ? (<div>
      {data.kysely.map((item, index) => <Card className="kortti" elevation={3}>
      {item.kysymys} {näytäVaihtoehdot(index)}
      </Card>)}</div>) : (
        <img src={koira} className="App-logo" alt="logo" />)
    }
    </div>
  );
}