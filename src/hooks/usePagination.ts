import { useStore } from './../store/useStore';
import { useState } from 'react';

export const usePagination = () => {
    const {insurances } = useStore()
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = insurances.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginateFront = () => {
        if ((currentPage * itemsPerPage) < insurances.length) {
            setCurrentPage(currentPage + 1)
        }
    };
    const paginateBack = () => {
        if ((currentPage * itemsPerPage - 10) > 0) {            
            setCurrentPage(currentPage - 1);
        }
    };

    return {
        currentItems,
        currentPage,
        paginateFront,
        paginateBack,
        itemsPerPage
    }
}
