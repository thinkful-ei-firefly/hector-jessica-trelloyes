import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

class App extends Component {
  
  state = {
    lists: STORE.lists,
    allCards: STORE.allCards,
  };

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  handleDelete = (id) => {
    let newlists = this.state.lists;
    newlists.forEach(list => list.cardIds = list.cardIds.filter(cardId => cardId!==id) );
    this.setState({lists: newlists, allCards: this.state.allCards})
  }

  handleAddNew = (listId) => {
    let newCard = this.newRandomCard();

    let newLists = this.state.lists;
    newLists[listId-1].cardIds.push(newCard.id);

    let newAllCards = this.state.allCards;
    newAllCards[newCard.id]=newCard;

    this.setState({lists: newLists, allCards: newAllCards});
  }

  render() {

    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          
          {this.state.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              handleDelete={this.handleDelete}
              handleAddNew={this.handleAddNew}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
