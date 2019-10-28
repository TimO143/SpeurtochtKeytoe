import React from 'react';
import logo from '../svg/keytoe_icon_RGB.svg';
import Welkom from './Welkom';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from '../store';
import AdminAdd from './AdminAdd'
import AdminItem from './AdminItem'
import URL from './constant'
import close from '../svg/close.png';
import previous from '../svg/previous.svg';
import Konami from "react-konami-code";

class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            questionData: [],
            id: 0,
            position:null,
            question: '',
            hint: '',
            answer: '',
            items: [],
            serverStatus: false,
            formErrors: { position: '', question: '', hint: '', answer: '' },
            posValid: false,
            formValidAdd: false,
            formValidItem: false,
        }
    }
    
    // TO ACTIVATE:
    // ↑ ↑ ↓ ↓ ← → ← → B A
    easterEgg = () => {
        if (typeof document !== `undefined`) {
            const s = document.createElement("script")
            s.type = "text/javascript"
            document.body.appendChild(s)
            s.src =
                "https://rawcdn.githack.com/erkie/erkie.github.com/4a7222bbba100b50b89cea42ce070bb6258fb1d9/asteroids.min.js"
        }
    }

    // haalt de informatie uit de database op ( GET ) en voegt het toe aan items[]
    componentDidMount() {
        document.body.style.backgroundColor = 'white'
        console.log(process.env)

        let url = URL
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
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
        }, () => { this.validateFieldAdd(name,value)})
    };

    validateFieldAdd(fieldName, value) {
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
        this.setState({ formErrors: fieldValidationErrors, posValid: posValid},this.validateFormAdd)
    }
    validateFormAdd = () => {
        this.setState({
            formValidAdd: this.state.posValid
        })
    }
    validateFieldItem(fieldName, value) {
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
        this.setState({ formErrors: fieldValidationErrors, posValid: posValid }, this.validateFormItem)
    }

    validateFormItem = () => {
        this.setState({
            formValidItem: this.state.posValid
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
            let url1 = URL+'/create'
            fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": id, "question": question, "hint": hint, "answer": answer.toLowerCase(), "position": position })
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
        }, () => { this.validateFieldItem(name, value) })
    };

    handlePutRequest = (e, index) => {
        e.preventDefault()
        const updateItem = this.state.items[index]
        console.log(updateItem)

        if ((updateItem.question !== '' && updateItem.hint !== '' && updateItem.answer !== '' && updateItem.position !== '' )) {
            let url1 = URL+'/update/'
            fetch(url1, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": updateItem.id, "question": updateItem.question, "hint": updateItem.hint, "answer": updateItem.answer.toLowerCase(), "position": updateItem.position })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
        }
        alert('item is geupdate')
       
    }

    // delete uit de database gebaseerd op ID en haalt het item uit de state en voegt de items samen als het uit het midden wordt gehaald
    onDelete = index => {
        const deleteItem = this.state.items[index]
        console.log(deleteItem)

        let url1 = URL+'/delete'
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
                <Konami action={this.easterEgg} />
                <div className="grid">
                    <div className='grid-but-admin'>
                    <button className="goButAdminPanel" style={{ color: 'black' }} onClick={e => { e.preventDefault(); this.renderPanel() }}>WELKOMSCHERM</button>
                    </div>
                    <div className='grid-logo'>
                        <img src={logo} className="App-logo-admin" alt="logo" />
                    </div>
                   
                    <div className="grid-editQuestions">
                        <h1 className="editQuestions">VRAGEN <br />BEWERKEN</h1>
                    </div>

                    <div className="grid-admin-add">
                        <div className="admin-add">
                            <p className='admin-add-gebruik'>
                                Instructie: <br /><br />
                                Positie: <br />Als hoeveelste de vraag wordt gesteld<br />
                                <br />
                                
                                <img src={close} alt='close' width="21px" height="21px"></img> : Delete knop - Als je hier op klikt dan verwijder je de vraag definitief uit de database <br /><br />
                                <img src={previous} alt='prev' width="21px" height="21px"></img> : Met deze knop ga je uit de edit van een vraag, Deze knop slaat je veranderingen niet op, maar onthoud ze wel zolang je op de pagina bent. Dus vergeet niet op Save-button te klikken<br /><br />
    

                            </p>
                            <h1>Voeg vraag toe - Totaal aantal vragen: {this.state.items.length}</h1>
                            <div>
                            </div>
                <AdminAdd
                                position={position}
                                id={id}
                                question={question}
                                hint={hint}
                                answer={answer}
                                onChange={this.handleInputChange}
                                onSubmit={(e) => { this.addItem(e) }}
                                FormValid={this.state.formValidAdd}
                               
                    />
               </div>
               </div>

                <div className='grid-admin-item'>
                    {this.state.serverStatus ?
                        this.state.items.map((item, index) =>
                            <div className="admin-item">
                            <AdminItem
                                key={item.id}
                                index={index}
                                item={item}
                                toggleEditing={() => this.toggleItemEditing(index)}
                                onChange={this.handleItemUpdate}
                                onDelete={() => this.onDelete(index)}
                                onSubmit={(e) => this.handlePutRequest(e, index)}
                                FormValid={this.state.formValidItem}
                               
                                />
                                </div>
                            )
            :
                    <div><p>De server staat niet aan!</p></div>
            }
            
            </div>
                </div>
            </div>)
    }
}


export default Admin