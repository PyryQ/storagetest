import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import {useEffect, setState, useState} from 'react';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function MuokkaaKysymyksiä(props) {

  //Alustetaan data
  let dataM = props.kysymys;
  console.log(dataM)
  //Valitaan datasta oikea kysely käsiteltäväksi

  const näytäVaihtoehdot = (itemK, indexK) => {
    //Mikäli tuloksia ei ole palautettu, tulostetaan vain yksi checkbox
    try {
      return <div> {dataM.kysely[indexK].vastaukset.map((alkio, indexV) => 
      <div key={alkio.uid}>
        <label><Checkbox className="vastausCheckM" key= {"oikea" + props.kyselyIndex + "" + indexK + "" + indexV}
         checked={alkio.oikea} onChange={(e) => props.dispatch({type: 'MUUTA_OIKEA_VASTAUS', data:{valittuV: e.target.checked, indexKy: indexK, indexVa: indexV}})}/>
        </label>
        
        <Input className="vastausM" defaultValue={alkio.vastaus} 
          onChange = {(e) => props.dispatch({type: 'MUUTA_VASTAUSTA', data:{valittuV: e.target.value, indexKy: indexK, indexVa: indexV}})}>
        </Input>

        <Button className="vastausPoisto"
          id={indexV} onClick={() => props.dispatch({type: 'POISTA_VASTAUS', data:{indexKy: indexK, indexVa: indexV}})}>
        <DeleteIcon></DeleteIcon></Button>

        </div>)}<Button className="lisääM" 
          onClick={() => props.dispatch({type: 'LISÄÄ_VASTAUS', data:{indexKy: indexK}})}>
        <AddCircleOutlineIcon/></Button></div>
    }
    catch{
      alert("Vastausvaihtoehtojen tulostus epäonnistui")
    }
}
  
  return (
    <div className="muokkausosio">
      <Button className="poistaTT" onClick={() => props.dispatch({type: 'POISTA_TENTTI', data:{}})}><DeleteIcon/>Poista {dataM.nimi}</Button>
      <Button className="lisääUT" onClick={() => props.dispatch({type: 'LISÄÄ_TENTTI', data:{}})}><AddCircleOutlineIcon/>Lisää uusi tentti</Button>

      {dataM.kysely.map((item, indexK) => 
        <Card className="korttiM" elevation={3}>
          <div key={item.uid}>
          <Input className="kysymysM" 
            defaultValue={item.kysymys}
            onChange={(e) => props.dispatch({type: 'MUOKKAA_KYSYMYSTÄ', data:{valittuK: e.target.value, indexKy: indexK}})}>
          </Input> 

          <Button className="poistoM" onClick={() => props.dispatch({type: 'POISTA_KYSYMYS', data:{}})}>
            <DeleteIcon/></Button>{näytäVaihtoehdot(item, indexK)}</div>
        </Card>)}
      <div>
        <Button className="lisääK" 
          onClick={() => props.dispatch({type: 'LISÄÄ_KYSYMYS', data:{}})}>
          <AddCircleOutlineIcon/>{"Lisää kysymys"}
        </Button>
      </div>
    </div>
  )
}