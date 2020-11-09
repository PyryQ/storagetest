import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


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
  let kyselyN = props.kyselyIndex;
  console.log(data)
  //Valitaan datasta oikea kysely käsiteltäväksi

  let palautettu = props.palautettu;

  const vastaustenTarkistus = (index) =>{
    
    let pituus = data[kyselyN].kysely[index].vastaukset.length
    let tarkistus = data[kyselyN].kysely[index].vastaukset
    console.log(tarkistus)
    for (var i = 0; i < pituus; i++){
      if (tarkistus[i].oikea !== tarkistus[i].valittu){
        return "väärin";
      }
    }
    return "oikein";
  }


  //Tulostetaan vaihtoehdot sen mukaan, onko vastaukset palautettu
  const näytäVaihtoehdot = (index) => {
    
    //Mikäli tuloksia ei ole palautettu, tulostetaan vain yksi checkbox
    if (palautettu === false){
      return data[props.kyselyIndex].kysely[index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>
        <label><Checkbox disabled={palautettu === true} className="kysymys" key={alkio}
        id={vastausIndex} checked={alkio.valittu} onChange={(e) => props.muutaVastaus(e, index, vastausIndex)}/>
        {alkio.vastaus}</label>

      </div>)
    }

    //Mikäli vastaukset on palautettu, tulostetaan myös vastaukset GreenCheckBoxin avulla
    return data[props.kyselyIndex].kysely[index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>
        <label><Checkbox disabled key={alkio + "" + vastausIndex} checked={alkio.valittu}
        id={vastausIndex} onChange={(e) => props.muutaVastaus(e, index, vastausIndex)}/>

        <GreenCheckbox disabled className="vastaukset" checked={alkio.oikea}/>
        {alkio.vastaus}</label>
      </div>)

      
  }
  
  return (<div>
      {data.map((item, index) => <Card className="kortti" elevation={3}><div className="kysymys">
      {data[kyselyN].kysely[index].kysymys}{palautettu ? <div>{vastaustenTarkistus(index)}</div> : null}</div> {näytäVaihtoehdot(index)}
      </Card>)}
      
    </div>
  );
}