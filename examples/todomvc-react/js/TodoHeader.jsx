import React from 'react';

export default class TodoHeader extends React.Component {
    
    onSubmit(){
        this.props.cursor.select('items').update(items=>{
            return items.push({
                name:this._input.value,
                active:true,
                editing:false
            });
        });
        this._input.value="";
    }
    
    render() {        
        return (
			<header className="header">
				<h1>todos</h1>
				<input 
                    ref={(c) => this._input = c} 
                    className="new-todo" 
                    placeholder="What needs to be done?" 
                    autoFocus={true} 
                    onKeyPress={e=>e.key=='Enter'?this.onSubmit():null} 
                    />
			</header>
        );
    }
}