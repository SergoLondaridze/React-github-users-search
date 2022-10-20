import React from 'react'
import search from './images/icon-search.svg'
export default function Search(props) {
    function defultuser() {
        if (props.user === 'Search GitHub username…') {
            props.setUser('')
        }
    }
    return (
        <div>
            <form onSubmit={(event) => { event.preventDefault(); props.getUser(); props.getRepos() }}>
                <label style={{ cursor: 'pointer' }} ><img src={search} alt="Search" /></label>
                <input style={{ backgroundColor: props.colorinput, color: props.colorp2 }} type="search" value={props.user} onChange={(event) => { props.setUser(event.target.value) }} className='input' onClick={() => { defultuser() }} />
            </form>
            <div className='btndiv'>
                <button className='btn' onClick={() => { props.getUser(); props.getRepos() }}>Search</button>
            </div>
        </div>
    )
}
