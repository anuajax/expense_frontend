import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import React from 'react'

class PhoneInputCountry extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            phone: ''
        }
    }
    render()
    {
    return (
        <PhoneInput  country={'ind'} value={this.state.phone} onChange={phone=>{this.setState({phone}); this.props.setTel(phone);}}/>
    )
    }
}
export default PhoneInputCountry;