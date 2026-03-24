import React, { Component } from "react";

import Form from './Form'
import Tarefas from './Tarefas'

import "./main.css"

export default class Main extends Component {
   
   state = {
      nova_tarefa: '',
      tarefas: [],
      index: -1
   };
   
   field_input_ref = React.createRef()

   componentDidMount() {
      const tarefas = JSON.parse(localStorage.getItem('Your_notebook_tasks__by_DevLDRC'))

      if( !tarefas ) return

      this.setState({tarefas})
   }

   componentDidUpdate(prevProps, prevState) {
      const { tarefas } = this.state

      if( tarefas === prevState.tarefas) return

      localStorage.setItem('Your_notebook_tasks__by_DevLDRC', JSON.stringify(tarefas))
   }

   handleSubmit = (e) => {
      
      e.preventDefault()
      
      const { tarefas, index } = this.state;
      let { nova_tarefa } = this.state
      
      nova_tarefa = nova_tarefa.trim()
      
      if(nova_tarefa === '') return

      // RETORNA SE O ITEM JA FOI INSERIDO NA LISTA
      if (tarefas.indexOf(nova_tarefa) !== -1) return
      
      const novas_tarefas = [...tarefas]
      
      if(index === -1) {
         
         this.setState({
            tarefas: [...novas_tarefas, nova_tarefa],
            nova_tarefa: ''
         })
         
      } else {
         novas_tarefas[index] = nova_tarefa

         this.setState({
            tarefas: [...novas_tarefas],
            index: -1,
            nova_tarefa: ''
         })

      }

   }

   handleDelete = (e, index) => {

      const { tarefas } = this.state

      const novas_tarefas = [...tarefas]
      novas_tarefas.splice(index, 1)

      this.setState({
         tarefas: [...novas_tarefas],
      })

   }

   handleEdit = (e, index) => {

      const { tarefas } = this.state;
      this.setState({
         index,
         nova_tarefa: tarefas[index],
      });

      this.field_input_ref.current.focus()

   }

   handleChange = (e) => {
      this.setState({
         nova_tarefa: e.target.value,
      });
   }

   render() {
      const { nova_tarefa, tarefas } = this.state

      return (
         <div>

            <div className="main">

               <h1>TO DO LIST</h1>

               <Form
                  field_ref={this.field_input_ref}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  nova_tarefa={nova_tarefa}
               />

               <div>
                  <hr/>
               </div>

               <Tarefas
                  tarefas={tarefas}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
               />

            </div>

            {/* <footer>

               <section>

                  <div>
                     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 24 24">
                        <path id="tess" fill="white" d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z"></path>
                     </svg>
                  </div>

                  <div>
                     <a href="https://github.com/DevLDRC/TO_DO_LIST_-_REACT"><p>https://github.com/DevLDRC/TO_DO_LIST_-_REACT</p></a>
                  </div>

               </section>

            </footer> */}

         </div>
      )
   }
}
