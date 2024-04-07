import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

// Le composant UserList reçoit searchTerm en tant que prop pour la recherche.
const UserList = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Récupération des données utilisateur dès le montage du composant.
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  // Fonction pour gérer le clic sur un utilisateur, affichant ses détails.
  const handleClick = (user) => {
    setSelectedUser(user);
  };

  // Filtrage des utilisateurs basé sur le terme de recherche.
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list">
      {filteredUsers.map((user) => (
        <div key={user.id} className="user-card" onClick={() => handleClick(user)}>
          <h2>{user.name}</h2>
          <button onClick={() => handleClick(user)}>Voir détails</button>
        </div>
      ))}

      {selectedUser && (
        <div className="modal">
          <h2>Détails de l'utilisateur</h2>
          <p>Nom: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Username: {selectedUser.username}</p>
          <p>Téléphone: {selectedUser.phone}</p>
          <p>Site web: {selectedUser.website}</p>
          <p>Entreprise: {selectedUser.company.name}</p>
          <p>CatchPhrase: {selectedUser.company.catchPhrase}</p>
          <p>BS: {selectedUser.company.bs}</p>
          <p>Adresse:</p>
          <ul>
            <li>Rue: {selectedUser.address.street}</li>
            <li>Suite: {selectedUser.address.suite}</li>
            <li>Ville: {selectedUser.address.city}</li>
            <li>Code Postal: {selectedUser.address.zipcode}</li>
            <li>Geo: Lat {selectedUser.address.geo.lat} / Lng {selectedUser.address.geo.lng}</li>
          </ul>
          <button onClick={() => setSelectedUser(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
