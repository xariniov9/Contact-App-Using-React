import React, {Component} from 'react';
import axios from 'axios';

class EditContact extends Component{
    constructor(){
        super();
        this.apiUrl = 'http://localhost:3100/api/contact'
    }
    submit(event) {
        event.preventDefault();
        if(this.refs.name.value != "" && this.refs.mOffice.value != "" && this.refs.mPersonal.value != "") {
            let newContact = {
                name: this.refs.name.value,
                phone_office: this.refs.mOffice.value,
                phone_personal: this.refs.mPersonal.value,
                image: this.props.contact.image

            }

            axios.put(this.apiUrl + "/" + this.props.contact._id, newContact)
                .then((res) => {
                    axios.get(this.apiUrl + "/" + this.props.contact._id).then((resIn) => {
                        this.props.addContactInList(resIn.data);
                    })
                });
        } else {
            alert("No field can be empty!");
        }
    }
    render(){
        console.log(this.props.contact);
        return (
            <div className="container">
                <span>
                    <h4>Edit Contact</h4>
                </span>

                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s3">
                                <i class="material-icons prefix">account_circle</i>
                                <input ref = "name" id="icon_prefix" type="text" class="validate" className="form-control"></input>
                                <label for="icon_prefix">{this.props.contact.name}</label>
                            </div>

                            <div class="input-field col s3">
                                <i class="material-icons prefix">phone</i>
                                <input ref="mOffice" id="icon_telephone" type="tel" class="validate" className="form-control"></input>
                                <label for="icon_telephone">{this.props.contact.phone_office}</label>
                            </div>

                            <div class="input-field col s3">
                                <i class="material-icons prefix">phone_iphone</i>
                                <input ref="mPersonal" id="icon_telephone1" type="tel" class="validate" className="form-control"></input>
                                <label for="icon_telephone1">{this.props.contact.phone_personal}</label>
                            </div>
                            <div>
                                <button className="btn btn-primary waves-effect waves-light" onClick={this.submit.bind(this)}>Edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}

export default EditContact;