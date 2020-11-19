import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Kysymys from './Kysymys';

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

//useMemo-hahmottelua
  // //https://www.digitalocean.com/community/tutorials/react-usememo
  //https://www.robinwieruch.de/react-usememo-hook
  //https://reactjs.org/docs/react-api.html#reactmemo
  //https://dmitripavlutin.com/use-react-memo-wisely/
  // const KysymysMemo = React.memo(Kysymys, vertaa) => {
  //
  //}
  // vertaa(previousProps, nextProps){
  //   a = previousProps.index == nextProps.index
  //   b = previousProps.teksti == nextProps.teksti
  //   return a&&b
  // }

export default function TulostaKysymykset(props) {

  //Alustetaan kysymysten tulostusta varten dataT
  let dataT = props.kysymys
  let palautettu = props.palautettu;

  const vertaa = (previousProps, nextProps) =>{
    console.log(previousProps.itemV)
    let b = previousProps.itemV == nextProps.itemV
     return b
  }

  const KysymysMemo = React.memo((Kysymys, vertaa))

  const vastaustenTarkistus = (index) =>{
    try{
      let tarkistus = dataT.kysely[index].vastaukset
      console.log(tarkistus.length)
      if (tarkistus.length !== 0){
      for (var i = 0; i < tarkistus.length; i++){
        if (tarkistus[i].oikea !== tarkistus[i].valittu){
          return (<CloseIcon/>);
        }
      }
      return (<CheckIcon/>);
    }
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
      return dataT.kysely[indexK].vastaukset.map((itemV, indexV) => 
      <div key={itemV.uid}>
        {/*<KysymysMemo indexK={indexK} 
        indexV={indexV} 
        itemV={itemV} 
        palautettu={palautettu}
        dispatch={props.dispatch}/>*/}
        <label><Checkbox disabled={palautettu === true} className="kysymys" key={itemV}
          id={indexV} checked={itemV.valittu} 
          onChange={(e) => props.dispatch({type: 'VASTAUS_VALITTU', data:{valittuV:e.target.checked, indexKy: indexK, indexVa: indexV}})}/>
          {itemV.vastaus}</label>

      </div>)
    }

    //Mikäli vastaukset on palautettu, tulostetaan myös vastaukset GreenCheckBoxin avulla
    return dataT.kysely[indexK].vastaukset.map((itemV, indexV) => 
      <div key={indexV}>
        <label><Checkbox disabled key={itemV + "" + indexV} checked={itemV.valittu}id={indexV}/>

        <GreenCheckbox disabled className="vastaukset" checked={itemV.oikea}/>
        {itemV.vastaus}</label>
      </div>)
  }

  return (dataT.kysely !== undefined ? (
  <div className="tulostusosio">
      {dataT.kysely.map((item, index) => <Card className="kortti" elevation={3}><div className="kysymys">
      {item.kysymys}{palautettu ? vastaustenTarkistus(index) : null}</div> {näytäVaihtoehdot(index)}
      </Card>)}
    </div>) : null
  );
}