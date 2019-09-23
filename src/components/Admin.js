import React from 'react'
import ReactDOM from 'react-dom'

class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            questionData: [],
            id:'',
            question: '',
            hint: '',
            answer: '',
           
            tempId: '',
            tempQuestion: '',
            tempHint: '',
            tempAnswer: '',
           
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#256eff'

        let url = 'http://192.168.5.149:4000/'
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ questionData: data })
            })
    }

    handleFormSubmit(event) {
        event.preventDefault();
            let url1 = 'http://192.168.5.149:4000/create'
            fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": this.state.id, "question": this.state.question, "hint": this.state.hint, "answer": this.state.answer  })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
            })
        console.log(this.state)
    }
   
    handleFormUpdate(event,id,question,hint,answer) {
        event.preventDefault();
        let url1 = 'http://192.168.5.149:4000/update/'
        fetch(url1, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": id, "question": question, "hint": hint, "answer": answer })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    handleFormDelete(event,id,question,hint,answer) {
        event.preventDefault();
        let url1 = 'http://192.168.5.149:4000/delete'
        fetch(url1, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": id, "question": question, "hint": hint, "answer": answer })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    render() {
        return (
            <div>
                {this.state.questionData.map(({ id, question, hint, answer }) =>
                    <div key={id}>
                    <form>
                        <label>ID</label>
                            <input type='number' value={id}
                                onChange={e => { console.log(this.state.questionData); this.setState({ tempId: e.target.value }) }} />
                        <label>Vraag</label>
                            <input type='text' value={question} 
                            onChange={e => this.setState({ tempQuestion: e.target.value })} />
                        <label>hint</label>
                            <input type='text' value={hint} 
                            onChange={e => this.setState({ tempHint: e.target.value })} />
                        <label>antwoord</label>
                            <input type='text' value={answer} 
                            onChange={e => this.setState({ tempAnswer: e.target.value })} />
                            <input type="submit" onClick={e => this.handleFormUpdate(e,id,question,hint,answer)} value="update vraag" />
                            <input type="submit" onClick={e => this.handleFormDelete(e,id,question,hint,answer)} value="delete vraag" />
                    </form>
                    </div>
                )}
                <div>
                    <form>
                        <label>ID</label>
                        <input type='number' value={this.state.id}
                            onChange={e => this.setState({ id: e.target.value })} />
                        <label>Vraag</label>
                        <input type='text' value={this.state.question}
                            onChange={e => this.setState({ question: e.target.value })} />
                        <label>hint</label>
                        <input type='text' value={this.state.hint}
                            onChange={e => this.setState({ hint: e.target.value })} />
                        <label>antwoord</label>
                        <input type='text' value={this.state.answer}
                            onChange={e => this.setState({ answer: e.target.value })} />
                        <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Voeg nieuwe vraag toe" />
                    </form>
                </div>
            </div>)
    }
}

export default Admin