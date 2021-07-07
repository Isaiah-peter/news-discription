import React, {useEffect,useState} from 'react'
import news from '../api/news'


const KEY = '07f17310da474b32977bc9a91dcef29e'

export const Search = () => {
    const [term, setTerm] = useState('Programming')
    const [results ,setResults] = useState([])
    
   
    useEffect(()=>{
        const search = async () => {
           const {data }=  await news.get('/everything', {
             params:{
                q:term,
                apiKey:KEY
             }
            })
            setResults(data.articles)
            console.log(data.articles)
          }

          if(term && !results.length){
            search()
          }else{
            const timeOutId = setTimeout(()=>{ if(term){
              search()
            }}, 1000)

            return () => {
              clearTimeout(timeOutId)
            }
          }


    },[term])

    const renderResult = results.map(({title, description,urlToImage,source})=>{
        return(
            <div key={description} className='item'>
              <div className='right floated content'>
                <img
                className='ui medium right floated image'
                src={urlToImage}
                alt={source.name}
                />
              </div>
                <div className='content'>
                  <div className='large header'>
                      {title}
                  </div>
                  <span>{description}</span>
                </div>
            </div>
        )
    })

    return (
       <div>
           <div className='ui form'>
             <div className='field'>
                 <label> Enter  Search terms</label>
                 <input
                  value={term}
                  onChange={(e)=>setTerm( e.target.value)}
                  type="text" />
             </div>
           </div>
           <div className='ui celled list'>
               {renderResult}
           </div>
       </div>
    )
}