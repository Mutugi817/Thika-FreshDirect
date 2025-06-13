import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'


const Categories = () => {

    const { navigate } = useAppContext();
  return (
    <section className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Categories</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6'>
        {categories.map((category, index)=> (
            <figure 
            className='m-1 group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
            key={index}
            style={{backgroundColor: category.bgColor}}
            onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0, 0);
            }}>
                <img src={category.image} alt={category.text} className="group-hover:scale-108 transition max-w-28"/>
                <figcaption className='text-sm font-medium'>
                {category.text}
                </figcaption>
            </figure>
        ))}
        </div>
        
    </section>
  )
}

export default Categories