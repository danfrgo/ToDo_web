import React, {useMemo} from 'react'; // vai auxiliar a separar data e hora de when -> useMemo
import {format} from 'date-fns'; // para formatar data e hora
import * as S from './styles';

import typeIcons from '../../utils/typeicons';

// import iconDefault from '../../assets/default.png';

function TaskCard({type, title, when}) {
    const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy' ) ); // converter when (que está em string) para formato de data e hora
    const hour = useMemo(() => format(new Date(when), 'HH:mm' ) );

    return (

        <S.Container>
            <S.TopCard>
                <img src={typeIcons[type]} alt="Icone da Tarefa"/>
                <h3>{title}</h3>
            </S.TopCard>
            <S.BottomCard>
                <strong>{date}</strong>
                <span>{hour}</span>

            </S.BottomCard>
        </S.Container>

    )
}

export default TaskCard;
