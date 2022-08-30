import { Component } from 'react';
import { nanoid } from 'nanoid';

import FormAddPhone from './FormAddPhone/FormAddPhone';
import Contacts from './Contacts/Contacts';

import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(`${data.name} - ${data.number} is already in phonebook`);
    }

    // console.log(data);
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  handleFilter = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      item => item.name === name && item.number === number
    );
    return result;
  }

  getFilteredContacts() {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) || number.includes(filter);
      return result;
    });

    return filteredContacts;
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    // const { contacts } = this.state;
    const { addContact, removeContact, handleFilter } = this;

    const contacts = this.getFilteredContacts();

    return (
      <div>
        <h2 className={s.title}>Phonebook</h2>
        <div className={s.container}>
          <FormAddPhone onSubmit={addContact} />
        </div>

        <div>
          <h2 className={s.title}>Contacts</h2>
          <p className={s.paragraph}>Find contacts by name</p>
          <input
            name="filter"
            onChange={handleFilter}
            className={s.input}
            placeholder="Filter"
          />
          <Contacts items={contacts} removeContact={removeContact} />
        </div>
      </div>
    );
  }
}

export default App;
