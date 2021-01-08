import React, {useState, useEffect} from 'react';
import * as S from './styles';

import {Link, Redirect} from 'react-router-dom';

import api from '../../services/api'; // conexao com BD via API
import isConnected from '../../utils/isConnected';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';


function Home() {
    const [filterActived, setFilterActived] = useState('all');
    const [tasks, setTasks] = useState([]); // [] para guardar varias informaçoes
    // const [lateCount, setLateCount] = useState(); // armazenar a quantidade de tarefas em atraso
    const [redirect, setRedirect] = useState(false);

    // funçao para carregar as informaçoes das tarefas da BD, atraves de filtros
    async function loadTasks(){
        await api.get(`/task/filter/${filterActived}/11-11-11-11-11-11`)
        .then(response => {
            setTasks(response.data);
            //console.log(response.data);
        })
    }

    /*
    // quantidade de tarefas em atraso
    async function lateVerify(){
            await api.get(`/task/filter/late/11-11-11-11-11-11`)
            .then(response => {
                setLateCount(response.data.length);
            })
    }
    */

    // para ter o onclick no sino de notificaçoes atrasadas
    function Notification(){
        setFilterActived('late');
    }

    // carregar tarefas ecra
    useEffect(() => {
        loadTasks(); // carregar todas as tarefas no ecra
        // lateVerify(); // carregar as tarefas em atraso no "sino" de notificação

        if(!isConnected)
            setRedirect(true);


    }, [filterActived]) // sempre que o estado mudar ->filterActived, tambem recarrega o ecra


    return (
    <S.Container>
        {redirect && <Redirect to="/qrcode" />}
    <Header clickNotification={Notification}/>

    <S.FilterArea>
        <button type="button" onClick={()=> setFilterActived("all")}   >
        <FilterCard title="Todos"   actived={filterActived === 'all'} />
        </button>

        <button type="button" onClick={()=> setFilterActived("today")}   >
        <FilterCard title="Hoje"    actived={filterActived === 'today'} />
        </button>

        <button type="button" onClick={()=> setFilterActived("week")}   >
        <FilterCard title="Semana"  actived={filterActived === 'week'} />
        </button>

        <button type="button" onClick={()=> setFilterActived("month")}   >
        <FilterCard title="Mês"     actived={filterActived === 'month'} />
        </button>

        <button type="button" onClick={()=> setFilterActived("year")}   >
        <FilterCard title="Ano"     actived={filterActived === 'year'} />
        </button>
    </S.FilterArea>

    <S.Title>
        <h3>{filterActived === 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
    </S.Title>



    <S.Content>
       {
           // map percorre item por item dentro da coleçao
           // _id porque é dessa forma que o mongoDB armazena o campo
        tasks.map(t => ( 
            <Link to={`/task/${t._id}`}>
        <TaskCard type={t.type} title={t.title} when={t.when} done={t.done} />
        </Link>
        ))
       }
    </S.Content>
    
    <Footer/>
    </S.Container>

    )
}

export default Home;
