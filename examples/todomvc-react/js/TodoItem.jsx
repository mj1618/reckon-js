import React from 'react';
import ReactDOM from 'react-dom';

export default class TodoItem extends React.Component {
    
    toggleStatus(){
        this.props.cursor.update(state=>state.set('active',!state.get('active')));
    }
    
    mobileEditOn(){
        if('ontouchstart' in window && navigator.maxTouchPoints>0){
            let cursor = this.props.cursor;
            cursor.update(state=>state.set('editing',true));
        }
    }
    
    editOn(){
        let cursor = this.props.cursor;
        cursor.update(state=>state.set('editing',true));
    }
    editOff(){
        let cursor = this.props.cursor;
        cursor.update(state=>state.set('editing',false));
    }
    update(){
        this.props.cursor.update(state=>state.set('name',this.refs._input.value));
    }
    componentDidUpdate() {
        ReactDOM.findDOMNode(this.refs._input).focus();
    }
    deleteItem(){
        this.props.cursor.selectParent().update(items => items.filter((it,i) => i !== this.props.itemIndex));
    }
    
    render() {
        let cursor = this.props.cursor;
        let item = this.props.item.toJS();
        let liClass = item.active?'':'completed';
        if(item.editing===true){
            liClass='editing';
        }
        return (
            <li className={liClass}>
                <div className="view">
                    <input 
                        className="toggle" 
                        type="checkbox" 
                        onChange={()=>{}}
                        onClick={()=>this.toggleStatus()}
                        checked={!item.active?'checked':''} />
                    <label 
                        onClick={()=>this.mobileEditOn()}
                        onDoubleClick={()=>this.editOn()}>
                        {item.name}
                    </label>
                    <button 
                        onClick={()=>this.deleteItem()} 
                        className="destroy"></button>
                </div>
                <input 
                    onKeyDown={e=>e.key=='Escape'||e.key=='Enter'?this.editOff():null} 
                    onBlur={()=>this.editOff()}
                    ref="_input" 
                    className="edit" 
                    value={item.name}
                    onChange={e=>this.update()} />
            </li>
        );
    }
}
