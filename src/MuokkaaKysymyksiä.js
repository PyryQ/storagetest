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
  let data = props.kysymykset;
  let kyselyN = props.kyselyIndex;
  //Valitaan datasta oikea kysely käsiteltäväksi

  const näytäVaihtoehdot = (index) => {
    //Mikäli tuloksia ei ole palautettu, tulostetaan vain yksi checkbox
      return <div> {data[props.kyselyIndex].kysely[index].vastaukset.map((alkio, vastausIndex) => 
      <div key={vastausIndex}>
        <label><Checkbox className="vastausCheckM" key= {"oikea"+ props.kyselyIndex + "" + index + "" + vastausIndex}
         checked={alkio.oikea} onChange={(e) => props.muutaOikeaVastaus(e, index, vastausIndex)}/>
        </label>
        
        <Input key={"vastaus" + props.kyselyIndex + "" + index + "" + vastausIndex} 
        className="vastausM" defaultValue={alkio.vastaus} 
        onChange = {(e) => props.muokkaaVastausta(e, index, vastausIndex)}></Input>

        <Button className="vastausPoisto" key={alkio}
        id={vastausIndex}><DeleteIcon></DeleteIcon></Button>
        </div>)}<Button className="lisääM"><AddCircleOutlineIcon/>Lisää vaihtoehto</Button></div>
  }
  
  return (
    <div className="muokkausosio">
      <Button className="poistoM"><DeleteIcon/>Poista tämä tentti</Button>
      <Button className="lisääM"><AddCircleOutlineIcon/>Lisää uusi tentti</Button>

      {data.map((item, indexK) => <Card className="korttiM" elevation={3}>
        <Input className="kysymysM" 
          key={"kysymys" + props.kyselyIndex + "" + indexK}
          defaultValue={data[props.kyselyIndex].kysely[indexK].kysymys}
          onChange={(e) => MuokkaaKysymyksiä(e, indexK)}>
        </Input> 
        <Button className="poistoM"><DeleteIcon/></Button>{näytäVaihtoehdot(indexK)}
      </Card>)}
      <div>
        <Button className="lisääM"><AddCircleOutlineIcon/>Lisää kysymys</Button>
      </div>
    </div>
  )
}