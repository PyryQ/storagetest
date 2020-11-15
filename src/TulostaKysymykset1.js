import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

//Luodaan GreenCheckBox oikeita vastauksia varten
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

  //Alustetaan dataU
  let dataU = props.kysymys
  console.log(dataU[props.kyselyIndex])

  let palautettu = props.palautettu;

  const vastaustenTarkistus = (index) =>{
    try{
      let pituus = dataU[props.kyselyIndex].dataU[props.kyselyIndex].kysely.length
      let tarkistus = dataU[props.kyselyIndex].kysely[index].vastaukset
      console.log(tarkistus)
      for (var i = 0; i < pituus; i++){
        if (tarkistus[i].oikea !== tarkistus[i].valittu){
          return (<CloseIcon/>);
        }
      }
      return (<CheckIcon/>);
    }
    catch{
      alert("Vastausten tarkistus epäonnistui")
      return null
    }
  }

  //Tulostetaan vaihtoehdot sen mukaan, onko vastaukset palautettu
  const näytäVaihtoehdot = (indexK) => { //Kysymyksen index
    
    //Mikäli tuloksia ei ole palautettu, tulostetaan vain yksi checkbox
    if (palautettu === false){
      return dataU[props.kyselyIndex].kysely[indexK].vastaukset.map((alkio, indexV) => 
      <div key={indexV}>
        <label><Checkbox disabled={palautettu === true} className="kysymys" key={alkio}
        id={indexV} checked={alkio.valittu} 
        onChange={(event) => props.dispatch({type: 'VASTAUS_VALITTU', data:{valittuV:event.target.checked, indexKy: indexK, indexVa: indexV}})}/>
        {alkio.vastaus}</label>

      </div>)
    }

    //Mikäli vastaukset on palautettu, tulostetaan myös vastaukset GreenCheckBoxin avulla
    return dataU[props.kyselyIndex].kysely[indexK].vastaukset.map((alkio, indexV) => 
      <div key={indexV}>
        <label><Checkbox disabled key={alkio + "" + indexV} checked={alkio.valittu}
        id={indexV} onChange={(e) => props.muutaVastaus(e, indexK, indexV)}/>

        <GreenCheckbox disabled className="vastaukset" checked={alkio.oikea}/>
        {alkio.vastaus}</label>
      </div>)
  }

  return (<div className="tulostusosio">
      {dataU.map((item, index) => <Card className="kortti" elevation={3}><div className="kysymys">
      {props.kysymys[props.kyselyIndex].kysely[index].kysymys}{props.palautettu ? vastaustenTarkistus(index) : null}</div> {näytäVaihtoehdot(index)}
      </Card>)}
    </div>
  );
}