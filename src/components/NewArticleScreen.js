import React, {Component} from 'react';

export default class NewArticleScreen extends Component {
    handleSubmit = e => {
        e.preventDefault(); //폼의 기본동작을 막기
        // console.log(e.target.elements.title.value); //form이 가지고있는 메소드 elements
        // console.log(e.target.elements.content.value);
        const formData = new FormData(e.target); // 생성자, iterable
        const dataObj = {};
        for(const [key, value] of formData) {
            dataObj[key] = value;
        }
        this.props.onFormSubmit(dataObj);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="text" name="title"/>
                        <textarea name="content"/>
                        <button type="submit">저장</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}