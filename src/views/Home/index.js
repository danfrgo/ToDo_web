import React, {useState, useEffect} from 'react';
import * as S from './styles';

import api from '../../services/api'; // conexao com BD via API

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';


function Home() {
    const [filterActived, setFilterActived] = useState('all');
    const [tasks, setTasks] = useState([]); // [] para guardar varias informaçoes

    // funçao para carregar as informaçoes das tarefas da BD, atraves de filtros
    async function loadTasks(){
        await api.get(`/task/filter/${filterActived}/11-11-11-11-11-11`)
        .then(response => {
            setTasks(response.data);
            console.log(response.data);
        })
    }

    // carregar tarefas ecra
    useEffect(() => {
        loadTasks(); // carregar todas as tarefas no ecra
    }, [filterActived]) // sempre que o estado mudar ->filterActived, tambem recarrega o ecra


    return (
    <S.Container>
    <Header/>

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
        <h3>TAREFAS</h3>
    </S.Title>



    <S.Content>
       {
           // map percorre item por item dentro da coleçao
        tasks.map(t => ( 
        <TaskCard type={t.type} title={t.title} when={t.when} />
        ))
       }
    </S.Content>
    
    <Footer/>
    </S.Container>

    )
}

export default Home;
