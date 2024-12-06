import { useState } from 'react'
import React from 'react'
import { user } from './interfaces/user'
const App: React.FC=()=>{
const [openModel, setOpenModel]=useState(false);
const [formData , setFormData]=useState<Omit<user ,"id">>({
  
  nom:'',
  num_tel: '',
  email:'',

});
const[listContact , setListContact]=useState<user[]>([]);
const[idClientModif , setIdClientModif]=useState<number|null>(null);

const ajouterContact=()=>{
  setOpenModel(true);
  
} 
const EnregistrerClients=()=>{
  if(idClientModif!== null)
  {
    const modifiedC=listContact.map((contact)=>contact.id==idClientModif ? { ...contact, ...formData }
    : contact);
    setListContact(modifiedC);
    setIdClientModif(null);
    setOpenModel(false);


  }
  else{
  const newContact:user={
    id:Date.now(),
    nom:formData.nom,
    num_tel:formData.num_tel,
    email:formData.email

  };
  setListContact([...listContact, newContact]);
  setFormData(
    {
      nom: "",
      num_tel:"",
      email:""
    }
  );
  setOpenModel(false);
}}
const supprimerClient=(id:number)=>
{
  const updateListe=listContact.filter(c=>c.id!==id);
  setListContact(updateListe);
}
const ModifierClient=(id:number)=>{
  const client =listContact.find((c)=>c.id===id);
  if(client){
  setFormData({
    nom:client.nom,
    num_tel: client.num_tel,
    email:client.email
  });
  setIdClientModif(id);
  setOpenModel(true);}

}

return(
 <div>
  <h1>Liste des contacts</h1>
  <button onClick={ajouterContact}>Ajouter Client</button>

 {openModel && (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}> 
   
    <label>Nom :</label>
    <input type="text" placeholder='nom'value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })}/>
    <label>telephone</label>
    <input type="text" placeholder='numéro de telephone'value={formData.num_tel }  onChange={(e) => setFormData({ ...formData, num_tel: e.target.value })}  />
    <label>Email</label>
    <input type="text" placeholder='email' value={formData.email }   onChange={(e) => setFormData({ ...formData, email: e.target.value })}  />
    <button onClick={EnregistrerClients}>Enregistrer</button>
    
 
  </div>
)} 
<ul>
  {listContact.map(contact =>(
    <li key ={contact.id}>{contact.nom}  , {contact.num_tel} ,{contact.email} 
    <button onClick={() => ModifierClient(contact.id)} >Modifier </button>
    <button onClick={() => supprimerClient(contact.id)}>Supprimer</button>
    </li>
  ))}
</ul>




</div>)
}



export default App
