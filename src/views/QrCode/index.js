import React, {useState, useEffect} from 'react';
import * as S from './styles';
import Qr from 'qrcode.react';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function QrCode() {
    return (
        <S.Container>
            <Header/>

            <S.Content>
                <h1>CAPTURE O QRCODE PELA APP</h1>
                <p>AS SUAS ATIVIDADES SERÃO SINCRONIZADAS PELO SEU TELEMOVEL</p>
                <S.QrCodeArea>
                    <Qr value='getmacaddress' size={350} />
                </S.QrCodeArea>

                <S.ValidationCode>
                    <span>Digite o seu macaddress</span>
                    <input type="text" />
                    <button type="text">SINCRONIZAR</button>
                </S.ValidationCode>
    
            </S.Content>




            <Footer/>
        </S.Container>
    )
}

export default QrCode;