import React, {Component} from 'react';
import axios from 'axios'
import { render } from 'react-dom'
import AddContact from "../AddContact/AddContact";
import EditContact from "../EditContact/EditContact";



const Contact = ({contact, editContact}) => {

    let imgSrc = "/images/" + contact.image;

    return (

        <div class="row">
            <div class="col s12 m12">
                <div class="card cardsmall">

                    <div class="card-content">
                        <div class = "row small">
                        <div class="col s2 inlineblock">
                            <img src={imgSrc}  alt="profile picture" class="circle responsive-img"/>
                            <span class="card-title">{contact.name}</span>
                        </div>
                        <div class = "col s6 inlineblock">
                            <h5><i class="material-icons">local_phone</i> {contact.phone_office}</h5>
                            <h5><i class="material-icons">phone_iphone</i>  {contact.phone_personal}</h5>
                        </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <a href="#" onClick={() => {
                            editContact(contact)
                        }}>Edit</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContactListElements = ({contacts, editContact}) => {
    const contactNode = contacts.map((contact) => {
        return (<Contact contact={contact} key={contact._id} editContact={editContact}/>)
    });
    return (<div className="list-group" style={{marginTop:'30px'}}>{contactNode}</div>);
}

class ContactList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            contactToUpdate: null
        };
        this.apiUrl = 'http://localhost:3100/api/contact'
    }

    componentDidMount(){
        // Make HTTP reques with Axios
        axios.get(this.apiUrl)
            .then((res) => {
                this.setState({data:res.data});
            });
    }

    addContactInList(contact){
        console.log("hello!");
        console.log(contact);

        for(var i = 0; i < this.state.data.length; i++) {
            if(this.state.data[i]._id == contact._id) {
                this.state.data.splice(i, 1);
                this.setState({data: this.state.data});
                break;
            }
        }
        this.state.data.push(contact);
        this.setState({data: this.state.data});
        this.setState({showEditForm: false});
    }

    handleEditContact(contact){
        this.setState({contactToUpdate:contact});
        this.setState({showEditForm: true});
    }

    render(){


        return this.state.showEditForm ?( <div>

                <AddContact
                    addContactInList = {this.addContactInList.bind(this)}
                />
                    <EditContact
                        contact={this.state.contactToUpdate}
                        addContactInList = {this.addContactInList.bind(this)}
                    />
                <ContactListElements
                    contacts={this.state.data}
                    editContact = {this.handleEditContact.bind(this)}

                />

                </div>
            )
            :
            (
            <div>
                <AddContact
                    addContactInList = {this.addContactInList.bind(this)}
                />
                <ContactListElements
                    contacts={this.state.data}
                    editContact = {this.handleEditContact.bind(this)}

                />


            </div>

        );
    }
}
export default ContactList;