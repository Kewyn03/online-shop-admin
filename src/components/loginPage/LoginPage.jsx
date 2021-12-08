import React from 'react'

import './loginPage.scss'
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {

    const [isRole,setIsRole] = React.useContext(AuthContext)
    const alert = useAlert()
    let history = useHistory()

    const useValidations = (value,validations) => {
        const [isEmpty,setIsEmpty] = React.useState(true)
        const [minLengthError,setMinLengthError] = React.useState(false)
        const [isPasswordError ,setIsPasswordError] = React.useState(false)
        const [inputValid,setInputValid] = React.useState(false)




        React.useEffect(() => {
            for (const validation in validations){
                switch (validation) {
                    case 'minLength' :
                        value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                        break;
                    case 'isEmpty' :
                        value ? setIsEmpty(false) : setIsEmpty(true)
                        break;
                    case 'isPassword' :
                        const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
                        re.test(value) ? setIsPasswordError(false) : setIsPasswordError(true)
                        break;

                }
            }
        },[value])

        React.useEffect(() => {
            if(isEmpty || minLengthError || isPasswordError ) {
                setInputValid(false)
            } else {
                setInputValid(true)
            }
        },[isEmpty,minLengthError,isPasswordError])


        return {
            minLengthError,
            isEmpty,
            isPasswordError,
            inputValid,

        }
    }

    const useInput = (initialValue,validations) => {
        const [value, setValue] = React.useState(initialValue)
        const [isDirty, setDirty] = React.useState(false)
        const valid = useValidations(value, validations)


        const onChange = (e) => {
            setValue(e.target.value)
        }

        const onBlur = (e) => {
            setDirty(true)
        }

        const onClick = (e) => {
            e.preventDefault()
            currentUser()
        }

        return {
            value,
            isDirty,
            onClick,
            onChange,
            onBlur,
            ...valid

        }
    }

    const currentUser = () => {
        if (login.value === 'admin' && password.value === 'Kirill03062002') {
            return (
                setIsRole(true),
                history.push('/main'),
                sessionStorage.setItem('role','admin')
            )
        } else {
            return (
                <div>
                    {alert.show(<div style={{color:'orange'}}>This page just for Admin!</div>)}
                </div>,
                setIsRole(false),
                sessionStorage.setItem('role','user')
            )
        }
    }

    const login = useInput('',{isEmpty : true,minLength: 3})
    const password = useInput('',{isEmpty : true,minLength: 8,isPassword : true})

    return (

        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2" />
                <div className="col-lg-6 col-md-8 login-box">

                    <div className="col-lg-12 login-title">
                        ADMIN PANEL
                    </div>

                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form>
                                <div className="form-group">
                                    {(login.isDirty && login.isEmpty) && <div style={{color:'red'}}>Field cannot be empty!</div> }
                                    {(login.isDirty && login.minLengthError) && <div style={{color:'red'}}>Length is not correct</div> }

                                    <label className="form-control-label">USERNAME</label>
                                    <input value={login.value} type="text" className="form-control" onChange={e => login.onChange(e)} onBlur={e => login.onBlur(e)}/>
                                </div>
                                <div className="form-group">
                                    {(password.isDirty && password.isEmpty) && <div style={{color:'red'}}>Field cannot be empty!</div> }
                                    {(password.isDirty && password.minLengthError) && <div style={{color:'red'}}>Length is not correct</div> }
                                    {(password.isDirty && password.isPasswordError) && <div style={{color:'red'}}>Should be 1 Upper,minimum 8 letters,1 number</div> }
                                    <label className="form-control-label">PASSWORD</label>
                                    <input value={password.value} type="password" className="form-control" onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} />
                                </div>

                                <div className="col-lg-12 loginbttm">

                                    <div className="col-lg-6 login-btm login-button">
                                        <button disabled={!login.inputValid || !password.inputValid} type="submit" className="btn btn-outline-primary"
                                        onClick={e => login.onClick(e) && password.onClick(e)}>LOGIN</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"/>
                </div>
            </div>
        </div>


            )
}