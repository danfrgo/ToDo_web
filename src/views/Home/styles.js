import styled from 'styled-components';

export const Container = styled.div  `
    width : 100%;
`


export const FilterArea = styled.div  `
    width : 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; // espaçado um do outro
    margin-top: 30px;

    button{
        background: none;
        border: none;
    }
    
`

export const Content = styled.div`
width : 100%;
display: flex; //para colocar as tarefas lado a lado
flex-wrap: wrap; // para quebrar de linha para nao sair fora do ecra
justify-content: center; // centrar container


`

export const Title = styled.div`
width: 100%;
border-bottom: 1px solid #20295F;
//text-align: center;
display:flex;
justify-content: center;
margin-bottom: 20px;

h3{
    color: #20295F;
    position: relative;
    top: 30px;
    background: #FFF;
    padding: 0 20px;



`