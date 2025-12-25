"use client";
import { getData } from '@/lib/actions';
import { Icon } from '@iconify-icon/react';
import icon from '@iconify-json/svg-spinners/icons.json';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';
import ProductTable from './ProductTable';
import { product } from '@/components/shop/Mini-Components/CollectionCard';

let page = 2;

function LoadMore({items, handleDelete, setItems}:{items:any,handleDelete:any,setItems:any}) {
    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView) {
            getData(`/products?page=${page}&limit=20`)
            .then((res) => {
                setItems([...items, ...res?.products!]);
                page++;
            });
        }
    }, [inView, items]);
    return (
        <>
        <tbody className='overflow-y-scroll'>
            {items.length > 0 && (
            items.map((data:product,index:number)=> (
                <ProductTable Product={data} onDelete={handleDelete} key={index}/>
            ))
            )}
        </tbody>
        
        <section className="flex w-full justify-center items-center py-5">
            <div className="flex w-full justify-center items-center" ref={ref}>
                <Icon 
                icon={icon.icons['bars-scale-fade']}
                className='md:text-3xl text-xl text-primary'
                />
            </div>
        </section>
        </>
    )
};

export default LoadMore;
