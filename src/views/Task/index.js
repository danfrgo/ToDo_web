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
    const [type, setType] = useState(); // tipo da tarefa
    const [id , setId] = useState(); // guardar ID tarefa
    const [done, setDone] = useState(false); // tarefa concluida ou nao -> por padrao inicia a false (nao concluida)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('11-11-11-11-11-11');


    // quantidade de tarefas em atraso
    async function lateVerify(){
            await api.get(`/task/filter/late/11-11-11-11-11-11`)
            .then(response => {
                setLateCount(response.data.length);
            })
    }

    // registar nova tarefa pela API
    async function Save(){
        await api.post('/task', {
            macaddress,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000` // para ficar no padrao do mongoDB
        }).then(() => alert('Tarefa registada com sucesso')
        ).catch((error) => {
            alert('Error ' + error); // adicionei aqui
          });}

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
            <input type="text" placeholder="Título da tarefa..." 
            onChange={e => setTitle(e.target.value)} value={title} />
        </S.Input>

        <S.TextArea>
            <span>Descrição</span>
            <textarea rows={5} placeholder="Detalhes da tarefa..." 
            onChange={e => setDescription(e.target.value)} value={description} />
        </S.TextArea>

        <S.Input>
            <span>Data</span>
            <input type="date" placeholder="Título da tarefa..." 
            onChange={e => setDate(e.target.value)} value={date} />
            <img src={iconCalendar} alt="Calendário"/>
        </S.Input>

        <S.Input>
            <span>Hora</span>
            <input type="time" placeholder="Título da tarefa..." 
            onChange={e => setHour(e.target.value)} value={hour} />
            <img src={iconClock} alt="Relógio"/>
        </S.Input>

        <S.Options>
            <div>
                
                <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
                <span>CONCLUÍDO</span>
            </div>
            <button type="button">Excluír</button>
        </S.Options>

        <S.Save>
            <button type="button" onClick={Save} >GRAVAR</button>
    
    
        </S.Save>



    </S.Form>




    <Footer/>
    </S.Container>

    )
}

export default Task;
