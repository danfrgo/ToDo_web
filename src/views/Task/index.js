import React, {useState, useEffect} from 'react';
import * as S from './styles';

import api from '../../services/api'; // conexao com BD via API

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeicons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task() {
    const [lateCount, setLateCount] = useState(); // armazenar a quantidade de tarefas em atraso
    const [type, setType] = useState();

    // quantidade de tarefas em atraso
    async function lateVerify(){
            await api.get(`/task/filter/late/11-11-11-11-11-11`)
            .then(response => {
                setLateCount(response.data.length);
            })
    }

    // carregar tarefas ecra
    useEffect(() => {
        lateVerify(); // carregar as tarefas em atraso no "sino" de notificação
    }, []) 

    return (
    <S.Container>
    <Header lateCount={lateCount} />


    <S.Form>

        <S.TypeIcons>
            {
                // para cada icon que encontrar, é gerado um elemento
                TypeIcons.map((icon, index) => (
                    index > 0 && 
                    // o index [0] está como null
                    <button type="button" onClick={() => setType(index)}>
                    <img src={icon} alt="Tipo da Tarefa" 
                    className={type && type !== index && 'inactive'} /> 
                    </button>
                ))
            }
        </S.TypeIcons>

        <S.Input>
            <span>Título</span>
            <input type="text" placeholder="Título da tarefa..."></input>
        </S.Input>

        <S.TextArea>
            <span>Título</span>
            <textarea rows={5} placeholder="Detalhes da tarefa..." />
        </S.TextArea>

        <S.Input>
            <span>Data</span>
            <input type="date" placeholder="Título da tarefa..."></input>
            <img src={iconCalendar} alt="Calendário"/>
        </S.Input>

        <S.Input>
            <span>Hora</span>
            <input type="time" placeholder="Título da tarefa..."></input>
            <img src={iconClock} alt="Relógio"/>
        </S.Input>

        <S.Options>
            <div>
                <input type="checkbox" />
                <span>CONCLUÍDO</span>
            </div>
            <button type="button">Excluír</button>
        </S.Options>

        <S.Save>
            <button type="button">GRAVAR</button>
    
    
        </S.Save>



    </S.Form>




    <Footer/>
    </S.Container>

    )
}

export default Task;
