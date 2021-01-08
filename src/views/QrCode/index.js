import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './styles';
import Qr from 'qrcode.react';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function QrCode() {

    const[mac, setMac] = useState();
    const [redirect, setRedirect] = useState(false);

    // para gravar a info do telemovel do user no browser
    async function SaveMac(){
        await localStorage.setItem('@todo/macaddress', mac);
        setRedirect(true);
        window.location.reload();
    }

    return (
        <S.Container>
            {redirect && <Redirect to="/" /> }
            <Header/>

            <S.Content>
                <h1>CAPTURE O QRCODE PELA APP</h1>
                <p>AS SUAS ATIVIDADES SERÃO SINCRONIZADAS PELO SEU TELEMOVEL</p>
                <S.QrCodeArea>
                    <Qr value='getmacaddress' size={350} />
                </S.QrCodeArea>

                <S.ValidationCode>
                    <span>Digite o seu macaddress</span>
                    <input type="text" onChange={e => setMac(e.target.value)} value={mac} /> 
                    <button type="text" onClick={SaveMac}>SINCRONIZAR</button>
                </S.ValidationCode>
    
            </S.Content>




            <Footer/>
        </S.Container>
    )
}

export default QrCode;