import { Component } from 'react';
import Container from './components/Container';
import Section from './components/Section';
import Form from './components/Form';
import PhoneBook from './components/PhoneBook';
import Filter from './components/Filter';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: ''
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} already in contacts. Rewrite number?`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }))
  };

 deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
 };
  
  searchFilter = e => {
    this.setState({ filter: e.currentTarget.value })
  };

  getFilteredContacts = () => {
  const { contacts, filter } = this.state;
  const normalizedSearch = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedSearch));
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.searchFilter}/>
          <PhoneBook contacts={filteredContacts} onDeleteContact={this.deleteContact}/>
        </Section>
      </Container>
    );
  }
}

export default App;
