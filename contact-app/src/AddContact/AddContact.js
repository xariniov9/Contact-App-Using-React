import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

class AddContact extends Component {
    constructor(){
        super();
        this.state = {
            contact: {},
            imgSource: String
        }
        this.apiUrl = 'http://localhost:3100/api/contact';
        this.uploadImage = this.uploadImage.bind(this);
        this.onClickUploadImage = this.onClickUploadImage.bind(this);

    }

    submit(event){
        event.preventDefault();

        if(this.refs.name.value != "" && this.refs.mOffice.value != "" && this.refs.mPersonal.value != "") {
            let newContact = {
                name: this.refs.name.value,
                phone_office: this.refs.mOffice.value,
                phone_personal: this.refs.mPersonal.value
            };
            this.uploadImage((imageName) => {
                newContact.image = imageName;
                axios.post(this.apiUrl, newContact)
                    .then((res) => {
                        this.props.addContactInList(res.data);
                        alert("Contact Added!");
                    });
            })

        } else{
            alert("No field can be empty!");
        }
    }

    uploadImage(cb){
        const file = $('#file_upload_input').prop('files')[0];
        console.log(file);
        if(!file) {
            cb(this.state.imgSource);
            return;
        }
        let fd = new FormData();
        fd.append('avatar', file);

        axios.post("http://localhost:3100/upload", fd)
            .then( (res)=>{
                console.log(res.data);
                cb(res.data.filename)
            });
    }

    onClickUploadImage () {
        $('#file_upload_input').click()
    }

    render() {
        this.state.imgSource = 'person-placeholder.jpg'
        return (
            <div className="container">
                <span>
                    <h4> Add New Contact</h4>
                </span>

                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s2">
                                <i class="material-icons prefix">account_circle</i>
                                <input ref = "name" id="icon_prefix" type="text" class="validate" className="form-control"></input>
                                    <label for="icon_prefix">Name</label>
                            </div>

                            <div class="input-field col s2">
                                <i class="material-icons prefix">phone</i>
                                <input ref="mOffice" id="icon_telephone" type="tel" class="validate" className="form-control"></input>
                                    <label for="icon_telephone">Office Phone</label>
                            </div>

                            <div class="input-field col s2">
                                <i class="material-icons prefix">phone_iphone</i>
                                <input ref="mPersonal" id="icon_telephone1" type="tel" class="validate" className="form-control"></input>
                                    <label for="icon_telephone1">Personal Phone</label>
                            </div>
                            <div className='input-field col s2'>
                                <input type='file' id='file_upload_input' accept='image/*' />
                            </div>

                            <div>
                                <button className="btn btn-primary waves-effect waves-light" onClick={this.submit.bind(this)}>Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddContact;