import React from 'react';
import logo from '../svg/keytoe_icon_RGB.svg';
import Welkom from './Welkom';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from '../store';

import AdminAdd from './AdminAdd'
import AdminItem from './AdminItem'
import FormErrors from './FormErrors'


class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            questionData: [],
            id: 0,
            position:'',
            question: '',
            hint: '',
            answer: '',
            items: [],
            serverStatus: false,
            formErrors: { position: '', question: '', hint: '', answer: '' },
            posValid: false,
            formValid: false
        }
    }

// dit is hoe de items array eruit ziet je kan gewoon items[0].question = q1
//[{ id: 1, question: 'q1', hint: 'h1', answer: 'a1' ,position:'p1'},
//{ id: 2, question: 'q2', hint: 'h2', answer: 'a2' ,position:'p2'},
//{ id: 3, question: 'q3', hint: 'h3', answer: 'a3' ,position:'p3'},]


    // haalt de informatie uit de database op ( GET ) en voegt het toe aan items[]
    componentDidMount() {
        document.body.style.backgroundColor = 'white'

        let url = 'http://192.168.5.102:4000/'
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ items: data , serverStatus: true})
            }).catch(err =>
            console.log(err))
    }

    //zorgt voor veranderen van input
    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        }, () => { this.validateField(name,value)})
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let posValid = this.state.posValid
        
        switch (fieldName) {
            case 'position':
                posValid = value.match(/^[0-9]*$/)
                fieldValidationErrors.position = posValid ? '' : 'is geen nummer'
                break;
            default:
                break;                 
        }
        this.setState({ formErrors: fieldValidationErrors, posValid: posValid},this.validateForm)
    }

    validateForm = () => {
        this.setState({
            formValid: this.state.posValid
        })
    }

    /* Deze functie zorgt ervoor dat er een array terug komt met id's van de vragen die missen
     array.from maakt een nieuwe array die alle items pakt uit de oude array from('foo') -> ['f','o','o']
     map gaat over deze elementen heen en pakt de index waar het staat. index kleiner dan 0 en index groter dan laagste -> false && false = true -> geeft index terug
     */
    missingNumbers = a => 
        Array.from(
            Array(Math.max(...a)).keys())
            .map((n, i) => a.indexOf(i) < 0 && (i > Math.min(...a))
                ? i
                : null).filter(f => f);
    
    // voegt item toe in de state EN voegt item toe in de database, 1 probleem. ID kijkt alleen naar totale lengte van de items niet naar de ID zelf
    addItem = e => {
        e.preventDefault();
        const { question, hint, answer, position } = this.state
        const itemsInState = this.state.items

        const testid = itemsInState.map(id => id.id)

        // als er geen vragen zijn moet er iets in zitten anders kan het niet doorgegeven worden naar missingNumbers
        if (testid[0] !== 0) {
            testid.push(0)
        }
        //console.log("Alle ID's in de array op dit moment "+testid)

        /*
          als er iets zit in de missingNumbers array dan wordt het eerste element de nieuwe id, anders wordt de lengte van de array het nieuwe id
          dit werkt omdat er een soort van 'hidden element' zit in testid --> omdat er altijd met testid.push(0) id 0 wordt gezet als het niet op het eerste element te vinden is.
          mogelijk probleem wat voor kan komen is wanneer id van eerste element opeens wordt gewijzigd naar 0
        */
        const id = this.missingNumbers(testid).length > 0 ? this.missingNumbers(testid)[0] : testid.length

        //console.log("inserted on id: " + id)
        //console.log(this.missingNumbers(testid))

        if (question !== '' && hint !== '' && answer !== '' && position !== '') {
            console.log(id, question, hint, answer, position)
            let url1 = 'http://192.168.5.102:4000/create'
            fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": id, "question": question, "hint": hint, "answer": answer, "position": position })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            this.setState({
                items: [
                    ...itemsInState,
                    Object.assign({}, {
                        id, question, hint, answer, position
                    })
                ],
                position: '',
                question: '',
                hint: '',
                answer: ''
            })
        }
    };

    // toggle item editing voor de index die je wilt
    toggleItemEditing = index => {
         this.setState({
                items: this.state.items.map((item, itemIndex) => {
                    if (itemIndex === index) {
                        return {
                            ...item,
                            isEditing: !item.isEditing
                        }
                    }
                    return item;
             })
        })
    };

    // update te item die je kan editen de naam van de field ( in HTML) wordt de value (de input) aan toegekent
    handleItemUpdate = (e, index) => {
        // value en naam van input veld
        const target = e.target
        const value = target.value
        const name = target.name

        //console.log("name: "+name, "value: "+value)

        this.setState({
            items: this.state.items.map((item, itemIndex) => {
                if (itemIndex === index) {
                    //console.log(this.state.items[index])
                    return {
                        ...item,
                        [name]: value
                    }
                }
                return item
            })
        }, () => { this.validateField(name, value) })
    };

    handlePutRequest = (e, index) => {
        e.preventDefault()
        const updateItem = this.state.items[index]
        console.log(updateItem)

        if ((updateItem.question !== '' && updateItem.hint !== '' && updateItem.answer !== '' && updateItem.position !== '' && this.state.posValid)) {
            let url1 = 'http://192.168.5.149:4000/update/'
            fetch(url1, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": updateItem.id, "question": updateItem.question, "hint": updateItem.hint, "answer": updateItem.answer, "position": updateItem.position })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    // delete uit de database gebaseerd op ID en haalt het item uit de state en voegt de items samen als het uit het midden wordt gehaald
    onDelete = index => {
        const deleteItem = this.state.items[index]
        console.log(deleteItem)

        let url1 = 'http://192.168.5.102:4000/delete'
        fetch(url1, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": deleteItem.id, "question": deleteItem.question, "hint": deleteItem.hint, "position":deleteItem.position })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })


        this.setState({
            items: [
                ...this.state.items.slice(0, index),
                ...this.state.items.slice(index + 1)
            ]
        })
    };
    renderPanel() {
        ReactDOM.render(
            <Provider store={store}>
                <Welkom/>
            </Provider>,
            document.getElementById('root')
         );
    }


    render() {
        const {id,question,hint,answer,position} = this.state
        return (
            <div>

                <h1>Voeg vraag toe</h1>
                <div>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <AdminAdd
                    position={position}
                    id={id}
                    question={question}
                    hint={hint}
                    answer={answer}
                    onChange={this.handleInputChange}
                    onSubmit={(e) => { this.addItem(e) }}
                    FormValid={this.state.formValid}
                />

                <h1>vragen</h1>

                <div className='grid-admin-item'>
                    {this.state.serverStatus ?
                        this.state.items.map((item, index) =>
                            <AdminItem
                                key={item.id}
                                index={index}
                                item={item}
                                toggleEditing={() => this.toggleItemEditing(index)}
                                onChange={this.handleItemUpdate}
                                onDelete={() => this.onDelete(index)}
                                onSubmit={(e) => this.handlePutRequest(e, index)}
                                FormValid={this.state.formValid}
                                errors={this.state.formErrors}
                                />
                               
                            )
            :
                    <div><p>de server staat niet aan!</p></div>
            }
            
            
                </div>
            </div>)
    }
}


export default Admin