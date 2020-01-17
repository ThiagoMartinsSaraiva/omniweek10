import React from 'react'

import './styles.css'

function DevItem({dev, onRemove}) {

  async function handleClick(e) {
    e.preventDefault();
    const { _id } = dev
    await onRemove(_id)
  }

  return (
    <li className="dev-item">
      <button className="remove-button" onClick={handleClick}>X</button>
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
    </li>
  )
}

export default DevItem