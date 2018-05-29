import React, { Component } from 'react'
import { ValidationForm, TextInput, FileInput, SelectGroup, Checkbox } from "../../../lib";
import { initCodeSyntaxHighlight, InfoBox, PropertiesTable } from '../index'
import { Link } from 'react-router-dom';

export default class ValidationFormApi extends Component{
    state = {
        immediate:true,
        setFocusOnError:true
    }

    properties = [
        {
            name:"onSubmit",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the form is submitted without error.</p>
                            Signature: <code>(event, formData, formControls) => void</code>
                            <ul>
                                <li><i>event:</i> Submit event targeting the form</li>
                                <li><i>formData:</i> Serialized form data object. Key will be the input name.</li>
                                <li><i>formControls:</i> Form controls reference inside the form.</li>
                            </ul>
                        </div>,
            required:true
        },
        {
            name:"onErrorSubmit",
            type:"function",
            default:"",
            description:<div>
                            <p>Callback function evoked when the form is submitted with error.</p>
                            Signature: <code>(event, formData, errorDetails) => void</code>
                            <ul>
                                <li><i>event:</i> Submit event targeting the form</li>
                                <li><i>formData:</i> Serialized form data object. Key will be the input name.</li>
                                <li><i>errorDetails:</i> Object contains input error details. Useful when building validation summary.<br/>
                                    <b>key:</b> input name. <b>value:</b> <a href='https://developer.mozilla.org/en-US/docs/Web/API/ValidityState' target='_blank'>ValidityState</a>
                                </li>
                            </ul>
                        </div>
        },
        {
            name:"className",
            type:"string",
            default:"needs-validation",
            description:<p><a href='https://getbootstrap.com/docs/4.0/components/forms/#validation' target='_blank'>Default form class name.</a></p>
        },
        {
            name:"immediate",
            type:"boolean",
            default:"true",
            description:<p>Whether to validate input on <code>change</code> event or <code>blur</code> event. Try to toggle this property in sample form above.</p>
        },
        {
            name:"setFocusOnError",
            type:"boolean",
            default:"true",
            description:"Whether to focus on first error input when submit. Try to toggle this property in sample form above."
        },
        {
            name:"defaultErrorMessage",
            type:"object",
            default:"{}",
            description:<p>Default error message for the current instance of <code>ValidationForm</code>. See <Link to="/example/errorMessage">detailed explanation here.</Link></p>
        }
    ]

    componentDidMount() {
        initCodeSyntaxHighlight();
        ValidationForm.defaultErrorMessage.required = "Bla";
    }

    handleSubmit = (e, formData, inputs) => {

    }

    handleErrorSubmit = (e,formData, errorInputs) => {
        console.log(errorInputs);
    }

    handleCheck = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.checked })
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h4>ValidationForm</h4>
                    <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} 
                        immediate={this.state.immediate} 
                        setFocusOnError={this.state.setFocusOnError}
                        defaultErrorMessage={{ required: "Please enter something."}}
                    >
                        <div className="form-group">
                            <label htmlFor="fullName">Full name</label>
                            <TextInput name="fullName" id="fullName" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <TextInput name="email" id="email" type="email" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="attachment">Attachment</label>
                            <FileInput name="attachment" id="attachment"/>
                        </div>

                        <Checkbox id="isSubscribe" name="isSubscribe" label="Subscribe to newsletter" />
                        

                        <div className="form-group mt-3">
                            <button className="btn btn-primary">Submit</button>
                            <button className="btn btn-default ml-2" type="button">Reset</button>
                        </div>
                    </ValidationForm>

                    <div className="border px-3 py-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="immediate" name="immediate"
                                onChange={this.handleCheck} checked={this.state.immediate}/>
                            <label className="form-check-label" htmlFor="immediate">Toggle <b>immediate</b></label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="setFocusOnError" name="setFocusOnError"
                                onChange={this.handleCheck} checked={this.state.setFocusOnError}/>
                            <label className="form-check-label" htmlFor="setFocusOnError">Toggle <b>setFocusOnError</b></label>
                        </div>
                    </div>

                  
                </div>
                <div className="col-md-7">
                    <pre>
                        <code className="lang-javascript">
{`
<ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} 
                        immediate={this.state.immediate} 
                        setFocusOnError={this.state.setFocusOnError}
                        defaultErrorMessage={{ required: "Please enter something."}} >
    <div className="form-group">
        <label htmlFor="fullName">Full name</label>
        <TextInput name="fullName" id="fullName" required/>
    </div>

    <div className="form-group">
        <label htmlFor="email">Email</label>
        <TextInput name="email" id="email" type="email" required/>
    </div>

    <div className="form-group">
        <label htmlFor="attachment">Attachment</label>
        <FileInput name="attachment" id="attachment"/>
    </div>

    <Checkbox id="isSubscribe" name="isSubscribe" label="Subscribe to newsletter" />

    <div className="form-group mt-3">
        <button className="btn btn-primary">Submit</button>
        <button className="btn btn-default ml-2" type="button">Reset</button>
    </div>
</ValidationForm>
`}
                        </code>
                    </pre>
                </div>

                <PropertiesTable properties={this.properties}/>
            </div>
        )
    }
}