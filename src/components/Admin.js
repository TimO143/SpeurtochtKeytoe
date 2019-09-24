import React from 'react'

import AdminAdd from './AdminAdd'
import AdminItem   from './AdminItem'

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
            serverStatus: false
        }
    }

// dit is hoe de items array eruit ziet je kan gewoon items[0].question = q1
//[{ id: 1, question: 'q1', hint: 'h1', answer: 'a1' ,position:'p1'},
//{ id: 2, question: 'q2', hint: 'h2', answer: 'a2' ,position:'p2'},
//{ id: 3, question: 'q3', hint: 'h3', answer: 'a3' ,position:'p3'},]


    // haalt de informatie uit de database op ( GET ) en voegt het toe aan items[]
    componentDidMount() {
        document.body.style.backgroundColor = '#256eff'

        let url = 'http://192.168.5.149:4000/'
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
        })
    };

    // voegt item toe in de state EN voegt item toe in de database, 1 probleem. ID kijkt alleen naar totale lengte van de items niet naar de ID zelf
    addItem = e => {
        e.preventDefault();
        const { question, hint, answer, position } = this.state
        const itemsInState = this.state.items
        const itemsArrayLength = itemsInState.length
        const id = itemsInState.length + 1
        console.log(id)
        if (question !== '' && hint !== '' && answer !== '' && position !== '') {
            console.log(id, question, hint, answer, position)
            let url1 = 'http://192.168.5.149:4000/create'
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
            console.log(this.state.items)
            console.log(itemsInState)
            console.log(itemsArrayLength)
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
        })
    };

    handlePutRequest = (e, index) => {
        e.preventDefault()
        const updateItem = this.state.items[index]
        console.log(updateItem)

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

    // delete uit de database gebaseerd op ID en haalt het item uit de state en voegt de items samen als het uit het midden wordt gehaald
    onDelete = index => {
        const deleteItem = this.state.items[index]
        console.log(deleteItem)

        let url1 = 'http://192.168.5.149:4000/delete'
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


    render() {
        const {id,question,hint,answer,position} = this.state
        return (
            <div>
                <AdminAdd
                    position={position}
                    id={id}
                    question={question}
                    hint={hint}
                    answer={answer}
                    onChange={this.handleInputChange}
                    onSubmit={(e) => { this.addItem(e) }}
                />

                <h1>vragen</h1>

                <div>
                    {this.state.serverStatus ?
                        this.state.items.map((item, index) =>
                            <AdminItem
                                key={item.id}
                                index={index}
                                item={item}
                                toggleEditing={() => this.toggleItemEditing(index)}
                                onChange={this.handleItemUpdate}
                                onDelete={() => this.onDelete(index)}
                                onSubmit={(e) => this.handlePutRequest(e,index)}
                            />
                            )
            :
                    <div><p>de server staat niet aan!</p></div>
            }
            
            
                </div>
            </div>)
    }
}
//onSubmit={this.handleFormUpdate(this.state.items[index])}

export default Admin