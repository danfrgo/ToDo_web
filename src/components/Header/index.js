import React, {useEffect, useState} from 'react';
import * as S from './styles';

import {Link} from 'react-router-dom'; // para redirecionamento = ao href

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

import api from '../../services/api';

function Header({ clickNotification}) {

    const [lateCount, setLateCount] = useState(); // armazenar a quantidade de tarefas em atraso

    // quantidade de tarefas em atraso
    async function lateVerify(){
        await api.get(`/task/filter/late/11-11-11-11-11-11`)
        .then(response => {
            setLateCount(response.data.length);
        })
    }

    useEffect(() => {
        lateVerify();
    })


    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="Logo" />
            </S.LeftSide>
            <S.RightSide>
            <Link to="/">INICIO</Link>
                <span className="dividir"/>
                <Link to="/task">NOVA TAREFA</Link>
                <span className="dividir"/>
                <Link to="/qrCode">SINCRONIZAR DISPOSITIVO</Link>
                {
                    // se existe lateCount entao aparece o bell de notificaçoes, caso contrario ficará oculto
                    lateCount &&
                    <>
                        <span className="dividir"/>
                        <button onClick={clickNotification} id="notification">
                            <img src={bell} alt="Notificação"/>
                            <span>{lateCount}</span>
                        </button>
                    </>
                }
            </S.RightSide>
        </S.Container>
    )
}

export default Header;
