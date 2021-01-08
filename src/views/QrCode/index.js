import React, {useState, useEffect} from 'react';
import * as S from './styles';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function QrCode() {
    return (
        <S.Container>
            <Header/>

            <S.Content>
                <h1>CAPTURE O QRCODE PELA APP</h1>
                <S.QrCodeArea></S.QrCodeArea>
                <p>AS SUAS ATIVIDADES SERÃO SINCRONIZADAS PELO SEU TELEMOVEL</p>
            </S.Content>




            <Footer/>
        </S.Container>
    )
}

export default QrCode;